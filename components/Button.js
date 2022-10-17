import React from "react";
import { View } from "react-native";
import { Button } from "react-native-elements";

export default function CustomButton(props) {
	return (
		<View
			style={{
				marginTop: 10,
			}}
		>
			<Button {...props} />
		</View>
	);
}
