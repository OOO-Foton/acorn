import { StyleSheet, Platform } from "react-native";

export const globalStyle = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		padding: 30,
	},
	input: {
		borderColor: "rgba(26, 26, 26, 0.1)",
		borderRadius: 10,
		borderWidth: 1,
		padding: Platform.isPad ? 14 : 7,
		fontSize: Platform.isPad ? 18 : 14,
		fontFamily: "Roboto_400Regular",
		marginBottom: 10,
		minHeight: 45,
		width: "100%",
	},
	text: {
		fontSize: Platform.isPad ? 20 : 14,
		marginBottom: 5,
		fontFamily: "Roboto_400Regular",
	},
	btnOrange: {
		backgroundColor: "#D88D20",
		color: "#fff",
		fontSize: Platform.isPad ? 20 : 16,
		fontFamily: "Roboto_400Regular",
	},
});
