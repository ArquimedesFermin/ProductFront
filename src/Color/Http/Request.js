import HttpClient from "../../HttpClient";

export async function GetColorAll() {
  return await HttpClient.get(`/api/Color/GetColorAll`);
}
