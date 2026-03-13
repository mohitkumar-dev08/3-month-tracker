import QuoteBanner from "../components/common/QuoteBanner";
import TodoMaster from "../components/tasks/TodoMaster";

export default function TasksPage({ streak }) {
  return (
    <div className="tasks-page">
      <QuoteBanner streak={streak} />
      <TodoMaster />
    </div>
  );
}