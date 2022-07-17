import React, { useState, useEffect } from "react";
import {
    sendDeleteRequest,
    sendGetRequest,
    sendPostRequest,
} from "../utility/httpService";
import "./todo.css";
import TodoList from "./TodoList";

function Todo() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("");
    const [edit, setEdit] = useState({
        id: null,
        value: "",
    });

    const getTodos = async () => {
        try {
            let url = `https://jsonplaceholder.typicode.com/todos`;
            let result = await sendGetRequest(url);
            console.log(result);
            if (result.status === 200 && result?.data) {
                setTodos(result.data.slice(0, 50));
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    const addTodo = async (input) => {
        // if (!input || /^\s*$/.test(input)) {
        // return;
        // }
        if (input) {
            let todoObj = {
                userId: 1,
                id: todos.length + 1,
                title: input,
                completed: false,
            };
            const newTodos = [todoObj, ...todos];
            try {
                let url = `https://jsonplaceholder.typicode.com/todos`;
                let result = await sendPostRequest(url, todoObj);
                console.log(result);
                if (result.status === 200) {
                    setTodos(newTodos);
                }
            } catch (e) {
                console.log(e);
            }
            setInput("");
            // console.log(...newTodos);
        }
    };

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (event) => {
        //event.preventDefault();
        addTodo(input);
    };

    const handleStatusChange = async (todoItem) => {
        let todoTemp = todoItem;
        todoTemp.completed = !todoTemp.completed;
        let todoListTemp = [...todos];
        let index = todoListTemp.map((todo) => todo.id).indexOf(todoTemp.id);
        todoListTemp[index] = todoTemp;
        try {
            let url = `https://jsonplaceholder.typicode.com/todos/${todoItem.id}`;
            let result = await sendPostRequest(url, todoTemp);
            console.log(result);
            if (result.status === 200 && result?.data?.id === todoTemp.id) {
                setTodos(todoListTemp);
            }
        } catch (e) {
            console.log(e);
        }
        // setTodos(todoListTemp);
    };

    const deleteTodo = async (todoItem) => {
        let todoListTemp = [...todos];
        let index = todoListTemp.map((todo) => todo.id).indexOf(todoItem.id);

        todoListTemp.splice(index, 1);
        try {
            let url = `https://jsonplaceholder.typicode.com/todos/${todoItem.id}`;
            let result = await sendDeleteRequest(url);
            console.log(result);
            if (result.status === 200) {
                setTodos(todoListTemp);
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <div>
                <div className="center-head">
                    <h1>To-Do List</h1>
                </div>

                <div className="todo-adjust">
                    <div className="todo-input">
                        <div className="title-edit">
                            Add a new task in the list
                        </div>
                        <div className="input-btn">
                            <input
                                className="text-box"
                                type="text"
                                value={input}
                                placeholder="Enter the task here"
                                onChange={handleChange}
                            />
                            <button
                                className="btn-submit"
                                value="submit"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </div>
                        <p className="para-edit">Added task in to-do list </p>
                    </div>
                    <div className="manage-list">
                        {todos.map((todoItem, index) => (
                            <TodoList
                                todoItem={todoItem}
                                index={index}
                                handleStatusChange={handleStatusChange}
                                deleteTodo={deleteTodo}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Todo;
