import styles from "./page.module.scss"
import Welcome from "./components/welcome"
import Footer from "./components/footer"
import GetData, { SenatorData } from "./lib/loadData"
import Senator from "./components/senator"
import Header from "./components/header"

/** Welcome page with mosaic of senators */
export default async function Home() {
  const quizData = await GetData()

  // Helper function to render a single senator in a mosaic tile
  const renderSenator = (senator: SenatorData) => {
    return (
      <div className={styles.mosaicTile}>
        <Senator senator={senator} />
      </div>
    )
  }

  return (
    <>
      <Header />
      <div className={styles.mosaic}>{quizData.map(renderSenator)}</div>
      <main className={styles.main}>
        <div className={styles.center}>
          <Welcome />
        </div>
      </main>
      <Footer />
    </>
  )
}
