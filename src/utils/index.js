import dayjs from "dayjs";
var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
dayjs().format();

const truncateText = (text) => {
  if (text.length > 30) {
    return text.substring(0, 100) + "...";
  }
  return text;
};

const truncateTitle = (title) => {
  if (title.length > 15) {
    return title.substring(0, 15) + "...";
  }
  return title;
};

const calculateTheTime = (date) => {
  //convert created date and time to timestamp
  const timestamp = dayjs(date, "YYYY-MM-DD HH:mm:ss").unix();


  const now = dayjs().unix();
 

  // get the difference between now and the created date
  let diff = now - timestamp;


  if (diff < 60) {
    return diff + " seconds ago";
  } else if (diff < 3600) {
    // convert diff to minutes
    let minutes = Math.floor(diff / 60);
    return minutes + (minutes > 1 ? " minutes ago" : " minute ago");
  }
  // convert diff to hours
  let hours = Math.floor(diff / 3600);
  return hours + (hours > 1 ? " hours ago" : " hour ago");
};

export { truncateText, calculateTheTime, truncateTitle };
