import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../services/api";

import Sidebar from "../../components/Sidebar/Sidebar";
import TaskCard from "../../components/TaskCard/TaskCard";
import TaskModal from "../../components/TaskModal/TaskModal";
import AppIcon from "../../components/AppIcon/AppIcon";
import { useNotification } from "../../context/useNotification";

const boardColumns = [
  {
    stage: "todo",
    title: "Todo",
    tone: "neutral",
  },
  {
    stage: "inprogress",
    title: "In Progress",
    tone: "blue",
  },
  {
    stage: "done",
    title: "Done",
    tone: "green",
  },
];

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

function Dashboard() {
  const navigate = useNavigate();
  const { notify } = useNotification();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = useMemo(() => getStoredUser(), []);

  const groupedTasks = useMemo(
    () =>
      boardColumns.reduce((groups, column) => {
        groups[column.stage] = tasks.filter(
          (task) => task.stage === column.stage
        );
        return groups;
      }, {}),
    [tasks]
  );

  const stats = useMemo(
    () => [
      {
        label: "Total",
        value: tasks.length,
        tone: "primary",
      },
      {
        label: "Todo",
        value: groupedTasks.todo?.length || 0,
        tone: "blue",
      },
      {
        label: "In Progress",
        value: groupedTasks.inprogress?.length || 0,
        tone: "orange",
      },
      {
        label: "Done",
        value: groupedTasks.done?.length || 0,
        tone: "green",
      },
    ],
    [groupedTasks, tasks.length]
  );

  const fetchTasks = useCallback(async () => {
    try {
      const response = await API.get("/tasks");
      setTasks(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching tasks:", error);

      notify({
        type: "error",
        title: "Tasks unavailable",
        message: "Could not load your task board right now.",
      });
    } finally {
      setLoading(false);
    }
  }, [notify]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchTasks();
  }, [fetchTasks]);

  const openCreateModal = () => {
    setSelectedTask(null);
    setIsModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    notify({
      type: "success",
      title: "Signed out",
      message: "You have been logged out.",
    });

    navigate("/");
  };

  if (loading) {
    return (
      <main className="dashboard-page">
        <p className="page-kicker">
          DASHBOARD - KANBAN BOARD
        </p>

        <section className="app-frame app-frame--loading">
          <div className="loading-state">
            Loading tasks...
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <p className="page-kicker">
        DASHBOARD - KANBAN BOARD
      </p>

      <section className="app-frame">
        <Sidebar user={user} onLogout={handleLogout} />

        <div className="board-panel">
          <header className="board-header">
            <h1>Task Board</h1>

            <button
              className="secondary-button"
              type="button"
              onClick={openCreateModal}
            >
              <AppIcon name="plus" />
              <span>New task</span>
            </button>
          </header>

          <div className="board-content">
            <section className="stat-grid" aria-label="Task statistics">
              {stats.map((stat) => (
                <article
                  className={`stat-card stat-card--${stat.tone}`}
                  key={stat.label}
                >
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </article>
              ))}
            </section>

            <section className="kanban-grid" aria-label="Task board">
              {boardColumns.map((column) => {
                const columnTasks = groupedTasks[column.stage] || [];

                return (
                  <article className="kanban-column" key={column.stage}>
                    <header className="kanban-column__header">
                      <div>
                        <span
                          className={`status-dot status-dot--${column.tone}`}
                        />
                        <h2>{column.title}</h2>
                      </div>

                      <span className="count-pill">
                        {columnTasks.length}
                      </span>
                    </header>

                    <div className="kanban-column__body">
                      {columnTasks.length > 0 ? (
                        columnTasks.map((task) => (
                          <TaskCard
                            key={task.id}
                            task={task}
                            refreshTasks={fetchTasks}
                            setSelectedTask={setSelectedTask}
                            setIsModalOpen={setIsModalOpen}
                          />
                        ))
                      ) : (
                        <div className="empty-column">
                          No tasks yet
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </section>
          </div>
        </div>
      </section>

      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          refreshTasks={fetchTasks}
          selectedTask={selectedTask}
        />
      )}
    </main>
  );
}

export default Dashboard;
