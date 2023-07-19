import Link from "next/link";
import { ReactNode } from "react";
import AccountInfo from "../Auth/AccountInfo";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container">
      <nav>
        <Link className="link" href="/">
          <span>Home</span>
        </Link>
        <Link className="link" href="/about">
          <span> Byte-Stream</span>
        </Link>
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
