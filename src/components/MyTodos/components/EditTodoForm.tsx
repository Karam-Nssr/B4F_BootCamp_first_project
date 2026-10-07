import { useState } from 'react';
import type { FormEvent } from 'react';
import type { Todo } from '../types/todo';

interface EditTodoFormProps {
  todo: Todo;

  onUpdate: (
    id: number,
    title: string
  ) => Promise<void>;

  onCancel: () => void;
}

const EditTodoForm = ({
  todo,
  onUpdate,
  onCancel
}: EditTodoFormProps) => {

  const [title, setTitle] = useState<string>(
    todo.title
  );

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    await onUpdate(
      todo.id,
      title.trim()
    );
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        type="text"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <button type="submit">
        Save
      </button>

      <button
        type="button"
        onClick={onCancel}
      >
        Cancel
      </button>

    </form>
  );
};

export default EditTodoForm;