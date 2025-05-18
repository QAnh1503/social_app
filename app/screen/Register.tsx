import React, { useState } from "react";
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
} from "react-native";
import GoogleIcon from "../../assets/images/common/google.svg";
import AppleIcon from "../../assets/images/common/apple.svg";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation, NavigationProp } from "@react-navigation/native";
// import { RootStackParamList } from "../../App";
import { registerUser } from "../nestjs/api";

// type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function Register() {
    // const navigation = useNavigation<LoginScreenNavigationProp>();

    // const handleContinue = () => {
    //     navigation.navigate('Example');
    // };

    const navigation: NavigationProp<RootStackParamList> = useNavigation();
    

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async () => {
        try {
        const res = await registerUser({
            email,
            password,
            name,
        });
        console.log(email);
        console.log(name);
        console.log(password);
        console.log("Register success:", res.data);
        navigation.navigate('Login');
        } catch (err: any) {
            console.error('Register failed:', err?.response?.data || err.message);
        }
    };

    return (
        <View style={styles.container}>
        <Image
            source={require("../../assets/images/common/logo.png")}
            style={styles.logo}
            resizeMode="contain"
        />

        <Text style={styles.title}>Create an account</Text>
        <Text style={styles.subtitle}>
            Enter your email to sign up for this app
        </Text>

        <TextInput
            style={styles.input}
            placeholder="email@domain.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
        />

        <TextInput
            style={styles.input}
            placeholder="your name"
            placeholderTextColor="#999"
            keyboardType="default"
            autoCapitalize="none"
            value={name}
            onChangeText={setName}
        />

        <TextInput
            style={styles.input}
            placeholder="your password"
            placeholderTextColor="#999"
            keyboardType="default"
            autoCapitalize="none"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.continueButton} onPress={handleRegister}>
            <Text style={styles.continueButtonText}>Register</Text>
        </TouchableOpacity>


        {/* <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
                */}

        <View style={styles.orContainer}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.orLine} />
        </View>

        <TouchableOpacity style={styles.socialButton}>
            <GoogleIcon style={styles.socialIcon} width={24} height={24} />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.socialButton}>
            <AppleIcon style={styles.socialIcon} width={24} height={24} />
            <Text style={styles.socialButtonText}>Continue with Apple</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
            By clicking continue, you agree to our{" "}
            <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
            <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
    paddingTop: 60,
    alignItems: "center",
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  continueButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#000",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
    width: "100%",
  },
  orLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#ddd",
  },
  orText: {
    marginHorizontal: 16,
    color: "#666",
  },
  socialButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  terms: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 24,
  },
  termsLink: {
    color: "#000",
    textDecorationLine: "underline",
  },
});
