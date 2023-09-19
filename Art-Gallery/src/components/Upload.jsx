import { useState } from "react"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
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

    function handleAddArt() {
        if (image) {
            const imageRef = ref(prop.storage, `images/${image.name}`)
            const uploadTask = uploadBytesResumable(imageRef, image);

            uploadTask.on('state_changed', (snapshot) => {
                // progrss function ....
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
              }, 
              (error) => { 
                console.log(error);
              }, 
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    // setFormData(prev => ({
                    //     ...prev,
                    //     imageURL: downloadURL
                    // }))

                    addDoc(prop.colRef, {
                        title: formData.title,
                        artist: formData.artist,
                        year: formData.year,
                        imageURL: downloadURL
                    })
                });
              });
        }
        setImage(null)
        setPreviewImage(null)
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
                    value={formData.imageURL}
                />
                {/* <button className="upload-button" onClick={upload}>
                    Upload Art
                </button> */}
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