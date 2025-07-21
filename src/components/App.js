import React, { useState } from "react";
import ShoppingList from "./ShoppingList";
import Header from "./Header";
import itemData from "../data/items"; // Your initial item data

function App() {
  const [items, setItems] = useState(itemData); // State for all items
  const [isDarkMode, setIsDarkMode] = useState(false);

  function handleDarkModeClick() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  }

  // Callback function to add a new item
  function handleAddItem(newItem) {
    setItems((prevItems) => [...prevItems, newItem]); // Add new item to state
  }

  return (
    <div className={"App " + (isDarkMode ? "dark" : "light")}>
      <Header isDarkMode={isDarkMode} onDarkModeClick={handleDarkModeClick} />
      {/* Pass the handleAddItem callback to ShoppingList */}
      <ShoppingList items={items} onItemFormSubmit={handleAddItem} />
    </div>
  );
}

export default App;
