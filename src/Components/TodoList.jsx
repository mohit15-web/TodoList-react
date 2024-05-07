import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import AuroraBackground from "./background";
import { toast } from "react-toastify";

function TodoList() {
  const [inputText, setInputText] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
const [editInput, setEditInput] = useState("");


  const handleInput = (e) => {
    setInputText(e.target.value);
  };

  const handleNumberInput = (e) => {
    setNumberInput(e.target.value);
  };

  const handleAddTask = () => {
    if (inputText.trim() !== "") {
      setTasks([
        ...tasks,
        { subject: inputText, number: parseInt(numberInput) },
      ]);
      toast.success("Subject Added", {
        position: "top-center",
        theme: "colored",
      });
      setInputText("");
      setNumberInput(""); // Reset number input after adding task
    } else {
      toast.error("Please Enter Subject name", {
        position: "top-center",
        theme: "colored",
      });
    }
  };

  const increment = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].number += 1;
    setTasks(updatedTasks);
  };

  const decrement = (index) => {
    const updatedTasks = [...tasks];
    if (updatedTasks[index].number > 0) {
      updatedTasks[index].number -= 1;
      setTasks(updatedTasks);
    }
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (index) => {
    let updatedTask = tasks.filter((task, idx) => idx !== index);
    setTasks(updatedTask);
    toast.success("Subject Deleted", {
      position: "top-center",
      theme: "colored",
    });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditInput(tasks[index].subject);
  };
  
  const handleEditInputChange = (e) => {
    setEditInput(e.target.value);
  };
  
  const handleEditSave = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].subject = editInput;
    setTasks(updatedTasks);
    setEditIndex(null);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };
  
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-4xl font-bold dark:text-white text-center">
          Geekster Education Planner
        </div>
        <div className="font-extralight  md:text-xl dark:text-neutral-200 py-4">
          <div className=" flex justify-center items-center gap-4">
            <input
              type="text"
              value={inputText}
              onChange={handleInput}
              placeholder="Subject"
              className="border border-gray-200 text-xl p-2 text-black w-96"
            />
            <input
              type="number"
              placeholder="Hour"
              value={numberInput}
              onChange={handleNumberInput}
              className="border border-gray-200 text-xl p-2 text-black w-20"
            />
            <button
              className="bg-black dark:bg-white w-fit text-white dark:text-black px-4 py-2 "
              onClick={handleAddTask}
            >
              Add
            </button>
          </div>
          <ul>
            {tasks.map((task, index) => (
              <li
                key={index}
                className="text-black font-bold border flex justify-between py-2 my-3 px-3"
              >
                {editIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editInput}
                      onChange={handleEditInputChange}
                      className="border border-gray-200 text-xl p-2 text-black"
                    />
                    <button onClick={() => handleEditSave(index)}>Save</button>
                  </>
                ) : (
                  <>
                    <h1>
                      {task.subject} - {task.number} Hour
                    </h1>
                    <div className="flex gap-4">
                      <button onClick={() => handleEdit(index)}>Edit</button>
                      {/* Other buttons */}
                    </div>
                  </>
                )}
                <div className="flex gap-4">
                  <button
                    className="text-2xl "
                    onClick={() => increment(index)}
                  >
                    +
                  </button>
                  <button className="text-3xl" onClick={() => decrement(index)}>
                    -
                  </button>
                  <button onClick={() => handleDelete(index)}>❌</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}

export default TodoList;
