
import styles from './page.module.css'
import Welcome from './components/welcome'
import Header from './components/header'
import { Link } from "@nextui-org/link";
import { button as buttonStyles } from "@nextui-org/theme";
import Footer from './components/footer';
import QuizData from './lib/loadData'

/** Welcome page with mosaic of senators */
export default async function Home() {
  console.log('Quiz Data:', QuizData)
  return (
    <>
    <Header />
    <main className={styles.main}>
      <div className="mosaic">
        {QuizData.forEach(element => {
          
        });}
      </div>
      <div className={styles.center}>
        <Welcome />
      </div>

      <div className={styles.center}>
        <Link
						className={buttonStyles({size: "lg", variant: "shadow", color: "primary", radius: "full" })}
						href="/quiz"
					>
						Got it! Let&apos;s get started!
					</Link>
      </div>
    </main>
    <Footer />
    </>
  )
}
