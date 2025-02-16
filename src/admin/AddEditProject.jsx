import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";

const AddEditProject = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        appUrl: "",
        projectUrls: [],  // Added for multiple project URLs
        figmaUrl: "",
        techStack: "",
        images: [],
        priority: 0  // Moved priority into formData
    });

    const [uploading, setUploading] = useState(false);
    const [newProjectUrl, setNewProjectUrl] = useState(""); // For adding multiple URLs dynamically

    useEffect(() => {
        if (id) {
            const fetchProject = async () => {
                const docRef = doc(db, "projects", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setFormData(docSnap.data());
                }
            };
            fetchProject();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setUploading(true);
        const imageUrls = [];

        for (const file of files) {
            const storageRef = ref(storage, `projectImages/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            await new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    null,
                    (error) => {
                        console.error("Upload Error:", error);
                        reject(error);
                    },
                    async () => {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        imageUrls.push(downloadURL);
                        resolve();
                    }
                );
            });
        }

        setFormData((prev) => ({ ...prev, images: [...prev.images, ...imageUrls] }));
        setUploading(false);
    };

    const handleRemoveImage = (imageUrl) => {
        setFormData((prev) => ({
            ...prev,
            images: prev.images.filter((url) => url !== imageUrl),
        }));
    };

    // Add a new project URL to the array
    const handleAddProjectUrl = () => {
        if (newProjectUrl.trim() !== "") {
            setFormData((prev) => ({
                ...prev,
                projectUrls: [...prev.projectUrls, newProjectUrl.trim()],
            }));
            setNewProjectUrl(""); // Reset input field
        }
    };

    // Remove a specific project URL
    const handleRemoveProjectUrl = (url) => {
        setFormData((prev) => ({
            ...prev,
            projectUrls: prev.projectUrls.filter((item) => item !== url),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.images.length === 0) {
            alert("Please upload at least one image.");
            return;
        }

        try {
            if (id) {
                await updateDoc(doc(db, "projects", id), formData);
            } else {
                await addDoc(collection(db, "projects"), formData);
            }
            navigate("/admin/projects");
        } catch (error) {
            console.error("Error saving project:", error);
        }
    };

    return (
        <div className="project-form-container">
            <h2>{id ? "Edit" : "Add"} Project</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="input-group">
                    <input type="text" name="title" className="input-field" placeholder="Project Title" value={formData.title} onChange={handleChange} required />
                </div>
                <textarea name="description" className="input-field" placeholder="Project Description" value={formData.description} onChange={handleChange} required />

                <div className="input-group">
                    <input type="text" name="appUrl" className="input-field" placeholder="App URL (optional)" value={formData.appUrl} onChange={handleChange} />
                </div>

                <div className="input-group">
                    <input type="text" name="figmaUrl" className="input-field" placeholder="Figma URL (optional)" value={formData.figmaUrl} onChange={handleChange} />
                </div>

                <div className="input-group">
                    <input type="text" name="techStack" className="input-field" placeholder="Tech Stack (e.g., React, Node.js)" value={formData.techStack} onChange={handleChange} />
                </div>

                <label className="file-upload">
                    Upload Images:
                    <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
                </label>

                {uploading && <p className="uploading-text">Uploading images...</p>}

                <div className="gallery-preview">
                    {formData.images.map((url, index) => (
                        <div key={index} className="image-container">
                            <img src={url} alt={`Uploaded ${index}`} className="preview-image" />
                            <button type="button" className="remove-btn" onClick={() => handleRemoveImage(url)}>Remove</button>
                        </div>
                    ))}
                </div>

                <label>Priority (Lower the priority, higher it will be placed in Project List)</label>
                <div className="input-group"><input
                    type="number"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    placeholder="Enter priority (0 for most important)"
                /></div>

                <label>Project URLs (Optional, add multiple)</label>
                <div className="project-url-container">
                    <div className="input-group"><input
                        type="text"
                        value={newProjectUrl}
                        onChange={(e) => setNewProjectUrl(e.target.value)}
                        placeholder="Enter project URL"
                    /></div>
                    <button type="button" onClick={handleAddProjectUrl}>Add URL</button>
                </div>

                <div className="project-url-list">
                    {formData.projectUrls.map((url, index) => (
                        <div key={index} className="url-item">
                            <a href={url} target="_blank" rel="noopener noreferrer">{url}</a>
                            <button type="button" className="remove-btn" onClick={() => handleRemoveProjectUrl(url)}>Remove</button>
                        </div>
                    ))}
                </div>

                <button type="submit" className="submit-btn">{id ? "Update" : "Add"} Project</button>
            </form>
        </div>
    );
};

export default AddEditProject;
