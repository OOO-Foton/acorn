import { ActivityIndicator, StyleSheet, View } from "react-native";

export const Loader = () => {
	return (
		<View style={[styles.container, styles.horizontal]}>
			<ActivityIndicator size="large" color="#fff" />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#332A29",
		width: "100%",
		height: "100%",
		top: 0,
		bottom: 0,
	},
	horizontal: {
		justifyContent: "center",
		width: "100%",
		height: "100%",
	},
});
