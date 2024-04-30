import axios from "axios";
import FormData from "form-data";

import {
  Q_storageList,
  Q_storageListAll,
  M_STORAGE_FILE_REMOVE,
} from "@/graphql";
import { URL_STORAGE } from "@/config";
import type {
  IStorageFileInfo,
  IFilesUpload,
  IStorageStatusFileSaved,
} from "@/types";
import { schemaStorageMeta } from "@/schemas";

export const useApiStorage = (initialEnabled = true, __list_all = false) => {
  const {
    graphql: { STORAGE_QUERY_POLL_INTERVAL },
    io: { IOEVENT_STORAGE_CHANGE },
    api: { TAG_STORAGE },
    FIELDS_OMIT_STORAGE_META,
  } = useAppConfig();

  const auth = useStoreApiAuth();
  const toggleEnabled = useToggleFlag(initialEnabled);
  const mounted$ = useMounted();
  const uid$ = computed(() => get(auth.user$, "id"));
  // @@enabled
  const enabled$ = computed(
    () => !!(mounted$.value && toggleEnabled.isActive.value && auth.isAuth$)
  );

  const {
    load: loadStorage,
    result,
    refetch,
    loading,
  } = useLazyQuery<{ storageList: IStorageFileInfo[] }>(
    __list_all ? Q_storageListAll : Q_storageList,
    undefined,
    {
      enabled: enabled$,
      pollInterval: STORAGE_QUERY_POLL_INTERVAL,
    }
  );
  // @@files
  const files$ = computed(
    () =>
      (enabled$.value
        ? get(result.value, __list_all ? "storageListAll" : "storageList")
        : undefined) || []
  );
  const reloadFiles = async () => await refetch();
  onceMountedOn(enabled$, loadStorage);

  watch([() => auth.isAuth$, enabled$], ([isAuth, enabled]) => {
    if (isAuth && enabled) reloadFiles();
  });

  const ioevent_ = computed(() =>
    enabled$.value ? `${IOEVENT_STORAGE_CHANGE}${uid$.value}` : ""
  );

  // upload({
  //   [name: string]: {
  //     'file': File{}
  //     'data'?: { title, description },
  //     'meta'?: {},
  //   },
  //   // ...
  // })

  // @@upload
  const uploadStatus = useProcessMonitor();
  const upload = async <TFileData = IStorageStatusFileSaved>(
    uplFiles: IFilesUpload
  ) => {
    if (!enabled$.value) return;

    const fdata = new FormData();
    let numfiles = 0;
    each(uplFiles, ({ file, data, meta }, name) => {
      if (!file) return;
      fdata.append(name, file);
      fdata.append(`${name}:data`, JSON.stringify(data || {}));
      fdata.append(`${name}:meta`, JSON.stringify(meta || {}));
      numfiles += 1;
    });
    if (!numfiles) return;

    uploadStatus.begin();
    try {
      const { data } = await axios<Record<string, TFileData>>({
        url: URL_STORAGE,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.token$}`,
        },
        data: fdata,
      });
      if (len(data)) {
        uploadStatus.successful();
        return data;
      }
    } catch (error) {
      uploadStatus.setError(error);
    } finally {
      uploadStatus.done();
    }
  };

  // @@publicUrl
  const publicUrl = (file_id: string = "") =>
    file_id && find(files$.value, { file_id, public: true })
      ? `${URL_STORAGE}/${file_id}`
      : "";

  // @@download
  const download = async (file_id: string = "") => {
    const path = publicUrl(file_id);
    return file_id && path
      ? await navigateTo(path, {
          external: true,
          open: { target: "_blank" },
        })
      : undefined;
  };

  // @@remove
  const { mutate: mutateRemoveFile } = useMutation(M_STORAGE_FILE_REMOVE);
  const remove = async (fileID: string = "") => {
    if (fileID && enabled$.value) return await mutateRemoveFile({ fileID });
  };

  const topicStorageMeta_ = computed(() =>
    enabled$.value ? `${TAG_STORAGE}${uid$.value}` : ""
  );

  // @@meta
  const { upsert: metaPut, IOEVENT: IOEVENT_STORAGE_META_CHANGE } =
    useDocs(topicStorageMeta_);
  const meta = async (values: Record<string, any>, file_id: string) => {
    if (!enabled$.value) return;

    const doc = find(files$.value, { file_id });
    if (!doc?.id) return;

    let values_;
    try {
      values_ = schemaStorageMeta.parse(values);
    } catch (error) {
      // skip
      return;
    }
    if (!(values_ || len(values_))) return;

    return await metaPut(
      omit(assign({}, doc, values_), FIELDS_OMIT_STORAGE_META),
      doc.id
    );
  };

  // @io/listen
  watchEffect(() => {
    useIOEvent(toValue(ioevent_), reloadFiles);
  });
  watchEffect(() => {
    useIOEvent(toValue(IOEVENT_STORAGE_META_CHANGE), reloadFiles);
  });

  return {
    // # ls
    files: files$,

    // # crud
    upload,
    remove,
    download,
    meta,
    publicUrl,
    reload: reloadFiles,

    // # flags
    loading,
    uploadStatus,

    // @toggle
    enabled: enabled$,
    toggleEnabled,

    // @io-event
    IO: ioevent_,
  };
};
