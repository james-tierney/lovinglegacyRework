// utils.js

export const calculateDaysAgo = (dateCreated) => {
  const currentDate = new Date();
  const creationDate = new Date(dateCreated);
  const differenceInTime = currentDate.getTime() - creationDate.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
  return differenceInDays;
};
