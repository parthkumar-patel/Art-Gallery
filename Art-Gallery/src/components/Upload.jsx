import { useState } from "react"
import { ref, uploadBytes } from "firebase/storage"


export default function Upload(prop) {
    const [image, setImage] = useState(null)
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [year, setYear] = useState("");


    const upload = () => {
        if (image) {
            const imageRef = ref(prop.storage, `images/${image.name}`)
            uploadBytes(imageRef, image).then(() => {
                console.log('Uploaded a blob or file!');
            });
        }
    }

    const handleAddArt = () => {
        if (title && artist && year) {
          const art = {
            title,
            artist,
            year,
          };
          console.log(art)
    
          setTitle("");
          setArtist("");
          setYear("");
        } else {
          alert("Please fill in all fields.");
        }
      };
    
    return (
        <div className="content--container" >
          <div className="upload-container">
                <label htmlFor="file" className="upload-label">
                    Choose an Image
                </label>
                <input
                    type="file"
                    id="file"
                    className="upload-input"
                    onChange={(event) => setImage(event.target.files[0])}
                />
                <button className="upload-button" onClick={upload}>
                    Upload Art
                </button>
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Artist's Name"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="input-field"
                />
                <button onClick={handleAddArt} className="add-button">
                    Add Art
                </button>
            </div>
        </div>
    )
}