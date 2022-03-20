import React, { useState } from "react";

function Form(props) {
    const [name, setName] = useState("");

    function handleSubmit(event) {
        event.preventDefault(); 
        props.onSubmit(name); 
        setName("");
        const inputElement = document.querySelector("input");
        inputElement.value = ""; 
    }

    function handleChange(e) {
        const text = e.target.value; 
        setName(text);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="label-wrapper">
                <label htmlFor="new-todo-input" className="label_lg">
                    What needs to be done? 
                </label>
            </h2>
            <input
                type="text"
                id="new-todo-input"
                className="input input_lg"
                name="text"
                autoComplete="off"
                defaultValue={""}
                onChange={handleChange}
            />
            <button type="submit" className="btn btn_primary btn_lg">
                Add
            </button>
        </form>
    );
}

export default Form; 
