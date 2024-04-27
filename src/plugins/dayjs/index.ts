import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import weekday from "dayjs/plugin/weekday";
import isoWeek from "dayjs/plugin/isoWeek";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import advancedFormat from "dayjs/plugin/advancedFormat";
import en from "dayjs/locale/en";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { displayPlugin } from "./format";
import localeData from "dayjs/plugin/localeData";
import updateLocale from "dayjs/plugin/updateLocale";
import isBetween from "dayjs/plugin/isBetween";
import minMax from "dayjs/plugin/minMax";

dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(isoWeek);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(displayPlugin);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(advancedFormat);
dayjs.extend(localeData);
dayjs.extend(isBetween);
dayjs.extend(minMax);
dayjs.extend(updateLocale);
dayjs.locale({ ...en, weekStart: 1 });
dayjs.updateLocale("en", {
  weekdaysShort: ["S", "M", "T", "W", "T", "F", "S"],
});

export default dayjs;
