import React from "react";
import { Grid, CircularProgress, Typography } from "@material-ui/core";

import Post from "./post/Post";
import useStyles from "./styles";

const Posts = ({ posts, isLoading, handleOpen, setCurrentId }) => {
	const classes = useStyles();
	const renderedPosts = posts.map((post) => (
		<Grid key={post._id} item xs={12} sm={6} md={4} lg={3}>
			<Post post={post} setCurrentId={setCurrentId} handleOpen={handleOpen} />
		</Grid>
	));

	if (!isLoading && !posts.length)
		return (
			<Grid
				className={classes.container}
				container
				alignItems='center'
				justifyContent='flex-start'>
				<Typography variant='h2'>No Memories to Display</Typography>
			</Grid>
		);
	return isLoading ? (
		<Grid
			className={classes.container}
			container
			alignItems='center'
			justifyContent='center'>
			<CircularProgress />
		</Grid>
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
