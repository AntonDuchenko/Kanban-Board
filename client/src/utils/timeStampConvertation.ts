import { jwtDecode } from "jwt-decode";

export const timeStampConvertation = (token: string) => {
  const unixTimestamp = jwtDecode(token).exp!;
  const tokenDate = new Date(unixTimestamp! * 1000);
  const now = new Date();

  if (now.getTime() > tokenDate.getTime()) {
    return false;
  }

  return true;
};
