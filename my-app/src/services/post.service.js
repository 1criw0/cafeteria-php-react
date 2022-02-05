import axios from "axios";

const API_URL = "http://localhost:8000";
const getAllproducts= () => {
  return axios.get(API_URL + "/products");
};

const getAllPrivatePosts = () => {
  return axios.get(API_URL + "/compras");
};

const insertPrivatePosts = (data) => {
  return axios.post(API_URL + "/products",data);
};

const comprar= (data) => {
  return axios.post(API_URL + "/products",data);
};

const Editproductscompra= (privateeditPosts) => {
  return axios.put(API_URL + "/products",privateeditPosts);
};
const Editproducts= (privateeditPosts) => {
  return axios.put(API_URL + "/products",privateeditPosts);
};
const DEleteproduct= (data) => {
  return axios.delete(API_URL + "/products",data);
};
const postService = {
  getAllproducts,
  getAllPrivatePosts,
  comprar,
  Editproductscompra,
  insertPrivatePosts ,
  Editproducts,
  DEleteproduct,
};

export default postService;