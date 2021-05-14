import {ClientUser} from "../common/types";
import styles from '../../styles/TopBar.module.css'
import Link from 'next/link'
import {useRouter} from "next/router";

export default function TopBar(props: {user: ClientUser | null}) {
  const router = useRouter()

  async function redirectToLogin() {
    await router.push(`/login?redirect=${encodeURIComponent(document.location.href)}`)
  }

  let userLogin
  if (props.user) {
    userLogin = (
      <div className={styles.UserLogin}>
        <p>{`Welcome ${props.user.name}`}</p>
        <Link href='/logout'><a>Logout</a></Link>
      </div>
    )
  } else {
    userLogin = (
      <div className={styles.UserLogin}>
        <a onClick={redirectToLogin} href='/login'>Login</a>
      </div>
    )
  }

  let classLink
  if (props.user) {
    classLink = <a href={`/students/${props.user.uuid}`}>Classes</a>
  }

  return (
    <div className={styles.TopBar}>
      <div className={styles.Home}>
        {classLink}
      </div>
      <div className={styles.Padding}/>
      {userLogin}
    </div>
  )
}