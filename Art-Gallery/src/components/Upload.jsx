import { useState } from "react"
import { ref, uploadBytes } from "firebase/storage"


export default function Upload(prop) {
    const [image, setImage] = useState(null)
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [year, setYear] = useState("");
    const [previewImage, setPreviewImage] = useState(null); 

    const upload = () => {
        if (image) {
            const imageRef = ref(prop.storage, `images/${image.name}`)
            uploadBytes(imageRef, image).then(() => {
                console.log('Uploaded a blob or file!');
            });
        }
        setImage(null)
        setPreviewImage(null)
    }

    const handleImageChange = (event) => {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
    
        // Create a file preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewImage(e.target.result);
        };
        reader.readAsDataURL(selectedImage);
    };

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
        <div className="content--container">
          <div className="upload-container" style={{ padding: previewImage ? "20px" : "40px"}}>
                <label htmlFor="file" className="upload-label">
                {previewImage ? (
                    <img src={previewImage} alt="Preview" style={{ maxWidth: "100px" }} />
                    ) : (
                    "Choose an Image" )
                }
                </label>
                <input
                    type="file"
                    id="file"
                    className="upload-input"
                    onChange={handleImageChange}
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