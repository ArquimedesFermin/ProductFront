import HttpClient from "../../HttpClient";

export async function GetModelAll() {
  return await HttpClient.get(`/api/Model/GetModelAll`);
}
