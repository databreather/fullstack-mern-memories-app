import { makeStyles } from "@material-ui/core/styles";
//import { purple } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
	modal: {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	},
	paper: {
		backgroundColor: theme.palette.background.paper,
		borderRadius: "15px",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(3),
		maxWidth: "400px",
	},
}));
