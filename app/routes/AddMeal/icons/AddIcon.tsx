export default function AddIcon({ strokeWidth = 3, ...props }) {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.5046 2V12M12.5046 22V12M12.5046 12H2.47385M12.5046 12H22.5354"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeMiterlimit="1.41421"
        strokeLinecap="round"
      />
    </svg>
  );
}
