import React from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet, Image } from "react-native";
import GoogleIcon from '../../assets/images/common/google.svg';
import AppleIcon from '../../assets/images/common/apple.svg';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
// import * as auth from '@react-native-firebase/auth';
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../nestjs/api';
import { useUser } from './UserContext';

// WebBrowser.maybeCompleteAuthSession();

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

export default function Login() {


    const navigation = useNavigation<LoginScreenNavigationProp>();
    const [loading, setLoading] = React.useState(false);

    // const [request, response, promptAsync] = Google.useAuthRequest({
    //     iosClientId: 'YOUR_IOS_CLIENT_ID',
    //     androidClientId: '818671960773-login.apps.googleusercontent.com',
    //     webClientId: '818671960773-aqvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv.apps.googleusercontent.com',
    // });

    // React.useEffect(() => {
    //     if (response?.type === 'success') {
    //         setLoading(true);
    //         const { id_token } = response.params;
    //         const credential = GoogleAuthProvider.credential(id_token);
    //         signInWithCredential(FIREBASE_AUTH, credential)
    //             .then((result) => {
    //                 console.log('User signed in successfully!');
    //                 navigation.navigate('Home');
    //             })
    //             .catch((error) => {
    //                 console.error('Error signing in with Google:', error);
    //             })
    //             .finally(() => {
    //                 setLoading(false);
    //             });
    //     }
    // }, [response]);

    // const handleGoogleSignIn = async () => {
    //     try {
    //         const userInfo = await GoogleSignin.signIn()

    //         const googleCredential = auth.GoogleAuthProvider.credential(userInfo.data!!.idToken);
            
    //         let testPromise;
    //         try {
    //             testPromise = await auth().signInWithCredential(googleCredential);
    //         } catch (error) {
    //             console.error(error);
    //         }


    //     } catch (error) {
    //         console.error('Error during Google sign in:', error);
    //     }
    // }

    // const handleContinue = () => {
    //     navigation.navigate('Home');
    // };

    const userAccount = {
        useruuid: '1ACJD-ANCND-ABDJ',
        username: 'julylun',
        useremail: 'julylun.cat@gmail.com',
        refreshToken: 'sfdnkk',
        accessToken: 'fkodsjfo'
    }
    const handleGoolgeSignInFake = async () => {
        // await AsyncStorage.setItem('userAccount', userAccount);
        await AsyncStorage.setItem('refreshToken',userAccount.accessToken)
        await AsyncStorage.setItem('refreshToken',userAccount.refreshToken)
        await AsyncStorage.setItem('refreshToken',userAccount.useruuid)
        await AsyncStorage.setItem('refreshToken',userAccount.username)
        navigation.navigate('Dashboard');
    }

    //TODO: check refresh token before login


    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const { setEmail: setContextEmail , setIdUser , setAvatar, setName, setFollowing, setFollowers, setPosts} = useUser();
    // const {setIdUser} = useUser();

    const handleLogin = async () => {
        setLoading(true);
        try {
            const res = await loginUser({ email, password });
            // const res1= await loginUserID()
            console.log('Login success:', res.data);
            console.log('User ID from API:', res.data.user?.idUser);

            // Nếu cần lưu token hoặc user info:
            // await AsyncStorage.setItem('token', res.data.token);
    
            // const { setEmail } = useUser();
            // setEmail(email); // set context
            setContextEmail(email);
            setIdUser(res.data.user.idUser); // <== Lưu idUser vào context
            setAvatar(res.data.user.avatar);
            setName(res.data.user.name);
            setFollowing(res.data.user.following);
            setFollowers(res.data.user.followers);
            setPosts(res.data.user.posts);

            navigation.navigate('Dashboard');

            // navigation.navigate('Dashboard', { email });
             // Hoặc điều hướng đến màn hình chính
        } catch (err: any) {
            console.error('Login failed:', err?.response?.data || err.message);
            alert('Invalid email or password!');
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <View style={styles.container}>
            <Image 
                source={require('../../assets/images/common/logo.png')}
                style={styles.logo}
                resizeMode="contain"
            />
            
            <Text style={styles.title}>Login your pretty account</Text>
            <Text style={styles.subtitle}>Enter your email to sign up for this app</Text>
            
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
                placeholder="your password"
                placeholderTextColor="#999"
                keyboardType="default"
                autoCapitalize="none"
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            
            <TouchableOpacity 
                style={styles.continueButton} 
                // onPress={handleContinue}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={styles.continueButtonText}>
                    {loading ? 'Loading...' : 'Log In'}
                </Text>
            </TouchableOpacity>

            <View style= {{flexDirection: "row", justifyContent: "center", alignContent:"center", alignItems: "center"}}>
                <Text style= {{ fontSize: 15,color: '#666', textAlign: 'center'}}>You don't have an account yet ?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                    <Text style= {{ fontSize: 15,color: '#666', textAlign: 'center', fontWeight: "700",marginLeft: 5, width: 65, borderBottomWidth: 1, borderColor: "#ccc"}}>Register</Text>
                </TouchableOpacity>
            </View>
            {/* <View style={styles.orContainer}>
                <View style={styles.orLine} />
                <Text style={styles.orText}>or</Text>
                <View style={styles.orLine} />
            </View>
            
            <TouchableOpacity 
                style={styles.socialButton}
                onPress={handleGoolgeSignInFake}
                disabled={loading}
            >
                <GoogleIcon style={styles.socialIcon} width={24} height={24} />
                <Text style={styles.socialButtonText}>
                    {loading ? 'Loading...' : 'Continue with Google'}
                </Text>
            </TouchableOpacity> */}
            
            {/* <Text style={styles.terms}>
                By clicking continue, you agree to our{' '}
                <Text style={styles.termsLink}>Terms of Service</Text>
                {' '}and{' '}
                <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 24,
        paddingTop: 60,
        alignItems: 'center',
    },
    logo: {
        width: 300,
        height: 100,
        marginTop: 40,
        marginBottom: 80,
    },
    title: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 24,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 16,
        fontSize: 16,
        marginBottom: 16,
    },
    continueButton: {
        width: '100%',
        height: 55,
        backgroundColor: '#000',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    continueButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        width: '100%',
    },
    orLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#ddd',
    },
    orText: {
        marginHorizontal: 16,
        color: '#666',
    },
    socialButton: {
        width: '100%',
        height: 50,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    socialIcon: {
        marginRight: 12,
    },
    socialButtonText: {
        fontSize: 16,
        fontWeight: '500',
    },
    terms: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 200,
    },
    termsLink: {
        color: '#000',
        textDecorationLine: 'underline',
    },
}); 