import axios from "axios";

export default axios.create({
  baseURL: "https://product-feedback-api-nicg.onrender.com/api",
  headers: { "Content-Type": "application/json" },
});
