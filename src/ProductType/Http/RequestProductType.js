import HttpClient from "../../HttpClient";

export async function GetProductoTypeAll() {
  return await HttpClient.get(`/api/ProductType/GetProductoTypeAll`);
}

export async function RegisterProductType($object) {
  return await HttpClient.post(`/api/ProductType`, $object);
}

export async function UpdateProductType($object) {
  return await HttpClient.put(`/api/ProductType`, $object);
}

export async function GetByIdProductType($id) {
  return await HttpClient.get(`/api/ProductType/1?id=${$id}`);
}

export async function GetAllPag($object) {
  return await HttpClient.get(
    `/api/ProductType?PageNumber=${$object.PageNumber}&PageSize=${$object.PageSize}`
  );
}

export async function DeleteProductType($id) {
  return await HttpClient.delete(`/api/ProductType?id=${$id}`);
}
