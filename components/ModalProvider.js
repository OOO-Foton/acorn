import React from "react";
import { useState, useContext } from "react";
import { Modal, Pressable, StyleSheet, Text, View, Linking, Alert } from "react-native";
import { Button } from "react-native-elements";
import { getData } from "../settings/AsyncStorageFun";
import axios from "../settings/axios";
import { AntDesign } from "@expo/vector-icons";
import { globalStyle } from "../settings/style";
import { Loader } from "./Loader";
import { DOBOR_MIN } from "react-native-dotenv";

export const ModalContext = React.createContext();

function GenericModal() {
	const { typeModal, showModal, props, handleClose, setTypeModal, isLoader, setIsLoader, navigationProps } = useContext(ModalContext);

	const Block = ({ typeModal }) => {
		const goNavigate = ({ name, uri }) => {
			navigationProps.navigate(name, uri);
		};

		const titleModal = () => {
			switch (typeModal) {
				case "button":
					return (
						<Text
							style={[
								globalStyle.text,
								{
									marginLeft: 30,
									marginTop: 15,
									fontSize: 16,
								},
							]}
						>
							Оплатить
						</Text>
					);
				case "partOfLoan":
					return (
						<Text
							style={[
								globalStyle.text,
								{
									marginLeft: 30,
									marginTop: 15,
									fontSize: 16,
								},
							]}
						>
							Оплата процентов и части займа
						</Text>
					);
				case "dobor":
					return (
						<Text
							style={[
								globalStyle.text,
								{
									marginLeft: 30,
									marginTop: 15,
									fontSize: 16,
								},
							]}
						>
							Добор
						</Text>
					);
				case "qrOrAvangard":
					return (
						<Text
							style={[
								globalStyle.text,
								{
									marginLeft: 30,
									marginTop: 15,
									fontSize: 16,
								},
							]}
						>
							Выбор системы оплаты
						</Text>
					);
				default:
					break;
			}
		};

		const pay = async ({ ticket_id, payment_type, amount = 0, method = "avangard" }) => {
			setIsLoader(true);
			const dataReq = () => {
				if (method === "sberbank") {
					return {
						ticket_id: ticket_id,
						amount: Number(amount),
						payment_type: Number(payment_type),
						method: method,
						get_qr_image: false,
					};
				} else {
					return {
						ticket_id: ticket_id,
						amount: Number(amount),
						method: method,
						payment_type: Number(payment_type),
						get_qr_image: true,
					};
				}
			};
			try {
				const { data, status } = await axios.post("payment/create/", dataReq(), {
					headers: {
						Authorization: "Bearer " + (await getData("token")),
					},
				});
				if (status === 200) {
					if (payment_type !== 1) {
						handleClose();
						Linking.openURL(data.url);
					}
					setIsLoader(false);
					handleClose();
					if (method === "sberbank") {
						goNavigate({ name: "Pay", uri: data.url });
					} else {
						Linking.openURL(data.url);
					}
				}
			} catch (e) {
				setIsLoader(false);
				Alert.alert("Ошибка, повторите попытку позже");
				console.log(e.response);
			}
		};

		const InputPay = ({ max, type = "partOfLoan", ticket_id, percent_sum, prosent = 0 }) => {
			let min = 50;
			if (type === "dobor") {
				min = 50 - (prosent % 50) + Number(DOBOR_MIN) + prosent;
				min = min - (min % 50);
			}
			console.log(min);
			const [pay, setPay] = useState(min);
			const press = async () => {
				setIsLoader(true);
				switch (type) {
					case "dobor":
						try {
							const { status } = await axios.post(
								"/loan/get/",
								{
									ticket_id: ticket_id,
									amount: pay,
								},
								{
									headers: {
										Authorization: "Bearer " + (await getData("token")),
									},
								}
							);
							if (status === 200) {
								setIsLoader(false);
								Alert.alert("Добор");
								handleClose();
							}
						} catch (e) {
							setIsLoader(false);
							Alert.alert("Ошибка, повторите попытку позже");
							console.log(e.response);
						}
						break;
					case "partOfLoan":
						try {
							const { data, status } = await axios.post(
								"payment/create/",
								{
									ticket_id: ticket_id,
									amount: Number(percent_sum + pay),
									payment_type: Number(2),
									get_qr_image: true,
								},
								{
									headers: {
										Authorization: "Bearer " + (await getData("token")),
									},
								}
							);
							if (status === 200) {
								setIsLoader(false);
								handleClose();
								Linking.openURL(data.url);
							}
						} catch (e) {
							setIsLoader(false);
							Alert.alert("Ошибка, повторите попытку позже");
							console.log(e.response);
						}
						break;
					default:
						break;
				}
			};

			return (
				<View>
					<View style={[styles.inputBlock, globalStyle.input, { height: 55 }]}>
						<Button
							buttonStyle={{ backgroundColor: "red" }}
							onPress={() => setPay(Number(pay) - 50)}
							disabled={pay <= min}
							icon={<AntDesign name="minus" size={24} color="white" />}
						/>
						<Text style={{ fontSize: 18 }}>{pay}</Text>
						<Button
							buttonStyle={{ backgroundColor: "green" }}
							onPress={() => setPay(Number(pay) + 50)}
							disabled={pay + 50 > (type === "partOfLoan" ? max - 50 : max)}
							icon={<AntDesign name="plus" size={24} color="white" />}
						/>
					</View>
					<Button buttonStyle={globalStyle.btnOrange} onPress={() => press()} title={type === "dobor" ? "Пополнить" : "Оплатить"} />
				</View>
			);
		};

		const bodyTable = () => {
			switch (typeModal) {
				case "button":
					return (
						<View>
							{props.percent_sum > 0 && (
								<Pressable
									style={({ pressed }) => [
										styles.btn,
										{
											opacity: pressed ? 0.6 : 1,
										},
									]}
									onPress={() => setTypeModal("qrOrAvangard")}
								>
									<Text style={styles.btnText}>Оплата процентов</Text>
								</Pressable>
							)}
							<Pressable
								style={({ pressed }) => [
									styles.btn,
									{
										opacity: pressed ? 0.6 : 1,
									},
								]}
								onPress={() => setTypeModal("partOfLoan")}
							>
								<Text style={styles.btnText}>Оплата процентов и части займа</Text>
							</Pressable>
							<Pressable
								style={({ pressed }) => [
									styles.btn,
									{
										opacity: pressed ? 0.6 : 1,
									},
								]}
								onPress={() => pay({ ticket_id: props.ticket_id, payment_type: 3 })}
							>
								<Text style={styles.btnText}>Полная оплата</Text>
							</Pressable>
						</View>
					);
				case "partOfLoan":
					return <InputPay max={props.loan_sum} ticket_id={props.ticket_id} percent_sum={props.percent_sum} />;
				case "dobor":
					return <InputPay max={props.available} type="dobor" ticket_id={props.ticket_id} prosent={props.percent_sum} />;
				case "qrOrAvangard":
					return (
						<View>
							<Pressable
								style={({ pressed }) => [
									globalStyle.btnOrange,
									styles.btn,
									{
										opacity: pressed ? 0.6 : 1,
									},
								]}
								onPress={() => {
									pay({ ticket_id: props.ticket_id, payment_type: 1, method: "sberbank" });
								}}
							>
								<Text style={styles.btnText}>СберБанк</Text>
							</Pressable>
							<Pressable
								style={({ pressed }) => [
									styles.btn,
									{
										opacity: pressed ? 0.6 : 1,
									},
								]}
								onPress={() => {
									handleClose();
									pay({ ticket_id: props.ticket_id, payment_type: 1 });
								}}
							>
								<Text style={styles.btnText}>Система быстрых платежей</Text>
							</Pressable>
						</View>
					);
				default:
					return null;
			}
		};

		return (
			<>
				<Modal
					animationType="slide"
					transparent={true}
					visible={showModal}
					onRequestClose={() => {
						handleClose();
					}}
				>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<View style={styles.modalHeader}>
								{titleModal()}
								<AntDesign
									name="close"
									size={35}
									color="#332A29"
									onPress={() => {
										handleClose();
									}}
								/>
							</View>
							<View style={styles.modalBody}>{bodyTable()}</View>
						</View>
					</View>
				</Modal>
			</>
		);
	};

	return isLoader === true ? <Loader /> : <Block typeModal={typeModal} />;
}

const styles = StyleSheet.create({
	conteiner: {
		height: "100%",
		backgroundColor: "#332A29",
		padding: 30,
	},
	inputBlock: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignContent: "center",
		alignItems: "center",
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		width: "100%",
	},
	modalView: {
		margin: 30,
		backgroundColor: "white",
		borderRadius: 10,
	},
	modalHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignContent: "center",
		alignItems: "center",
		padding: 5,
	},
	modalBody: {
		padding: 35,
		paddingTop: 25,
	},
	btn: {
		backgroundColor: "#D88D20",
		color: "#fff",
		zIndex: 1010,
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 12,
		paddingHorizontal: 32,
		borderRadius: 4,
		elevation: 3,
		marginTop: 10,
	},
	btnText: {
		color: "#fff",
		fontFamily: "Roboto_700Bold",
	},
});

export const useModal = () => {
	const [showModal, setShowModal] = useState(false);
	const [isLoader, setIsLoader] = useState(false);
	const [typeModal, setTypeModal] = useState("button");
	const [props, setProps] = useState([]);
	const [navigationProps, setNavigationProps] = useState("");

	const handleOpen = ({ type, navigation }) => {
		setShowModal(true);
		setTypeModal(type);
		setNavigationProps(navigation);
	};

	const handleClose = () => {
		setShowModal(false);
		setTypeModal("button");
		setProps([]);
	};

	return {
		handleOpen,
		handleClose,
		showModal,
		typeModal,
		props,
		setProps,
		setTypeModal,
		isLoader,
		setIsLoader,
		navigationProps,
		setNavigationProps,
	};
};

const ModalProvider = ({ children }) => {
	const modal = useModal();
	return (
		<ModalContext.Provider value={modal}>
			<GenericModal />
			{children}
		</ModalContext.Provider>
	);
};

export default ModalProvider;
