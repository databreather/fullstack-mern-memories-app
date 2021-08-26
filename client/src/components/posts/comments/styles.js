import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	card: {
		display: "flex",
		width: "100%",
		[theme.breakpoints.down("sm")]: {
			flexWrap: "wrap",
			flexDirection: "column",
		},
	},
	commentsOuterContainer: {
		display: "flex",
		justifyContent: "space-between",
	},
	commentsInnerContainer: {
		height: "200px",
		overflow: "auto",
		marginRight: "30px",
	},
}));
