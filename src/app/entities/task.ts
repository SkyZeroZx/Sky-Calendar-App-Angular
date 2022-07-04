export interface ITaskResponse {
  id: string;
  title: string;
  description?: string;
  backgroundColor?: string;
  borderColor?: string;
  display?: string;
  start: string;
  end: string;
}
export interface IRegisterTask {
  title: string;
  codType: number;
  description: string;
  dataRange: [];
  user: [];
}

export interface ICodTask {
  codTask: number;
}

export interface IUserByTask {
  id: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}
export interface IAddUserTask{
  codUser: number;
  codTask: number;
}