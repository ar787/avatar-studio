import { auth } from '../services/firebase';
import { onIdTokenChanged, type User } from 'firebase/auth';

let currentUser: User | null = null;
let token: string | null = null;

onIdTokenChanged(auth, async (user) => {
  currentUser = user;

  if (user) {
    token = await user.getIdToken();
  } else {
    token = null;
  }
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
    if (token) return token;

    const user = currentUser ?? (await waitForUser());

    if (!user) return null;

    token = await user.getIdToken();
    return token;
  },
};
