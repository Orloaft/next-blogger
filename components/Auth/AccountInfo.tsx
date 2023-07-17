import { useSession, signIn, signOut } from "next-auth/react";
import styles from "./styles.module.scss";

export default function AccountInfo() {
  const { data: session } = useSession();

  if (session && session.user) {
    const { name, image } = session.user;

    return (
      <div className={styles.accountBar}>
        <img src={image || ""} alt="Profile" className={styles.profileImage} />

        <span className={styles.username}>{name}</span>
        <button className={styles.signOutButton} onClick={() => signOut()}>
          Sign out
        </button>
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
