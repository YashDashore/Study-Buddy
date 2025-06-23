function SubmitButton({ label = "Submit" }) {
  return (
    <button
      type="submit"
      className="w-full bg-indigo-600 text-white py-2 rounded-xl font-semibold hover:bg-indigo-700 transition duration-200"
    >
      {label}
    </button>
  );
}

export default SubmitButton;
