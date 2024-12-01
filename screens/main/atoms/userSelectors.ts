import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { selector } from 'recoil';
import { User } from '../types/User';
import { userAtom } from './userAtom';

export const signInSelector = selector<User | null>({
    key: 'signInSelector',
    get: ({ get }) => get(userAtom),
    set: async ({ set }, _) => {
        try {
            await GoogleSignin.hasPlayServices();
            const result = await GoogleSignin.signIn();
            const user = result.data?.user;
            console.log("User:", user)
            if (user && user.id && user.email) {
                const userDetails: User = {
                    photo: user.photo ?? undefined,
                    givenName: user.givenName ?? '',
                    familyName: user.familyName ?? '',
                    name: user.name ?? '',
                    email: user.email,
                    id: user.id,
                };

                // Send user details to DB
                //await axios.post('your-api-endpoint', userDetails);

                // Update the userAtom
                set(userAtom, userDetails);
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
            // In case of any error, set userAtom to null
            set(userAtom, null);
        }
    },
});
