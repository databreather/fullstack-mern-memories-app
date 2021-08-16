import { makeStyles } from "@material-ui/core/styles";
import { blue, red } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
	[theme.breakpoints.down("xs")]: {
		heading: {
			fontSize: "2em",
		},
		image: {
			width: "25px",
			height: "25px",
			marginLeft: "5px",
		},
		userName: {
			width: "30px",
			height: "30px",
			fontSize: "1em",
		},
		addButton: {
			width: "27px",
			height: "27px",
			fontSize: ".8em",
		},
		searchButton: {
			width: "27px",
			height: "27px",
			fontSize: ".8em",
		},
		logoutButton: {
			width: "27px",
			height: "27px",
			fontSize: ".8em",
		},
	},
	appBar: {
		borderRadius: 15,
		margin: "30px 0",
		display: "flex",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: "10px 20px",
	},
	heading: {
		color: "rgba(0,183,255, 1)",
		textDecoration: "none",
	},
	image: {
		marginLeft: "15px",
	},
	toolbar: {
		display: "flex",
		justifyContent: "flex-end",
		width: "400px",
	},
	profile: {
		display: "flex",
		justifyContent: "flex-end",
		alignItems: "center",
		width: "400px",
	},
	brandContainer: {
		display: "flex",
		alignItems: "center",
	},
	userName: {
		color: theme.palette.getContrastText(blue[600]),
		backgroundColor: blue[600],
		margin: "0 15px",
	},
	addButton: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		color: theme.palette.getContrastText(blue[600]),
		backgroundColor: blue[600],
		borderRadius: "50px",
		cursor: "pointer",
		padding: "6px",
		border: "none",
	},
	searchButton: {
		display: "flex",
		marginRight: "15px",
		justifyContent: "center",
		alignItems: "center",
		color: theme.palette.getContrastText(blue[600]),
		backgroundColor: blue[600],
		borderRadius: "50px",
		cursor: "pointer",
		padding: "6px",
		border: "none",
	},
	logoutButton: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		color: theme.palette.getContrastText(red[600]),
		backgroundColor: red[600],
		borderRadius: "50px",
		cursor: "pointer",
		padding: "6px",
		border: "none",
	},
}));
