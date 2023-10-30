import { api_url } from "../../../config/config";
import { mock_api_url } from "../../../config/config";
import { http } from "../../../config/http";

//Create new task
export async function createTask(payload) {
  return await http.post(`${mock_api_url}/tasks`, payload);
}
