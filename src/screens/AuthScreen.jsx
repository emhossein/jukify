import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import { StackActions } from "@react-navigation/native";

import { Colors, Outlines, Sizing, Utils, FontStyles } from "../styles";
import Input from "../components/Auth/Input";
import Typography from "../components/Typography";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { BASE_URL } from "@env";

const validateEmail = (email) => {
  const emailRegex = /\S+@\S+\.\S+/;
  if (!email) {
    return "Email is required";
  } else if (!emailRegex.test(email)) {
    return "Invalid email address";
  }
};

const validatePassword = (password) => {
  if (!password) {
    return "Password is required";
  } else if (password.length < 8) {
    return "Password must be at least 8 characters";
  }
};

const validateName = (name) => {
  if (!name) {
    return "Name is required";
  }
};

const AuthScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(true);
  const [signIn, setSignIn] = useState(true);

  const handlePress = () => {
    setShowPassword(!showPassword);
  };

  const handleSignInForm = () => {
    setSignIn(!signIn);
  };

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      // saving error
    }
  };

  const handleSubmitSignIn = async (name, email, password) => {
    try {
      if (signIn) {
        const response = await axios.post(
          `${BASE_URL}/signin`,
          {
            email,
            password,
          },
          { headers: { "Content-Type": "application/json" } }
        );
        storeData("@token", response.data.token);
        navigation.dispatch(StackActions.replace("Tabs"));
      } else {
        const response = await axios.post(
          `${BASE_URL}/signup`,
          {
            name,
            email,
            password,
          },
          { headers: { "Content-Type": "application/json" } }
        );
        storeData("@token", response.data.token);
        navigation.dispatch(StackActions.replace("Tabs"));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <Image
        source={require("../../assets/Spotify-logo-dark.png")}
        style={style.logo}
      />
      <View style={style.center}>
        <Typography style={style.heading}>
          {signIn ? "Sign In" : "Register"}
        </Typography>
        <Formik
          initialValues={{
            email: "",
            password: "",
            name: "",
          }}
          validateOnChange={false}
          validateOnBlur={true}
          validate={(values) => ({
            email: validateEmail(values.email),
            password: validatePassword(values.password),
            name: validateName(values.name),
          })}
        >
          {({ handleChange, handleBlur, values, errors }) => (
            <>
              {!signIn && (
                <Input
                  id="name-input"
                  placeholder="Name"
                  handleChange={handleChange("name")}
                  handleBlur={handleBlur("name")}
                  value={values.name}
                  keyboardType="name-address"
                />
              )}
              <Input
                id="e-mail-input"
                placeholder="E-mail"
                handleChange={handleChange("email")}
                handleBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
              <Input
                id="password-input"
                placeholder="Password"
                handleChange={handleChange("password")}
                handleBlur={handleBlur("password")}
                value={values.password}
                keyboardType="default"
                secureTextEntry={showPassword}
                password
                handlePress={handlePress}
              />
              {errors.name && !signIn && (
                <Typography style={style.error}>• {errors.name}</Typography>
              )}
              {errors.email && (
                <Typography style={style.error}>• {errors.email}</Typography>
              )}
              {errors.password && (
                <Typography style={style.error}>• {errors.password}</Typography>
              )}
              <TouchableOpacity
                onPress={() =>
                  handleSubmitSignIn(values.name, values.email, values.password)
                }
                style={style.button}
              >
                <Typography bold styles="text-white text-xl">
                  {signIn ? "Sign In" : "Create Account"}
                </Typography>
              </TouchableOpacity>
            </>
          )}
        </Formik>

        <View style={style.lineBreakContainer}>
          <View style={style.lines} />
          <View>
            <Text style={style.lineBreakText}>Or</Text>
          </View>
          <View style={style.lines} />
        </View>
        <TouchableOpacity
          onPress={handleSignInForm}
          style={style.textContainer}
        >
          <Typography style={style.text}>
            {signIn ? "Not a member?" : "Do you have an account?"}
          </Typography>
          <Typography style={style.registerText}>
            {signIn ? "Register Now" : "Sign In"}
          </Typography>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;

const style = StyleSheet.create({
  center: { ...Utils.center, flex: 1 },
  container: {
    flex: 1,
    backgroundColor: Colors.background.main,
    alignItems: "center",
  },
  logo: {
    ...Sizing.logoSize,
  },
  lineBreakContainer: {
    ...Utils.flexRow,
    width: Sizing.screenBase.width,
  },
  lines: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.neutral.white,
  },
  lineBreakText: {
    width: Sizing.x60,
    textAlign: "center",
    color: Colors.neutral.white,
  },
  button: {
    ...Utils.center,
    width: Sizing.screenBase.width,
    padding: Sizing.x30,
    backgroundColor: Colors.primary.brand,
    borderRadius: Outlines.borderRadius.base,
    marginBottom: Sizing.x30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 0.04,
    shadowRadius: 50,

    elevation: 5,
  },
  textContainer: {
    ...Utils.flexRow,
    marginTop: Sizing.x40,
  },
  text: {
    color: Colors.neutral.white,
  },
  registerText: {
    color: Colors.primary.blue,
    marginLeft: Sizing.x5,
  },

  heading: {
    ...FontStyles.header.x60,
    color: Colors.neutral.white,
    marginBottom: Sizing.x60,
  },
  error: {
    color: Colors.danger.s400,
    width: Sizing.screenBase.width,
    marginBottom: Sizing.x10,
    marginLeft: Sizing.x10,
  },
});
