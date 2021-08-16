import React, { useState, useEffect } from "react";
import { AppBar, Typography, Avatar } from "@material-ui/core";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

import memories from "../../images/memories-Logo.png";
import { userLogout } from "../../actions/auth";
import useStyles from "./styles";

import AddModal from "./modals/AddModal";
import SearchModal from "./modals/SearchModal";

const Navbar = ({ handleOpen, handleClose, open, currentId, setCurrentId }) => {
	const [profile, setProfile] = useState(null);
	const dispatch = useDispatch();
	const location = useLocation();
	const history = useHistory();
	const classes = useStyles();

	const logout = () => {
		dispatch(userLogout());

		history.push("/");

		setProfile(null);
	};

	useEffect(() => {
		const token = profile?.token;

		if (token) {
			const decodedToken = decode(token);

			if (decodedToken.exp * 1000 < new Date().getTime()) {
				logout();
			}
		}

		setProfile(JSON.parse(localStorage.getItem("profile")));
	}, [profile, location]);

	return (
		<AppBar className={classes.appBar} position='static' color='inherit'>
			<div className={classes.brandContainer}>
				<Typography
					component={Link}
					to='/'
					className={classes.heading}
					variant='h3'
					align='center'>
					Memories
				</Typography>
				<img className={classes.image} src={memories} alt='icon' height='40' />
			</div>

			<div className={classes.profile}>
				<SearchModal />
				<AddModal
					currentId={currentId}
					setCurrentId={setCurrentId}
					handleOpen={handleOpen}
					handleClose={handleClose}
					open={open}
					className={classes.addButton}
				/>
				{profile?.user && (
					<>
						{" "}
						<Avatar className={classes.userName} alt={profile?.user.name}>
							{profile?.user.name
								.split(" ")
								.map((ch) => ch.charAt(0))
								.join("")}
						</Avatar>
						<button className={classes.logoutButton} onClick={logout}>
							<ExitToAppRoundedIcon fontSize='small' />
						</button>
					</>
				)}
			</div>
		</AppBar>
	);
};

export default Navbar;
