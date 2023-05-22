import React, { useState } from 'react'
import { Todo } from '../Model'
import {AiFillEdit, AiFillDelete, AiOutlineCheck } from 'react-icons/ai'
import './input.css';

interface Props{
    todo:Todo,
    todos:Todo[],
    setTodos:React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo = ({todo, todos, setTodos}:Props) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(
          todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
        );
        setEdit(false);
      };
    
       const handleDelete = (id:number) =>{
       setTodos(todos.filter((todo)=> todo.id !== id)) 
    }

    const handleDone = (id: number) => {
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
          )
        );
      };
  return (
    <form onSubmit={(e)=>handleEdit(e, todo.id)} className='todo_single'>
       
       {edit ? (
<input type='text' value={editTodo} onChange={(e)=>setEditTodo(e.target.value)}/>
       ):
        todo.isDone?(
            <s className='todo_single_text'>{todo.todo}</s>
        ):(
<span className='todo_single_text'>{todo.todo}</span>
        )
       }

        
        {/* <span className='todo_single_text'>{todo.todo}</span> */}
        <div>
            <span className="icon"><AiFillEdit onClick={()=> {
                if( !edit && !todo.isDone){
                    setEdit(!edit)
                }
            }}/></span>
            <span className="icon"><AiFillDelete onClick={()=>handleDelete(todo.id)}/></span>
            <span className="icon"><AiOutlineCheck onClick={()=>handleDone(todo.id)}/></span>
        </div>
    </form>
  )
}

export default SingleTodo