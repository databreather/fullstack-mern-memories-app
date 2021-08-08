import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
	Avatar,
	Button,
	Paper,
	Grid,
	Typography,
	Container,
} from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import Icon from "./Icon";
import { googleLogin, userLogin, userSignup } from "../../actions/auth";
import useStyles from "./styles";
import Input from "./Input";

const initialState = {
	firstName: "",
	lastName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const Auth = () => {
	const [form, setForm] = useState(initialState);
	const [showSignup, setShowSignup] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();

	const [showPassword, setShowPassword] = useState(false);
	const handleShowPassword = () => setShowPassword(!showPassword);

	const switchMode = () => {
		setForm(initialState);
		setShowSignup(!showSignup);
		setShowPassword(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (showSignup) {
			dispatch(userSignup(form, history));
		} else {
			dispatch(userLogin(form, history));
		}
	};

	const googleSuccess = async (res) => {
		const user = await res?.profileObj;
		const token = await res?.tokenId;

		try {
			dispatch(googleLogin({ user, token }));

			history.push("/");
		} catch (error) {
			console.log(error);
		}
	};

	const googleError = () =>
		alert("Google Sign In was unsuccessful. Try again later");

	const handleChange = (e) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	return (
		<Container component='main' maxWidth='xs'>
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component='h1' variant='h5'>
					{showSignup ? "Sign up" : "Log in"}
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{showSignup && (
							<>
								<Input
									name='firstName'
									label='First Name'
									handleChange={handleChange}
									autoFocus
									half
								/>
								<Input
									name='lastName'
									label='Last Name'
									handleChange={handleChange}
									half
								/>
							</>
						)}
						<Input
							name='email'
							label='Email Address'
							handleChange={handleChange}
							type='email'
						/>
						<Input
							name='password'
							label='Password'
							handleChange={handleChange}
							type={showPassword ? "text" : "password"}
							handleShowPassword={handleShowPassword}
						/>
						{showSignup && (
							<Input
								name='confirmPassword'
								label='Repeat Password'
								handleChange={handleChange}
								type='password'
							/>
						)}
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}>
						{showSignup ? "Sign up" : "Log in"}
					</Button>
					<GoogleLogin
						clientId='1020339268803-pacurggj52b0g40ddjb35ljfkie0blss.apps.googleusercontent.com'
						render={(renderProps) => (
							<Button
								className={classes.googleButton}
								color='secondary'
								fullWidth
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								startIcon={<Icon />}
								variant='contained'>
								Log in with Google
							</Button>
						)}
						onSuccess={googleSuccess}
						onFailure={googleError}
						cookiePolicy='single_host_origin'
					/>
					<Grid container justifyContent='center'>
						<Grid item>
							{showSignup ? (
								<Typography align='center'>
									Have an account? <Button onClick={switchMode}>Log in</Button>
								</Typography>
							) : (
								<Typography align='center'>
									Don't have an account?{" "}
									<Button onClick={switchMode}>Signup</Button>
								</Typography>
							)}
						</Grid>
					</Grid>
				</form>
			</Paper>
		</Container>
	);
};

export default Auth;
