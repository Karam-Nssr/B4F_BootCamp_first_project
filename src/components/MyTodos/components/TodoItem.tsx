import type { Todo } from '../types/todo.ts';
import EditTodoForm from './EditTodoForm';

interface TodoItemProps {
  todo: Todo;
  isEditing: boolean;

  onEdit: (todo: Todo) => void;

  onUpdate: (
    id: number,
    title: string,
  ) => Promise<void>;

  onCancel: () => void;

  onDelete: (id: number) => Promise<void>;

  onToggle: (todo: Todo) => Promise<void>;
}

const TodoItem = ({
  todo,
  isEditing,
  onEdit,
  onUpdate,
  onCancel,
  onDelete,
  onToggle
}: TodoItemProps) => {

  if (isEditing) {
    return (
      <li>
        <EditTodoForm
          todo={todo}
          onUpdate={onUpdate}
          onCancel={onCancel}
        />
      </li>
    );
  }

  return (
    <li className='todo-item'>

      <h3
        style={{
          textDecoration: todo.completed
            ? 'line-through'
            : 'none'
        }}
      >
        {todo.title}
      </h3>

      <div className="todo-actions">
      <button className="todo-done-button" onClick={() => onToggle(todo)}>
        {todo.completed ? 'Undo' : 'Done'}
      </button>

      <button className="todo-edit-button" onClick={() => onEdit(todo)}>
        Edit
      </button>

      <button className="todo-delete-button" onClick={() => onDelete(todo.id)}>
        Delete
      </button>
      </div>
    </li>
  );
};

export default TodoItem;