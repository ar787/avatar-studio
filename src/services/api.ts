import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "./firebase";
import { avatarConverter } from "./avatarConverter";
import { getBlob, ref } from "firebase/storage";

export const getAvatars = async () => {
  const avatarsCollection = collection(db, "avatars").withConverter(
    avatarConverter
  );
  const avatarList = (await getDocs(avatarsCollection)).docs.map((doc) =>
    doc.data()
  );
  console.log(avatarList);
  return avatarList;
};

export const getAvatarDownloadBlob = async (path: string) => {
  const BASE_PATH = "avatars/";
  const avatarRef = ref(storage, BASE_PATH + path + ".jpeg");

  return await getBlob(avatarRef);
};
