import {
	FETCH_ALL_POSTS,
	SEARCH_POSTS,
	FETCH_ONE_POST,
	CREATE_POST,
	UPDATE_POST,
	DELETE_POST,
	LIKE_POST,
	START_LOADING,
	END_LOADING,
	ERROR_MESSAGE,
} from "../actionTypes/types";
import * as api from "../api/index";

export const getPosts = (page) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.find(page);
		console.log(data);
		dispatch({ type: FETCH_ALL_POSTS, payload: data });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const searchPosts = (searchQuery) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.search(searchQuery);
		console.log(data);
		dispatch({
			type: SEARCH_POSTS,
			payload: data,
		});
		dispatch({ type: END_LOADING });
	} catch (error) {
		dispatch({ type: ERROR_MESSAGE, payload: error.response.data });
	}
};

export const getPost = (id) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.findById(id);
		console.log(data);
		dispatch({
			type: FETCH_ONE_POST,
			payload: data,
		});
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};
export const createPost = (newPost, router) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.create(newPost);
		console.log(data);
		router.push(`/posts/${data._id}`);
		dispatch({ type: CREATE_POST, payload: data.post });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const updatePost = (id, updatePost, router) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.findByIdAndUpdate(id, updatePost);
		console.log(data);
		router.push(`/posts/${data._id}`);
		dispatch({ type: UPDATE_POST, payload: data.updatedPost });
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const likePost = (id) => async (dispatch) => {
	try {
		const { data } = await api.findByIdAndLike(id);
		console.log(data);
		dispatch({ type: LIKE_POST, payload: data.updatedPost });
	} catch (error) {
		console.log(error);
	}
};

export const deletePost = (id) => async (dispatch) => {
	try {
		const { data } = await api.findByIdAndRemove(id);
		console.log(data);
		dispatch({ type: DELETE_POST, payload: id });
	} catch (error) {
		console.log(error);
	}
};
