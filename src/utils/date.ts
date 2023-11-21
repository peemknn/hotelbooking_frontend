export const convertToFulldate = (date: string) => {
  // Create a Date object from the string
  const dateObject = new Date(date);

  // Options for formatting the date
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };

  // Format the date using toLocaleDateString
  const formattedDate = dateObject.toLocaleDateString("en-GB", options);

  return formattedDate;
};
