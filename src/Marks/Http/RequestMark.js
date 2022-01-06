import HttpClient from "../../HttpClient";

export async function GetMarkAll() {
  return await HttpClient.get(`/api/Mark/GetAllMark`);
}


