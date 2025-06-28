import { useEffect, useState } from "react";
import { fetchUserStudySessions } from "../../../services/assignments";
import InfoCard from "../InfoCard";
import WidgetLayout from "../WidgetLayout";

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

  return (
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
        />
      )}
    />
  );
};

export default StudyProgress;
