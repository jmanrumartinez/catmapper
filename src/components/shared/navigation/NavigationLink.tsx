type NavigationLink = {
  children: React.ReactNode;
};

export const NavigationLink = ({ children }: NavigationLink) => {
  return (
    <li className="my-0 mx-3.5">
      <a
        className="no-underline text-[var(--clr-black)] hover:text-[var(--clr-blue)]"
        href="#"
      >
        {children}
      </a>
    </li>
  );
};
