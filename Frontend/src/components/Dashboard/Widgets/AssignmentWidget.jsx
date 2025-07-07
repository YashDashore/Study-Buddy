import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserAssignments } from "../../../services/assignments";
import InfoCard from "../InfoCard";
import WidgetLayout from "../WidgetLayout";
import AnimatedContent from "../Animations/AnimatedContent";

const AssignmentWidget = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const getAssignments = async () => {
      try {
        const data = await fetchUserAssignments();
        setAssignments(data.slice(0, 1));
      } catch (error) {
        console.error("❌ Error fetching assignments:", error);
      }
    };
    getAssignments();
  }, []);

  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("/assignments"); // 👈 Redirect to 'View All' page
  };

  return (
    <AnimatedContent
      blur={true}
      duration={1000}
      easing="ease-out"
      initialOpacity={0}
    >
      <div>
        <WidgetLayout
          title="Assignments"
          data={assignments}
          viewAllLink="/assignments"
          renderItem={(item) => (
            <InfoCard
              key={item._id}
              title={item.title}
              subject={item.subject}
              status={item.status}
              deadline={item.deadline}
              onEdit={() => handleEdit(item)}
            />
          )}
        />
      </div>
    </AnimatedContent>
  );
};

export default AssignmentWidget;
