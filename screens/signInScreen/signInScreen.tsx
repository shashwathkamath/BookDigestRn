import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import React from "react";
import { Button, StyleSheet, View } from "react-native";

const SignInScreen: React.FC = () => {
    React.useEffect(() => {
        GoogleSignin.configure({
            webClientId: 'YOUR_FIREBASE_WEB_CLIENT_ID', // Replace with your Firebase Web Client ID
            offlineAccess: true,
            scopes: ['profile', 'email'],
        });
    }, []);

    const signIn = async (): Promise<void> => {
        try {
            // Ensure Google Play Services are available
            await GoogleSignin.hasPlayServices();

            // Initiate the sign-in process
            const result = await GoogleSignin.signIn();

            // Extract the ID token
            console.log("result", result)
            // if (!idToken) {
            //     throw new Error("ID token is not available.");
            // }

            // // Create a Firebase credential with the Google ID token
            // const googleCredential = GoogleAuthProvider.credential(idToken);

            // // Sign in to Firebase with the credential
            // const userCredential = await signInWithCredential(auth, googleCredential);
            // console.log("User Info: ", userCredential.user);

            // Optional: Show user information
            //Alert.alert("Welcome", `Signed in as ${userCredential.user.displayName}`);
        } catch (error: unknown) {
            if (error instanceof Error) {
                if ((error as any).code === statusCodes.SIGN_IN_CANCELLED) {
                    console.log("User cancelled the sign-in process.");
                } else if ((error as any).code === statusCodes.IN_PROGRESS) {
                    console.log("Sign-in is already in progress.");
                } else if ((error as any).code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                    console.log("Google Play Services not available.");
                } else {
                    console.error("An unexpected error occurred during sign-in: ", error);
                }
            }
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Sign in with Google" onPress={signIn} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default SignInScreen;