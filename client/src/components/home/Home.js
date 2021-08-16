import React, { useEffect } from "react";
import { Container, Grow, Grid, Paper } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { getPosts } from "../../actions/memories";
import Posts from "../posts/Posts";
import Paginate from "../pagination/Paginate";
import useStyles from "./styles";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}
const Home = ({ handleOpen, setCurrentId }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { posts, isLoading, numberOfPages } = useSelector(
		(state) => state.memories
	);
	const query = useQuery();
	const page = parseInt(query.get("page")) || 1;
	const search_q = query.get("search_q");
	const search_tags = query.get("tags");

	useEffect(() => {
		dispatch(getPosts(page));
	}, [dispatch, page]);

	return (
		<Grow in>
			<Container>
				<Grid
					container
					justifyContent='space-between'
					alignItems='stretch'
					spacing={3}>
					<Grid item xs={12}>
						<Posts
							posts={posts}
							isLoading={isLoading}
							setCurrentId={setCurrentId}
							handleOpen={handleOpen}
						/>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					{/* only render Pagination in case we're not doing search and number of pages is greater than 1 */}
					{!search_q && !search_tags && numberOfPages > 1 && (
						<Paper className={classes.pagination} elevation={6}>
							<Paginate page={page} numberOfPages={numberOfPages} />
						</Paper>
					)}
				</Grid>
			</Container>
		</Grow>
	);
};

export default Home;
