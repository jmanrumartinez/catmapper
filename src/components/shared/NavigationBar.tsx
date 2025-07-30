import Image from "next/image";
import { Button } from "@components/ui/button";

export const NavigationBar = () => {
  return (
    <nav className="w-full">
      <div className="mx-auto max-w-7xl py-8 flex items-center justify-between">
        <ul className="flex items-center list-none">
          <li className="my-0 mx-3.5">
            <a
              className="no-underline text-[var(--clr-black)] hover:text-[var(--clr-blue)]"
              href="#"
            >
              Buy
            </a>
          </li>
          <li className="my-0 mx-3.5">
            <a
              className="no-underline text-[var(--clr-black)] hover:text-[var(--clr-blue)]"
              href="#"
            >
              Rent
            </a>
          </li>
          <li className="my-0 mx-3.5">
            <a
              className="no-underline text-[var(--clr-black)] hover:text-[var(--clr-blue)]"
              href="#"
            >
              Sell
            </a>
          </li>
        </ul>

        <div className="flex justify-center items-center">
          <Image
            src="logo.svg"
            width={125}
            height={65}
            alt="Logo of Catmapper"
          />
          <h1 className="text-[var(--clr-blue)] text-4xl font-bold">
            Catmapper
          </h1>
        </div>

        {/* TODO: Replace this by RainbowKit  */}
        <Button className="cursor-pointer bg-[var(--clr-blue)] hover:bg-[var(--clr-blue-2)] transition-all">
          0x0
        </Button>
      </div>
    </nav>
  );
};
