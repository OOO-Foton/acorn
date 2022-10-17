import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../components/Button";
import { FontAwesome } from "@expo/vector-icons";
import { globalStyle } from "../settings/style";
import { ModalContext } from "../components/ModalProvider";

function Pledge({ route, navigation }) {
	const { handleOpen, setProps } = useContext(ModalContext);
	const props = route.params;

	const Rub = ({ color = "#D88D20" }) => {
		return <FontAwesome name="rub" size={15} color={color} />;
	};

	return (
		<>
			<View style={styles.conteiner}>
				<View style={{ marginBottom: 30 }}>
					<Text style={[globalStyle.text, { color: "#fff" }]}>{props.ticket_id}</Text>
					{props.items.map((item) => {
						return (
							<Text
								style={[globalStyle.text, { fontFamily: "Roboto_700Bold", color: "#fff" }]}
								key={Math.random().toString(36).substr(2, 20) + Math.random().toString(36).substr(2, 20)}
							>
								{item.Вещь}
							</Text>
						);
					})}
					<Text style={[globalStyle.text, { fontFamily: "Roboto_700Bold", color: "#fff" }]}>
						{props.items.map((item) => {
							return item.Вещь;
						})}
					</Text>
					<Text style={[globalStyle.text, { color: "#fff" }]}>
						Срок возврата:{" "}
						{("0" + new Date(props.return_date).getDate()).slice(-2) +
							"-" +
							("0" + (new Date(props.return_date).getMonth() + 1)).slice(-2) +
							"-" +
							new Date(props.return_date).getFullYear()}
					</Text>
					<Text style={[globalStyle.text, { color: "#fff" }]}>
						Дата реализации:{" "}
						{("0" + new Date(props.realization_date).getDate()).slice(-2) +
							"-" +
							("0" + (new Date(props.realization_date).getMonth() + 1)).slice(-2) +
							"-" +
							new Date(props.realization_date).getFullYear()}
					</Text>
					<Text style={[globalStyle.text, { fontFamily: "Roboto_700Bold", color: "#D88D20" }]}>
						Сумма займа: {props.loan_sum} <Rub />
					</Text>
					<Text style={[globalStyle.text, { fontFamily: "Roboto_700Bold", color: "#fff" }]}>
						% {props.percent_sum} <Rub color="#fff" />
					</Text>
				</View>
				{props.can_make_operation ? (
					<>
						<CustomButton
							buttonStyle={[globalStyle.btnOrange]}
							title="Оплатить"
							onPress={() => {
								{
									handleOpen({ type: "button", navigation: navigation });
									setProps(props);
								}
							}}
						/>
						{props.max_loan_sum > 0 && (
							<CustomButton
								buttonStyle={[globalStyle.btnOrange]}
								title="Добор"
								onPress={() => {
									{
										handleOpen({ type: "dobor", navigation: navigation });
										setProps(props);
									}
								}}
							/>
						)}
					</>
				) : (
					<Text style={[globalStyle.text, styles.canMakeOperationText]}>Сегодня оплата по данному залоговому билету Вами уже произведена</Text>
				)}
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	conteiner: {
		height: "100%",
		backgroundColor: "#332A29",
		padding: 30,
	},
	canMakeOperationText: {
		color: "#fff",
		textAlign: "center",
		fontSize: 16,
	},
});

export default Pledge;
