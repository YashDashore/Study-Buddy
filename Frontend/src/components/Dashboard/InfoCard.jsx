// const AssignmentCard = ({ title, subject, status, deadline, progress }) => {
//   return (
//     <div className="border-2 border-gray p-4 flex flex-col gap-1">
//       {title && <h3 className="text-lg font-handwriting">{title}</h3>}
//       {subject && <p className="text-sm">{subject}</p>}
//       {status && <p className="text-sm">{status}</p>}
//       {progress !== undefined && (
//         <p className="text-sm text-green-600">Progress: {progress}%</p>
//       )}
//       {deadline && (
//         <p className="text-sm">
//           Deadline: {new Date(deadline).toLocaleDateString()}
//         </p>
//       )}
//       <div className="ms flex justify-end">
//         <button className="border border-white px-4 py-1.5 rounded-xl text-white bg-black transition">
//           Edit
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AssignmentCard;

const InfoCard = ({ title, subject, status, deadline, progress }) => {
  return (
    <div className="border-3 border-gray-100 p-4 flex flex-col gap-2 bg-white shadow-md">
      {title && <h3 className="text-lg font-semibold">{title}</h3>}
      {subject && <p className="text-sm text-gray-700">Subject: {subject}</p>}
      {status && <p className="text-sm text-blue-600">Status: {status}</p>}
      {progress !== undefined && (
        <p className="text-sm text-green-600">Progress: {progress}%</p>
      )}
      {deadline && (
        <p className="text-sm text-red-600">
          Deadline: {new Date(deadline).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default InfoCard;
