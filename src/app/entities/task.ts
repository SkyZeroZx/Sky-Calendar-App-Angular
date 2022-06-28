export interface Task {
  id: string;
  title: string;
  description?: string;
  backgroundColor?: string;
  borderColor?: string;
  display?: string;
  start: string;
  end: string;
}


export interface UserByTask {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}


