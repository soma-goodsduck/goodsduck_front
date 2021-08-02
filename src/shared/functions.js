export const timeForToday = (value) => {
  const today = new Date();
  const timeValue = new Date(value);

  const betweenTime = Math.floor(
    (today.getTime() - timeValue.getTime()) / 1000 / 60,
  );
  if (betweenTime < 1) return "방금전";
  if (betweenTime < 60) {
    return `${betweenTime}분전`;
  }

  const betweenTimeHour = Math.floor(betweenTime / 60);
  if (betweenTimeHour < 24) {
    return `${betweenTimeHour}시간전`;
  }

  const betweenTimeDay = Math.floor(betweenTime / 60 / 24);
  if (betweenTimeDay < 365) {
    return `${betweenTimeDay}일전`;
  }

  return `${Math.floor(betweenTimeDay / 365)}년전`;
};

export const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatDate = (x) => {
  const currentDatetime = new Date(x);
  const formattedDate = `${currentDatetime.getFullYear()}.${
    currentDatetime.getMonth() + 1
  }.${currentDatetime.getDate()} ${currentDatetime.getHours()}:${currentDatetime.getMinutes()}`;
  return formattedDate;
};

export const getDate = (type) => {
  // const today = new Date();
  // const createdAt = new Date(message.timestamp);

  const year = type.getFullYear();
  const date = type.getDate();
  const arrMonths = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const month = arrMonths[type.getMonth()];

  const textDate = `${year}년 ${month}월 ${date}일`;
  return textDate;
};
