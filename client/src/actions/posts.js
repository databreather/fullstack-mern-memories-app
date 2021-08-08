import {
	FETCH_ALL_POSTS,
	CREATE_POST,
	UPDATE_POST,
	DELETE_POST,
	LIKE_POST,
} from "../actionTypes/types";
import * as api from "../api/index";

export const getPosts = () => async (dispatch) => {
	try {
		const { data } = await api.fetch();
		console.log(data);
		dispatch({ type: FETCH_ALL_POSTS, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const createPost = (newPost) => async (dispatch) => {
	try {
		const { data } = await api.create(newPost);
		console.log(data);
		dispatch({ type: CREATE_POST, payload: data.post });
	} catch (error) {
		console.log(error);
	}
};

export const updatePost = (id, updatePost) => async (dispatch) => {
	try {
		const { data } = await api.update(id, updatePost);
		console.log(data);
		dispatch({ type: UPDATE_POST, payload: data.updatedPost });
	} catch (error) {
		console.log(error);
	}
};

export const likePost = (id) => async (dispatch) => {
	try {
		const { data } = await api.like(id);
		console.log(data);
		dispatch({ type: LIKE_POST, payload: data.updatedPost });
	} catch (error) {
		console.log(error);
	}
};

export const deletePost = (id) => async (dispatch) => {
	try {
		await await api.remove(id);

		dispatch({ type: DELETE_POST, payload: id });
	} catch (error) {
		console.log(error);
	}
};
