import { useEffect, useState } from 'react';
import api from "./api/axios";
import CrudTask from './crudTask';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/tasks');
      setTasks(response.data);
    } catch (err) {
      setError('Failed to load tasks. Please check if the backend is running.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();

    if (!newTaskTitle.trim()) {
      setError('Task title cannot be empty');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await api.post('/tasks', {
        title: newTaskTitle.trim(),
        isDone: false
      });
      setTasks([...tasks, response.data]);
      setNewTaskTitle('');
      setSuccessMessage('Task created successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError('Failed to create task');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    ));
    setSuccessMessage('Task updated successfully!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const handleTaskDeleted = (deletedTaskId) => {
    setTasks(tasks.filter(task => task.id !== deletedTaskId));
    setSuccessMessage('Task deleted successfully!');
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  return (
    <div className="tasks-container">
      <h2>Tasks</h2>

      {/* Create Task Form */}
      <form onSubmit={handleCreateTask} className="create-task-form">
        <input
          type="text"
          value={newTaskTitle}
          onChange={(e) => setNewTaskTitle(e.target.value)}
          placeholder="Enter new task..."
          disabled={isLoading}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? '➕ Adding...' : '➕ Add Task'}
        </button>
      </form>

      {/* Messages */}
      {error && <div className="message error">{error}</div>}
      {successMessage && <div className="message success">{successMessage}</div>}

      {/* Loading State */}
      {isLoading && tasks.length === 0 && <p>Loading tasks...</p>}

      {/* Tasks List */}
      {!isLoading && tasks.length === 0 ? (
        <p>No tasks yet. Create one to get started!</p>
      ) : (
        <ul className="tasks-list">
          {tasks.map(task => (
            <CrudTask
              key={task.id}
              task={task}
              onTaskUpdated={handleTaskUpdated}
              onTaskDeleted={handleTaskDeleted}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Tasks;
