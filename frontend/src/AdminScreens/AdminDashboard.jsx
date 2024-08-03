import React, { useState, useEffect } from "react";
import { useGetUsersQuery } from "../slices/adminApiSlice";
import "../../style/AdminDashboard.css";

const AdminDashboard = () => {
  const { data: users = [], isLoading, error } = useGetUsersQuery();

  const handleBlock = (userId) => {
    // Handle blocking user
    console.log("Block user with ID:", userId);
  };

  const handleDelete = (userId) => {
    // Handle deleting user logic
    console.log("Delete user with ID:", userId);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching users</p>;

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
