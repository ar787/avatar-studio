import type { FirestoreDataConverter } from 'firebase/firestore';
import type { AvatarType } from '@/types/avatar';

export const avatarConverter: FirestoreDataConverter<AvatarType> = {
  toFirestore(avatar: AvatarType) {
    return avatar;
  },
  fromFirestore(snapshot, options) {
    return snapshot.data(options) as AvatarType;
  },
};
