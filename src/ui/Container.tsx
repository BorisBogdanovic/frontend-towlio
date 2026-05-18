import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};
function Container({ children }: ContainerProps) {
  return (
    <div className="relative max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
}

export default Container;
