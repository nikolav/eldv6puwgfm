import dayjs from "dayjs";

import pluginCustomParseFormat from "dayjs/plugin/customParseFormat";
import pluginUtc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(pluginCustomParseFormat);
dayjs.extend(pluginUtc);
dayjs.extend(relativeTime);

// locale:sr
import "dayjs/locale/sr";
dayjs.locale("sr");

export default defineNuxtPlugin(() => {
  return {
    provide: {
      date: dayjs,
    },
  };
});
