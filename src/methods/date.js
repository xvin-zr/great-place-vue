function getNormalDate(dateStr) {
  const dateObject = new Date(dateStr);
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");

  return `${year}/${month}/${day}`;
}

function getToday() {
  const dateObject = new Date();
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getYear(dateStr) {
  const dateObject = new Date(dateStr);
  const year = dateObject.getFullYear();

  return ""+year;
}

function getCurMonth() {
  const dateObject = new Date();
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");

  return year+"-"+month;
}

function getYearMonth(offset = 0) {
  const dateObject = new Date();
  dateObject.setMonth(dateObject.getMonth() + offset);
  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  return `${year}-${month}`;
}

export { getNormalDate, getYearMonth, getYear, getToday, getCurMonth };