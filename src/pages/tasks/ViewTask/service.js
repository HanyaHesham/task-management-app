import { mock_api_url } from "../../../config/config";
import { http } from "../../../config/http";

//Get Task by id
export async function getTaskById(id) {
  return await http.get(`${mock_api_url}/tasks/${id}`);
}
