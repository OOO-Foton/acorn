import { Formik } from "formik";
import * as yup from "yup";
import React from "react";
import { Text, TextInput, Alert, StyleSheet, View, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from "react-native";
import { Button } from "react-native-elements";
import axios from "../settings/axios";
import { globalStyle } from "../settings/style";
import { getData } from "../settings/AsyncStorageFun";

export default function Registration() {
	const regFun = async (values) => {
		try {
			const { status } = await axios.post(
				"/register/",
				{
					name: values.name,
					last_name: values.last_name,
					email: values.email,
					phone: values.phone,
					ticket_id: values.ticket_id,
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

	return (
		<KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.inner}>
					<Formik
						initialValues={{
							name: "",
							last_name: "",
							email: "",
							phone: "",
							ticket_id: "",
						}}
						onSubmit={(values) => {
							regFun(values);
						}}
						validationSchema={yup.object().shape({
							name: yup.string().required("Обязательное поле"),
							last_name: yup.string().required("Обязательное поле"),
							email: yup.string().email("Введите верный email").required("Обязательное поле"),
							phone: yup
								.string()
								.required("Обязательное поле")
								.matches(
									/^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
									"Пожалуйста, введите правильный номер"
								),
							ticket_id: yup.string().required("Обязательное поле"),
						})}
					>
						{({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
							<View style={styles.form}>
								<Text style={globalStyle.text}>Имя</Text>
								<TextInput
									style={[globalStyle.input, touched.name && errors.name && { borderColor: "red" }]}
									placeholder="Введите имя"
									value={values.name}
									onChangeText={handleChange("name")}
									onBlur={() => setFieldTouched("name")}
								/>
								{touched.name && errors.name && <Text style={[globalStyle.text, { color: "red" }]}>{errors.name}</Text>}
								<Text style={globalStyle.text}>Фамилия</Text>
								<TextInput
									style={[globalStyle.input, touched.last_name && errors.last_name && { borderColor: "red" }]}
									placeholder="Введите фамилию"
									value={values.last_name}
									onChangeText={handleChange("last_name")}
									onBlur={() => setFieldTouched("last_name")}
								/>
								{touched.last_name && errors.last_name && <Text style={[globalStyle.text, { color: "red" }]}>{errors.last_name}</Text>}
								<Text style={globalStyle.text}>E-mail</Text>
								<TextInput
									style={[globalStyle.input, touched.email && errors.email && { borderColor: "red" }]}
									placeholder="Введите свою почту"
									value={values.email}
									onChangeText={handleChange("email")}
									onBlur={() => setFieldTouched("email")}
								/>
								{touched.email && errors.email && <Text style={[globalStyle.text, { color: "red" }]}>{errors.email}</Text>}
								<Text style={globalStyle.text}>Номер телефона</Text>
								<TextInput
									style={[globalStyle.input, touched.phone && errors.phone && { borderColor: "red" }]}
									placeholder="Введите номер телефона"
									value={values.phone}
									onChangeText={handleChange("phone")}
									onBlur={() => setFieldTouched("phone")}
								/>
								{touched.phone && errors.phone && <Text style={[globalStyle.text, { color: "red" }]}>{errors.phone}</Text>}
								<Text style={globalStyle.text}>Номер залогового билета</Text>
								<TextInput
									style={[globalStyle.input, touched.ticket_id && errors.ticket_id && { borderColor: "red" }]}
									placeholder="Введите номер залогового билета"
									value={values.ticket_id}
									onChangeText={handleChange("ticket_id")}
									onBlur={() => setFieldTouched("ticket_id")}
								/>
								{touched.ticket_id && errors.ticket_id && <Text style={[globalStyle.text, { color: "red" }]}>{errors.ticket_id}</Text>}
								<Button
									title="Зарегестрироваться"
									buttonStyle={[globalStyle.btnOrange, { backgroundColor: "#29201F", marginBottom: 40 }]}
									disabled={!isValid}
									onPress={(values) => handleSubmit(values)}
								/>
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
	},
	inner: {
		flex: 1,
	},
	form: {
		width: "100%",
		padding: 24,
	},
});
