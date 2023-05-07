const LOGPREFIX = "[CARBOOK]";
const DATE = () => {
  const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };

  return date.toLocaleDateString("en-IL", options);
};

const doLog = (string) =>
  console.log(DATE() + " - " + LOGPREFIX + " " + string);

module.exports = doLog;
