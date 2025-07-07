import { Pencil, Trash2 } from "lucide-react";

const TaskCard = ({
  title,
  subject,
  deadline,
  status,
  Total_topics,
  Covered_topics,
  Remaining_topics,
  PercentageProgress,
  onStatusChange,
  onEdit,
  onDelete,
  type,
}) => {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg flex justify-between items-start w-[85%]">
      <div>
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        {subject && (
          <p
            className={`text-base text-gray-500 ${
              type === "Study Progress" ? "font-bold text-lg" : ""
            }`}
          >
            Subject : {subject}
          </p>
        )}
        {deadline && (
          <p className="text-base text-red-500">
            Deadline : {new Date(deadline).toLocaleDateString("en-GB")}
          </p>
        )}
        {type !== "Study Progress"
          ? status && (
              <div className="mt-2">
                <label
                  htmlFor="status"
                  className="text-base text-gray-600 mr-2"
                >
                  Status:
                </label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => onStatusChange(e.target.value)}
                  className={`border border-gray-300 rounded px-2 py-1 text-base
    ${status === "completed" ? "text-green-600" : "text-yellow-600"}`}
                >
                  <option className="text-yellow-600" value="pending">
                    Pending
                  </option>
                  <option className="text-green-600" value="completed">
                    Completed
                  </option>
                </select>
              </div>
            )
          : null}
        {Total_topics && (
          <p className="text-base text-gray-500">
            Total topics : {Total_topics}
          </p>
        )}
        {Covered_topics && (
          <p className="text-base text-green-500">
            Covered topics : {Covered_topics}
          </p>
        )}
        {Remaining_topics && (
          <p className="text-base text-red-500">
            Remaining topics : {Remaining_topics}
          </p>
        )}
        {PercentageProgress && (
          <div className="text-base">
            <p>Percentage Progress: {PercentageProgress}%</p>
            <div className="w-[250px] bg-gray-300 rounded-full h-3 mt-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${PercentageProgress}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onEdit}
          className="p-1 rounded hover:bg-gray-100 transition"
          title="Edit"
        >
          <Pencil className="w-6 h-8 text-blue-600" />
        </button>

        <button
          onClick={onDelete}
          className="p-1 rounded hover:bg-gray-100 transition"
          title="Delete"
        >
          <Trash2 className="w-6 h-8 text-red-600" />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
