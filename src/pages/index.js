import { useTasks } from "../context/taskContext";
import Layout from "../components/Layout";
import {VscTrash}from 'react-icons/vsc';
import { useRouter } from "next/router";

const Home = () => {
  const {tasks, deleteTask} = useTasks();
  const {push} = useRouter();

  return (
    <Layout>
    <div className="flex justify-center">
      {
          tasks.length === 0 ? (
            <h2>No hay tareas</h2>
          ) : (
          <div className=" lg:w-9/12">
            { tasks.map((task,index) =>(
              <div className="flex justify-start items-center bg-gray-700 hover:bg-gray-600 px-5 sm:px-20 py-5 m-2 cursor-pointer"
                key={task.id}
                onClick={() => push(`/edit/${task.id}`)}
              >
                <span className="text-5xl mr-5">{index}</span>
                  <div className="w-full">
                   <div className="flex justify-between">
                    <h1 className="font-bold">{task.title}</h1>
                    <button className="bg-red-700 hover:bg-red-600 px-3 py-1 inline-flex items-center cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTask(task.id);
                      }}
                    >
                      <VscTrash className="mr-2"/>
                      Delete
                      </button>
                   </div>
                    <p className="text-gray-300">{task.description}</p>
                    <span className="text-gray-400">{task.id}</span>
                  </div>
              </div>
            )
          )}
          </div>
          )
        }
    </div>
    </Layout>
    
    );
}
 
export default Home;