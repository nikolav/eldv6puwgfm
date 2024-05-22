import fileSaver from "file-saver";
import { ENDPOINT_GRAPHQL } from "@/config";
import { error } from "console";

const { saveAs } = fileSaver;

const query = `
  query Q_pdfDownload($data: JsonData!) {
    pdfDownload(data: $data)
  }
`;
export const useSavePdf = () => {
  const { watchProcessing } = useStoreAppProcessing();
  const procSavePdf = useProcessMonitor();
  const auth = useStoreApiAuth();
  const {
    pdf: { DEFAULT_DOWNLOAD_FILENAME },
  } = useAppConfig();
  watchProcessing(() => procSavePdf.processing.value);
  // render pdf endpoint
  //  load data in --headless chrome;
  //   save bytes client side
  const savePdf = async ({
    // .filename .data{}
    filename = DEFAULT_DOWNLOAD_FILENAME,
    data = <Record<string, any>>{},
  }) => {
    try {
      procSavePdf.begin();
      const d = get(
        await $fetch(ENDPOINT_GRAPHQL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth.token$}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: {
            query: query,
            variables: {
              data,
            },
          },
        }),
        "data.pdfDownload"
      );
      const bs = atob(d ? String(d) : "");
      const len = bs.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = bs.charCodeAt(i);
      }
      saveAs(new Blob([bytes.buffer]), filename);
    } catch (error) {
      procSavePdf.setError(error);
    } finally {
      procSavePdf.done();
    }
    if (!procSavePdf.error.value) procSavePdf.successful();
  };
  return {
    error: procSavePdf.error.value,
    savePdf,
  };
};
