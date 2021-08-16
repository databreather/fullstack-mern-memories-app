import React, { useState, useEffect } from "react";
import { TextField, Button, Typography } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { useHistory } from "react-router-dom";

import { createPost, updatePost } from "../../actions/memories";
import useStyles from "./styles";

import { Link } from "react-router-dom";

const Form = ({ currentId, setCurrentId, handleClose }) => {
	const [textField, setTextField] = useState({
		title: "",
		message: "",
	});
	const [tags, setTags] = useState([]);
	const [selectedFile, setSelectedFile] = useState("");
	const post = useSelector(({ memories }) =>
		currentId ? memories.posts.find((post) => post._id === currentId) : null
	);
	const history = useHistory();
	const dispatch = useDispatch();
	const classes = useStyles();
	const user = JSON.parse(localStorage.getItem("profile"))?.user;

	useEffect(() => {
		if (post) {
			setTextField({
				title: post.title,
				message: post.message,
			});
			setTags(post.tags);
			setSelectedFile(post.selectedFile);
		}
	}, [post]);

	const clear = () => {
		setCurrentId(null);
		setTextField({ title: "", message: "" });
		setTags([]);
		setSelectedFile("");
	};

	const onInputChange = (e) => {
		setTextField({ ...textField, [e.target.name]: e.target.value });
	};
	const handleAdd = (tag) => setTags([...tags, tag]);

	const handleDelete = (tagToDelete) =>
		setTags(tags.filter((tag) => tag !== tagToDelete));

	const handleSubmit = async (e) => {
		e.preventDefault();
		const postData = { ...textField, selectedFile, tags: tags.join(",") };
		if (currentId) {
			dispatch(
				updatePost(currentId, { ...postData, name: user?.name }, history)
			);
		} else {
			dispatch(createPost({ ...postData, name: user?.name }, history));
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
			<ChipInput
				name='tags'
				style={{ margin: "10px 0" }}
				value={tags}
				onAdd={handleAdd}
				onDelete={handleDelete}
				fullWidth
				label='Tags'
				variant='outlined'
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
