import { useState, useEffect } from "react";
import Navbar from "./components/Navbar"
import Card from "./components/Card"
import { initializeApp } from "firebase/app";
import { 
  getFirestore, collection, onSnapshot
} from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyApjwpwpCwORh66wapgNgigm1iKdEjZub8",
  authDomain: "art-gallery-ab57c.firebaseapp.com",
  projectId: "art-gallery-ab57c",
  storageBucket: "art-gallery-ab57c.appspot.com",
  messagingSenderId: "569425492328",
  appId: "1:569425492328:web:dd223dcd55fe4d681ffedd",
  measurementId: "G-S5LYSLD7F9"
};

initializeApp(firebaseConfig);


const db = getFirestore();
const colRef = collection(db, 'arts');

export default function App() {
  const [arts, setArts] = useState([])

  useEffect(() => {
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const newArts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setArts((prev) => [...prev, ...newArts]);
    });

    // Return a cleanup function to unsubscribe when the component unmounts
    return () => unsubscribe();
  }, []);

  const cards = arts.map(item => {
    return (
        <Card
            key={item.id}
            item={item}
        />
    )
  })  
  
  return (
    <div>
      <Navbar />
      <section className="cards-list">
        {cards}
      </section>
    </div>
  )
}