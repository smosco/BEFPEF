const leftPad = (value) => {
  if (value >= 10) {
    return value;
  }

  return `0${value}`;
};

export const format = (source, sign) => {
  const year = source.getFullYear();
  const month = leftPad(source.getMonth() + 1);
  const day = leftPad(source.getDate());

  return [year, month, day].join(sign);
};

export const agoDate = (date, ago) => {
  let agoDate = new Date(date);
  agoDate.setDate(date.getDate() - ago);
  return agoDate.toISOString().substring(0, 10);
};

const formatDate = (date, sign) => {
  return (
    date.substr(0, 4) + sign + date.substr(4, 2) + sign + date.substr(6, 2)
  );
};

export const dateForm = (date) => {
  return date.replace(/-/g, "");
};
