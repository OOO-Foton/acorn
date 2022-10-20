import React, { useState } from "react";
import { Text, TextInput, Image, StyleSheet, View, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform } from "react-native";
import { Button } from "react-native-elements";
import { storeData } from "../settings/AsyncStorageFun";
import axios from "../settings/axios";
import { globalStyle } from "../settings/style";
import { Entypo } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";
import JWT from "expo-jwt";
import { TOKEN_KEY } from "react-native-dotenv";

function Login({ navigation }) {
	const [secureTextEntry, setSecureTextEntry] = useState(true);

	const press = async (values, setErrors) => {
		try {
			const req = await axios.post(`/auth`, {
				login: values.login,
				password: values.password,
			});
			if (!!req.data.access_token) {
				storeData("name", JWT.decode(req.data.access_token, TOKEN_KEY).name);
				storeData("exp", JWT.decode(req.data.access_token, TOKEN_KEY).exp);
				storeData("token", req.data.access_token);
			}
		} catch (e) {
			switch (e.response.data.detail) {
				case "Incorrect login":
					return setErrors({ login: "Почта указана неправильная" });
				case "Incorrect password":
					return setErrors({ password: "Пароль неверный" });
				default:
					return Alert.alert("Ошибка, попробуйте позже");
			}
		}
	};

	const goNavigate = ({ name }) => {
		navigation.navigate(name);
	};

	return (
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.inner}>
					<Formik
						initialValues={{
							login: "",
							password: "",
						}}
						onSubmit={(values, { setErrors }) => {
							press(values, setErrors);
						}}
						validationSchema={yup.object().shape({
							login: yup.string().email("Введите верный email").required("Поле обязательное"),
							password: yup
								.string()
								.min(8, "Пароль должен содержать не мении 8 символов.")
								.max(16, "Пароль не должен превышать 16 символов.")
								.required("Поле обязательное"),
						})}
					>
						{({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
							<View style={styles.form}>
								<Image
									style={styles.img}
									source={Platform.isPad ? require("../assets/bgLoginIpad.png") : require("../assets/bgLogin.png")}
									resizeMode="stretch"
								/>
								<View style={{ padding: "5%" }}>
									<View>
										<Text style={globalStyle.text}>Логин</Text>
										<TextInput
											style={[globalStyle.input, touched.login && errors.login && { borderColor: "red" }, { width: "100%" }]}
											placeholder="Логин"
											value={values.login}
											onChangeText={handleChange("login")}
											onBlur={() => setFieldTouched("login")}
										/>
										{touched.login && errors.login && <Text style={[globalStyle.text, { color: "red" }]}>{errors.login}</Text>}
									</View>
									<Text style={globalStyle.text}>Пароль</Text>
									<View style={[styles.input, styles.inputView, touched.password && errors.password && { borderColor: "red" }]}>
										<TextInput
											value={values.password}
											style={[globalStyle.input]}
											onChangeText={handleChange("password")}
											placeholder="Пароль"
											onBlur={() => setFieldTouched("password")}
											secureTextEntry={secureTextEntry}
										/>
										<Entypo
											name={secureTextEntry ? "eye-with-line" : "eye"}
											size={24}
											color="black"
											style={styles.InputIcon}
											onPress={() => setSecureTextEntry(!secureTextEntry)}
										/>
									</View>
									{touched.password && errors.password && <Text style={[globalStyle.text, { color: "red" }]}>{errors.password}</Text>}
									<Text
										style={[globalStyle.text, { textAlign: "right", textDecorationLine: "underline" }]}
										onPress={() => goNavigate({ name: "PasswordRecovery" })}
									>
										Забыли пароль?
									</Text>
									<Button
										buttonStyle={[globalStyle.btnOrange, styles.btn]}
										title="Войти"
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
	img: {
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
	inputView: {
		flexDirection: "row",
	},
	input: {
		borderColor: "rgba(26, 26, 26, 0.1)",
		borderRadius: 10,
		borderWidth: 1,
		fontSize: 14,
		fontFamily: "Roboto_400Regular",
		marginBottom: 10,
		height: 45,
	},
	InputIcon: {
		position: "absolute",
		right: 5,
		top: 9,
		width: "10%",
	},
});

export default Login;
