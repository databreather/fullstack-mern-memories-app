import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";

import useStyles from "./styles";

import { createComment } from "../../../actions/memories";

const CommentSection = ({ post }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem("profile"))?.user;
	const [comments, setComments] = useState(post?.comments);
	const [comment, setComment] = useState("");
	const commentsRef = useRef();

	const handleClick = async () => {
		const finalComment = `${user.name}: ${comment}`;
		const newComments = await dispatch(createComment(finalComment, post._id));
		setComments(newComments);
		setComment("");
		commentsRef.current.scrollIntoView({ behavior: "smooth" });
	};
	return (
		<div>
			<div className={classes.commentsOuterContainer}>
				<div className={classes.commentsInnerContainer}>
					<Typography gutterBottom variant='h6'>
						Comments
					</Typography>
					{comments?.map((comment, i) => {
						comment = comment.split(":");
						return (
							<Typography key={i} gutterBottom variant='subtitle1'>
								<strong>{comment[0]}</strong>
								<br />
								{comment[1]}
							</Typography>
						);
					})}
					<div ref={commentsRef} />
				</div>
				{user && (
					<div style={{ width: "70%" }}>
						<Typography gutterBottom variant='h6'>
							Write a comment
						</Typography>
						<TextField
							name='comment'
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							fullWidth
							rows={4}
							variant='outlined'
							label='Comment'
							multiline
						/>
						<Button
							style={{ marginTop: "10px" }}
							variant='contained'
							disabled={!comment}
							onClick={handleClick}>
							Comment
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default CommentSection;
