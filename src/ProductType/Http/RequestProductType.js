import HttpClient from "../../HttpClient";

export async function GetProductoTypeAll() {
  return await HttpClient.get(`/api/ProductType/GetProductoTypeAll`);
}
