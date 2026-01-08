import { PRODUCT_API } from "../constants/constants";

export const fetchProducts = async () =>
  fetch(`${PRODUCT_API}`).then((res) => res.json());
