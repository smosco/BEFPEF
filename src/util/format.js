export const dateFormat = (date) => {
  return date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6, 8);
};

export const sexFormat = (sex) => {
  if (sex === "F") {
    return "암컷";
  } else if (sex === "M") {
    return "수컷";
  } else {
    return "알 수 없음";
  }
};

export const neutFormat = (neut) => {
  if (neut === "Y") {
    return "ㅇ";
  } else if (neut === "N") {
    return "x";
  } else {
    return "알 수 없음";
  }
};
