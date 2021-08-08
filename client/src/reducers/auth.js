import { GOOGLE_AUTH, CUSTOM_AUTH, LOGOUT } from "../actionTypes/types.js";

const authReducer = (state = { authData: null }, action) => {
	switch (action.type) {
		case GOOGLE_AUTH:
		case CUSTOM_AUTH:
			localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));

			return { ...state, authData: action.payload };
		case LOGOUT:
			localStorage.clear();

			return { ...state, authData: null };
		default:
			return state;
	}
};

export default authReducer;
