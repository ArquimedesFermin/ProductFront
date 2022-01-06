import HttpClient from "../../HttpClient";

export async function GetModelAll() {
  return await HttpClient.get(`/api/Model/GetModelAll`);
}

export async function InsertModelR($object) {
  return await HttpClient.post(`/api/Model`,$object);
}

export async function GetModel($object) {
  return await HttpClient.get(`/api/Model?PageNumber=${$object.PageNumber}&PageSize=${$object.PageSize}`);
}

export async function GetModelGrid($object) {
  return await HttpClient.get(`/api/Model/GetModelGrid?PageNumber=${$object.PageNumber}&PageSize=${$object.PageSize}`);
}

export async function GetModelById($id) {
  return await HttpClient.get(`/api/Model/${$id}`);
}

export async function UpdateModel($object) {
  return await HttpClient.put(`/api/Model`,$object);
}

export async function DeleteModel($id) {
  return await HttpClient.delete(`/api/Model/${$id}}`);
}









