import axiosClient from "../client";

export const createCustomerBill = (data)=>axiosClient.post('bill',data)
export const getBills = ()=>axiosClient.get('bill')