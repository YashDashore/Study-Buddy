import { useEffect, useState } from "react";
import { fetchUserStudySessions } from "../../../services/assignments";
import InfoCard from "../InfoCard";
import WidgetLayout from "../WidgetLayout";
import { useNavigate } from "react-router-dom";
import AnimatedContent from "../Animations/AnimatedContent";

const StudyProgress = () => {
  const [sp, setSP] = useState([]);

  useEffect(() => {
    const getSession = async () => {
      try {
        const data = await fetchUserStudySessions();
        console.log("📦 fetched data:", data); // <== Add this
        setSP(data.slice(0, 1));
      } catch (error) {
        console.error("❌ Error fetching Study sessions : ", error);
      }
    };
    getSession();
  }, []);

  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("/studyProgress"); // 👈 Redirect to 'View All' page
  };

  return (
    <AnimatedContent
  blur={true} duration={1000} easing="ease-out" initialOpacity={0}>
    <WidgetLayout
      title="Study Progress"
      data={sp}
      viewAllLink="/studyProgress"
      renderItem={(item) => (
        <InfoCard
          key={item._id}
          subject={item.Subject}
          status={item.status}
          PercentageProgress = {item.PercentageProgress}
          Total_topics = {item.Total_topics}
          Covered_topics = {item.Covered_topics}
          Remaining_topics ={item.Remaining_topics}
          onEdit={()=>handleEdit(item)}
        />
      )}
    />
    </AnimatedContent>
  );
};

export default StudyProgress;
