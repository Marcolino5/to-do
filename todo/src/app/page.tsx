"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function App() {
  // functions
  const [list, setList] = useState<any[]>([]);
  const [input, setInput] = useState('');

  const [completeList, setCompleteList] = useState<any[]>([]);
  const [index, setIndex] = useState<number>(0); // makes sure id doesn't repeat

  const [state, setState] = useState<number>(0); // 0 = all, 1 = active, 2 = completed

  const addTodo = (todo : string) => {
      const newTodo = { id: index, text: todo, completed: false };

      completeList.push(newTodo);
        
      setInput('');
      setIndex(index+1);
      changeState(state);
  };

  const changeState = (value : number) => {
    setState(value);
    
    if (state == 1) seeActive();
    else if (state == 2) seeCompleted();
    else seeAll();
  }

  const seeAll = () => {
    setList(completeList);
    checkBoxes();
  }
  const seeActive = () => setList(completeList.filter((todo) => !todo.completed));;
  const seeCompleted = () => {
    setList(completeList.filter((todo) => todo.completed));
    checkBoxes();
  }

  const checkBoxes = () => {
    const checkBoxes = document.querySelectorAll('input[type="checkbox"]') as NodeListOf<HTMLInputElement>;
    checkBoxes.forEach((checkbox) => {
      const todo = list.find((todo) => todo.id === checkbox.value);
      if (todo && todo.completed) checkbox.checked = true;
    });
  }

  const notCompleted = () => completeList.filter((todo) => !todo.completed).length;

  const invertComplete = (id : any) => {
    const todo = list.find((todo) => todo.id === id);
    todo.completed = !todo.completed;
    setList([...list]);
  }

  const getIndex = (text : string) => list.findIndex((todo) => todo.text === text);

  const deleteCompleted = () => {
    const newList = list.filter((todo) => !todo.completed);
    setList(newList);

    const newCompleteList = completeList.filter((todo) => !todo.completed);
    setCompleteList(newCompleteList);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <div className="inline-flex">
          <h1 className="text-3xl font-bold">Lista de Tarefas</h1>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M168,152a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm-8-40H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm56-64V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H92.26a47.92,47.92,0,0,1,71.48,0H200A16,16,0,0,1,216,48ZM96,64h64a32,32,0,0,0-64,0ZM200,48H173.25A47.93,47.93,0,0,1,176,64v8a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V64a47.93,47.93,0,0,1,2.75-16H56V216H200Z"></path></svg>
        </div>

        <div className="relative border-solid border-gray-500 border-2 rounded box-border h-96 w-90 p-4 space-y-2">

        <div className = "inline-flex space-x-2"> 
            <input className = "pl-2 type-text id-itask text-gray-500 border-solid border-black border-2 rounded"
            value={input}
            onChange={(e) => setInput(e.target.value)}></input>
            
            <button className = "bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={()=>addTodo(input)}>
              +
            </button>
          </div>

          <div className="bg-gray-200 rounded h-2 w-90"></div>

          <ul>
          {
            list.map((todo) => (
              <li key={ todo.id }>
                <input className="width-100px" type="checkbox" value={todo.id} name = 'foo'
                onClick={()=>invertComplete( todo.id )}></input>
                <label className="for-tarefa1"> {todo.text}</label>
              </li>
            ))
          }
          </ul>

          <div className="absolute bottom-0">
            <div className="bg-gray-300 rounded h-1 w-full"></div>
            <ul className = "inline-flex space-x-2">
              <p className="text-xs">{ notCompleted() } item(s) restante(s)</p>
              <button className="text-xs font-bold"
              onClick={()=>changeState(0)}>Tudo</button>
              <button className="text-xs"
              onClick={()=>changeState(1)}>Ativo</button>
              <button className="text-xs"
              onClick={()=>changeState(2)}>Completas</button>
              <button className="text-xs"
              onClick={()=>deleteCompleted()}>Limpar Completas</button>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
