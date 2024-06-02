"use client"
import quizStyles from "./quizPage.module.scss"
import Header from "../components/header"
import { Progress } from "@nextui-org/progress"
import { useCallback, useState } from "react"
import { Button } from "@nextui-org/button"
import Footer from "../components/footer"
import { Card, Image, CardFooter, CardHeader, Switch } from "@nextui-org/react"
import Confetti from "react-confetti"
import { BsFillArrowRightCircleFill } from "react-icons/bs"

const SHOW_SCORE_INCREMENT_DURATION = 3000 // How long to show addition to score upon answer
const CONFETTI_DURATION = 3000 // ms. Max time confetti is shown. Note its also hidden when user goes to next question
const CONFETTI_PROPS = {
  numberOfPieces: 260,
  gravity: 0.25,
  colors: ["#37BBE7", "#FC4A47", "#F0F0F0"],
}

// Types
import generateQuiz, { Question, calculateScore } from "../lib/generateQuiz"
import SongPlayer from "../components/songPlayer"
import { SenatorData } from "../lib/loadData"
import QuizProgress from "../components/progress"

/**
 * Quiz page. This renders the full page, and is a client side bundle
 * Takes quiz data as props, which come from parent page via SSR
 */
export default function QuizApp({ QuizData }: { QuizData: SenatorData[] }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  // Whether or not we're transitioning to the next question (showing correct/false and confetti)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [quizQuestions, setQuizQuestions] = useState<Question[]>(
    generateQuiz(QuizData)
  )
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [loading, setLoading] = useState(false)
  const [currentQuestionStartTime, setCurrentQuestionStartTime] = useState(
    Date.now()
  )
  const [hideConfetti, setHideConfetti] = useState(false)
  const [showScoreIncrementAmount, setShowScoreIncrementAmount] = useState(0) // If > 0 then increment is shown
  const [hardMode, setHardMode] = useState(false)
  const currentQuestion = quizQuestions[currentQuestionIndex]

  /**
   * Helper to render an answer option. Also handles rendering options between questions with correct/incorrect label
   * @TODO Break this out into a component?
   */
  const renderOption = useCallback(
    ({
      name,
      image,
      birthYear,
    }: {
      name: string
      image: string
      birthYear: number
    }) => {
      const isSelected = name === selectedAnswer
      let className = quizStyles.option
      if (!isTransitioning) className += " hover:scale-110"

      const showCorrect =
        isTransitioning && name === currentQuestion.senatorName
      const showIncorrect =
        isTransitioning && isSelected && name !== currentQuestion.senatorName
      const bgColor = showCorrect ? "green" : "red"

      if (showCorrect || (isSelected && !showIncorrect)) {
        className += ` scale-110 ${quizStyles.optionGreenBorder}`
      } else if (showIncorrect) {
        className += ` ${quizStyles.optionRedBorder}`
      } else if (selectedAnswer && !showCorrect)
        className += ` scale-90 opacity-75	`

      const showResults = showCorrect || showIncorrect

      // If we are showing results and this isn't either the selected or correct answer, we dont render it
      if (isTransitioning && !showResults) return null

      // If we are showing results, we display some text indicating whether or not answer is corrct
      let bannerText = ""
      if (showCorrect) {
        bannerText = isSelected ? "Correct!" : "Correct"
      } else if (showIncorrect) {
        bannerText = "Incorrect :("
      }

      return (
        <Card
          isPressable={!isTransitioning}
          className={className}
          onPress={() => setSelectedAnswer(name)}
        >
          <Image
            removeWrapper
            alt="Card background"
            className="z-2 w-full h-full object-cover !rounded-none"
            src={image}
          />
          {showResults && (
            <div className="absolute bg-green z-22 bottom-20 flex-col !items-center backdrop-invert-0 bg-black/80">
              <span
                className={`text-white font-bold text-large text-center bg-${bgColor}  px-3 py-2`}
              >
                {bannerText}
              </span>
            </div>
          )}
          <CardFooter className="relative !p-0 z-2 flex-col !items-center !bg-red">
            {isSelected && !showResults && (
              <div className="z-11 pt-2">
                <Button
                  isDisabled={!selectedAnswer}
                  onPress={onSubmit}
                  color="success"
                  className="text-white bg-green w-100 text-black"
                  variant="shadow"
                  endContent={<BsFillArrowRightCircleFill />}
                >
                  Submit
                </Button>
              </div>
            )}
            {
              <>
                <div
                  className={`${quizStyles.nameBanner} w-full relative bottom-1 text-white text-small md:text-large text-center px-3 pt-4`}
                >
                  {name}
                </div>
                {!hardMode && !isSelected && (
                  <div
                    className={`${quizStyles.ageBanner} w-full text-white text-small text-md text-center px-3 pb-4`}
                  >
                    Born in {birthYear}
                  </div>
                )}
              </>
            }
          </CardFooter>
        </Card>
      )
    },
    [selectedAnswer, isTransitioning, hardMode]
  )

  const nextQuestion = () => {
    setSelectedAnswer("")
    setCurrentQuestionIndex(currentQuestionIndex + 1)
    setIsTransitioning(false)
  }

  // Helper to hide confetti after CONFETTI_DURATION in between questions
  const updateHideConfetti = useCallback(() => {
    setHideConfetti(true)
  }, [])
  const updateHideIncremement = useCallback(() => {
    setShowScoreIncrementAmount(0)
  }, [])

  /**
   * Current answer gets submitted.
   * 1. Switch to transition state (which displays confetti if correct)
   * 2. Update score
   */
  const onSubmit = () => {
    if (isTransitioning) {
      return nextQuestion()
    }
    const correct = selectedAnswer === currentQuestion.senatorName
    const duration = Date.now() - currentQuestionStartTime
    const scoreAddition = calculateScore(
      duration,
      currentQuestion.birthYear,
      correct
    )
    setShowScoreIncrementAmount(scoreAddition)
    setScore(score + scoreAddition)
    setIsTransitioning(true)
    setHideConfetti(false)

    setTimeout(updateHideConfetti, CONFETTI_DURATION)
    setTimeout(updateHideIncremement, SHOW_SCORE_INCREMENT_DURATION)
  }

  // Show Confetti during transition after correct answer
  const showConfetti =
    isTransitioning &&
    selectedAnswer === currentQuestion.senatorName &&
    !hideConfetti
  return (
    <>
      <div className="hidden md:block">
        <Header />
      </div>
      <main className={`${quizStyles.quizContainer} pt-4`}>
        {showConfetti && <Confetti {...CONFETTI_PROPS} />}
        {loading ? (
          <Progress isIndeterminate />
        ) : (
          <div className="flex gap-0 justify-start items-center flex-col lg:flex-row py-2 md:py-0">
            <div className={quizStyles.playerContainer}>
              <SongPlayer songURL={currentQuestion.song} />
              <div className="showIncrement z-11 h-4 text-center">
                <span
                  className={`${quizStyles.incrementText} opacity-${
                    showScoreIncrementAmount > 0 ? 100 : 0
                  } transition-opacity drop-shadow-xl text-bold relative bottom-4 text-3xl text-red`}
                >
                  +{showScoreIncrementAmount}
                </span>
              </div>
              <QuizProgress
                totalQuestions={quizQuestions.length}
                currentQuestion={currentQuestionIndex}
                score={score}
              />
              <div className="hidden md:flex justify-center py-4 rounded-lg mb-4 bg-default/10">
                <Switch
                  onChange={() => setHardMode(!hardMode)}
                  color="danger"
                  className="border-red"
                >
                  <span className="text-white">Hard Mode</span>
                  <span className="text-white text-sm o-9">
                    &nbsp;&nbsp;(hide age)
                  </span>
                </Switch>
              </div>
            </div>
            <div className={quizStyles.answersContainer}>
              <h2 className="mt-3 mb-3 md:mb-0 px-5 md:text-xl text-center">
                Which senator was born the week {currentQuestion.title} was the
                #1 song?
              </h2>
              <div
                className={`${quizStyles.answersContainerInner} flex items-center md:mt-5 flex-row justify-center flex-wrap`}
              >
                {currentQuestion.options.map(renderOption)}
              </div>
              {isTransitioning && (
                <div className="flex flex-row justify-center mt-4">
                  <Button
                    onPress={nextQuestion}
                    color="success"
                    className="text-white bg-green w-100 text-black"
                    variant="shadow"
                    endContent={<BsFillArrowRightCircleFill />}
                  >
                    Next Question
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
