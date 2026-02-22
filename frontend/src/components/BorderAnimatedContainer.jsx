function BorderAnimatedContainer({ children }) {
  return (
    <div className="w-full h-full bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/60 flex overflow-hidden">
      {children}
    </div>
  );
}
export default BorderAnimatedContainer;
