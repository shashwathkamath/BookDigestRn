import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { SetterOrUpdater } from "recoil";
import { User } from "../main/types/User";

export const signInWithGoogle = async (
    setUser: SetterOrUpdater<User | null>
): Promise<void> => {
    try {
        await GoogleSignin.hasPlayServices(); // Ensure Google Play Services are available
        const result = await GoogleSignin.signIn(); // Trigger Google Sign-In
        const user = result.data?.user;

        if (user && user.id && user.email) {
            const userDetails: User = {
                photo: user.photo ?? undefined,
                givenName: user.givenName ?? "",
                familyName: user.familyName ?? "",
                name: user.name ?? "",
                email: user.email,
                id: user.id,
            };

            // (Optional) Send user details to your backend here
            // await axios.post('your-api-endpoint', userDetails);

            // Update the user state
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
                    console.error("An unexpected error occurred during sign-in: ", error.message);
            }
        } else {
            console.error("Unknown error occurred: ", error);
        }

        // Reset user state on error
        setUser(null);
    }
};