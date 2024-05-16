import Logo from "@/components/Logo";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
      <nav className="flex justify-between border-b border-border h-[60px] px-4 py-2 items-center">
        <Logo />
        <ThemeSwitcher />
      </nav>
      <main className="flex w-full flex-grow justify-center items-center">
        {children}
      </main>
    </div>
  );
};

export default Layout;
