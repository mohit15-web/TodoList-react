import React, { useState , useEffect } from "react";
import { motion } from "framer-motion";
import AuroraBackground from "./background";

function TodoList() {
  const [inputText, setInputText] = useState("");
  const [numberInput, setNumberInput] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleInput = (e) => {
    setInputText(e.target.value);
  };

  const handleNumberInput = (e) => {
    setNumberInput(e.target.value);
  };

  const handleAddTask = () => {
    if (inputText.trim() !== "") {
      setTasks([...tasks, { subject: inputText, number: parseInt(numberInput) }]);
      setInputText("");
      setNumberInput(""); // Reset number input after adding task
    }
  };

  const increment = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].number += 1;
    setTasks(updatedTasks);
  };
  
  const decrement = (index) => {
    const updatedTasks = [...tasks];
    if(updatedTasks[index].number > 0){
      updatedTasks[index].number -= 1;
      setTasks(updatedTasks);
    }
  };

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  },[]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);



  const handleDelete = (index) => {
    let updatedTask = tasks.filter((task, idx) => idx !== index);
    setTasks(updatedTask);
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
              className="border border-gray-200 text-xl p-2 text-black"
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
               <li key={index} className="text-black py-2 px-4 font-bold my-4">
               {task.subject} {" - "} {task.number} {"Hour"}
               <button className="ml-[14rem] bg-green-500 p-2" onClick={() => increment(index)}>
                 +
               </button>
               <button className="ml-[1rem] bg-red-500 p-2" onClick={() => decrement(index)}>
                 -
               </button>
               <button className="ml-[1rem]  p-2" onClick={() => handleDelete(index)}>
                 ❌
               </button>

             </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}

export default TodoList;
