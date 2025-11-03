import { useParams } from "react-router-dom";

const Aside = ({ children, ...props }: { children?: React.ReactNode }) => {
  const { id } = useParams();

  return (
    <aside
      {...props}
      className={`${
        id ? "-left-full md:left-0" : "left-0"
      } z-10 w-full md:w-sm absolute md:relative transition-all duration-300`}
    >
      {children}
    </aside>
  );
};

export default Aside;
