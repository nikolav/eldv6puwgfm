import fileSaver from "file-saver";
import { URL_PDF_DL } from "@/config";

const { saveAs } = fileSaver;

export const useSavePdf = () => {
  const procSavePdf = useProcessMonitor();
  const auth = useStoreApiAuth();
  const {
    pdf: { DEFAULT_DOWNLOAD_FILENAME },
  } = useAppConfig();
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
      const pdf: Blob = await $fetch(URL_PDF_DL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.token$}`,
        },
        body: data,
        responseType: "arrayBuffer",
      });
      saveAs(new Blob([pdf]), filename);
    } catch (error) {
      procSavePdf.setError(error);
    } finally {
      procSavePdf.done();
    }
    if (!procSavePdf.error.value) procSavePdf.successful();
    return { error: procSavePdf.error.value };
  };
  const { watchProcessing } = useStoreAppProcessing();
  watchProcessing(() => procSavePdf.processing.value);

  return {
    savePdf,
  };
};
