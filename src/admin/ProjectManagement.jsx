import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

const ProjectManagement = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const querySnapshot = await getDocs(collection(db, "projects"));
            const projectList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProjects(projectList);
        };
        fetchProjects();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            await deleteDoc(doc(db, "projects", id));
            setProjects(projects.filter(project => project.id !== id));
        }
    };

    return (
        <div className="project-management-container">
            <h2>Manage Projects</h2>
            <Link to="/admin/projects/add">
                <button className="add-button">Add New Project</button>
            </Link>
            <table className="project-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map(project => (
                        <tr key={project.id}>
                            <td>{project.title}</td>
                            <td className="action-buttons">
                                <Link to={`/admin/projects/edit/${project.id}`}>
                                    <button className="edit-button">Edit</button>
                                </Link>
                                <button className="delete-button" onClick={() => handleDelete(project.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectManagement;
