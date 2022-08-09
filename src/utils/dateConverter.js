export const dateConverter = (date) => {
  const t = new Date(date);
  return `${("0" + t.getDate()).slice(-2)}.${("0" + (t.getMonth() + 1)).slice(-2)}.${(
    "0" + t.getFullYear()
  ).slice(-2)} ${("0" + t.getHours()).slice(-2)}:${("0" + t.getMinutes()).slice(
    -2
  )}`;
};

export default dateConverter;
