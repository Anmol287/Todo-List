import { useEffect, useState } from 'react'
// const { v4: uuidv4 } = require('uuid');
import { v4 as uuidv4 } from 'uuid';

export const Todo = () => {

    const [task, setTask] = useState("")
    const [tasks, Alltask] = useState([])
    const [showfinished, setshowfinished] = useState(true)

    const saveTOLS = () => localStorage.setItem("tasks", JSON.stringify(tasks));

    useEffect(() => {
        let todostring = localStorage.getItem("tasks")
        if (todostring) {
            let todos = JSON.parse(localStorage.getItem("tasks"))
            Alltask(todos)
        }
    }, [])

    const toggle=()=>{
    setshowfinished(!showfinished)
    }
    const HandleDelete = (e, id) => {
        let newtodo = tasks.filter(item =>item.id !== id);
        Alltask(newtodo);
        saveTOLS();
    }

    const HandleEdit = (id) => {
        let edit = tasks.filter(item => item.id === id) 
        setTask(edit[0].task)
        let newtodo = tasks.filter(item =>item.id !== id);
        Alltask(newtodo);
        saveTOLS();
    }

    const HandleAdd = () => {
        Alltask([...tasks, { id: uuidv4(), task, isCompleted: false }])
        setTask("")
        saveTOLS();
    }

    const HandleChange = (e) => {
        setTask(e.target.value)
    }

    const HandlCheckBox = (e) => {
        let id = e.target.name;
        let index = tasks.findIndex(item => {
            return item.id === id;
        })
        let newtodo = [...tasks];
        newtodo[index].isCompleted = !newtodo[index].isCompleted;
        Alltask(newtodo);
        saveTOLS();
    }


    return (
        <div className="container md:m-auto md:size-9/12  ">
            <div className="head my-5 rounded-xl bg-violet-300 p-5">
                <h1 className="text-2xl font-bold text-center ">To Do List ✏️</h1>
            </div>

            <div className="todos bg-violet-200 size-8/12 mx-auto py-4 min-h-full">
                <div className="addtask flex items-center justify-center flex-col mx-auto gap-2 ">  
                    <input type="text" className='input size-7/12 p-2 rounded-2xl  hover:scale-105' value={task} onChange={HandleChange} required />
                    <button onClick={HandleAdd} disabled={task.length<3} className='btn bg-violet-600 p-2 text-white rounded-md hover:bg-violet-500'>
                    Add</button>
                    <h2 className='mx-2 font-bold text-center m-2 text-xl font-serif '>Each day I will accomplish one thing on my to list</h2>
                </div>
                <div className='flex m-2 justify-end'>
                <input onChange={toggle} type="checkbox" checked={showfinished} className='m-2' /><p>Show Finished</p>
                </div>
                <hr className='size-5/12 border-black m-auto' />


                {tasks.length === 0 && <div className='font-bold text-center m-3 font-mono'>No Todos Here !</div>}

                {tasks.map(item => {
                    return (showfinished || !item.isCompleted) && <div key={item.id} className="todos flex justify-between md:mx-7 font-mono  ">
                        <div className="checkbox flex items-center">
                            <input type="checkbox" name={item.id} onChange={HandlCheckBox} checked={item.isCompleted} className="mx-3 m-auto size-4 rounded-2xl hover:scale-110" />
                            <p className={item.isCompleted ? "line-through" : ""}>{item.task}</p>
                        </div>
                        <div className="buttons flex">
                            <button onClick={()=>HandleEdit(item.id)} className='btn p-1  hover:scale-150'>
                                <img src="/edit.svg" alt="Edit" /></button>
                            <button onClick={(e) => HandleDelete(e, item.id)} className='btn  p-1 hover:scale-150 '>
                                <img src="/delete.svg" alt="Delete" />
                            </button>
                        </div>
                    </div>
                })}

            </div>
        </div>
    )
}
