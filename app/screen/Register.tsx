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
import { registerUser } from "../nestjs/api";
import { RegisterStyle } from "../styles/Register.style";


export default function Register() {
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
        <View style={RegisterStyle.container}>
        <Image
            source={require("../../assets/images/common/logo.png")}
            style={RegisterStyle.logo}
            resizeMode="contain"
        />

        <Text style={RegisterStyle.title}>Create an account</Text>
        <Text style={RegisterStyle.subtitle}>
            Enter your email to sign up for this app
        </Text>

        <TextInput
            style={RegisterStyle.input}
            placeholder="email@domain.com"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
        />

        <TextInput
            style={RegisterStyle.input}
            placeholder="your name"
            placeholderTextColor="#999"
            keyboardType="default"
            autoCapitalize="none"
            value={name}
            onChangeText={setName}
        />

        <TextInput
            style={RegisterStyle.input}
            placeholder="your password"
            placeholderTextColor="#999"
            keyboardType="default"
            autoCapitalize="none"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
        />

        <TouchableOpacity style={RegisterStyle.continueButton} onPress={handleRegister}>
            <Text style={RegisterStyle.continueButtonText}>Register</Text>
        </TouchableOpacity>


        {/* <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
                    <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
                */}

        <View style={RegisterStyle.orContainer}>
            <View style={RegisterStyle.orLine} />
            <Text style={RegisterStyle.orText}>or</Text>
            <View style={RegisterStyle.orLine} />
        </View>

        <TouchableOpacity style={RegisterStyle.socialButton}>
            <GoogleIcon style={RegisterStyle.socialIcon} width={24} height={24} />
            <Text style={RegisterStyle.socialButtonText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={RegisterStyle.socialButton}>
            <AppleIcon style={RegisterStyle.socialIcon} width={24} height={24} />
            <Text style={RegisterStyle.socialButtonText}>Continue with Apple</Text>
        </TouchableOpacity>

        <Text style={RegisterStyle.terms}>
            By clicking continue, you agree to our{" "}
            <Text style={RegisterStyle.termsLink}>Terms of Service</Text> and{" "}
            <Text style={RegisterStyle.termsLink}>Privacy Policy</Text>
        </Text>
        </View>
    );
}
