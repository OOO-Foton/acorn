import React from "react";
import WebView from "react-native-webview";

export default function Pay({ route }) {
	const props = route.params;
	return <WebView source={{ uri: props }} />;
}
