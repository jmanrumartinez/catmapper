import { ReactNode } from "react";

type HomepageListingsContainerProps = {
  children: ReactNode;
};

export const HomepageListingsContainer = ({
  children,
}: HomepageListingsContainerProps) => {
  return (
    <div className="grid gap-2.5 grid-cols-[repeat(auto-fit,minmax(min(100%,350px),1fr))]">
      {children}
    </div>
  );
};
