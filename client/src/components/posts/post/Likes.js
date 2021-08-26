import React from "react";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";

const Likes = ({ likes, user }) => {
	if (likes.length > 0) {
		const currentUserId = user?.googleId || user?._id;
		const likedPost = likes.find((like) => like === currentUserId);
		return likedPost ? (
			<>
				<ThumbUpAltIcon fontSize='small' />
				&nbsp;
				{likes.length > 2
					? `You and ${likes.length - 1} others`
					: `${likes.length} like${likes.length > 1 ? "s" : ""}`}
			</>
		) : (
			<>
				<ThumbUpAltOutlined fontSize='small' />
				&nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
			</>
		);
	}

	return (
		<>
			<ThumbUpAltOutlined fontSize='small' />
			&nbsp;Like
		</>
	);
};

export default Likes;
