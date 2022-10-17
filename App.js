import AsyncStorage from "@react-native-async-storage/async-storage";
import JWT from "expo-jwt";
import { useEffect, useState } from "react";
import { Platform, SafeAreaView, StatusBar } from "react-native";
import { getData, removeItemValue, storeData } from "./settings/AsyncStorageFun";
import axios from "./settings/axios";
import ModalProvider from "./components/ModalProvider";
import { LoginStack, Navigate } from "./settings/Navigations";
import { useCachedResources } from "./settings/useCachedResources";
import { TOKEN_KEY } from "react-native-dotenv";

export default function App() {
	const [auth, setAuth] = useState(false);

	useEffect(() => {
		(async () => {
			try {
				const value = await AsyncStorage.getItem("token");
				const exp = await AsyncStorage.getItem("exp");
				if (value === null) {
					return setAuth(false);
				} else {
					if (exp !== null) {
						if (new Date(Number(exp) * 1000).toString() <= new Date().toString()) {
							const prolong = await axios.post(
								`auth/prolong/`,
								{},
								{
									headers: {
										Authorization: "Bearer " + (await getData("token")),
									},
								}
							);
							if (!!prolong.data.access_token) {
								removeItemValue("token");
								removeItemValue("exp");
								storeData("name", JWT.decode(prolong.data.access_token, TOKEN_KEY).name);
								storeData("exp", JWT.decode(prolong.data.access_token, TOKEN_KEY).exp);
								storeData("token", prolong.data.access_token);
								return setAuth(true);
							}
						}
						setAuth(true);
					}
				}
			} catch (e) {
				console.log(e.response, "app");
			}
		})();
	}, []);

	setInterval(() => {
		(async () => {
			try {
				const value = await AsyncStorage.getItem("token");
				const exp = await AsyncStorage.getItem("exp");
				if (value === null) {
					return setAuth(false);
				} else {
					if (exp !== null) {
						if (new Date(Number(exp) * 1000).toString() <= new Date().toString()) {
							const prolong = await axios.post(
								`auth/prolong/`,
								{},
								{
									headers: {
										Authorization: "Bearer " + (await getData("token")),
									},
								}
							);
							if (!!prolong.data.access_token) {
								removeItemValue("token");
								removeItemValue("exp");
								storeData("name", JWT.decode(prolong.data.access_token, TOKEN_KEY).name);
								storeData("exp", JWT.decode(prolong.data.access_token, TOKEN_KEY).exp);
								storeData("token", prolong.data.access_token);
								return setAuth(true);
							}
						}
						setAuth(true);
					}
				}
			} catch (e) {
				console.log(e.response, "app");
			}
		})();
	}, 5000);

	const isLoadingComplete = useCachedResources();

	if (!isLoadingComplete) {
		return null;
	}

	return (
		<>
			{auth ? (
				<SafeAreaView style={{ flex: 1 }}>
					<StatusBar barStyle={Platform.OS === "android" ? "default" : "dark-content"} hidden={false} translucent={true} />
					<ModalProvider>
						<Navigate />
					</ModalProvider>
				</SafeAreaView>
			) : (
				<SafeAreaView style={{ flex: 1 }}>
					<StatusBar barStyle={Platform.OS === "android" ? "default" : "dark-content"} hidden={false} />
					<LoginStack />
				</SafeAreaView>
			)}
		</>
	);
}
