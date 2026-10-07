import { useEffect, useState } from 'react';

import { useUser } from '../../userContext';

import Navbar from '../Navbar/Navbar';

import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import './MyTodos.css'
import {
  getUserTodos,
  addTodo,
  updateTodo,
  deleteTodo
} from './services/todos';

import type {
  Todo,
  CreateTodoData
} from './types/todo.ts';

const MyTodos = () => {

  const { currentId } = useUser();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [editingId, setEditingId] = useState<number | null>(null);

  const fetchTodos = async () => {

    if (!currentId) {
      return;
    }

    try {

      setLoading(true);

      const data = await getUserTodos(
        Number(currentId)
      );

      setTodos(data);

    } catch (error) {

      console.error(
        'Error fetching todos:',
        error
      );

    } finally {

      setLoading(false);

    }
  };


  useEffect(() => {

    if (!currentId) {
      return;
    }

    fetchTodos();

  }, [currentId]);

  const handleAdd = async (
    data: CreateTodoData
  ): Promise<void> => {

    try {

      const newTodo = await addTodo(
        Number(currentId),
        data
      );

      setTodos((prev) => [
        ...prev,
        newTodo
      ]);

    } catch (error) {

      console.error(
        'Error adding todo:',
        error
      );

    }
  };

  const handleDelete = async (
    id: number
  ): Promise<void> => {

    try {

      await deleteTodo(id);

      setTodos((prev) =>
        prev.filter(
          (todo) => todo.id !== id
        )
      );

    } catch (error) {

      console.error(
        'Error deleting todo:',
        error
      );

    }
  };

  const handleEdit = (todo: Todo): void => {

    setEditingId(todo.id);

  };

  const handleCancel = (): void => {

    setEditingId(null);

  };

  const handleUpdate = async (
    id: number,
    title: string,
  ): Promise<void> => {

    try {

      const updatedTodo = await updateTodo(
        id,
        {
          title,
        }
      );

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                ...updatedTodo
              }
            : todo
        )
      );

      setEditingId(null);

    } catch (error) {

      console.error(
        'Error updating todo:',
        error
      );

    }
  };

  const handleToggle = async (
    todo: Todo
  ): Promise<void> => {

    try {

      const updatedTodo = await updateTodo(
        todo.id,
        {
          completed: !todo.completed
        }
      );

      setTodos((prev) =>
        prev.map((item) =>
          item.id === todo.id
            ? {
                ...item,
                ...updatedTodo
              }
            : item
        )
      );

    } catch (error) {

      console.error(
        'Error updating todo status:',
        error
      );

    }
  };

  if (!currentId) {
    return (
      <h1>
        No user selected.
        Please go back and choose a user.
      </h1>
    );
  }

  if (loading) {
    return <h1>Loading todos...</h1>;
  }


  return (
    <>
      <Navbar />

      <div className="my-todos-container">

        <h1 className="my-todos-title">
          User {currentId}'s Todos
        </h1>

        <TodoForm
          onAdd={handleAdd}
        />

        <TodoList
          todos={todos}
          editingId={editingId}
          onEdit={handleEdit}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
          onDelete={handleDelete}
          onToggle={handleToggle}
        />

      </div>
    </>
  );
};

export default MyTodos;