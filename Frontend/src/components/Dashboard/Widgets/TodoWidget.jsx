import InfoCard from "../InfoCard";
import WidgetLayout from "../WidgetLayout";
import { useEffect, useState } from "react";
import { fetchUserTodos } from "../../../services/assignments";

const TodoWidget = () => {
    const [todos, setTodos] = useState([]);
    
      useEffect(() => {
        const getTodos = async () => {
          try {
            const data = await fetchUserTodos();
            setTodos(data.slice(0, 1));
          } catch (error) {
            console.error("❌ Error fetching to-dos:", error);
          }
        };
        getTodos();
      }, []);
    
    return (
         <WidgetLayout
      title="To-dos"
      data={todos}
      viewAllLink="/todos"
      renderItem={(item) => (
        <InfoCard
          key={item._id}
          title={item.title}
          subject={item.subject}
          status={item.status}
        />
      )}
    />
    );
};

export default TodoWidget;
