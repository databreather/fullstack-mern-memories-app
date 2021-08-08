import React, { useEffect } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { getPosts } from "../../actions/posts";
import Posts from "../posts/Posts";
//import useStyles from "./styles";

const Home = ({ handleOpen, currentId, setCurrentId }) => {
	//const classes = useStyles();
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		dispatch(getPosts());
	}, [currentId, location, dispatch]);

	return (
		<Grow in>
			<Container>
				<Grid
					container
					justifyContent='space-between'
					alignItems='stretch'
					spacing={3}>
					<Grid item xs={12}>
						<Posts setCurrentId={setCurrentId} handleOpen={handleOpen} />
					</Grid>
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
