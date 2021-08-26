import axios from "axios";

const API = axios.create({
	baseURL: "http://localhost:5000/api",
	headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((req) => {
	if (localStorage.getItem("profile")) {
		req.headers.Authorization = `Bearer ${
			JSON.parse(localStorage.getItem("profile"))?.token
		}`;
	}

	return req;
});

export const find = (page) => API.get(`/posts?page=${page}`);
export const search = (searchQuery) =>
	API.get(
		`/posts/search?search_q=${searchQuery.term}&tags=${searchQuery.tags}`
	);
export const findById = (id) => API.get(`/posts/${id}`);
export const create = (newPost) => API.post("/posts/create", newPost);
export const findByIdAndLike = (id) => API.patch(`/posts/${id}/like`);
export const findByIdAndUpdate = (id, updatedPost) =>
	API.patch(`/posts/update/${id}`, updatedPost);
export const findByIdAndRemove = (id) => API.delete(`/posts/delete/${id}`);
export const comment = (newComment, id) =>
	API.post(`/posts/${id}/comment`, { comment: newComment });
export const login = (formData) => API.post("/users/login", formData);
export const signup = (formData) => API.post("/users/signup", formData);
