export const firebaseConfig = {
  apiKey: "AIzaSyADP18wvBcmSBds7XqcMRyyUsN8Sy00xAk",
  authDomain: "payday-ceaf0.firebaseapp.com",
  projectId: "payday-ceaf0",
  storageBucket: "payday-ceaf0.firebasestorage.app",
  messagingSenderId: "192873431050",
  appId: "1:192873431050:web:0fc8a88fb8552db45edff3",
  measurementId: "G-PH7ZQBQX97",
};

export function hasFirebaseConfig() {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId &&
      firebaseConfig.messagingSenderId &&
      firebaseConfig.appId
  );
}
