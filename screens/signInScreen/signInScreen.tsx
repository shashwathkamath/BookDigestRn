import { GOOGLE_CLIENT_ID } from '@env';
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userAtom } from '../main/atoms/userAtom';
import { signInSelector } from '../main/atoms/userSelectors';

const SignInScreen: React.FC = () => {
    const user = useRecoilValue(userAtom);
    const setSignInState = useSetRecoilState(signInSelector);

    React.useEffect(() => {
        GoogleSignin.configure({
            webClientId: GOOGLE_CLIENT_ID
        });
    }, []);

    const signIn = async (): Promise<void> => {
        setSignInState(null);
    };

    return (
        <View style={styles.container}>
            <Button title="Sign in with Google" onPress={signIn} />
            {user && <Text>Welcome, {user.name}!</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'white'
    },
});

export default SignInScreen;