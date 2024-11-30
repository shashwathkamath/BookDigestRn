import { GOOGLE_CLIENT_ID } from '@env';
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { User } from "../main/types/User";

const SignInScreen: React.FC = () => {
    React.useEffect(() => {
        GoogleSignin.configure({
            webClientId: GOOGLE_CLIENT_ID
        });
    }, []);

    const signIn = async (): Promise<void> => {
        try {
            // Ensure Google Play Services are available
            await GoogleSignin.hasPlayServices();

            // Initiate the sign-in process
            const result = await GoogleSignin.signIn();
            console.log("result user", result.data?.user);
            const user = result.data?.user;
            //sending the user to db
            if (user && user.id && user.email) {
                const userDetails: User = {
                    photo: user.photo ?? undefined,
                    givenName: user.givenName ?? '',
                    familyName: user.familyName ?? '',
                    name: user.name ?? '',
                    email: user.email,
                    id: user.id,
                };
                await sendUserDetailsToDb(userDetails);
            }

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

    const sendUserDetailsToDb = async (user: User) => {

    }

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