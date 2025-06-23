import { useEffect, useState } from "react";
import { fetchUserAssignments } from "../../../services/assignments";
import InfoCard from "../InfoCard";
import WidgetLayout from "../WidgetLayout";

const AssignmentWidget = () => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const getAssignments = async () => {
      try {
        const data = await fetchUserAssignments();
        console.log("📦 fetched data:", data); // <== Add this
        setAssignments(data.slice(0, 1));
      } catch (error) {
        console.error("❌ Error fetching assignments:", error);
      }
    };
    getAssignments();
  }, []);

  return (
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
        />
      )}
    />
  );
};

export default AssignmentWidget;
