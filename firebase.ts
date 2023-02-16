import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { request } from "http";
import { config } from "./firebaseConfig";

export async function initialize() {
    const firebaseApp = initializeApp(config.firebase);
    const auth = getAuth(firebaseApp);
    const fireStore = getFirestore(firebaseApp);

    console.log(window.location);

    // if (window.location.hostname === "localhost") {
    //     connectAuthEmulator(auth, "http://localhost:9099");
    //     connectFirestoreEmulator(fireStore, "localhost", 8080);
    // }
    // let fireBaseObj = {};
    const newPromise = Promise.resolve({ firebaseApp, auth, fireStore }).then(
        value => console.log(value)
    );

    // return fireBaseObj;
    // return { firebaseApp, auth, fireStore };
}
