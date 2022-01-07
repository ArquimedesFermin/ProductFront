import HttpClient from "../../HttpClient";

export async function RegisterProduct($object) {
  return await HttpClient.post("/api/Product", $object);
}

export async function UpdateProduct($id, $object) {
  return await HttpClient.put(`/api/Product/${$id}`, $object);
}

export async function GetAll($object) {
  return await HttpClient.get(
    `/api/Product?PageNumber=${$object.PageNumber}&PageSize=${$object.PageSize}`
  );
}

export async function GetColorAll($object) {
  return await HttpClient.get(
    `/api/Product?PageNumber=${$object.PageNumber}&PageSize=${$object.PageSize}`
  );
}

export async function GetDetailPrice($object) {
  return await HttpClient.get(
    `/api/Product/GetDetailPriceByColor?color=${$object.Color}&model=${$object.Model}`
  );
}

export async function GetUpdate($id) {
  return await HttpClient.get(`/api/Product/GetUpdate?id=${$id}`);
}

export async function DeleteProduct($id) {
  return await HttpClient.delete(`/api/Product/${$id}`);
}

export async function GetProductByName($name) {
  return await HttpClient.get(`/api/Product/${$name}`);
}