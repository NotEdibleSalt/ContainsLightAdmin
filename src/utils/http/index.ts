import { useRequest } from "@/utils/http/fetch";
import { BASE_URL } from "./config";

const timeout = 30000;
export const fetch = useRequest(BASE_URL, timeout);
