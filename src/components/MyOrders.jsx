import {useSelectedStore} from '../store/useSelectedStore';


export  function MyOrders() {
  const selectedTasks = useSelectedStore((state) => state.selectedTasks)
  const removeTask = useSelectedStore((state) => state.removeTask);
  const clearAll = useSelectedStore((state) => state.clearAll);

  return (
    <div className='column'> 
    <div className="column-header">
      <h2>Мщи заказы (выбрано:{selectedTasks.length})</h2>
      {selectedTasks.length > 0 && (
<button className='btn btn-danger-outline'
onClick={clearAll}>
  Очистить все
</button>
      )}
    </div>

    {selectedTasks.length === 0 ? (
        <p className="empty-text">Вы пока не выбрали ни одного заказа.</p>
      ) : (
        <ul className="order-list">
          {selectedTasks.map((task) => (
            <li key={task.id} className="order-item selected-item">
              <span className="order-title">
                <strong>#{task.id}</strong> {task.title}
              </span>
              <button
                className="btn btn-danger"
                onClick={() => removeTask(task.id)}
              >
                Отказаться
              </button>
            </li>
          ))}
        </ul>
      )}
  </div>
  )
}
