import { fetch } from "@/utils/http";
import { encode } from "@/utils/AESUtil";

export const login = (username: string, password: string): Promise<any> => {
  const p = {
    username: encode(username),
    password: encode(password),
  };

  return fetch.post("/login", p);
};
