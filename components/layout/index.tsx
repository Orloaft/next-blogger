import Link from "next/link";
import { ReactNode } from "react";
import AccountInfo from "../Auth/AccountInfo";
import ThemeToggle from "../ThemeToggle";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container">
      <nav>
        <Link className="link" href="/">
          <span>Home</span>
        </Link>
        <div className="link title">
          <span> Byte-Stream</span>
        </div>
        <Link className="link" href="/post">
          <span> Post</span>
        </Link>
      </nav>
      <div className="content">{children}</div>
      <AccountInfo />
    </div>
  );
};
export default Layout;
