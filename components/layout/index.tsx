import Link from "next/link";
import { ReactNode } from "react";

export const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="container">
      <nav>
        <Link className="link" href="/">
          <span>Home</span>
        </Link>

        <Link className="link" href="/post">
          <span> Post</span>
        </Link>

        <Link className="link" href="/about">
          <span> About</span>
        </Link>
      </nav>
      <div className="content">{children}</div>
      <footer>
        <p>&copy; 2022 My Awesome Blog</p>
      </footer>
    </div>
  );
};
