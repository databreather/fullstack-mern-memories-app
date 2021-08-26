import {
	FETCH_ALL_POSTS,
	SEARCH_POSTS,
	FETCH_ONE_POST,
	CREATE_POST,
	UPDATE_POST,
	LIKE_POST,
	DELETE_POST,
	COMMENT_POST,
	START_LOADING,
	END_LOADING,
	ERROR_MESSAGE,
} from "../actionTypes/types.js";

const initialState = {
	posts: [],
	post: null,
	currentPage: 0,
	numberOfPages: 0,
	isLoading: false,
	successMessage: "",
	errorMessage: "",
};
const memories = (state = initialState, action) => {
	switch (action.type) {
		case ERROR_MESSAGE:
			return {
				...state,
				errorMessage: action.payload,
			};
		case START_LOADING:
			return {
				...state,
				isLoading: true,
			};
		case END_LOADING:
			return {
				...state,
				isLoading: false,
			};
		case FETCH_ALL_POSTS:
			return {
				...state,
				posts: action.payload.posts,
				currentPage: action.payload.currentPage,
				numberOfPages: action.payload.currentPage,
			};
		case SEARCH_POSTS:
			return {
				...state,
				posts: action.payload,
			};
		case FETCH_ONE_POST:
			return {
				...state,
				post: action.payload,
			};
		case LIKE_POST:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === action.payload._id ? action.payload : post
				),
			};
		case CREATE_POST:
			return {
				...state,
				posts: [...state.posts, action.payload],
			};
		case UPDATE_POST:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === action.payload._id ? action.payload : post
				),
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post._id !== action.payload),
			};
		case COMMENT_POST:
			return {
				...state,
				posts: state.posts.map((post) =>
					post._id === action.payload._id ? action.payload : post
				),
			};
		default:
			return state;
	}
};

export default memories;
