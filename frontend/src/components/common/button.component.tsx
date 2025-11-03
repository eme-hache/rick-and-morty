import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

const Button = ({ className, children, disabled, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled}
      className={twMerge(
        "px-4 py-2  rounded-lg text-center flex items-center justify-center gap-2",
        disabled
          ? "bg-gray-200 text-gray-500 cursor-not-allowed"
          : "bg-primary-600 text-white cursor-pointer",
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
