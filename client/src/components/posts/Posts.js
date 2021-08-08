import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./post/Post";
import useStyles from "./styles";

const Posts = ({ handleOpen, setCurrentId }) => {
	const posts = useSelector((state) => state.posts);
	const classes = useStyles();
	const renderedPosts = posts.map((post) => (
		<Grid key={post._id} item xs={12} md={6}>
			<Post post={post} setCurrentId={setCurrentId} handleOpen={handleOpen} />
		</Grid>
	));

	return !posts.length ? (
		<CircularProgress />
	) : (
		<Grid
			className={classes.container}
			container
			alignItems='stretch'
			spacing={3}>
			{renderedPosts}
		</Grid>
	);
};

export default Posts;
