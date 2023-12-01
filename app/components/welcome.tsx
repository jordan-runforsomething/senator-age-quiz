import styles from './header.module.scss'

export default function Welcome() {
  return (
    <div className={styles.description}>
    <h1>Welcome!</h1>
    <h2>So glad you're here</h2>
    </div>
  )
}