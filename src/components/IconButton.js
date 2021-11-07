export const IconButton = ({ icon, children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`p-2 active:bg-gray-900 active:top-px active:ring-indigo-900 active:ring-2 flex gap-x-1 ${className}`}
    >
      {icon}
      {children}
    </button>
  );
};
