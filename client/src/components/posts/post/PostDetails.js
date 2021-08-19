import React, { useEffect } from "react";
import {
	CircularProgress,
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
	}, [id]);

	useEffect(() => {
		if (post) {
			dispatch(searchPosts({ search: "none", tags: post.tags.join(",") }));
		}
	}, [post]);

	const recommendedPosts = posts.filter(({ _id }) => _id !== post?._id);

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
									className={classes.recommendedCard}
									key={_id}
									style={{ margin: "20px", cursor: "pointer" }}
									onClick={() => openPost(_id)}>
									<div className={classes.recommendedContent}>
										<Typography gutterBottom variant='h6'>
											{title}
										</Typography>
										<Typography gutterBottom variant='body2' component='p'>
											{message}
										</Typography>
										<Typography
											style={{ marginTop: "10px" }}
											gutterBottom
											variant='subtitle2'>
											Created By: <strong>{name}</strong>
										</Typography>
									</div>
									<img
										className={classes.recommendedImage}
										src={selectedFile}
										width='220px'
										height='220px'
										alt={title}
									/>
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
