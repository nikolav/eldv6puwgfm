import {
  ref as fbRef,
  getDownloadURL,
  uploadBytesResumable,
  getMetadata,
  deleteObject,
  listAll,
} from "firebase/storage";
import type { StorageReference } from "firebase/storage";
import { storage } from "@/services/firebase";
import type { OrNoValue } from "@/types";

interface IInputFileUpload {
  [title: string]: {
    // change filename for storing
    name?: string;
    // bytes to upload
    file: File;
  };
}
export const useFirebaseStorage = (STORE?: any) => {
  const store$ = ref();
  watchEffect(() => {
    store$.value = toValue(STORE);
  });
  const upl = useProcessMonitor();
  const { watchProcessing } = useStoreAppProcessing();
  watchProcessing(() => upl.processing.value);

  // ref:store
  const refStore = fbRef(storage, store$.value);

  const upload = async (files: IInputFileUpload) => {
    // store result title:fileUrl pairs
    const uplResult = <Record<string, OrNoValue<string>>>{};

    if (!isEmpty(files)) {
      try {
        upl.begin();
        each(files, (node, title) => {
          if (!node.file) return;
          const path = node?.name || node.file.name;
          const refStorageNode = fbRef(refStore, path);
          const uploadTask = uploadBytesResumable(refStorageNode, node.file);
          uploadTask.on(
            "state_changed",
            // progress
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log({ "upload:progress": progress });
            },
            // error
            (error) => {
              upl.setError(error);
            },
            // success
            async () => {
              uplResult[title] = await getDownloadURL(uploadTask.snapshot.ref);
            }
          );
        });
      } catch (error) {
        upl.setError(error);
      } finally {
        upl.done();
      }
      if (!upl.error.value) upl.successful();
    }
    //
    return uplResult;
  };
  const publicUrl = async (path: string) => {
    const refNode = fbRef(refStore, path);
    return await getDownloadURL(refNode);
  };
  const info = async (path: string) => {
    const refNode = fbRef(refStore, path);
    return await getMetadata(refNode);
  };
  const remove = async (path: string) => {
    const refNode = fbRef(refStore, path);
    return await deleteObject(refNode);
  };
  const ls = async () => {
    return [...(get(await listAll(refStore), "items") || [])];
  };

  return {
    error: upl.error.value,
    ls,
    upload,
    publicUrl,
    info,
    remove,
  };
};
