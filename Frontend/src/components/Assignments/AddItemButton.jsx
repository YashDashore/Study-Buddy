const AddItemButton = ({ type, onClick }) => {
  const labelMap = {
    Assignment: "Add Assignment",
    Todos: "Add To-Do",
  };

  return (
    <button
      onClick={onClick}
      className="bg-gray-800 text-white px-7 py-2 rounded-md hover:bg-gray-700 transition text-sm"
    >
      + {labelMap[type] || "Add Study Session"}
    </button>
  );
};

export default AddItemButton;
