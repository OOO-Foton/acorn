import { FontAwesome } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import CustomButton from "../components/Button";
import { Loader } from "../components/Loader";
import { getData, removeItemValue } from "../settings/AsyncStorageFun";
import axios from "../settings/axios";
import { globalStyle } from "../settings/style";

function Home({ navigation }) {
	const [ticket, setTiket] = useState([]);
	const [isLoader, setIsLoader] = useState(true);

	useEffect(() => {
		const unsubscribe = navigation.addListener("focus", () => {
			(async function start() {
				setIsLoader(true);
				const value = await AsyncStorage.getItem("token");
				if (value !== null) {
					try {
						const { data } = await axios.get("ticket/list/full/", {
							headers: {
								Authorization: "Bearer " + (await getData("token")),
							},
						});
						setTiket(data);
						console.log(data);
						setIsLoader(false);
					} catch (e) {
						console.log("error", e.message);
						start();
					}
				} else {
					removeItemValue("token");
					removeItemValue("exp");
				}
			})();
		});
		return unsubscribe;
	}, []);

	const Rub = ({ color = "#fff" }) => {
		return <FontAwesome name="rub" size={15} color={color} />;
	};

	const goNavigate = ({ name, item }) => {
		navigation.navigate(name, item);
	};

	return isLoader ? (
		<Loader />
	) : (
		<ScrollView style={[globalStyle.container, { padding: 0 }]}>
			{ticket.length > 0 ? (
				ticket.map((item) => {
					return (
						<TouchableOpacity
							key={Math.random().toString(36).substr(2, 20) + Math.random().toString(36).substr(2, 20)}
							style={styles.item}
							onPress={() => goNavigate({ name: "pledgeTicket", item })}
						>
							<View style={{ width: "90%" }}>
								<Text style={[globalStyle.text, { color: "#fff" }]}>{item.ticket_id}</Text>
								<Text numberOfLines={1} style={[globalStyle.text, { color: "#fff", width: "90%" }]}>
									{item.items[0].????????} {item.items[0].????????} {item.items[0].????????}
								</Text>
								<Text style={[globalStyle.text, { color: "#D88D20", fontFamily: "Roboto_700Bold" }]}>
									{item.loan_sum} <Rub color="#D88D20" />
								</Text>
								<Text style={[globalStyle.text, { color: "#fff" }]}>
									% {item.percent_sum} <Rub />
								</Text>
							</View>
							<View
								style={{
									flexDirection: "row",
									alignItems: "center",
									width: "10%",
								}}
							>
								<CustomButton
									icon={<Rub color="#fff" />}
									buttonStyle={[globalStyle.btnOrange, { bordeRoboto_400Regularadius: 50, width: 32 }]}
									onPress={() => goNavigate({ name: "pledgeTicket", item })}
								/>
							</View>
						</TouchableOpacity>
					);
				})
			) : (
				<View style={styles.noTicket}>
					<Text style={styles.noTicketText}>?????????????? ??????</Text>
				</View>
			)}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	item: {
		padding: 20,
		marginBottom: 1,
		marginTop: 1,
		backgroundColor: "#332A29",
		flexDirection: "row",
	},
	noTicket: {
		padding: 20,
	},
	noTicketText: {
		textAlign: "center",
		fontSize: 18,
	},
});

export default Home;
