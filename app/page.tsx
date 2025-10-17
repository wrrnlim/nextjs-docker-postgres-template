import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  toggleTodo,
} from "./actions";

export default async function Home() {
  const todos = await getTodos();

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Todo List</h1>

      <form action={addTodo} className="mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            name="text"
            placeholder="Add a new todo..."
            className="flex-1 px-4 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
      </form>

      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center gap-2 p-4 border rounded"
          >
            <form action={toggleTodo}>
              <input type="hidden" name="id" value={todo.id} />
              <input
                type="hidden"
                name="completed"
                value={String(todo.completed)}
              />
              <button type="submit" className="flex items-center">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                  className="w-5 h-5 pointer-events-none"
                />
              </button>
            </form>

            <form action={updateTodo} className="flex-1 flex gap-2">
              <input type="hidden" name="id" value={todo.id} />
              <input
                type="text"
                name="text"
                defaultValue={todo.text}
                className="flex-1 px-2 py-1 border rounded"
              />
              <button
                type="submit"
                className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Save
              </button>
            </form>

            <form action={deleteTodo}>
              <input type="hidden" name="id" value={todo.id} />
              <button
                type="submit"
                className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </form>
          </div>
        ))}
      </div>
    </main>
  );
}
