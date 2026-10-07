import {
  getData,
  postData,
  patchData,
  deleteData
} from '../../../../core/http_methods';

import {
  base_url,
  my_todos_url
} from '../../../../core/end_points';

import type {
  Todo,
  CreateTodoData,
  UpdateTodoData
} from '../types/todo';


export const getUserTodos = async (
  userId: number
): Promise<Todo[]> => {

  const response = await getData(
    `${base_url}${my_todos_url}?userId=${userId}`
  );

  return response.data || response;
};


export const addTodo = async (
  userId: number,
  data: CreateTodoData
): Promise<Todo> => {

  const response = await postData(
    `${base_url}${my_todos_url}`,
    {
      userId,
      title: data.title,
      completed: false
    }
  );

  return response.data || response;
};


export const updateTodo = async (
  id: number,
  data: UpdateTodoData
): Promise<Todo> => {

  const response = await patchData(
    `${base_url}${my_todos_url}/${id}`,
    data
  );

  return response.data || response;
};


export const deleteTodo = async (
  id: number
): Promise<void> => {

  await deleteData(
    `${base_url}${my_todos_url}/${id}`
  );
};