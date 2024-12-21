import { selector } from 'recoil';
import { User } from '../types/User';
import { UserAtom } from './UserAtom';

export const signInSelector = selector<User | null>({
    key: 'signInSelector',
    get: ({ get }) => get(UserAtom),
});
