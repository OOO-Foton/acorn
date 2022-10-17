import React from "react";
import { TextInput, View, Text, Alert } from "react-native";
import { Button } from "react-native-elements";
import { globalStyle } from "../settings/style";
import axios from "../settings/axios";
import { Formik } from "formik";
import * as yup from "yup";
import { getData } from "../settings/AsyncStorageFun";

function Mail() {
	const mail = async (values, resetForm) => {
		try {
			const { status } = await axios.post(
				"message/post/",
				{
					text: values.message,
				},
				{
					headers: {
						Authorization: "Bearer " + (await getData("token")),
					},
				}
			);
			if (status == 200) {
				Alert.alert("Сообщение желудю отправленно");
				resetForm();
			}
		} catch (e) {
			Alert.alert("Ошибка, повторите попытку позже");
			console.log(e.response);
		}
	};

	return (
		<Formik
			initialValues={{
				message: "",
			}}
			onSubmit={(values, { resetForm }) => {
				mail(values, resetForm);
			}}
			validationSchema={yup.object().shape({
				message: yup.string().required("Обязательно"),
			})}
		>
			{({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
				<View style={globalStyle.container}>
					<TextInput
						multiline
						placeholder="Введите сообщение"
						textAlignVertical="top"
						style={[globalStyle.input, { height: 200, padding: 18 }, touched.message && errors.message && { borderColor: "red" }]}
						value={values.message}
						onChangeText={handleChange("message")}
						onBlur={() => setFieldTouched("message")}
					/>
					{touched.message && errors.message && <Text style={[globalStyle.text, { color: "red" }]}>{errors.message}</Text>}
					<Button
						buttonStyle={[globalStyle.btnOrange, { marginTop: 30 }]}
						title="Отправить"
						disabled={!isValid}
						onPress={(values) => handleSubmit(values)}
					/>
				</View>
			)}
		</Formik>
	);
}

export default Mail;
