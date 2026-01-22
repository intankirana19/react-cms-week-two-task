import { PRODUCT_API } from "../shared/constants/constants";

export const fetchProducts = async () =>
  fetch(`${PRODUCT_API}`).then((res) => res.json());
