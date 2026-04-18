function TaskForm({
  input,
  setInput,
  addOrUpdateTask,
  editingId,
  handleKeyDown,
}) {
  return (
    <div className="card shadow-sm p-4 mb-4 border-0 rounded-4">
      <h2 className="h4 mb-3 text-center">
        {editingId ? "Planı Güncelle" : "Yeni Plan Ekle"}
      </h2>

      <div className="input-group">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="Plan yaz..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className={`btn ${editingId ? "btn-warning" : "btn-primary"} px-4`}
          onClick={addOrUpdateTask}
        >
          {editingId ? "Güncelle" : "Ekle"}
        </button>
      </div>
    </div>
  );
}

export default TaskForm;