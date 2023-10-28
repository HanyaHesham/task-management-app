import { api_url } from "../../../config/config";
import { http } from "../../../config/http";

//get All tasks
export async function getAllTasks() {
  return await http.get(`${api_url}/tasks`);
}
