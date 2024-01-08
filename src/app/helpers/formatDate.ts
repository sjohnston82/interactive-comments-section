import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export const formatCreatedDate = (date: Date) => {
  let formattedDate;
  
  if (
    dayjs().to(dayjs(date)) === "7 days ago" ||
    dayjs().to(dayjs(date)) === "8 days ago" ||
    dayjs().to(dayjs(date)) === "9 days ago"
  ) {
    formattedDate = "1 week ago";
  } else if (
    dayjs().to(dayjs(date)) === "14 days ago" ||
    dayjs().to(dayjs(date)) === "15 days ago" ||
    dayjs().to(dayjs(date)) === "16 days ago" ||
    dayjs().to(dayjs(date)) === "17 days ago"
  ) {
    formattedDate = "2 weeks ago";
  } else if (dayjs().to(dayjs(date)) === "a month ago") {
    formattedDate = "1 month ago";
  } else {
    formattedDate = dayjs().to(dayjs(date));
  }

  return formattedDate;
};
