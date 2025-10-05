import { useState } from "react";
import "../Styles/AddFoodForm.css";

export default function AddFoodForm({ onAdd }) {
  const [item, setItem] = useState("");
  const [expiry, setExpiry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!item || !expiry) return alert("Enter food & expiry date");
    onAdd({ name: item, expiry });
    setItem("");
    setExpiry("");
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Food Item"
        value={item}
        onChange={(e) => setItem(e.target.value)}
      />
      <input
        type="date"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
      />
      <button type="submit">Add Item</button>
    </form>
  );
}