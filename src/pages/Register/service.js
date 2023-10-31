import { mock_api_url } from "../../config/config";
import { http } from "../../config/http";

//Create new user
export async function createUser(payload) {
  return await http.post(`${mock_api_url}/users`, payload);
}
