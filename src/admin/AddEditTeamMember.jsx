import React, { useState, useEffect } from "react";
import { db, storage } from "../firebase";
import { collection, addDoc, updateDoc, doc, getDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";

const yearOptions = ["Freshman", "Sophomore", "Junior", "Senior", "Graduate", "Alumni"];

const AddEditTeamMember = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        year: "",
        major: "",
        isEboardMember: false,
        position: "",
        funFact: "",
        image: null,
        socialLinks: { linkedin: "", instagram: "" },
        priority: 0
    });

    const [priority, setPriority] = useState(0);


    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (id) {
            const fetchMember = async () => {
                const docRef = doc(db, "teamMembers", id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setFormData(docSnap.data());
                }
            };
            fetchMember();
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "priority" ? Number(value) : (type === "checkbox" ? checked : value),
        }));
    };

    const handleSocialChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            socialLinks: { ...prev.socialLinks, [name]: value },
        }));
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true);

        const storageRef = ref(storage, `teamImages/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            "state_changed",
            null,
            (error) => {
                console.error("Upload Error:", error);
                setUploading(false);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                setFormData((prev) => ({ ...prev, image: downloadURL }));
                setUploading(false);
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (id) {
                await updateDoc(doc(db, "teamMembers", id), formData);
            } else {
                await addDoc(collection(db, "teamMembers"), formData);
            }
            navigate("/admin/team");
        } catch (error) {
            console.error("Error saving member:", error);
        }
    };

    return (
        <div className="team-form-container">
            <h2>{id ? "Edit" : "Add"} Team Member</h2>
            <form onSubmit={handleSubmit} className="form">
                <div className="input-group">
                    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                </div>

                <div className="input-group">
                    <label>Current Year:</label>
                    <select name="year" value={formData.year} onChange={handleChange} required className="custom-dropdown">
                        <option value="" disabled>Select Year</option>
                        {yearOptions.map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                <input type="text" name="major" placeholder="Major" value={formData.major} onChange={handleChange} required />

                <div className="toggle-container">
                    <span>Executive Board Member</span>
                    <label className="toggle-switch">
                        <input type="checkbox" name="isEboardMember" checked={formData.isEboardMember} onChange={handleChange} />
                        <span className="slider round"></span>
                    </label>
                </div>

                <div className="input-group">
                    <input type="text" name="position" placeholder="Position" value={formData.position} onChange={handleChange} required />
                </div>

                <div className="input-group">
                    <input type="text" name="funFact" placeholder="Fun Fact" value={formData.funFact} onChange={handleChange} />
                </div>

                <label>Profile Picture:</label>
                <div className="input-group">
                    <input type="file" accept="image/*" onChange={handleImageUpload} />
                </div>
                {uploading && <p>Uploading image...</p>}
                {formData.image && <img src={formData.image} alt="Profile Preview" width="100" className="profile-preview" />}

                <h3>Social Links</h3>
                <div className="input-group">
                    <input type="text" name="linkedin" placeholder="LinkedIn URL" value={formData.socialLinks.linkedin} onChange={handleSocialChange} />
                </div>
                <div className="input-group">
                    <input type="text" name="instagram" placeholder="Instagram URL" value={formData.socialLinks.instagram} onChange={handleSocialChange} />
                </div>

                <label>Priority [Enter priority (0 for President, 1 for VP, etc.)]</label>
                <input
                    type="number"
                    value={priority}
                    onChange={(e) => setPriority(Number(e.target.value))}
                    placeholder="Enter priority (1 for President, 2 for VP, etc.)"
                />

                <button type="submit" className="submit-btn">{id ? "Update" : "Add"} Member</button>
            </form>
        </div>
    );
};

export default AddEditTeamMember;
