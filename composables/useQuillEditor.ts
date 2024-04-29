import Quill from "quill";
import EventEmitter from "eventemitter3";
import { DEFAULT_OPTIONS } from "@/config/quill";

export const useQuillEditor = (el: string | HTMLElement, config?: any) => {
  const ee = new EventEmitter();
  const options = merge({}, DEFAULT_OPTIONS, config);

  const setContent = (deltas: any) => {
    ee.emit("setContent", deltas);
  };
  const getContent = (callback: any) => {
    ee.emit("getContent", { callback });
  };
  const onEditor = (callback: any) => {
    ee.emit("getInstance", { callback });
  };
  const clear = () => {
    ee.emit("clearContent");
  };
  // const initialized = useRunSetupOnceOnMounted(async () => {
  const initialized = onceMountedOn(true, async () => {
    // @mounted, dom rendered; requires dom env
    await nextTick();
    const quill = new Quill(el, options);
    ee.on("getContent", ({ callback }) => {
      callback({
        content: quill.getContents().ops,
        text: trim(quill.getText()),
      });
    });
    ee.on("setContent", (deltas) => {
      quill.setContents(deltas);
    });
    ee.on("getInstance", ({ callback }) => {
      callback(quill);
    });
    ee.on("clearContent", () => {
      quill.setText("\n");
    });
  });

  return {
    initialized,
    onEditor,
    getContent,
    setContent,
    clear,
  };
};
