import API from "../../services/api";
import AppIcon from "../AppIcon/AppIcon";
import { useNotification } from "../../context/useNotification";

const priorityLabels = {
  high: "High",
  medium: "Medium",
  low: "Low",
};

function TaskCard({
  task,
  refreshTasks,
  setSelectedTask,
  setIsModalOpen,
}) {
  const { notify } = useNotification();
  const priority = (task.priority || "medium").toLowerCase();
  const isDone = task.stage === "done";

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/tasks/${task.id}`);
      await refreshTasks();

      notify({
        type: "success",
        title: "Task deleted",
        message: `"${task.title}" was removed from your board.`,
      });
    } catch (error) {
      console.error(error);

      notify({
        type: "error",
        title: "Delete failed",
        message: "Could not delete this task.",
      });
    }
  };

  return (
    <article className={`task-card ${isDone ? "task-card--done" : ""}`}>
      <h3>{task.title}</h3>

      <p>{task.description || "No description added"}</p>

      <div className="task-card__footer">
        <span className={`priority-chip priority-chip--${priority}`}>
          {priorityLabels[priority] || "Medium"}
        </span>

        <div className="task-actions">
          <button
            className="icon-button"
            type="button"
            onClick={() => {
              setSelectedTask(task);
              setIsModalOpen(true);
            }}
            aria-label={`Edit ${task.title}`}
            title="Edit task"
          >
            <AppIcon name="edit" />
          </button>

          <button
            className="icon-button"
            type="button"
            onClick={handleDelete}
            aria-label={`Delete ${task.title}`}
            title="Delete task"
          >
            <AppIcon name="delete" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default TaskCard;
