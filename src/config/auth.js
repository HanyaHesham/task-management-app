import cookie from "js-cookie";

const token_key = "token";

export const getToken = () => cookie.get(token_key) || null;
export const removeToken = () => cookie.remove(token_key);
