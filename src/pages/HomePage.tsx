import { useEffect, useState } from "react";
import { deleteTarea, getTareas, postTarea } from "../api/ApiServices";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { MdDone } from "react-icons/md";

interface Tarea {
  idNota: number;
  tarea: string;
  description: string;
  fecha: string;
  status: boolean;
}

const HomePage = () => {
  const [tarea, setTarea] = useState<Tarea>({
    idNota: 0,
    tarea: '',
    description: '',
    fecha: '',
    status: false
  })

  const [tareas, setTareas] = useState<Tarea[]>([])

  const [buttonedit, setButtonEdit] = useState(true)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (buttonedit) {
      await postTarea(tarea);
      setTarea({
        idNota: 0,
        tarea: '',
        description: '',
        fecha: '',
        status: false
      });
      getTareas().then((response) => { setTareas(response) })
    }else
    {
      
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTarea(prevtarea => ({
      ...prevtarea,
      [name]: value
    }))

  };

  const handleDelete = (id: number) => {
    deleteTarea(id).then(() => {
      setTareas((prevtareas) => prevtareas.filter(tareas => tareas.idNota != id))
    });
  }

  const handleUpdate = (id: number) => {
    setButtonEdit(false)
    const tarea_update = tareas.find(tarea => tarea.idNota == id);
    if (tarea_update == null) {
      return "f"
    }
    setTarea((prevtarea) => ({
      ...prevtarea,
      tarea: tarea_update.tarea,
      description: tarea_update.description,
      fecha: tarea_update.fecha
    }))
    // updateTarea(id,task)
  }

  useEffect(() => {
    getTareas().then((response) => { setTareas(response) })
  }, []);




  return (
    <div className="flex flex-row h-screen w-screen">
      <div className="w-1/2 m-2">
        <form onSubmit={handleSubmit} className="flex flex-col border rounded-lg border-gray-600 p-5 h-1/2">
          <label>Tarea</label>
          <input className="p-1 border rounded-lg border-gray-600" name="tarea" onChange={handleChange} value={tarea.tarea} type="text" required />
          <label>Descripción</label>
          <textarea maxLength={120} className="p-1 h-20 resize-none border rounded-lg border-gray-600" name="description" onChange={handleChange} value={tarea.description} required ></textarea>
          <label>Fecha</label>
          <input className="p-1 border rounded-lg border-gray-600" name="fecha" onChange={handleChange} value={tarea.fecha} type="date" required />
          <button type="submit" className="bg-slate-300 border h-10 rounded-lg mt-4">{buttonedit ? "Enviar" : "Editar"}</button>
        </form>
      </div>
      <div className="w-1/2 m-2 overflow-auto border rounded-lg border-gray-600 p-2 ">
        {
          tareas.map((task, index) => (
            <div key={index} className="border w-full rounded-lg p-6 mt-1 bg-slate-400">
              {/* <div>{task.idNota}</div> */}
              <div className='flex flex-row justify-between font-semibold mt-2'>
                <div>{task.tarea}</div>
                <div>
                  <button onClick={() => handleUpdate(task.idNota)} className="mr-2"><FaRegEdit /></button>
                  <button onClick={() => handleDelete(task.idNota)}><FaRegTrashCan /></button>
                </div>
              </div>

              <p className="break-words">{task.description}</p>
              <p>{task.fecha}</p>
              <div>
                <button>
                  {task.status ? <MdDone className='bg-green-700 rounded-2xl w-5 h-5' /> :
                    <IoIosCloseCircleOutline className='bg-red-600 rounded-2xl w-5 h-5' />}
                </button>
              </div>
            </div>
          ))
        }
      </div>

    </div>
  );
};

export default HomePage;