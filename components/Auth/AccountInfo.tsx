import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./styles.module.scss";
import ThemeToggle from "../ThemeToggle";
import Image from "next/image";
export default function AccountInfo() {
  const { data: session } = useSession();

  if (session && session.user) {
    const { name, image } = session.user;

    return (
      <div className="accountBar">
        {image && (
          <Image
            src={image}
            alt="Profile"
            className={styles.profileImage}
            height={100}
            width={100}
            loader={({ src, width, quality }) => {
              return `${src}`;
            }}
          />
        )}

        <span className={styles.username}>{name}</span>
        <button className="button" onClick={() => signOut()}>
          Sign out
        </button>
        <ThemeToggle />
      </div>
    );
  }

  return (
    <div className="accountBar">
      <span className={styles.notSignedIn}>Not signed in</span>
      <button className={styles.signInButton} onClick={() => signIn()}>
        Sign in
      </button>
      <ThemeToggle />
    </div>
  );
}
