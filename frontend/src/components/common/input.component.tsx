import { twMerge } from "tailwind-merge";

interface InputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "prefix" | "suffix"
  > {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
}

const Input = ({ className, prefix, suffix, ...props }: InputProps) => {
  return (
    <div className="flex items-center gap-2 bg-gray-200 py-2 px-4 rounded-lg">
      {prefix}
      <input className={twMerge("w-full focus:outline-none", className)} {...props} />
      {suffix}
    </div>
  );
};

export default Input;
