'use client'
import styles from '../page.module.css'
import quizStyles from './quiz.module.scss'
import Header from '../components/header'
import { Progress } from '@nextui-org/progress'
import { useEffect, useState } from 'react'
import { Spotify } from 'react-spotify-embed'
import { Button } from '@nextui-org/button'
import GenerateQuiz from '../lib/generateQuiz'
import Footer from '../components/footer'
import {Card, CardHeader, CardBody, Image, CardFooter, select} from "@nextui-org/react";

// Types
import { Question } from '../lib/generateQuiz'

/**
 * Quiz page. This renders the full page, and is a client side bundle
 */
export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [quizQuestions, setQuizQuestions] = useState(GenerateQuiz())
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [score, setScore] = useState(0)
  const currentQuestion = quizQuestions[currentQuestionIndex]

  // useEffect(() => {
  //   console.log("Set API Ready")
  //   window.onSpotifyIframeApiReady = (IFrameAPI) => {
  //     console.log('Spotify Ready!')
  //    }
  // }, [])

  // Render Helpers
  const renderOption = (senatorName: string) => {
    const isSelected = senatorName === selectedAnswer
    return (
      <Card radius='lg' isHoverable isPressable onPress={() => setSelectedAnswer(senatorName)} key={senatorName} className={`hover:scale-110 .hover:shadow-lg py-4 items-center ${quizStyles.option} ${isSelected ? quizStyles.optionSelected : ''}`}>
        <h4 className="text-gray-600 mb-1 text-xl font-bold">{senatorName}</h4>
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={`/images/${senatorName}.jpeg`}
          width={270}
        />
      </Card>
    );
  }

  /**
   * Current answer gets submitted. Check and see if it's right. Update score. Move to next question
   */
  const onSubmit = () => { 
    const correct = selectedAnswer === currentQuestion.senator_name
    if (correct) {
      setScore(score + 1)
    }
    setSelectedAnswer('')
    setCurrentQuestionIndex(currentQuestionIndex + 1)
  }

  return (
    <>
    <Header />
    <main>
      

      <div className="flex flex-col lg:flex-row">
        <div className={quizStyles.playerContainer}>
          <h2 className='text-xl text-center'>Song</h2>
          <Spotify link={currentQuestion.song_url} />
          <div className="scoreContainer">
            <h3 className='text-xl mb-2 mt-4 text-center'>Your Score</h3>
            <Card className='outline outline-offset-2 outline-4 outline-blue-500'>
              <CardBody>
                <p className='text-center text-lg'>
                {score} / {quizQuestions.length}
                </p>
              </CardBody>
            </Card>
          </div>
          <Progress
          size="md"
          radius="sm"
          classNames={{
            base: "max-w-md mt-12",
            track: "drop-shadow-md border border-default",
            indicator: "bg-gradient-to-r from-blue-500 to-green-500",
            label: "tracking-wider font-medium text-default-600",
            value: "text-foreground/60",
          }}
          label="Quiz Progress"
          value={(currentQuestionIndex+1)/quizQuestions.length*100.0}
          showValueLabel={true}
        />
        </div>
        <div className={quizStyles.answersContainer}>
          <h2 className='text-xl text-center'>Senators</h2>
          <p className='text-center'>Which senator was born when this song was the #1 Billboard top hit?</p>
          <div className="flex items-center flex-row justify-center flex-wrap">
            {currentQuestion.all_options.map(renderOption)}
          </div>
          <div className="flex justify-center">
            <Button isDisabled={!selectedAnswer} onPress={onSubmit} color="primary" variant="shadow">
              {selectedAnswer ? `Submit Answer: ${selectedAnswer}` : 'select an answer...'}
            </Button> 
          </div>
        </div>
      </div>
    </main>
    <Footer></Footer>
    </>
  )
}
