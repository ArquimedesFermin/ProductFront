import HttpClient from "../../HttpClient";

export async function RegisterProduct($object) {
return await HttpClient.post("/api/Product", $object);
}

export async function GetAll($object) {
  return await HttpClient.get(`/api/Product?PageNumber=${$object.PageNumber}&PageSize=${$object.PageSize}`);
}

export async function GetColorAll($object) {
  return await HttpClient.get(`/api/Product?PageNumber=${$object.PageNumber}&PageSize=${$object.PageSize}`);
}

export async function GetDetailPrice($object) {
  return await HttpClient.get(`/api/Product/GetDetailPriceByColor?color=${$object.Color}&model=${$object.Model}`);
}


