import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import axios from "axios";
import { SetterOrUpdater } from "recoil";
import { User } from "./types/User";
import { storeUserData } from "./utils/StorageUtils";

export const signInWithGoogle = async (
    setUser: SetterOrUpdater<User | null>
): Promise<void> => {
    try {
        await GoogleSignin.hasPlayServices(); // Ensure Google Play Services are available
        const result = await GoogleSignin.signIn(); // Trigger Google Sign-In
        const userInfo = result.data?.user;
        const baseUrl = "https://bd41-2600-1001-a00c-b48b-e1ec-c189-7ffa-9164.ngrok-free.app"
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
            await storeUserData(userDetails);
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
