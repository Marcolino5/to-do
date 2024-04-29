"use client";
import React, { useState } from "react";

export function Input(){

    const [list, setList] = useState([]);
    const [input, setInput] = useState('');

    const addTodo = (input : any) => {
        const todo = { id: list.length, text: input, completed: false };
        
        setInput('');
    };

    return(
        <div className = "inline-flex space-x-2"> 
            <input className = "pl-2 type-text id-itask text-gray-500 border-solid border-black border-2 rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}></input>
            
            <button className = "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={()=>addTodo(input)}>
              Button
            </button>
          </div>
    )
}

export function List(){
    return(
        <ul>
            <input className="width-100px" type="checkbox" value="tarefa1"></input>
            <label className="for-tarefa1"> Sou uma tarefa :)</label>
        </ul>
    )
}