export const HamburgerIcon = ({ active, ...props }) => {
  return (
    <button {...props} aria-label="Menu">
      <svg style={{ position: "relative" }} viewBox="0 0 50 50">
        <path
          className={
            active
              ? "origin-top-left transition-slowest transform rotate-45 translate-x-1/3 -translate-y-0.1"
              : "origin-top-left transition-slowest transform rotate-0 translate-x-0"
          }
          d="m8.667 15h30c0.552 0 1-0.447 1-1s-0.448-1-1-1h-30c-0.552 0-1 0.447-1 1s0.447 1 1 1z"
        />
        <path
          className={
            active
              ? "origin-bottom-left transition-slowest transform -rotate-45 translate-x-1/3 translate-y-0.1"
              : "origin-bottom-left transition-slowest transform rotate-0 translate-x-0"
          }
          d="m8.667 37h30c0.552 0 1-0.447 1-1s-0.448-1-1-1h-30c-0.552 0-1 0.447-1 1s0.447 1 1 1z"
        />
        <path
          className={
            active
              ? "origin-center transition-slowest transform opacity-0 rotate-90"
              : "origin-center transition-slowest transform opacity-100 rotate-0"
          }
          d="m8.667 26h30c0.552 0 1-0.447 1-1s-0.448-1-1-1h-30c-0.552 0-1 0.447-1 1s0.447 1 1 1z"
        />
      </svg>
    </button>
  );
};
