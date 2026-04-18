import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import { createTask } from "../interfaces/task";

function Home() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  const petals = Array.from({ length: 20 });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("tr-TR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedTime = currentTime.toLocaleTimeString("tr-TR");

  const addOrUpdateTask = () => {
    if (input.trim() === "") return;

    if (editingId) {
      setTasks(
        tasks.map((task) =>
          task.id === editingId ? { ...task, text: input } : task
        )
      );
      setEditingId(null);
    } else {
      const now = new Date();
      const taskTime = now.toLocaleTimeString("tr-TR", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const newTask = {
        ...createTask(Date.now(), input),
        addedTime: taskTime,
      };

      setTasks([...tasks, newTask]);
    }

    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setInput("");
    }
  };

  const editTask = (task) => {
    setInput(task.text);
    setEditingId(task.id);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addOrUpdateTask();
    }
  };

  return (
    <>
      {petals.map((_, i) => (
        <div
          key={i}
          className="petal"
          style={{
            left: Math.random() * 100 + "vw",
            animationDuration: 5 + Math.random() * 5 + "s",
            animationDelay: Math.random() * 5 + "s",
          }}
        >
          🌼
        </div>
      ))}

      <div className="gradient-bg min-vh-100 d-flex align-items-center py-5">
        <div className="container position-relative">
          <div className="row justify-content-center">
            <div className="col-12 col-md-10 col-lg-8">
              <div className="text-center mb-4 text-white">
                <h1 className="display-4 fw-bold">Günlük Planlayıcı 🗓️</h1>
                <p className="lead mb-0">
                  Günlük görevlerini ekle, düzenle ve takip et.
                </p>
              </div>

              <div className="text-center text-white mb-4">
                <h4 className="fw-semibold text-capitalize">{formattedDate}</h4>
                <h2 className="fw-bold">{formattedTime}</h2>
              </div>

              <TaskForm
                input={input}
                setInput={setInput}
                addOrUpdateTask={addOrUpdateTask}
                editingId={editingId}
                handleKeyDown={handleKeyDown}
              />

              <div className="mb-3 text-white fw-semibold">
                Toplam Plan: {tasks.length}
              </div>

              <TaskList
                tasks={tasks}
                editTask={editTask}
                deleteTask={deleteTask}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;