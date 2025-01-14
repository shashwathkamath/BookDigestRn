import { GOOGLE_CLIENT_ID } from "@env";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useEffect } from "react";
import { Button, StyleSheet, View } from "react-native";
import { useRecoilState } from "recoil";
import { UserAtom } from "../atoms/userAtom";
import { signInWithGoogle } from "../SignInWithGoogle";


const SignInScreen: React.FC = () => {
    const [user, setUser] = useRecoilState(UserAtom);
    useEffect(() => {
        GoogleSignin.configure({
            webClientId: GOOGLE_CLIENT_ID,
        });
    }, []);

    const handleSignIn = async () => {
        await signInWithGoogle(setUser);
    };

    return (
        <View style={styles.container}>
            <Button title="Sign in with Google" onPress={handleSignIn} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    welcomeText: {
        marginTop: 20,
        fontSize: 18,
    },
});

export default SignInScreen;