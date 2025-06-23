import { useEffect, useState } from "react";

const tabs = [
  { title: "Group Tasks", content: "Finalize project, Meet with group..." },
  { title: "Attendance Tracker", content: "5/7 days this week attended" },
];

const SlidingTabs = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % tabs.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="mt-8 bg-slate-800 p-4 rounded-xl shadow" >
      <h2 className="text-xl font-semibold text-white mb-2">{tabs[activeIndex].title}</h2>
      <p className="text-white">{tabs[activeIndex].content}</p>
    </div>
  );
};

export default SlidingTabs;