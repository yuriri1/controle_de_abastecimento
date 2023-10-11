const adjustDate = (date) => {
  const dateArr = date.split("T");
  const datePart = dateArr[0];
  const timePart = dateArr[1];
  const datePartArr = datePart.split("-");
  const timePartArr = timePart.split(":");
  const year = datePartArr[0];
  const month = datePartArr[1];
  const day = datePartArr[2];
  const hour = timePartArr[0];
  const minute = timePartArr[1];
  return `${day}/${month}/${year} ${hour}:${minute}`;
};

export { adjustDate };
