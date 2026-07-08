function ComingSoon({ title }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-500">This page is coming soon.</p>
    </div>
  );
}

export default ComingSoon;