import { useEffect, useState } from 'react';
import Layout from "../components/Layout";
import { useTasks } from '../context/taskContext';
import { useRouter } from 'next/router';

const TaskFormPage = () => {

    const[task, setTask] =  useState({
        title: '',
        description: '',
    });
    const{createTask, updateTask, tasks} = useTasks();
    const {push, query} = useRouter();


    const handleChange = (e) => {
        const {name, value} = e.target;
        setTask({...task, [name]:value})
    };
    const handleSubmit = e => {
        e.preventDefault();
        if(!query.id){
           createTask(task.title, task.description);
             push("/");
        } else{
            updateTask(query.id, task);
            push("/");
        }

        
        
    }

    useEffect(() => {
        if(query.id){
            const taskFound = tasks.find(task => task.id === query.id)
            setTask({title: taskFound.title, description:taskFound.description})
        }
    },[])

    return (
        <Layout>
           <div className='flex justify-center items-center h-full'>
            <form onSubmit={handleSubmit} className='bg-gray-700 p-10 h-2/4 w-11/12 sm:w-fit'>
                    <h1 className='text-3xl mb-7'>{query.id ? 'Update a Task' : 'Add a task'}</h1>
                    <input 
                    name="title"
                    className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5" 
                    type="text" 
                    placeholder="Ingresa un titulo" 
                    onChange={handleChange}
                    value={task.title}
                    />
                    <textarea 
                    name="description"
                    className="bg-gray-800 focus:text-gray-100 focus:outline-none w-full py-3 px-4 mb-5" 
                    rows="2"
                    placeholder="Escribe una descripcion"
                    onChange={handleChange}
                    value={task.description}
                    >
                    </textarea>

                    <button className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded-sm disabled:opacity-30" disabled={!task.title}>
                        {query.id ? 'Update' : 'Save'}
                    </button>
                </form>
           </div>
        </Layout>
       
    )
}

export default TaskFormPage
