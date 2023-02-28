import axiosClient from "../client";

export const getProductTypes = ()=>axiosClient.get('product_type')