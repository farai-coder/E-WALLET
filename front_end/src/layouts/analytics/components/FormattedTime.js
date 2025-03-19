// FormattedTime.js
import React from 'react';

const messages = {
  NOW: "just now",
  LESS_THAN_A_MINUTE: "a few secs ago",
  LESS_THAN_5_MINUTES: "a minute ago",
  MINUTES: "mins ago",
  HOURS: "hours ago",
  DAYS: "days ago",
  MONTHS: "months ago",
  YEARS: "years ago",
};

const timeInSeconds = {
  MINUTE: 60,
  HOUR: 60 * 60,
  DAY: 24 * 60 * 60,
  MONTH: 30 * 24 * 60 * 60,
  YEAR: 365 * 24 * 60 * 60,
};

const getFormatted = (time) => {
  return Math.floor(time);
};

const FormattedTime = ({ time }) => {
    // Ensure time is defined and convert milliseconds to seconds
  if (time === undefined || time === null) {
    return <p>Time data is missing</p>;
  }
  
  // Convert milliseconds to seconds
  const diff = time / 1000;

  if (diff < 10) {
    return <p>{messages.NOW}</p>;
  } else if (diff < timeInSeconds.MINUTE) {
    return <p>{messages.LESS_THAN_A_MINUTE}</p>;
  } else if (diff < timeInSeconds.MINUTE * 5) {
    return <p>{messages.LESS_THAN_5_MINUTES}</p>;
  } else if (diff < timeInSeconds.HOUR) {
    return <p>{`${getFormatted(diff / timeInSeconds.MINUTE)} ${messages.MINUTES}`}</p>;
  } else if (diff < timeInSeconds.DAY) {
    return <p>{`${getFormatted(diff / timeInSeconds.HOUR)} ${messages.HOURS}`}</p>;
  } else if (diff < timeInSeconds.MONTH) {
    return <p>{`${getFormatted(diff / timeInSeconds.DAY)} ${messages.DAYS}`}</p>;
  } else if (diff < timeInSeconds.YEAR) {
    return <p>{`${getFormatted(diff / timeInSeconds.MONTH)} ${messages.MONTHS}`}</p>;
  } else {
    return <p>{`${getFormatted(diff / timeInSeconds.YEAR)} ${messages.YEARS}`}</p>;
  }
};

export default FormattedTime;
