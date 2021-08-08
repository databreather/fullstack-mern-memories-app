import React from "react";
import { Modal, Backdrop } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import useStyles from "./styles";
import Fade from "./Fade";
import Form from "../form/Form";

const SpringModal = ({
	handleOpen,
	handleClose,
	open,
	currentId,
	setCurrentId,
}) => {
	const classes = useStyles();

	return (
		<div>
			<button className={classes.add} type='button' onClick={handleOpen}>
				<AddIcon fontSize='small' />
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
					<div className={classes.paper}>
						<Form
							currentId={currentId}
							setCurrentId={setCurrentId}
							handleClose={handleClose}
						/>
					</div>
				</Fade>
			</Modal>
		</div>
	);
};

export default SpringModal;
