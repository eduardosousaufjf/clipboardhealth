/**
 * Receives a ISO8601 string of Date
 * Transforms it into YYYY/M/d
 * @param dateString
 */
const getDateFromString = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
};

export default getDateFromString;
