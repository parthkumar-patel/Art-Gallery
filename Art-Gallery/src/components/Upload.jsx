import { useState } from "react"
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage"
import { addDoc } from "firebase/firestore";


export default function Upload(prop) {
    const [image, setImage] = useState(null)
    const [previewImage, setPreviewImage] = useState(null)
    const [formData, setFormData] = useState({
        title: "",
        artist: "",
        year: "",
        imageURL: ""
    })
    const [uploadProgress, setUploadProgress] = useState(0);
    const storage = getStorage();

    function handleAddArt() {
        if (image) {
            const imageRef = ref(storage, `images/${image.name}`);
            const uploadTask = uploadBytesResumable(imageRef, image);
        
            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.log(error);
            },
            () => {
                setTimeout(() => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        
                        addDoc(prop.colRef, {
                        title: formData.title,
                        artist: formData.artist,
                        year: formData.year,
                        imageURL: downloadURL,
                        });
        
                        setUploadProgress(0);
                        setImage(null);
                        setPreviewImage(null);
                        setFormData({
                        title: "",
                        artist: "",
                        year: "",
                        imageURL: "",
                        });
                    });
                }, 1020); 
            });
        }
    }

    function handleImageChange(event) {
        const selectedImage = event.target.files[0];
        setImage(selectedImage);
    
        // Create a file preview
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviewImage(e.target.result);
        };
        reader.readAsDataURL(selectedImage);

        handleChange(event)
    }

    function handleChange(event) {
        const {name, value} = event.target
        setFormData(prev => ({
            ...prev, 
            [name]: value
        }))
    }
    
    return (
        <div className="content--container">
          <div className="upload-container" style={{ padding: previewImage ? "20px" : "40px"}}>
                <label htmlFor="file" className="upload-label">
                {previewImage ? (
                    <img src={previewImage} alt="Preview" style={{ maxWidth: "100px" }} />
                    ) : (
                    "Upload an Image" )
                }
                </label>
                <input
                    type="file"
                    id="file"
                    className="upload-input"
                    onChange={handleImageChange}
                />
                {uploadProgress > 0 && (
                    <progress className="upload-progress" value={uploadProgress} max="100"></progress>
                )}
            </div>
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Title"
                    value={formData.title}
                    name="title"
                    onChange={handleChange}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Artist's Name"
                    value={formData.artist}
                    name="artist"
                    onChange={handleChange}
                    className="input-field"
                />
                <input
                    type="text"
                    placeholder="Year"
                    value={formData.year}
                    name="year"
                    onChange={handleChange}
                    className="input-field"
                />
                <button onClick={handleAddArt} className="add-button">
                    Add Art
                </button>
            </div>
        </div>
    )
}