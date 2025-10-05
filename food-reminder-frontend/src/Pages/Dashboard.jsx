import React, { useState, useEffect } from "react";
import AddFoodForm from "../Components/AddFoodForm";
import FoodList from "../Components/FoodList";
import NotificationPanel from "../Components/NotificationPanel";
import Navbar from "../Components/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import "../Styles/Dashboard.css";

export default function Dashboard({ onLogout }) {
  const [foods, setFoods] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Fetch foods from backend
  useEffect(() => {
    axios.get("http://localhost:8080/api/foods")
      .then(res => setFoods(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add food
  const handleAddFood = (food) => {
    axios.post("http://localhost:8080/api/foods", food)
      .then(res => {
        setFoods(prev => [...prev, res.data]);
        Swal.fire({
          title: "Added!",
          text: "Food item has been saved.",
          icon: "success",
          background: "#1a1a40",
          color: "#fff",
          confirmButtonColor: "#00e676"
        });
      })
      .catch(err => console.error(err));
  };

  // Delete food
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/api/foods/${id}`)
      .then(() => {
        setFoods(prev => prev.filter(food => food.id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Food item has been removed.",
          icon: "success",
          background: "#1a1a40",
          color: "#fff",
          confirmButtonColor: "#00e676"
        });
      })
      .catch(err => console.error(err));
  };

  // Calculate expiry status and notifications
  useEffect(() => {
    const today = new Date();
    const updatedFoods = foods.map((food) => {
      const expDate = new Date(food.expiry);
      const diffDays = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));

      let status = "fresh";
      if (diffDays < 0) {
        status = "expired";
        const audio = new Audio("/beep-boop-151065.mp3"); // put in /public
        audio.play();
      } else if (diffDays <= 3) {
        status = "near";
      }

      return { ...food, status, diffDays };
    });
    setNotifications(updatedFoods);
  }, [foods]);

  return (
    <div className="dashboard">
      <Navbar onLogout={onLogout} />
      <div id="dashboard">
        <h1 className="brand">Admin Dashboard</h1>
        <h3>Hello Admin</h3>

        {/* Add food form */}
        <AddFoodForm onAdd={handleAddFood} />

        {/* Food list */}
        <FoodList foods={notifications} onDelete={handleDelete} />
      </div>

      <div id="notifications">
        <NotificationPanel notifications={notifications} />
      </div>
    </div>
  );
}
