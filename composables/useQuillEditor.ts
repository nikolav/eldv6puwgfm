import Quill from "quill";
import EventEmitter from "eventemitter3";
import { DEFAULT_OPTIONS } from "@/config/quill";

export const useQuillEditor = (el: string | HTMLElement, config?: any) => {
  const options = merge({}, DEFAULT_OPTIONS, config);
  const ee = new EventEmitter();

  const setContent = (deltas: any) => {
    ee.emit("setContent", deltas);
  };
  const getContent = (callback: any) => {
    ee.emit("getContent", callback);
  };
  const onEditor = (callback: any) => {
    ee.emit("getInstance", callback);
  };

  const initialized = useRunSetupOnceOnMounted(() => {
    const quill = new Quill(el, options);
    ee.on("getContent", (callback) => {
      callback(quill.getContents().ops);
    });
    ee.on("setContent", (deltas) => {
      quill.setContents(deltas);
    });
    ee.on("getInstance", (callback) => {
      callback(quill);
    });
  });

  return {
    initialized,
    onEditor,
    getContent,
    setContent,
  };
};
