import axiosClient from "../client";

export const createCustomerBill = (data)=>axiosClient.post('bill',data)
export const editCustomerBill = (data)=>axiosClient.put('bill',data)
export const getBills = ()=>axiosClient.get('bill')
export const deleteBills = (id)=>axiosClient.delete('bill',{data:{id}})