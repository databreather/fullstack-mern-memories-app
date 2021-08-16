import React from "react";
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
} from "@material-ui/core/";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import moment from "moment";
import Likes from "./Likes";

import { likePost, deletePost } from "../../../actions/memories";
import useStyles from "./styles";

const Post = ({ handleOpen, post, setCurrentId }) => {
	const dispatch = useDispatch();
	const classes = useStyles();
	const user = JSON.parse(localStorage.getItem("profile"))?.user;

	return (
		<Card className={classes.card} raised elevation={6}>
			<Link to={`/posts/${post._id}`}>
				<CardMedia
					className={classes.media}
					image={
						post.selectedFile ||
						"https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png"
					}
					title={post.title}
				/>
			</Link>
			<div className={classes.overlay}>
				<Typography variant='h6'>{post.name}</Typography>
				<Typography variant='body2'>
					{moment(post.createdAt).fromNow()}
				</Typography>
			</div>
			{(post?.creatorId === user?.googleId || user?._id) && (
				<div className={classes.overlay2}>
					<Button
						onClick={(e) => {
							e.stopPropagation();
							setCurrentId(post._id);
							handleOpen();
						}}
						style={{ color: "white" }}
						size='small'>
						<MoreHorizIcon fontSize='medium' />
					</Button>
				</div>
			)}
			<div className={classes.details}>
				<Typography variant='body2' color='textSecondary' component='h2'>
					{post.tags.map((tag) => `#${tag} `)}
				</Typography>
			</div>
			<Typography
				className={classes.title}
				gutterBottom
				variant='h5'
				component='h2'>
				{post.title}
			</Typography>
			<CardContent>
				<Typography variant='body2' color='textSecondary' component='p'>
					{post.message}
				</Typography>
			</CardContent>
			<CardActions className={classes.cardActions}>
				<Button
					size='small'
					color='primary'
					disabled={!user}
					onClick={() => dispatch(likePost(post._id))}>
					<Likes likes={post.likes} user={user} />
				</Button>
				{(user?.googleId === post?.creatorId ||
					user?._id === post?.creatorId) && (
					<Button
						size='small'
						color='secondary'
						onClick={() => dispatch(deletePost(post._id))}>
						<DeleteIcon fontSize='medium' />
					</Button>
				)}
			</CardActions>
		</Card>
	);
};

export default Post;
