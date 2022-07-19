export const dateConverter = (date) => {
  const t = new Date(date);
  return `${("0" + t.getMonth()).slice(-2)}.${("0" + t.getDay()).slice(-2)}.${(
    "0" + t.getFullYear()
  ).slice(-2)} ${("0" + t.getHours()).slice(-2)}:${("0" + t.getMinutes()).slice(
    -2
  )}`;
};

export default dateConverter;
