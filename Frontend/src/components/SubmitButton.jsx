function SubmitButton({ label = "Submit" }) {
  return (
    <button
      type="submit"
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      {label}
    </button>
  );
}

export default SubmitButton;
