const getDateFromString = (dateString: string) => {
  const date = new Date(dateString);
  return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
};

export default getDateFromString;
