export const dateFormatter = (date = new Date()) => {
  return new Date(date)
    .toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", "");
};

export const Role = ["Member", "Admin"];
export const Status = ["Active", "InActive"];

export const requestCounter = { count: 0, isThrottled: false };

export const capitalizeFirstLetter = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
