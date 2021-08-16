import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { Modal, Backdrop } from "@material-ui/core";
import SearchBar from "../SearchBar";
import Fade from "./Fade";
import useStyles from "./styles";

const SearchModal = ({ className }) => {
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	return (
		<div>
			<button className={className} type='button' onClick={handleOpen}>
				<SearchIcon fontSize='small' />
			</button>
			<Modal
				aria-labelledby='spring-modal-title'
				aria-describedby='spring-modal-description'
				className={classes.modal}
				open={open}
				onClose={handleClose}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{
					timeout: 500,
				}}>
				<Fade in={open}>
					<SearchBar
						className={classes.appBarSearch}
						handleClose={handleClose}
					/>
				</Fade>
			</Modal>
		</div>
	);
};

export default SearchModal;
