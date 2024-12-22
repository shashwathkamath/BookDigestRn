import { User } from "@react-native-google-signin/google-signin";
import { selector } from "recoil";
import { UserAtom } from "./userAtom";

export const signInSelector = selector<User | null>({
    key: "signInSelector",
    get: ({ get }) => {
        const user = get(UserAtom);
        return user as User | null; // Explicitly cast to match Recoil expectations
    },
});
