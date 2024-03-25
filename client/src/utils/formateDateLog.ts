export const formatDateLog = (inputDate: string) => {
  const date = new Date(inputDate);
  
  const monthName = date.toLocaleString('en-US', { month: 'short' });
  
  const dayOfMonth = date.getDate();
  
  let hour = date.getHours();
  const ampm = hour >= 12 ? 'pm' : 'am';
  hour = hour % 12;
  hour = hour ? hour : 12;
  
  const minutes = ('0' + date.getMinutes()).slice(-2);
  
  const formattedDate = `${monthName} ${dayOfMonth} at ${hour}:${minutes} ${ampm}`;
  
  return formattedDate;
}