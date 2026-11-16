import { useQuery } from '@tanstack/react-query';
import { useSelectedStore } from '../store/useSelectedStore';

const fetchOrders = async () => {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/todos?_limit=15'
  );
  if (!response.ok) {
    throw new Error('Не удалось загрузить список заказов');
  }
  return response.json();
};

export function TaskList() {
  const { data: orders, isLoading, isError, error } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });

  const selectedTasks = useSelectedStore((state) => state.selectedTasks);
  const addTask = useSelectedStore((state) => state.addTask);

  if (isLoading) {
    return (
      <div className="column">
        <h2>Все заказы</h2>
        <div className="status-box">
          <span className="loader"></span>
          <p>Загрузка...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="column">
        <h2>Все заказы</h2>
        <div className="error-box">Ошибка: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="column">
      <h2>Все заказы ({orders.length})</h2>
      <ul className="order-list">
        {orders.map((order) => {
          const isSelected = selectedTasks.some((item) => item.id === order.id);

          return (
            <li key={order.id} className="order-item">
              <span className="order-title">
                <strong>#{order.id}</strong> {order.title}
              </span>
              <button
                className="btn btn-primary"
                disabled={isSelected}
                onClick={() => addTask(order)}
              >
                {isSelected ? 'Уже выбрано' : 'Взять в работу'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}