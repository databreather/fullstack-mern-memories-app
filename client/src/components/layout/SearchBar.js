import React, { useState } from "react";
import { AppBar, TextField, Button } from "@material-ui/core";
import ChipInput from "material-ui-chip-input";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { searchPosts } from "../../actions/memories";

const SearchBar = ({ className, handleClose }) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const [term, setTerm] = useState("");
	const [tags, setTags] = useState([]);

	const onSearchClick = () => {
		if (term.trim() || tags) {
			dispatch(searchPosts({ term, tags: tags.join(",") }));
			history.push(`/posts/search?search_q=${term}&tags=${tags.join(",")}`);
		} else {
			history.push("/");
		}
		handleClose();
	};
	const handleSearch = (e) => {
		setTerm(e.target.value);
	};

	const handleKeyPress = (e) => {
		if (e.keyCode === 13) {
			onSearchClick();
		}
	};

	const handleAdd = (tag) => setTags([...tags, tag]);
	const handleDelete = (tagToDelete) =>
		setTags(tags.filter((tag) => tag !== tagToDelete));

	return (
		<AppBar className={className} position='static' color='inherit'>
			<TextField
				name='search'
				variant='outlined'
				label='Search Memories'
				onKeyDown={handleKeyPress}
				fullWidth
				value={term}
				onChange={handleSearch}
				placeholder='Search...'
			/>
			<ChipInput
				style={{ margin: "10px 0" }}
				value={tags}
				onAdd={handleAdd}
				onDelete={handleDelete}
				label='Search tags...'
				variant='outlined'
			/>
			<Button onClick={onSearchClick} variant='contained' color='primary'>
				Search
			</Button>
		</AppBar>
	);
};

export default SearchBar;
