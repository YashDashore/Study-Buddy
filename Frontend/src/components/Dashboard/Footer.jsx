const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-100 p-6 py-12">
      <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
        <div>
          <h2 className="text-lg font-bold">Study-Buddy</h2>
          <p className="text-sm mt-2">
            Study-Buddy is a MERN based web where you can track your
            assignments, daily to-dos and group task.
          </p>
          <h2 className="text-lg font-bold">Future Advancements </h2>
          <ul className="text-sm">
            <li>Integrate ChatGPT</li>
            <li>Attendance Tracking</li>
            <li>Group Chat</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-3">
            <li>
              <a href="#" className="text-gray-200 hover:underline">
                Dashboard
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-200 hover:underline">
                Assignments
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-200 hover:underline">
                Group Tasks
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Contact</h3>
          <p className="text-sm mb-1">📧 yash.dashore1@email.com</p>
          <p className="text-sm">📞 +91- 8871343163 </p>
          <p className="text-sm mt-2">
            © {new Date().getFullYear()} Study-Buddy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
