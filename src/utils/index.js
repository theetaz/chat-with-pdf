import dayjs from "dayjs";
import jwt from "jsonwebtoken";

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
  } else if (diff < 3600 * 24) {
    // convert diff to hours
    let hours = Math.floor(diff / 3600);
    return hours + (hours > 1 ? " hours ago" : " hour ago");
  } else if (diff < 3600 * 24 * 7) {
    // convert diff to days
    let days = Math.floor(diff / (3600 * 24));
    return days + (days > 1 ? " days ago" : " day ago");
  }
};

//check token is expired or soon to expire

const isTokenExpired = (token) => {
  // offset by 60 seconds, so we will check if the token is "almost expired".
  const currentTime = Math.round(Date.now() / 1000 + 60);
  const decoded = jwt.decode(token);

  if (decoded["exp"]) {
    const adjustedExpiry = decoded["exp"];

    if (adjustedExpiry < currentTime) {
      console.log("Token expired");
      return true;
    }

    console.log("Token has not expired yet");
    return false;
  }

  console.log('Token["exp"] does not exist');
  return true;
};

export { truncateText, calculateTheTime, truncateTitle, isTokenExpired };
