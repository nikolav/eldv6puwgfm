import dayjs from "dayjs";

import pluginCustomParseFormat from "dayjs/plugin/customParseFormat";
import pluginUtc from "dayjs/plugin/utc";

// locale:sr
// import "dayjs/locale/sr";
// dayjs.locale("sr");

dayjs.extend(pluginCustomParseFormat);
dayjs.extend(pluginUtc);

export default defineNuxtPlugin(() => {
  return {
    provide: {
      date: dayjs,
    },
  };
});
