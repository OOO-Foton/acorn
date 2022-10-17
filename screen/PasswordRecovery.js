import React from "react";
import { StyleSheet, Text, TextInput, Image, View, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Button } from "react-native-elements";
import { globalStyle } from "../settings/style";
import axios from "../settings/axios";
import { getData } from "../settings/AsyncStorageFun";
import { Formik } from "formik";
import * as yup from "yup";

function PasswordRecovery({ navigation }) {
	const passwordReset = async (values) => {
		try {
			const { status } = await axios.post(
				"user/password/reset",
				{
					email: values.email,
				},
				{
					headers: {
						Authorization: "Bearer " + (await getData("token")),
					},
				}
			);
			if (status === 200) {
				Alert.alert("Письмо отправлено на вашу почту");
			}
		} catch (e) {
			console.log(e.response);
			Alert.alert("Ошибка, попробуйте позже");
		}
	};

	const goNavigate = ({ name }) => {
		navigation.navigate(name);
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={[styles.inner]}>
					<Formik
						initialValues={{
							email: "",
						}}
						onSubmit={(values) => {
							passwordReset(values);
						}}
						validationSchema={yup.object().shape({
							email: yup.string().email("Введите верный email").required("Обязательно"),
						})}
					>
						{({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
							<View style={styles.form}>
								<Image source={require("../assets/bgLogin.png")} style={styles.bgImg} resizeMode="stretch" />
								<View style={{ padding: "5%" }}>
									<Text style={globalStyle.text}>Почта</Text>
									<TextInput
										style={[globalStyle.input, touched.email && errors.email && { borderColor: "red" }]}
										placeholder="Введите почту привязанную к аккаунту"
										value={values.email}
										onChangeText={handleChange("email")}
										onBlur={() => setFieldTouched("email")}
									/>
									{touched.email && errors.email && <Text style={[globalStyle.text, { color: "red" }]}>{errors.email}</Text>}
									<Button
										buttonStyle={[globalStyle.btnOrange, styles.btn]}
										title="Отправить пароль"
										disabled={!isValid}
										onPress={(values) => handleSubmit(values)}
									/>
									<Text style={[globalStyle.text, { textAlign: "center", marginTop: 24 }]}>
										У Вас нет аккаунта?{" "}
										<Text style={{ textDecorationLine: "underline" }} onPress={() => goNavigate({ name: "Registration" })}>
											Регистрация
										</Text>
									</Text>
								</View>
							</View>
						)}
					</Formik>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1C1211",
	},
	inner: {
		flex: 1,
		justifyContent: "space-around",
	},
	bgImg: {
		width: "100%",
	},
	form: {
		width: "100%",
		backgroundColor: "#fff",
		position: "absolute",
		bottom: 0,
	},
	btn: {
		width: "100%",
		alignSelf: "center",
		backgroundColor: "#29201F",
		marginTop: 12,
	},
});

export default PasswordRecovery;
