import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { config } from "./firebaseConfig";

export function initialize() {
    const firebaseApp = initializeApp(config.firebase);
    const auth = getAuth(firebaseApp);
    const fireStore = getFirestore(firebaseApp);

    // console.log(process.env.NODE_ENV);

    // if (process.env.NODE_ENV === "development") {
    //     connectAuthEmulator(auth, "http://localhost:9099", {
    //         disableWarnings: true,
    //     });
    //     connectFirestoreEmulator(fireStore, "localhost", 8080);
    // }
    return { firebaseApp, auth, fireStore };
}
