import axios from "axios";

const instance = axios.create({
	// baseURL: "http://localhost:5001"
	baseURL: "http://13.125.112.232" 
});

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MmE2ZGIyMDRlZGM2YzcxMjk4NmEyNGMiLCJpYXQiOjE2NTUxMDIyNjd9.auQXnKjOn0xMDczXvZEnR1ziwkJSVKVXIG02FRehPpE'
// instance.defaults.headers.common["Authorization"] = USER_TOKEN; 
instance.defaults.headers.common["Authorization"] = `Bearer ${token}`; 

export default instance;