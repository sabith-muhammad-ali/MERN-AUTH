import React, { useState } from "react";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../slices/adminApiSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import "../../style/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const {
    data: users = [],
    isLoading: isLoadingUsers,
    error,
    refetch,
  } = useGetUsersQuery();
  const [deleteUser, { isLoading }] = useDeleteUserMutation();
  const [loading, setLoading] = useState(false);

  const handleBlock = (userId) => {
    console.log("Block user with ID:", userId);
  };

  const handleDelete = async (userId) => {
    console.log("Delete user with ID:", userId);
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        setLoading(true);
        await deleteUser(userId).unwrap();
        console.log("User deleted");
        refetch();
      } catch (err) {
        console.error("Failed to delete the user: ", err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (userId) => {
    navigate(`/admin/update-profile${userId}`);
  };

  if (isLoadingUsers || isLoading || loading) return <Loader />;

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <table className="user-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <img
                  src={`/uploads/${user.image}`}
                  alt={user.name}
                  className="user-image"
                />
              </td>
              <td>
                <button
                  onClick={() => handleBlock(user._id)}
                  className="action-button block-button"
                >
                  Block
                </button>
                <button
                  onClick={() => handleEdit(user._id)}
                  className="action-button edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user._id)}
                  className="action-button delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminDashboard;
