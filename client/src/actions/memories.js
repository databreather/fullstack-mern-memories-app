import {
	FETCH_ALL_POSTS,
	SEARCH_POSTS,
	FETCH_ONE_POST,
	CREATE_POST,
	UPDATE_POST,
	DELETE_POST,
	LIKE_POST,
	COMMENT_POST,
	START_LOADING,
	END_LOADING,
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
		dispatch({
			type: SEARCH_POSTS,
			payload: data,
		});
		console.log(data);
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const getPost = (id) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.findById(id);
		dispatch({
			type: FETCH_ONE_POST,
			payload: data,
		});
		console.log(data);
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};
export const createPost = (newPost, router) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.create(newPost);
		router.push(`/posts/${data?.post?._id}`);
		dispatch({ type: CREATE_POST, payload: data.post });
		console.log(data);
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const updatePost = (id, updatePost) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING });
		const { data } = await api.findByIdAndUpdate(id, updatePost);
		dispatch({ type: UPDATE_POST, payload: data.updatedPost });
		console.log(data);
		dispatch({ type: END_LOADING });
	} catch (error) {
		console.log(error);
	}
};

export const likePost = (id) => async (dispatch) => {
	try {
		const { data } = await api.findByIdAndLike(id);
		dispatch({ type: LIKE_POST, payload: data.updatedPost });
		console.log(data);
		return data.updatedPost.likes;
	} catch (error) {
		console.log(error);
	}
};

export const deletePost = (id) => async (dispatch) => {
	try {
		await api.findByIdAndRemove(id);
		dispatch({ type: DELETE_POST, payload: id });
	} catch (error) {
		console.log(error);
	}
};

export const createComment = (newComment, postId) => async (dispatch) => {
	try {
		const { data } = await api.comment(newComment, postId);
		console.log(data);
		dispatch({ type: COMMENT_POST, payload: data });

		return data.comments;
	} catch (err) {
		console.log(err);
	}
};
