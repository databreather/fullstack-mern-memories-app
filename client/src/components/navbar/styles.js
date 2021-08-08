import { makeStyles } from "@material-ui/core/styles";
import { blue, red } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
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
	userName: {
		display: "flex",
		alignItems: "center",
	},
	brandContainer: {
		display: "flex",
		alignItems: "center",
	},
	blue: {
		color: theme.palette.getContrastText(blue[600]),
		backgroundColor: blue[600],
		margin: "0 10px",
	},
	logout: {
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
