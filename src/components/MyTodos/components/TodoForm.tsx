import { useState } from 'react';
import type { FormEvent } from 'react';
import type { CreateTodoData } from '../types/todo';

interface TodoFormProps {
  onAdd: (data: CreateTodoData) => Promise<void>;
}

const TodoForm = ({ onAdd }: TodoFormProps) => {
  const [title, setTitle] = useState<string>('');

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    await onAdd({
      title: title.trim()
    });

    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className='todo-form'>
      <input
        type="text"
        placeholder="Todo title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button type="submit">
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;