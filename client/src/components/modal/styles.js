import { makeStyles } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

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
	add: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		color: theme.palette.getContrastText(purple[600]),
		backgroundColor: purple[600],
		borderRadius: "50px",
		cursor: "pointer",
		padding: "6px",
		border: "none",
	},
}));
