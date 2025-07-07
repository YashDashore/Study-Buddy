const InfoCard = ({
  title,
  subject,
  status,
  deadline,
  PercentageProgress,
  Total_topics,
  onEdit,
  Covered_topics,
  Remaining_topics,
}) => {
  return (
    <div className="border-3 border-gray-100 p-4 flex flex-col gap-2 bg-white shadow-md ">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      {subject && (
        <p className="text-[0.9rem] text-gray-700">Subject: {subject}</p>
      )}
      {status && (
        <p className="text-[0.9rem] text-yellow-600">Status: {status}</p>
      )}
      {Total_topics !== undefined && (
        <p className="text-[0.9rem] text-gray-700">
          Total topics : {Total_topics}
        </p>
      )}
      {Covered_topics !== undefined && (
        <p className="text-[0.9rem] text-green-600">
          Covered topics : {Covered_topics}
        </p>
      )}
      {Remaining_topics !== undefined && (
        <p className="text-[0.9rem] text-red-600">
          Remaining topics : {Remaining_topics}
        </p>
      )}
      {PercentageProgress !== undefined && (
        // <span className="text-sm text-gray-500">{PercentageProgress}%</span>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${PercentageProgress}%` }}
          />
        </div>
      )}
      {deadline && (
        <p className="text-[0.9rem] text-red-600">
          Deadline: {new Date(deadline).toLocaleDateString()}
        </p>
      )}
      <div className="ms flex justify-end">
        <button
          className="border border-white px-4 py-1.5 rounded-xl text-white bg-black transition"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default InfoCard;
