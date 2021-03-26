export const formattedDate = (date) => {
  const newDate = new Date(date);
  const month = newDate.getMonth() + 1; //months from 1-12
  const day = newDate.getDate();
  const year = newDate.getFullYear();
  return year + "/" + month + "/" + day;
};
