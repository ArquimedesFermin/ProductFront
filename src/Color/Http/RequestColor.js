import HttpClient from "../../HttpClient";

export async function GetColorAll() {
  return await HttpClient.get(`/api/Color/GetColorAll`);
}

export async function RegistrarColor($Object) {
  return await HttpClient.post(`/api/Color`,$Object);
}

export async function UpdateColor($Object) {
  return await HttpClient.put(`/api/Color`,$Object);
}

export async function GetByIdColor($id) {
  return await HttpClient.get(`/api/Color/${$id}`);
}

export async function DeleteC($id) {
  return await HttpClient.delete(`/api/Color/${$id}`);
}

export async function GetColorPag($object) {
  return await HttpClient.get(`/api/Color?PageNumber=${$object.PageNumber}&PageSize=${$object.PageSize}`);
}


