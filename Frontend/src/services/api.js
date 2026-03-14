import axios from "axios";

const API = axios.create({
  baseURL: "https://smartspender-itbv.onrender.com/api"
});

API.interceptors.request.use((req)=>{

  const token = localStorage.getItem("token");

  if(token){
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;

});

export const getTransactions = async ()=>{
  const res = await API.get("/transactions");
  return res.data;
};

export const addTransaction = async(transaction)=>{
  const res = await API.post("/transactions",transaction);
  return res.data;
};
