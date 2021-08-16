import React, { useState } from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";

import Home from "./components/home/Home";
import Navbar from "./components/layout/NavBar";
import Auth from "./components/auth/Auth";
import PostDetails from "./components/posts/post/PostDetails";

const App = () => {
	const [currentId, setCurrentId] = useState(null);
	const [open, setOpen] = useState(false);
	const profile = JSON.parse(localStorage.getItem("profile"));
	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<BrowserRouter>
			<Container maxWidth='lg'>
				<Navbar
					currentId={currentId}
					setCurrentId={setCurrentId}
					handleOpen={handleOpen}
					handleClose={handleClose}
					open={open}
				/>
				<Switch>
					<Route path='/' exact component={() => <Redirect to='/posts' />} />
					<Route path='/posts' exact>
						<Home
							setCurrentId={setCurrentId}
							handleOpen={handleOpen}
							currentId={currentId}
						/>
					</Route>
					<Route path='/posts/search' exact>
						<Home
							setCurrentId={setCurrentId}
							handleOpen={handleOpen}
							currentId={currentId}
						/>
					</Route>
					<Route path='/posts/:id' exact component={PostDetails} />
					<Route
						path='/auth'
						exact
						component={() => (!profile ? <Auth /> : <Redirect to='/posts' />)}
					/>
				</Switch>
			</Container>
		</BrowserRouter>
	);
};

export default App;
