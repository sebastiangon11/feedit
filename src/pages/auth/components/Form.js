export const Form = ({ children, ...props }) => (
  <form
    {...props}
    className="max-w-xl mx-auto my-4 mx-3 p-4 rounded-xl border-opacity-80 bg-indigo-800 bg-opacity-10 space-y-6"
  >
    {children}
  </form>
);

export const Input = ({ ...props }) => (
  <input
    {...props}
    className="bg-gray-900 px-2 py-3 rounded border-l-2 bg-opacity-40 transition-colors ease-in-out duration-400 focus:border-indigo-500"
  />
);

export const Submit = ({ busy = false, children, ...props }) => (
  <button
    disabled={busy}
    className="relative flex justify-center gap-3 border rounded-md p-2 w-full active:bg-gray-900 active:top-px active:ring-indigo-900 active:ring-2 disabled:opacity-50"
    type="submit"
  >
    {busy ? (
      <div className="inline-flex justify-center items-center">
        <div
          className="
              animate-spin
              rounded-full
              h-5
              w-5
              border-t-2 border-b-2 border-white
            "
        ></div>
      </div>
    ) : (
      children
    )}
  </button>
);
