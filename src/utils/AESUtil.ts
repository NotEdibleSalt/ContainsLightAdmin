import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Utf8.parse("1111111111111111");

export const encode = (params: Record<string, any> | string): string => {
  const srcs = CryptoJS.enc.Utf8.parse(
    typeof params === "object" ? JSON.stringify(params) : params
  );

  const encryptedParams = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.ZeroPadding,
  });

  return encryptedParams.toString();
};

export const decrypt = (params: string): string => {
  const decryptParams = CryptoJS.AES.decrypt(params, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.ZeroPadding,
  });

  return CryptoJS.enc.Utf8.stringify(decryptParams).toString();
};
