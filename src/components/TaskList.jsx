function TaskList({ tasks, editTask, deleteTask }) {
  if (tasks.length === 0) {
    return (
      <div className="alert alert-light text-center shadow-sm rounded-4">
        Henüz plan eklenmedi.
      </div>
    );
  }

  return (
    <div className="d-flex flex-column gap-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="card border-0 shadow-sm rounded-4 p-3"
        >
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div>
              <div className="fs-5 text-dark">{task.text}</div>
              <small className="text-muted">
                Eklenme saati: {task.addedTime}
              </small>
            </div>

            <div className="d-flex gap-2">
              <button
                className="btn btn-outline-warning"
                onClick={() => editTask(task)}
              >
                Düzenle
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={() => deleteTask(task.id)}
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;