import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";

const tabs = [
  {
    title: "Group Tasks",
    content: "Finalize project, Meet with group...",
    path: "/groupTask",
  },
  {
    title: "Attendance Tracker",
    content: "Track and manage your attendance",
    path: "/attendanceTracker",
  },
  {
    title: "Study Progress",
    content: "Check your Study progress and sessions",
    path: "/studyProgress",
  },
];

const SlidingTabs = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % tabs.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-red-200 p-4 border-2 rounded-xl shadow-xl w-full h-[220px] mx-auto flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full h-full flex items-center justify-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={tabs[activeIndex].title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="w-full h-full"
          >
            <Link
              to={tabs[activeIndex].path}
              className="block w-full h-full no-underline text-inherit"
            >
              <h2 className="text-2xl font-bold mb-2 text-black">
                {tabs[activeIndex].title}
              </h2>
              <p className="text-base tracking-wide text-gray-700">
                {tabs[activeIndex].content}
              </p>
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SlidingTabs;
