import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
	media: {
		borderRadius: "20px",
		objectFit: "cover",
		width: "100%",
		maxHeight: "500px",
	},
	card: {
		display: "flex",
		width: "100%",
		[theme.breakpoints.down("sm")]: {
			flexWrap: "wrap",
			flexDirection: "column",
		},
	},
	section: {
		borderRadius: "20px",
		margin: "10px",
		flex: 1,
	},
	imageSection: {
		marginLeft: "20px",
		[theme.breakpoints.down("sm")]: {
			marginLeft: 0,
		},
	},
	recommendedPosts: {
		display: "flex",
		[theme.breakpoints.down("sm")]: {
			alignItems: "center",
			flexDirection: "column",
		},
	},
	recommendedCard: {
		display: "flex",
		alignItems: "center",
		[theme.breakpoints.down("xs")]: {
			flexWrap: "wrap",
			flexDirection: "column",
		},
	},
	recommendedContent: {
		width: "220px",
		marginRight: "20px",
		[theme.breakpoints.down("xs")]: {
			width: "300px",
			marginBottom: "10px",
		},
	},
	recommendedImage: {
		objectFit: "fill",
		borderRadius: "10px",
		[theme.breakpoints.down("xs")]: {
			width: "300px",
		},
	},
	loadingPaper: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		padding: "20px",
		borderRadius: "15px",
		height: "39vh",
	},
}));
