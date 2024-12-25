import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import axios from "axios";
import { SetterOrUpdater } from "recoil";
import { User } from "./types/User";

export const signInWithGoogle = async (
    setUser: SetterOrUpdater<User | null>
): Promise<void> => {
    try {
        await GoogleSignin.hasPlayServices(); // Ensure Google Play Services are available
        const result = await GoogleSignin.signIn(); // Trigger Google Sign-In
        const userInfo = result.data?.user;
        const baseUrl = " https://1f8c-2600-1001-a00c-b48b-25bc-6c87-dc88-57a1.ngrok-free.app"
        if (userInfo && userInfo.id && userInfo.email) {
            const userDetails: User = {
                photo: userInfo.photo ?? undefined,
                givenName: userInfo.givenName ?? "",
                familyName: userInfo.familyName ?? "",
                name: userInfo.name ?? "",
                email: userInfo.email,
                id: userInfo.id,
            };

            const response = await axios.post(
                baseUrl + "/users",
                userDetails
            );

            console.log("User successfully sent to backend:", response.data);
            // try {
            //     await saveUserToStorage(userDetails);
            // }
            // catch (e: any) {
            //     console.log("Exception in storing user details", e);
            // }

            // Update user state
            setUser(userDetails);
        } else {
            throw new Error("Incomplete user data received from Google.");
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            switch ((error as any).code) {
                case statusCodes.SIGN_IN_CANCELLED:
                    console.log("User cancelled the sign-in process.");
                    break;
                case statusCodes.IN_PROGRESS:
                    console.log("Sign-in is already in progress.");
                    break;
                case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                    console.log("Google Play Services are not available.");
                    break;
                default:
                    console.error("Unexpected error during sign-in:", error.message);
            }
        } else {
            console.error("Unknown error during sign-in:", error);
        }

        // Reset user state on error
        setUser(null);
    }
};
