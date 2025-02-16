import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

const TeamManagement = () => {
    const [teamMembers, setTeamMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
            const querySnapshot = await getDocs(collection(db, "teamMembers"));
            const members = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTeamMembers(members);
        };
        fetchMembers();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this member?")) {
            await deleteDoc(doc(db, "teamMembers", id));
            setTeamMembers(teamMembers.filter(member => member.id !== id));
        }
    };

    return (
        <div className="team-management-container">
            <h2>Manage Team Members</h2>
            <Link to="/admin/team/add">
                <button className="add-button">Add New Member</button>
            </Link>
            <table className="team-table">
                <thead>
                    <tr>
                        <th>Team Member</th>
                        <th>Position</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {teamMembers.map(member => (
                        <tr key={member.id}>
                            <td className="member-info">
                                <img
                                    src={member.image || "/default-avatar.png"}
                                    alt={member.firstName}
                                    className="avatar"
                                />
                                {member.firstName} {member.lastName}
                            </td>
                            <td>{member.title}</td>
                            <td className="action-buttons">
                                <Link to={`/admin/team/edit/${member.id}`}>
                                    <button className="edit-button">Edit</button>
                                </Link>
                                <button className="delete-button" onClick={() => handleDelete(member.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TeamManagement;
