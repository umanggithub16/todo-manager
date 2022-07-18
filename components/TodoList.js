import React from "react";

const TodoList = ({ todoItem, index, handleStatusChange, deleteTodo }) => {
    return (
        <div
            className={
                "list-adder " + (todoItem.completed ? "completed-item" : "")
            }
            key={todoItem.id}
        >
            <div className="lists">
                <div>{todoItem.title}</div>
                <div className="sequence-num">{index + 1}.</div>
                <i
                    className={
                        "fas fa-check-circle " +
                        (todoItem.completed ? "" : "hide-complete")
                    }
                />
            </div>
            <hr className="solid" />
            <div className="adjust-btn ">
                <div className="complete-btn-container">
                    {todoItem.completed ? (
                        <button
                            className="btn-right-incomplete"
                            onClick={() => handleStatusChange(todoItem)}
                        >
                            Mark as incomplete
                        </button>
                    ) : (
                        <button
                            className="btn-right"
                            onClick={() => handleStatusChange(todoItem)}
                        >
                            Mark as completed
                        </button>
                    )}
                </div>
                <div className="delete-btn-contianer">
                    <button
                        className="btn-cross"
                        onClick={() => deleteTodo(todoItem)}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TodoList;
