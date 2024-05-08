import { getAccountByProviderId } from "@/data/account";
import { getUserById } from "@/data/user";
import { decodeToken } from "react-jwt";

export type UserCredentials = {
  refreshToken: string;
  accessToken: string;
  tokenExpires: number;
  sub: string;
};

const isExpired = (date: number): boolean => {
  return new Date(date * 1000) <= new Date();
};

const getUserCredentials = async (request: Request) => {
  const authorization = request.headers.get("Authorization");

  if (!!authorization) {
    const split = authorization.split(" ");
    if (split.length === 2) {
      const token = split[1];
      const decodedToken = decodeToken(token) as UserCredentials;
      console.log("decoded token", decodedToken);

      if (isExpired(decodedToken.exp)) {
        return null;
      }

      const account = await getAccountByProviderId(decodedToken?.sub);
      console.log("ACC: ", account);
      const user = await getUserById(account?.userId);
      console.log("USER: ", user);
      return user;
    }
  }

  return null;
};

export default getUserCredentials;
