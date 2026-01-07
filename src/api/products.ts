import { PRODUCT_API } from "../constants/constants";

export const fetchProducts = async () =>
  fetch(`${PRODUCT_API}/posts`).then((res) => res.json());
