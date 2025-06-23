const WidgetLayout = ({ title, data, renderItem, viewAllLink }) => {
  return (
    <div className="bg-white text-black border-2 border-gray-200 p-4 rounded-3xl w-full max-w-md mx-auto">
      <h2 className="text-center text-xl font-handwriting mb-6">{title}</h2>

      {data.length > 0 ? (
        data.map(renderItem)
      ) : (
        <p className="text-sm text-center text-gray-400">
          No {title.toLowerCase()} found.
        </p>
      )}

      <div className="mt-4 flex justify-center">
  <a
    href={viewAllLink}
    className="bg-blue-500 text-white px-9 py-2 rounded-xl text-sm font-medium hover:bg-blue-600 transition duration-200"
  >
    View All
  </a>
</div>

    </div>
  );
};

export default WidgetLayout;
