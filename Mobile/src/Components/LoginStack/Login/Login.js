import React, { useState } from "react";
import Axios from "axios";
import { Dimensions, Alert } from "react-native";
import {
  Container,
  LogoImage,
  Upper,
  Input,
  Button,
  ButtonText,
  Lower,
  ForgotText,
  ForgotLink
} from "./Styled";
import { IP } from "../../../DevSettings";

const { width, height } = Dimensions.get("window");

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [userPass, setUserPass] = useState("");

  const login = () => {
    console.log(username, userPass);
    Axios.post(`http://${IP}/login`, { username, userPass })
      .then(res => {
        console.log(res.data);
        if (res.data.auth) {
          navigation.navigate("mainAppStack", {
            token: res.data.token
          });
        } else {
          Alert.alert(
            "Login Failed.",
            "Please check your login credentials!",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }],
            { cancelable: false }
          );
        }
      })
      .catch(err => {
        Alert.alert(
          "Network error",
          "Please check your network connection!",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      });
    // navigation.navigate("mainAppStack");
  };

  return (
    <Container width={width} height={height} behavior="padding">
      <LogoImage
        source={require("../../../../assets/guardPi_logo.png")}
        resizeMode="contain"
      />
      <Upper width={width} height={height}>
        <Input
          placeholder="Username"
          onChangeText={text => setUsername(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={text => setUserPass(text)}
        />
        <Button
          activeOpacity={0.75}
          onPress={() => {
            login();
            // navigation.navigate("mainAppStack")
          }}
        >
          <ButtonText>Login</ButtonText>
        </Button>
        <Lower>
          <ForgotText>Forgot your password?</ForgotText>
          <ForgotLink onPress={() => navigation.navigate("forgotScreen")}>
            Click here
          </ForgotLink>
        </Lower>
      </Upper>
    </Container>
  );
};

export default Login;
