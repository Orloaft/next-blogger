import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./styles.module.scss";
import ThemeToggle from "../ThemeToggle";

export default function AccountInfo() {
  const { data: session } = useSession();

  if (session && session.user) {
    const { name, image } = session.user;

    return (
      <div className="accountBar">
        {image && (
          <img src={image} alt="Profile" className={styles.profileImage} />
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
    <div className={styles.accountBar}>
      <span className={styles.notSignedIn}>Not signed in</span>
      <button className={styles.signInButton} onClick={() => signIn()}>
        Sign in
      </button>
    </div>
  );
}
