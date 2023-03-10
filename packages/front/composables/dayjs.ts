import * as dayjsOrigin from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import "dayjs/locale/ja";

dayjsOrigin.locale("ja");
dayjsOrigin.extend(utc);
dayjsOrigin.extend(timezone);

dayjsOrigin.tz.setDefault("Asia/Tokyo");

export const dayjs = dayjsOrigin;
