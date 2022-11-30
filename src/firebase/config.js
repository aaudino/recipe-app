import firebase from "firebase";
// import von firestore
import "firebase/firestore";
// config wird benötigt um Verbindung mit Backend herzustellen
const firebaseConfig = {
  apiKey: "AIzaSyAc4O8FmMdQm07KTVwKzprTrQaWc59s20M",
  authDomain: "cooking-com-site.firebaseapp.com",
  projectId: "cooking-com-site",
  storageBucket: "cooking-com-site.appspot.com",
  messagingSenderId: "602988481947",
  appId: "1:602988481947:web:b3d2ad21acae3bd466e53e",
};

// init firebase
// verbindet mich mit dem firestore backend
firebase.initializeApp(firebaseConfig);

//init firestore services
//Object wird returned
const projectFirestore = firebase.firestore();

export { projectFirestore };
