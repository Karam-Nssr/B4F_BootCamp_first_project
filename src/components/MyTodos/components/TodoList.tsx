import type { Todo } from '../types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  editingId: number | null;

  onEdit: (todo: Todo) => void;

  onUpdate: (
    id: number,
    title: string
  ) => Promise<void>;

  onCancel: () => void;

  onDelete: (
    id: number
  ) => Promise<void>;

  onToggle: (
    todo: Todo
  ) => Promise<void>;
}

const TodoList = ({
  todos,
  editingId,
  onEdit,
  onUpdate,
  onCancel,
  onDelete,
  onToggle
}: TodoListProps) => {

  if (todos.length === 0) {
    return (
      <p>
        This user hasn't created any todos yet.
      </p>
    );
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isEditing={editingId === todo.id}
          onEdit={onEdit}
          onUpdate={onUpdate}
          onCancel={onCancel}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  );
};

export default TodoList;