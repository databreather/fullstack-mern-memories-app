import React, { useEffect } from "react";
import {
	CircularProgress,
	Grid,
	Paper,
	Typography,
	Divider,
} from "@material-ui/core";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { getPost, searchPosts } from "../../../actions/memories";
import useStyles from "./styles_1";

const PostDetails = () => {
	const classes = useStyles();
	const { id } = useParams();
	const history = useHistory();
	const dispatch = useDispatch();
	const { post, posts, isLoading } = useSelector((state) => state?.memories);

	useEffect(() => {
		dispatch(getPost(id));
	}, [dispatch, id]);

	useEffect(() => {
		if (post) {
			dispatch(searchPosts({ search: "none", tags: post?.tags.join(",") }));
		}
	}, [post]);
	let recommendedPosts = [];

	if (post) {
		recommendedPosts = posts?.filter(({ _id }) => _id !== post._id);
	}

	const openPost = (postId) => {
		history.push(`/posts/${postId}`);
	};
	return isLoading ? (
		<Paper className={classes.loadingPaper}>
			<CircularProgress size='5em' />
		</Paper>
	) : (
		<Paper style={{ padding: "20px", borderRadius: "15px" }} elavation={6}>
			<div className={classes.card}>
				<div className={classes.section}>
					<Typography variant='h3' component='h2'>
						{post?.title}
					</Typography>
					<Typography variant='h6' color='textSecondary' component='h2'>
						{post?.tags.map((tag) => `#${tag} `)}
					</Typography>
					<Typography style={{ margin: "30px 0" }} variant='h5' component='p'>
						{post?.message}
					</Typography>
					<Typography variant='h6'>
						Created by: <strong>{post?.name}</strong>
					</Typography>
					<Typography variant='body1'>
						{moment(post?.createdAt).fromNow()}
					</Typography>
					<Divider style={{ margin: "20px 0" }} />
					<Typography variant='body1'>
						<strong>Realtime Chat - coming soon</strong>
					</Typography>
					<Divider style={{ margin: "20px 0" }} />
					<Typography variant='body1'>
						<strong>Comments - coming soon</strong>
					</Typography>
					<Divider style={{ margin: "20px 0" }} />
				</div>
				<div className={classes.imageSection}>
					<img
						className={classes.media}
						src={
							post?.selectedFile ||
							"https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
						}
						alt={post?.title}
					/>
				</div>
			</div>
			<div className={classes.section}>
				<Typography variant='h5' gutterBottom>
					You might also like:
				</Typography>
				<Divider />
				{recommendedPosts.length > 0 && (
					<div className={classes.recommendedPosts}>
						{recommendedPosts.map(
							({ title, message, selectedFile, name, _id, likes }) => (
								<div
									key={_id}
									style={{ margin: "20px", cursor: "pointer" }}
									onClick={openPost(_id)}>
									<Typography gutterBottom variant='h6'>
										{title}
									</Typography>
									<Typography gutterBottom variant='subtitle2'>
										{name}
									</Typography>
									<Typography gutterBottom variant='subtitle2'>
										{message}
									</Typography>
									<Typography gutterBottom variant='h61'>
										Likes: {likes.length}
									</Typography>
									<img src={selectedFile} width='200' alt={title} />
								</div>
							)
						)}
					</div>
				)}
			</div>
		</Paper>
	);
};

export default PostDetails;
