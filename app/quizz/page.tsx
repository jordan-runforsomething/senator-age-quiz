
import styles from '../page.module.css'
import Header from '../components/header'

export default function Home() {
  return (
    <main className={styles.main}>
      <Header />

      <div className={styles.center}>
        <h1>This is the quiz page</h1>
      </div>
    </main>
  )
}
