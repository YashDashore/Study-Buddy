import { useState } from "react";
import Navbar from "../../components/Dashboard/Navigation/NavBars/Navbar"
import Sidebar from "../../components/Dashboard/Navigation/NavBars/Sidebar";
import Footer from "../../components/Dashboard/Layouts/Footer";
import { Mail } from "lucide-react";

const ContactUs = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thanks for reaching out! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-purple-100">
      <div>
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar isOpen={sidebarOpen} />
      </div>
      <div className="max-w-3xl bg-purple-100 mx-auto px-6 py-12 mb-28">
        <div className="flex items-center justify-center gap-3 mb-6">
          <h1 className="flex items-center justify-center gap-3 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-tight">
            <Mail className="w-9 h-9 text-purple-600" />
            Contact Us
          </h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white p-6 border-2 shadow-md rounded-xl"
        >
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-base font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              required
              value={form.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <button
            type="submit"
            className="bg-gray-800 text-white py-2 px-8 rounded hover:bg-gray-700 transition mx-auto block"
          >
            Send Message
          </button>
        </form>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ContactUs;
