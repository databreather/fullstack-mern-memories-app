import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./components/home/Home";
import Navbar from "./components/navbar/NavBar";
import Auth from "./components/auth/Auth";

const App = () => {
	const [currentId, setCurrentId] = useState(null);
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<BrowserRouter>
			<Container maxWidth='md'>
				<Navbar
					currentId={currentId}
					setCurrentId={setCurrentId}
					handleOpen={handleOpen}
					handleClose={handleClose}
					open={open}
				/>
				<Switch>
					<Route path='/' exact>
						<Home
							setCurrentId={setCurrentId}
							handleOpen={handleOpen}
							currentId={currentId}
						/>
					</Route>
					<Route path='/auth' exact component={Auth} />
				</Switch>
			</Container>
		</BrowserRouter>
	);
};

export default App;
