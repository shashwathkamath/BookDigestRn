import { atom } from "recoil";
import { User } from "../types/User";

export const UserAtom = atom<User | null>({
    key: 'userState',
    default: null
});