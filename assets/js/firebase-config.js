export const firebaseConfig = {
  apiKey: "AIzaSyBszE0b-H1o4hLv9Rw9JAVQYH5P8W-OiL8",
  authDomain: "payday-ceaf0.firebaseapp.com",
  projectId: "payday-ceaf0",
  storageBucket: "payday-ceaf0.firebasestorage.app",
  messagingSenderId: "192873431050",
};

export function hasFirebaseConfig() {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId &&
      firebaseConfig.messagingSenderId
  );
}
