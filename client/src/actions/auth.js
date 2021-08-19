import { GOOGLE_AUTH, CUSTOM_AUTH, LOGOUT } from "../actionTypes/types";
import * as api from "../api/index";

export const googleLogin = (data) => async (dispatch) => {
	try {
		dispatch({ type: GOOGLE_AUTH, payload: data });
	} catch (error) {
		console.log(error);
	}
};
export const userLogin = (formData, router) => async (dispatch) => {
	try {
		const { data } = await api.login(formData);
		console.log(data);
		dispatch({ type: CUSTOM_AUTH, payload: data });

		router.push("/");
	} catch (error) {
		console.log(error);
	}
};

export const userSignup = (formData, router) => async (dispatch) => {
	try {
		const { data } = await api.signup(formData);

		dispatch({ type: CUSTOM_AUTH, payload: data });

		router.push("/");
	} catch (error) {
		console.log(error);
	}
};

export const userLogout = () => (dispatch) => {
	try {
		dispatch({ type: LOGOUT });
	} catch (error) {
		console.log(error);
	}
};
