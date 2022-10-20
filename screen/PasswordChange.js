import React, { useState } from "react";
import { TextInput, Text, Alert, View, StyleSheet } from "react-native";
import * as yup from "yup";
import { Formik } from "formik";
import { globalStyle } from "../settings/style";
import { Button } from "react-native-elements";
import { Entypo } from "react-native-vector-icons";
import axios from "../settings/axios";
import { getData } from "../settings/AsyncStorageFun";

export default function PasswordChange() {
	const [secureTextEntry1, setSecureTextEntry1] = useState(true);
	const [secureTextEntry2, setSecureTextEntry2] = useState(true);
	const [secureTextEntry3, setSecureTextEntry3] = useState(true);

	const submitForm = async (values, setErrors, resetForm) => {
		try {
			const { status } = await axios.post(
				"user/password/change/",
				{
					old_password: values.oldPwd,
					new_password: values.newPwd,
				},
				{
					headers: {
						Authorization: "Bearer " + (await getData("token")),
					},
				}
			);
			if (status === 200) {
				Alert.alert("Пароль изменен");
				resetForm();
			}
		} catch (e) {
			console.log(e.response.data.detail);
			switch (e.response.data.detail) {
				case "Incorrect password":
					return setErrors({ oldPwd: "Пароль неверный" });
				default:
					return Alert.alert("Ошибка, попробуйте позже");
			}
		}
	};

	return (
		<Formik
			initialValues={{
				oldPwd: "",
				newPwd: "",
				newPwd2: "",
			}}
			onSubmit={(values, { setErrors, resetForm }) => submitForm(values, setErrors, resetForm)}
			validationSchema={yup.object().shape({
				oldPwd: yup
					.string()
					.min(8, "Пароль должен содержать не мении 8 символов.")
					.max(16, "Пароль не должен превышать 16 символов.")
					.required("Поле обязательное"),
				newPwd: yup
					.string()
					.min(8, "Пароль должен содержать не мении 8 символов.")
					.max(16, "Пароль не должен превышать 16 символов.")
					.required("Поле обязательное")
					.matches(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g, "Допустимые символы: a-z, A-Z, цифры"),
				newPwd2: yup
					.string()
					.min(8, "Пароль должен содержать не мении 8 символов.")
					.max(16, "Пароль не должен превышать 16 символов.")
					.required("Поле обязательное")
					.oneOf([yup.ref("newPwd")], "Пароль должен совпадать")
					.matches(/(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g, "Допустимые символы: a-z, A-Z, цифры"),
			})}
		>
			{({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
				<View style={styles.formContainer}>
					<Text style={globalStyle.text}>Старый пароль</Text>
					<View style={[styles.input, styles.inputView, touched.oldPwd && errors.oldPwd && { borderColor: "red" }]}>
						<TextInput
							style={globalStyle.input}
							value={values.oldPwd}
							onChangeText={handleChange("oldPwd")}
							onBlur={() => setFieldTouched("oldPwd")}
							placeholder="Старый пароль"
							secureTextEntry={secureTextEntry1}
						/>
						<Entypo
							name={secureTextEntry1 ? "eye-with-line" : "eye"}
							size={24}
							color="black"
							style={styles.InputIcon}
							onPress={() => setSecureTextEntry1(!secureTextEntry1)}
						/>
					</View>
					{touched.oldPwd && errors.oldPwd && <Text style={[globalStyle.text, { color: "red" }]}>{errors.oldPwd}</Text>}
					<Text style={globalStyle.text}>Новый пароль</Text>
					<View style={[styles.input, styles.inputView, touched.newPwd && errors.newPwd && { borderColor: "red" }]}>
						<TextInput
							style={globalStyle.input}
							value={values.newPwd}
							onChangeText={handleChange("newPwd")}
							placeholder="Новый пароль"
							onBlur={() => setFieldTouched("newPwd")}
							secureTextEntry={secureTextEntry2}
						/>

						<Entypo
							name={secureTextEntry2 ? "eye-with-line" : "eye"}
							size={24}
							color="black"
							style={styles.InputIcon}
							onPress={() => setSecureTextEntry2(!secureTextEntry2)}
						/>
					</View>
					{touched.newPwd && errors.newPwd && <Text style={[globalStyle.text, { color: "red" }]}>{errors.newPwd}</Text>}
					<Text style={globalStyle.text}>Повторите новый пароль</Text>
					<View style={[styles.input, styles.inputView, touched.newPwd2 && errors.newPwd2 && { borderColor: "red" }]}>
						<TextInput
							style={globalStyle.input}
							value={values.newPwd2}
							onChangeText={handleChange("newPwd2")}
							placeholder="Повторите новый пароль"
							onBlur={() => setFieldTouched("newPwd2")}
							secureTextEntry={secureTextEntry3}
						/>

						<Entypo
							name={secureTextEntry3 ? "eye-with-line" : "eye"}
							size={24}
							color="black"
							style={styles.InputIcon}
							onPress={() => setSecureTextEntry3(!secureTextEntry3)}
						/>
					</View>
					{touched.newPwd2 && errors.newPwd2 && <Text style={[globalStyle.text, { color: "red" }]}>{errors.newPwd2}</Text>}
					<Button
						title="Изменить"
						buttonStyle={[globalStyle.btnOrange, { marginTop: 30 }]}
						disabled={!isValid}
						onPress={(values) => handleSubmit(values)}
					/>
				</View>
			)}
		</Formik>
	);
}

const styles = StyleSheet.create({
	formContainer: {
		padding: 30,
	},
	inputView: {
		position: "relative",
		flexDirection: "row",
	},
	input: {
		marginBottom: 10,
	},
	InputIcon: {
		position: "absolute",
		right: 5,
		top: 9,
		width: "10%",
	},
});
