import CountUp from 'react-countup';
import { Progress } from "@nextui-org/react"
import styles from './styles/progress.module.scss'
import { useEffect, useState } from 'react';

type Props = {
  currentQuestion: number,
  totalQuestions: number,
  score: number,
}

const COUNT_UP_DURATION = 1.5 // SECONDS

const QuizProgress = ({ currentQuestion, totalQuestions, score }: Props) => {

  return (
    <div className={styles.progressContainer}>
        <h3 className='text-xl mb-2 mb-4 text-center text-white-100'>Your Score</h3>
        <div className={`${styles.pointsContainer} rounded-md bg-red p-3 text-bold text-center skew-y-3 m-auto w-32 text-3xl`}>
          <CountUp preserveValue end={score} duration={COUNT_UP_DURATION} />
        </div>
      <Progress
      size="md"
      radius="md"
      className='hidden md:block'
      classNames={{
        base: "max-w-md mb-4 mt-6",
        track: "drop-shadow-md",
        indicator: "bg-gradient-to-r from-blue-500 to-blue-200",
        label: "tracking-wider font-medium text-blue text-center",
        labelWrapper: "!justify-center"
      }}
      label={`${(currentQuestion)}/${totalQuestions} Questions`}
      value={(currentQuestion)/totalQuestions*100.0}
      showValueLabel={false}
    />
    </div>
  )
}

export default QuizProgress