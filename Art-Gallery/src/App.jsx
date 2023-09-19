import { useState, useEffect, useMemo } from "react";
import Navbar from "./components/Navbar"
import Card from "./components/Card"
import Upload from "./components/Upload"
import { initializeApp } from "firebase/app";
import { 
  getFirestore, collection, onSnapshot
} from "firebase/firestore";

import {
  getStorage, ref, getDownloadURL, listAll
} from "firebase/storage"

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
  const [imageList, setImageList] = useState([])

  useEffect(() => {
    const unsubscribe = onSnapshot(colRef, (snapshot) => {
      const newArts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setArts(newArts);
    });

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
  
  const storage = getStorage();
  const imageListRef = useMemo(() => ref(storage, 'images/'), [storage]);

  useEffect(() => {
    listAll(imageListRef)
        .then(response => {
            const urlPromises = response.items.map(item => getDownloadURL(item));
            return Promise.all(urlPromises);
        })
        .then(urls => {
          console.log("Urls with createdAt:", urls);
          const sortedImageList = urls.sort((a, b) => {
            const aCreatedAt = new Date(a.createdAt);
            const bCreatedAt = new Date(b.createdAt);
            return bCreatedAt - aCreatedAt;
          });
          console.log("Sorted image list:", sortedImageList);
          setImageList(sortedImageList);
        })
        .catch(error => {
            console.error('Error fetching URLs from Firebase Storage:', error);
        });
  }, [imageListRef])


  console.log(imageList)

  return (
    <div>
      <Navbar />
      <section className="cards-list">
        {cards}
        {cards}

        {cards}
        {cards}

      </section>
      <Upload 
        storage={storage} 
        db={db}
        colRef={colRef}
      />
    </div>
  )
}