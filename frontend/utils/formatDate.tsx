export const formatDate = (date: Date) => {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }

  return [year, month, day].join("-");
};

export const dateString = (date: string) => {
  let t = (date = new Date(date).toDateString());
  const [day_str, month, day_num, year] = t.split(" ");
  return [day_num, month, year].join(" ");
};

export const getMonth = (monthid: string) => {
  if (monthid === "01") return "January";
  else if (monthid === "02") return "February";
  else if (monthid === "03") return "March";
  else if (monthid === "04") return "April";
  else if (monthid === "05") return "May";
  else if (monthid === "06") return "June";
  else if (monthid === "07") return "July";
  else if (monthid === "08") return "August";
  else if (monthid === "09") return "September";
  else if (monthid === "10") return "October";
  else if (monthid === "11") return "November";
  return "December";
};
