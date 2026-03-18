import { auth } from '../services/firebase';
import { onIdTokenChanged, type User } from 'firebase/auth';

let currentUser: User | null = null;

onIdTokenChanged(auth, (user) => {
  currentUser = user;
});

const waitForUser = (): Promise<User | null> => {
  return new Promise((resolve) => {
    const unsubscribe = auth.onIdTokenChanged((user) => {
      unsubscribe();
      resolve(user);
    });
  });
};

export const tokenManager = {
  async getToken(): Promise<string | null> {
    const user = currentUser ?? (await waitForUser());

    if (!user) return null;

    return await user.getIdToken();
  },
};
