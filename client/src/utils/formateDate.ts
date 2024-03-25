export const formatDate = (inputDate: string) => {
  const date = new Date(inputDate);

  const dayOfWeek = date.toLocaleString("en-US", { weekday: "short" });

  const dayOfMonth = date.getDate();

  const monthName = date.toLocaleString("en-US", { month: "short" });

  const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${monthName}`;

  return formattedDate;
}
