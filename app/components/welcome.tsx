import { Button } from "@nextui-org/react"
import styles from "./styles/componentStyles.module.scss"
import Link from "next/link"

export default function Welcome() {
  return (
    <div
      className={`${styles.welcome} flex text-lg flex-col w-96 md:w-full justify-center items-center rounded-md text-center p-5 md:px-12 bg-black/70 border-red border-8`}
    >
      <h1 className="text-3xl font-bold underline">Congress Bops</h1>
      <p className="mt-2 md:mt-6">
        You will be presented 12 US Billboard Top Hit songs.
      </p>
      <p className="mt-2">
        For each, guess which of 4 Senators was born the week the song topped
        the charts.
      </p>

      <div className="inline-flex text-left mt-9 border-blue border-2 rounded-md p-4">
        <div className="mr-8 pt-2 md:p-4">
          <p className="font-bold text-center md:text-left text-lg text-white pt-1 rounded-md">
            You get points for:
          </p>
        </div>

        <ol className="list-decimal">
          <li className="mb-2">Correct answers</li>
          <li>Older songs/senators</li>
        </ol>
      </div>

      <Button as={Link} className="bg-blue mt-8 mb-4 p-5 text-2xl" href="/quiz">
        {/* {loading && <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24"></svg>} */}
        Got it - Start the Quiz
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
      </Button>
    </div>
  )
}
