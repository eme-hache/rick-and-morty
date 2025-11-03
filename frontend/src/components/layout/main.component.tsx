const Main = ({
  className,
  children,
  ...props
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <main {...props} className={className}>
      {children}
    </main>
  );
};

export default Main;
