import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import { Colors, Outlines, Sizing } from "../../styles";
import { FontAwesome5 } from "@expo/vector-icons";

const Input = ({
  id,
  name,
  placeholder,
  handleChange,
  handleBlur,
  handlePress,
  value,
  keyboardType,
  secureTextEntry,
  password,
}) => {
  return (
    <View style={style.input}>
      <TextInput
        style={style.textInput}
        id={id}
        name={name}
        placeholder={placeholder}
        placeholderTextColor={Colors.neutral.white}
        onChangeText={handleChange}
        onBlur={handleBlur}
        value={value}
        keyboardType={keyboardType}
        autoCapitalize="none"
        secureTextEntry={secureTextEntry}
      />
      {password && (
        <FontAwesome5
          onPress={handlePress}
          name={!secureTextEntry ? "eye" : "eye-slash"}
          size={24}
          color={
            !secureTextEntry
              ? Colors.neutral.white
              : Colors.transparent.lightGray
          }
        />
      )}
    </View>
  );
};

export default Input;

const style = StyleSheet.create({
  input: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: Sizing.screenBase.width,
    backgroundColor: Colors.transparent.clear,
    padding: Sizing.x30,
    borderColor: Colors.neutral.white,
    borderWidth: Outlines.borderWidth.thin,
    borderRadius: Outlines.borderRadius.base,
    marginBottom: Sizing.x15,
  },
  textInput: {
    width: "90%",
    color: Colors.neutral.white,
  },
});
