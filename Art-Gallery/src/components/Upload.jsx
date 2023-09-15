import { useState } from "react"
import { getStorage, ref, uploadBytes } from "firebase/storage"

export default function Upload() {
    const [image, setImage] = useState(null)
    const storage = getStorage();

    function upload() {
        if (image) {
            const imageRef = ref(storage, `images/${image.name}`)
            uploadBytes(imageRef, image).then(() => {
                console.log('Uploaded a blob or file!');
            });
        }
    }

    return (
        <div>
            <input 
                type="file" 
                onChange={event => 
                    setImage(event.target.files[0])
                } 
            />
            <button onClick={upload}>Upload Art</button>
        </div>
    )
}