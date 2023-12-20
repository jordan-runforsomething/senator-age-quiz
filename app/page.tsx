
import styles from './page.module.css'
import Welcome from './components/welcome'
import Header from './components/header'
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import Footer from './components/footer';

export default function Home() {
  return (
    <>
    <Header />
    <main className={styles.main}>
      <div className={styles.center}>
        <Welcome />
      </div>

      <div className={styles.center}>
        <Link
						className={buttonStyles({size: "lg", variant: "shadow", color: "primary", radius: "full" })}
						href="/quiz"
					>
						Got it! Let&apos;s get started
					</Link>
      </div>
    </main>
    <Footer />
    </>
  )
}
