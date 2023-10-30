import { api_url } from "../../../config/config";
import { mock_api_url } from "../../../config/config";
import { http } from "../../../config/http";

//get All tasks
export async function getAllTasks() {
  return await http.get(`${mock_api_url}/tasks`);
}

//Delete Task by id
export async function deleteTaskById(id) {
  return await http.delete(`${mock_api_url}/tasks/${id}`);
}
