import GetData from "../lib/loadData"
import QuizApp from "./quizApp"

/** Welcome page with mosaic of senators */
export default async function QuizPage() {
  const quizData = await GetData()
  return (
    <QuizApp QuizData={quizData} />
  )
}
