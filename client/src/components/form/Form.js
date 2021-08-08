import React, { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";

import { createPost, updatePost } from "../../actions/posts";
import useStyles from "./styles";

import { Link } from "react-router-dom";

const Form = ({ currentId, setCurrentId, handleClose }) => {
	const [textField, setTextField] = useState({
		title: "",
		message: "",
		tags: "",
	});
	const [selectedFile, setSelectedFile] = useState("");
	const post = useSelector((state) =>
		currentId ? state.posts.find((message) => message._id === currentId) : null
	);
	const dispatch = useDispatch();
	const classes = useStyles();
	const user = JSON.parse(localStorage.getItem("profile"))?.user;

	useEffect(() => {
		if (post) {
			setTextField({
				title: post.title,
				message: post.message,
				tags: post.tags.join(" "),
			});
			setSelectedFile(post.selectedFile);
		}
	}, [post]);

	const clear = () => {
		setCurrentId(null);
		setTextField({ title: "", message: "", tags: "" });
		setSelectedFile("");
	};

	const onInputChange = (e) => {
		setTextField({ ...textField, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const postData = { ...textField, selectedFile };
		if (currentId) {
			dispatch(updatePost(currentId, { ...postData, name: user?.name }));
		} else {
			dispatch(createPost({ ...postData, name: user?.name }));
		}
		clear();
		handleClose();
	};

	if (!user?.name) {
		return (
			<Typography variant='h6' align='center'>
				Please log in to create memories.{" "}
				<Link to='/auth' onClick={() => handleClose()}>
					Log in
				</Link>
			</Typography>
		);
	}

	return (
		<form
			autoComplete='off'
			noValidate
			className={`${classes.root} ${classes.form}`}
			onSubmit={handleSubmit}>
			<Typography variant='h6'>
				{currentId ? "Updating " : "Creating"} a Memory
			</Typography>
			<TextField
				name='title'
				variant='outlined'
				label='Title'
				fullWidth
				value={textField.title}
				onChange={onInputChange}
			/>
			<TextField
				name='message'
				variant='outlined'
				label='Message'
				fullWidth
				multiline
				rows={4}
				value={textField.message}
				onChange={onInputChange}
			/>
			<TextField
				name='tags'
				variant='outlined'
				label='Tags (hash separated)'
				fullWidth
				value={textField.tags}
				onChange={onInputChange}
			/>
			<div className={classes.fileInput}>
				<FileBase
					type='file'
					multiple={false}
					onDone={({ base64 }) => setSelectedFile(base64)}
				/>
			</div>
			<Button
				className={classes.buttonSubmit}
				variant='contained'
				color='primary'
				size='large'
				type='submit'
				fullWidth>
				{currentId ? "Update" : "Create"}
			</Button>
			<Button variant='contained' size='small' onClick={clear} fullWidth>
				Clear
			</Button>
		</form>
	);
};

export default Form;
