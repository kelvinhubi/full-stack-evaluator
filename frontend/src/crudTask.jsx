import { useState } from 'react';
import api from './api/axios';

function CrudTask({ task, onTaskUpdated, onTaskDeleted }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(task.title);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleToggleDone = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await api.put(`/tasks/${task.id}`, {
                ...task,
                isDone: !task.isDone
            });
            onTaskUpdated(response.data);
        } catch (err) {
            setError('Failed to update task');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!editedTitle.trim()) {
            setError('Title cannot be empty');
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            const response = await api.put(`/tasks/${task.id}`, {
                ...task,
                title: editedTitle.trim()
            });
            onTaskUpdated(response.data);
            setIsEditing(false);
        } catch (err) {
            setError('Failed to update task');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this task?')) {
            return;
        }

        setIsLoading(true);
        setError(null);
        try {
            await api.delete(`/tasks/${task.id}`);
            onTaskDeleted(task.id);
        } catch (err) {
            setError('Failed to delete task');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelEdit = () => {
        setEditedTitle(task.title);
        setIsEditing(false);
        setError(null);
    };

    if (isEditing) {
        return (
            <li className="task-item editing">
                <form onSubmit={handleUpdate}>
                    <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        disabled={isLoading}
                        autoFocus
                    />
                    <div className="task-actions">
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? '💾...' : '💾 Save'}
                        </button>
                        <button type="button" onClick={handleCancelEdit} disabled={isLoading}>
                            ❌ Cancel
                        </button>
                    </div>
                </form>
                {error && <span className="error">{error}</span>}
            </li>
        );
    }

    return (
        <li className="task-item">
            <div className="task-content">
                <input
                    type="checkbox"
                    checked={task.isDone}
                    onChange={handleToggleDone}
                    disabled={isLoading}
                />
                <span className={task.isDone ? 'done' : ''}>
                    {task.title}
                </span>
                <span className="status-icon">
                    {task.isDone ? '✅' : '❌'}
                </span>
            </div>
            <div className="task-actions">
                <button onClick={() => setIsEditing(true)} disabled={isLoading}>
                    ✏️ Edit
                </button>
                <button onClick={handleDelete} disabled={isLoading}>
                    {isLoading ? '🗑️...' : '🗑️ Delete'}
                </button>
            </div>
            {error && <span className="error">{error}</span>}
        </li>
    );
}

export default CrudTask;
