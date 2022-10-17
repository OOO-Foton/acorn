import React from "react";
import { StyleSheet, Text, ScrollView, View, Platform } from "react-native";
import { globalStyle } from "../settings/style";

function Instruction() {
	const text1 = [
		"Операцию по оплате процентов по залоговому билету можно провести 1 раз в сутки,",
		"Оплата процентов доступна только в период действия договора займа,",
		"Договор будет пролонгирован на условиях, аналогичных основному договору (то есть сохранится срок, % ставка и оценка изделия,",
		"Продление срока пользования займом осуществляется в случаях действия тех же условий договора займа (в т.ч. процентной ставки) как на момент заключения первоначального договора (залогового билета). В случаях утверждения новых условий (в т.ч. процентной ставки) продление срока пользования займом невозможно,",
		"Для полного закрытия (погашения) кредита и выкупа изделия, необходимо совершить визит в отделение,",
		"Ломбард не устанавливает дополнительные комиссии при оплате процентов клиентом,",
		"Оплата процентов по займу через личный кабинет является бесплатным способом исполнения обязательств,",
		"При оплате картой могут возникнуть дополнительные комиссии и применены тарифы перевода средств в соответствии с условиями Банка эмитента (Банка выпустившего карту),",
		"Услуга доступна всем клиентам нашей сети ломбардов.",
	];
	const text2 = [
		"Минимальный остаток суммы займа на одном изделии 50 рублей;",
		"Частичное внесение суммы займа возможно лишь в случае оплаты клиентом начисленных на дату проведения операции процентов;",
		"Сумма для частичного внесения суммы займа должна быть кратной 50 руб. (т. е. 50, 100, 150, 200, 250 и т.д.).",
	];
	const text3 = [
		"Операцию «Добор» по одному залоговому билету возможно провести один раз в день (ежедневно с 8-00 до 22-00 по местному времени);",
		"Денежные средства по операции «Добор» можно получить только на именную, дебетовою карту клиента;",
		"Функционал ЛИЧНОГО КАБИНЕТА «Добор» доступен клиентам, в случаях, если по договору выданная сумма займа меньше суммы кредитного лимита;",
		"Минимальная сумма добора составляет 2000 (Две тысячи) рублей, максимальная сумма добора отражена по каждому залоговому билету в ЛИЧНОМ КАБИНЕТЕ клиента;",
		"Сумма подлежащая зачислению на карту клиента определяется с учетом вычета начисленных процентов по залоговому билету на дату оформления операции «Добор».",
	];
	const text4 = [
		"Ни при каких обстоятельствах не сообщайте никому свой логин и/или пароль от ЛИЧНОГО КАБИНЕТА",
		"Запомните свой логин и пароль, а если это трудно — измените их на более удобные. Избегайте очевидных, легко предполагаемых цифровых комбинаций, таких как окончание вашего номера телефона, дата вашего рождения и т.п.;",
		"Вводите логин и пароль, когда их не могут подсматривать другие лица.",
	];
	return (
		<ScrollView style={[globalStyle.container, { paddingTop: 0 }]}>
			<View style={{ marginBottom: 30 }}></View>
			<Text style={[styles.textBold, { marginBottom: 20, marginTop: 0 }]}>Правила работы в "Личном кабинете":</Text>
			<Text style={styles.textBold}>1{")"} Что необходимо знать при оплате процентов через личный кабинет:</Text>
			{text1.map((el) => {
				return (
					<View style={styles.row} key={Math.random().toString(36).substr(2, 20)}>
						<View style={styles.bullet}>
							<Text style={globalStyle.text}>{"\u2022"}</Text>
						</View>
						<View style={styles.bulletText}>
							<Text style={globalStyle.text}>{el}</Text>
						</View>
					</View>
				);
			})}
			<Text style={styles.textBold}>
				2{")"} Что необходимо знать при проведении операции «Частичное внесение суммы займа + оплата процентов» через личный кабинет:
			</Text>
			{text2.map((el) => {
				return (
					<View style={styles.row} key={Math.random().toString(36).substr(2, 20)}>
						<View style={styles.bullet}>
							<Text style={globalStyle.text}>{"\u2022"}</Text>
						</View>
						<View style={styles.bulletText}>
							<Text style={globalStyle.text}>{el}</Text>
						</View>
					</View>
				);
			})}
			<Text style={styles.textBold}>3{")"} Что необходимо знать при проведении операции «Добор», через личный кабинет:</Text>
			{text3.map((el) => {
				return (
					<View style={styles.row} key={Math.random().toString(36).substr(2, 20)}>
						<View style={styles.bullet}>
							<Text style={globalStyle.text}>{"\u2022"}</Text>
						</View>
						<View style={styles.bulletText}>
							<Text style={globalStyle.text}>{el}</Text>
						</View>
					</View>
				);
			})}
			<Text style={styles.textBold}>Рекомендации по обеспечению безопасности</Text>
			<Text style={styles.textBold}>Логин (имя пользователя) и пароль</Text>
			{text4.map((el) => {
				return (
					<View style={styles.row} key={Math.random().toString(36).substr(2, 20)}>
						<View style={styles.bullet}>
							<Text style={globalStyle.text}>{"\u2022"}</Text>
						</View>
						<View style={styles.bulletText}>
							<Text style={globalStyle.text}>{el}</Text>
						</View>
					</View>
				);
			})}
			<View style={{ marginBottom: 30 }}></View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	text: {
		fontSize: 17,
		fontFamily: "Roboto_400Regular",
	},
	textBold: {
		fontSize: Platform.isPad ? 23 : 17,
		fontFamily: "Roboto_700Bold",
		fontWeight: "bold",
		marginTop: 10,
		marginBottom: 10,
	},
	row: {
		flexDirection: "row",
	},
	bullet: {
		width: 10,
	},
	bulletText: {
		flex: 1,
	},
});

export default Instruction;
