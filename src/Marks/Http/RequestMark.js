import HttpClient from "../../HttpClient";

export async function GetMarkAll() {
  return await HttpClient.get(`/api/Mark/GetAllMark`);
}

export async function RegisterMark($object) {
  console.log($object);
  return await HttpClient.post(`/api/Mark`, $object);
}

export async function UpdateMark($object) {
  return await HttpClient.put(`/api/Mark`, $object);
}

export async function GetById($id) {
  return await HttpClient.get(`/api/Mark/1?id=${$id}`);
}

export async function GetAll($obj) {
  return await HttpClient.get(
    `/api/Mark?PageNumber=${$obj.PageNumber}&PageSize=${$obj.PageSize}`
  );
}

export async function DeleteM($id) {
  return await HttpClient.delete(`/api/Mark/${$id}`);
}
