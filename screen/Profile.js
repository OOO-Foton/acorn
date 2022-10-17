import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-elements";
import { removeItemValue } from "../settings/AsyncStorageFun";
import { AntDesign } from "@expo/vector-icons";
import { globalStyle } from "../settings/style";
import AsyncStorage from "@react-native-async-storage/async-storage";

function Profile({ navigation }) {
  const [fio, setFio] = useState("");
  const goNavigate = ({ name }) => {
    navigation.navigate(name);
  };

  useEffect(() => {
    (async () => {
      const fioArr = await AsyncStorage.getItem("name");
      setFio(fioArr.split(`"`)[1]);
    })();
  }, []);

  return (
    <View style={[globalStyle.container, { paddingTop: 0 }]}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <AntDesign name="user" size={17} color={"black"} />
        <Text style={styles.fio}>{fio}</Text>
      </View>
      <Button
        buttonStyle={[globalStyle.btnOrange, { marginBottom: 13 }]}
        title="Смена пароля"
        onPress={() => goNavigate({ name: "PasswordChange" })}
      />

      <Button
        title="Выйти"
        buttonStyle={[globalStyle.btnOrange, { backgroundColor: "#221918", marginTop: 13 }]}
        onPress={() => {
          removeItemValue("token");
          removeItemValue("exp");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fio: {
    fontSize: 16,
    fontFamily: "Roboto_400Regular",
    margin: 20,
  },
});

export default Profile;
