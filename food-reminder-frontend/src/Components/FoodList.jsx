import React, { useState } from "react";
import Swal from "sweetalert2";
import "../Styles/FoodList.css";

export default function FoodList({ foods, onDelete }) {
  const [search, setSearch] = useState("");

  const filteredFoods = foods.filter(food =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This food item will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      background: "#1a1a40",
      color: "#fff"
    }).then((result) => {
      if (result.isConfirmed) {
        onDelete(id);
      }
    });
  };

  return (
    <div className="food-list">
      <div className="food-list-header">
        <h2>Food Items</h2>
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-bar"
          />
        </div>
      </div>

      <table className="food-table">
        <thead>
          <tr>
            <th>Food Item</th>
            <th>Expiry Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredFoods.length > 0 ? (
            filteredFoods.map(food => (
              <tr key={food.id} className={food.status}>
                <td>{food.name}</td>
                <td>{food.expiry}</td>
                <td>
                  {food.status === "expired"
                    ? "Expired"
                    : food.status === "near"
                    ? `Near expiry (${food.diffDays} days left)`
                    : "Fresh"}
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(food.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center", color: "#aaa" }}>
                No food items found!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
