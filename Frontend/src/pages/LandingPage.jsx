import { Link } from "react-router-dom";
import { FaUsers, FaTasks, FaBell, FaChartLine } from "react-icons/fa";

const features = [
  {
    icon: <FaTasks className="text-indigo-600 text-3xl" />,
    title: "Manage Assignments",
    desc: "Create and track your tasks and deadlines with ease.",
  },
  {
    icon: <FaUsers className="text-indigo-600 text-3xl" />,
    title: "Group Collaboration",
    desc: "Join or create group tasks and manage team progress.",
  },
  {
    icon: <FaBell className="text-indigo-600 text-3xl" />,
    title: "Instant Notifications",
    desc: "Stay updated with task invites, reminders, and updates.",
  },
  {
    icon: <FaChartLine className="text-indigo-600 text-3xl" />,
    title: "Progress Tracking",
    desc: "Visualize your academic growth and performance.",
  },
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      <section className="text-center px-6 py-20 bg-gradient-to-br from-indigo-600 to-purple-700 text-white">
        <h1 className="text-5xl font-extrabold mb-4">
          Welcome to Study-Buddy 📚
        </h1>
        <p className="text-xl mb-8">
          Your personal assistant for assignments, to-dos, and group projects.
        </p>
        <div className="space-x-4">
          <Link to="/login">
            <button className="bg-white text-indigo-700 px-8 py-2.5 rounded-full font-semibold shadow hover:bg-gray-200">
              Login
            </button>
          </Link>
          <Link to="/register">
            <button className="bg-indigo-900 text-white px-8 py-2.5 rounded-full font-semibold shadow hover:bg-indigo-800">
              Register
            </button>
          </Link>
        </div>
      </section>

      <section className="px-6 py-16 bg-gray-50 text-center">
        <h2 className="text-3xl font-bold mb-10">Features at a Glance</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {features.map((feat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
            >
              <div className="mb-4">{feat.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feat.title}</h3>
              <p className="text-gray-600">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-10">How It Works</h2>
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h3 className="text-xl font-semibold">1. Create Your Account</h3>
            <p className="text-gray-600">
              Sign up with your details and get started in seconds.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">2. Start Adding Tasks</h3>
            <p className="text-gray-600">
              Add assignments and todos, or collaborate with your study group.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold">3. Stay on Track</h3>
            <p className="text-gray-600">
              Receive reminders, track progress, and never miss a deadline.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-indigo-700 text-white py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Ready to enhance Study Progress?
        </h2>
        <p className="mb-8 text-lg">
          Join Study-Buddy and organize your academic life like never before.
        </p>
        <Link to="/register">
          <button className="bg-white text-indigo-700 px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100">
            Get Started Now
          </button>
        </Link>
      </section>

      <footer className="bg-gray-100 text-center py-6 text-sm text-gray-600">
        Built by Yash Dashore • © {new Date().getFullYear()} Study-Buddy
      </footer>
    </div>
  );
};

export default LandingPage;
