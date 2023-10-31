import { mock_api_url } from "../../config/config";
import { http } from "../../config/http";

//get All users
export async function getAllUsers() {
  return await http.get(`${mock_api_url}/users`);
}
