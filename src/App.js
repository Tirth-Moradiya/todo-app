import React, { useState, useEffect } from "react";
import "./App.css";
import { AiOutlineDelete } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";
import { json } from "react-router-dom";

function App() {
    const [isSelected, setIsSelected] = useState(false);
    const [data, setData] = useState({
      title: "",
      description: "",
    });

    const [storeData, setStoreData] = useState([]);

    useEffect(() => {
      const existingData = JSON.parse(localStorage.getItem("Data")) || [];
      setStoreData(existingData);
    }, []);

    const handleOnChange = (e) => {
      const { name, value } = e.target;
      setData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleOnSubmit = (e) => {
      e.preventDefault();
      if (data.title && data.description) {
        const existingData = JSON.parse(localStorage.getItem("Data")) || [];
        existingData.push(data);
        localStorage.setItem("Data", JSON.stringify(existingData));
        setStoreData(existingData);
        setData({
          title: "",
          description: "",
        });
      }
    };
  return (
    <div className="App">
      <h1>My Todo's</h1>
      <div className="todo-wrapper">
        <form onSubmit={handleOnSubmit}>
          <div className="todo-input">
            <div className="todo-input-item">
              <label>Task Title:</label>
              <input
                type="text"
                name="title"
                id="title"
                value={data.title}
                onChange={handleOnChange}
                placeholder="what is the task title?"
              />
            </div>
            <div className="todo-input-item">
              <label>Task Description:</label>
              <input
                type="text"
                name="description"
                id="description"
                value={data.description}
                onChange={handleOnChange}
                placeholder="what is the task description?"
              />
            </div>
            <div className="todo-input-item">
              <button className="primary-btn" type="submit">
                Add
              </button>
            </div>
          </div>
        </form>

        <div className="btn-group">
          <button
            type="submit"
            className={`secondary-btn ${isSelected === true && "active"}`}
            onClick={() => setIsSelected(true)}
          >
            TODO
          </button>
          <button
            type="submit"
            className={`secondary-btn ${isSelected === false && "active"}`}
            onClick={() => setIsSelected(false)}
          >
            COMPLETED
          </button>
        </div>

        <div className="todo-list">
          <div className="todo-list-items">
            <div>
              <h3>Task-1</h3>
              <p>Description</p>
            </div>
            <div className="icons">
              <AiOutlineDelete className="icon" />
              <FaCheck className="icon-check" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
