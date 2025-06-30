import InfoCard from "../InfoCard";
import WidgetLayout from "../WidgetLayout";
import { useEffect, useState } from "react";
import { fetchUserTodos } from "../../../services/assignments";
import AnimatedContent from "../Animations/AnimatedContent";

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
    <AnimatedContent
      blur={true}
      duration={1000}
      easing="ease-out"
      initialOpacity={0}
    >
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
    </AnimatedContent>
  );
};

export default TodoWidget;
