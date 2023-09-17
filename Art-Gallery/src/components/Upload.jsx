import { useState } from "react"
import { ref, uploadBytes } from "firebase/storage"


export default function Upload(prop) {
    const [image, setImage] = useState(null)

    function upload() {
        if (image) {
            const imageRef = ref(prop.storage, `images/${image.name}`)
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