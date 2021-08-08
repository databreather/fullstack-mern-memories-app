import axios from "axios";

const API = axios.create({
	baseURL: "http://localhost:5000/api",
	headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem("profile")).token
		}`;
	}

	return req;
});

export const fetch = () => API.get("/posts");
export const create = (newPost) => API.post("/posts/create", newPost);
export const like = (id) => API.patch(`/posts/${id}/like`);
export const update = (id, updatedPost) =>
	API.patch(`/posts/update/${id}`, updatedPost);
export const remove = (id) => API.delete(`/posts/delete/${id}`);

export const login = (formData) => API.post("/user/login", formData);
export const signup = (formData) => API.post("/user/signup", formData);
