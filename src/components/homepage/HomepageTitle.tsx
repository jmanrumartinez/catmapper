import { ReactNode } from "react";

type HomepageHeadingProps = {
  children: ReactNode;
};

export const HomepageHeading = ({ children }: HomepageHeadingProps) => {
  return <h3 className="mt-12 mx-0 mb-5 text-2xl font-bold">{children}</h3>;
};
