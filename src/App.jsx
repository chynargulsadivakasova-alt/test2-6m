import { TaskList } from './components/TaskList';
import { MyOrders } from './components/MyOrders';

function App() {
  return (
    <div className="container">
      <header className="header">
        <h1>Трекер заказов «Фриланс-биржа»</h1>
      </header>

      <main className="board">
        <TaskList />
        <MyOrders />
      </main>
    </div>
  );
}

export default App;