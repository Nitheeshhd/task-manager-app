import { useState } from "react";
import API from "../../services/api";
import AppIcon from "../AppIcon/AppIcon";
import { useNotification } from "../../context/useNotification";

const getInitialForm = (task) => ({
  title: task?.title || "",
  description: task?.description || "",
  stage: task?.stage || "todo",
  priority: (task?.priority || "medium").toLowerCase(),
});

function TaskModal({
  isOpen,
  onClose,
  refreshTasks,
  selectedTask,
}) {
  const { notify } = useNotification();
  const [formData, setFormData] = useState(() =>
    getInitialForm(selectedTask)
  );
  const [saving, setSaving] = useState(false);

  const { title, description, stage, priority } = formData;

  const updateForm = (field, value) => {
    setFormData((current) => ({
      ...current,
      [field]: value,
    }));
  };

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      stage,
      priority,
    };

    try {
      setSaving(true);

      if (selectedTask) {
        await API.put(`/tasks/${selectedTask.id}`, payload);
      } else {
        await API.post("/tasks", payload);
      }

      await refreshTasks();

      notify({
        type: "success",
        title: selectedTask ? "Task updated" : "Task created",
        message: `"${title}" is now on your board.`,
      });

      onClose();
    } catch (error) {
      console.error(error);

      notify({
        type: "error",
        title: selectedTask ? "Update failed" : "Create failed",
        message: "Please check the task details and try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" role="presentation">
      <section className="task-modal" aria-labelledby="task-modal-title">
        <header className="task-modal__header">
          <h2 id="task-modal-title">
            {selectedTask
              ? "Edit task"
              : "Create new task"}
          </h2>

          <button
            className="icon-button"
            type="button"
            onClick={onClose}
            aria-label="Close task modal"
            title="Close"
          >
            <AppIcon name="close" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="task-form">
          <label className="field-group">
            <span>Task title</span>
            <input
              type="text"
              placeholder="What needs to be done?"
              value={title}
              onChange={(e) =>
                updateForm("title", e.target.value)
              }
              required
            />
          </label>

          <label className="field-group">
            <span>Description</span>
            <textarea
              placeholder="Add more details (optional)"
              value={description}
              onChange={(e) =>
                updateForm("description", e.target.value)
              }
              rows="4"
            />
          </label>

          <div className="form-grid">
            <label className="field-group">
              <span>Stage</span>
              <select
                value={stage}
                onChange={(e) =>
                  updateForm("stage", e.target.value)
                }
              >
                <option value="todo">
                  Todo
                </option>
                <option value="inprogress">
                  In Progress
                </option>
                <option value="done">
                  Done
                </option>
              </select>
            </label>

            <label className="field-group">
              <span>Priority</span>
              <select
                value={priority}
                onChange={(e) =>
                  updateForm("priority", e.target.value)
                }
              >
                <option value="low">
                  Low
                </option>
                <option value="medium">
                  Medium
                </option>
                <option value="high">
                  High
                </option>
              </select>
            </label>
          </div>

          <div className="modal-actions">
            <button
              className="tertiary-button"
              type="button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              className="primary-button"
              type="submit"
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : selectedTask
                  ? "Save changes"
                  : "Create task"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default TaskModal;
