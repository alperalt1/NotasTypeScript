import apiClient from "./Api";

interface Tarea {
  idNota: number;
  tarea: string;
  description: string;
  fecha: string;
  status: boolean;
}

export const postTarea = (task: Omit<Tarea, "idtarea">) => {
  return apiClient.post('/api/nota', task)
    .then((response) => { console.log('Tarea enviada con éxito:', response.data) })
    .catch((error) => { console.error("Ocurrió un error:", error) })
}

export const getTareas = () => {
  return apiClient.get<Tarea[]>('/api/nota')
    .then((response) => {
      console.log('Tareas obtenidas con éxito:', response.data);
      return response.data
    })
    .catch((error) => {
      console.error('Ocurrió un error:', error);
      throw error;
    });
}

export const deleteTarea = (id: number) => {
  return apiClient.delete(`/api/nota/${id}`)
    .then((response) => { console.log('Tarea eliminada con exito', response.data) })
    .catch((error) => { console.error("Ocurrió un error:", error) })
}

export const updateTarea = (id: number, task: Tarea) => {
  return apiClient.put(`/api/nota/${id}`, task)
    .then((response) => { console.log('Tarea eliminada con exito', response.data) })
    .catch((error) => { console.error("Ocurrió un error:", error) })
}