import _ from "lodash"
import GetData, { SenatorData } from "./loadData"

// Some Config
const NUM_QUESTIONS = 20
const NUM_OPTIONS = 4 // Total number of options, including correct answer

export type AnswerOption = {
  name: string
  image: string
  birthYear: number
  song?: string
}

export type Question = {
  senatorName: string
  birthYear: number
  image: string
  song: string
  title: string
  author: string
  options: AnswerOption[]
  answerDurationSeconds?: number
  correct?: boolean
}

/**
 * This function generates 20 senator age quiz Questions in a random order
 * and with random incorrect answer options
 * @returns
 */
const generateQuiz = function (quizData: SenatorData[]) {
  const allData = _.shuffle(quizData)
  const allOptions: AnswerOption[] = allData.map((d) => ({
    name: `${d.first_name} ${d.last_name} - ${d.state}`,
    image: d.image_url,
    birthYear: new Date(d.birthday).getFullYear(),
    song: d.song_link,
  }))

  // Build up our list of questions. For each question, we randomly present 3 other options for senators
  // who have different song URLs (note that multiple senators have the same song URL if they were born
  // close together)
  const returnData: Question[] = _.map(_.range(NUM_QUESTIONS), (q) => {
    const name =
      allData[q].first_name +
      " " +
      allData[q].last_name +
      " - " +
      allData[q].state
    const question: Question = {
      senatorName: name,
      birthYear: new Date(allData[q].birthday).getFullYear(),
      image: allData[q].image_url,
      song: allData[q].song_link,
      title: allData[q].title,
      author: allData[q].artist,
      answerDurationSeconds: 0,
      correct: false,
      options: [
        {
          name,
          image: allData[q].image_url,
          birthYear: new Date(allData[q].birthday).getFullYear(),
        },
      ],
    }
    // Choose random other options
    const selectedIndices = new Set()
    while (question.options.length < NUM_OPTIONS) {
      const idx = _.random(0, allOptions.length - 1)
      if (
        allData[idx].song_link !== allData[q].song_link &&
        !selectedIndices.has(idx)
      ) {
        question.options.push({
          name:
            allData[idx].first_name +
            " " +
            allData[idx].last_name +
            " - " +
            allData[idx].state,
          image: allData[idx].image_url,
          birthYear: new Date(allData[idx].birthday).getFullYear(),
        })

        // Make sure we don't add the same option more than once
        selectedIndices.add(idx)
      }
    }
    // Shuffle options otherwise the first one is always the answer
    question.options = _.shuffle(question.options)
    return question
  })
  return returnData
}

// Components of score
const CORRECT_BONUS_MULTIPLIER = 3
const AGE_BONUS = 750

// Deprecated duration bonus. Initial users found this too stressful!
const DURATION_BONUS = 0
const MAX_DURATION = 30
const MIN_YEAR = 1933 // LOL Chuck Grassley
const MAX_YEAR = 1987 // Jon Ossof
const MAX_YEAR_DIFF = MAX_YEAR - MIN_YEAR
const GLOBAL_MULTIPLIER = 10 // Because big points are more exciting

/**
 * Helper function to calculate the addition to a player's score given their answer
 * @param durationSeconds: Duration (in seconds) it took to answer DEPRECATED!
 * @param birthDate: Birth date of the senator (older senators provide more points)
 * @param correct: Whether the answer was correct or not
 */
export const calculateScore = function (
  durationSeconds: number,
  birthYear: number,
  correct: boolean
) {
  const durationBonus =
    Math.max(0, MAX_DURATION - durationSeconds) * DURATION_BONUS
  const ageBonus = ((MAX_YEAR - birthYear) / MAX_YEAR_DIFF) * AGE_BONUS
  return Math.round(
    (durationBonus + ageBonus) *
      (correct ? CORRECT_BONUS_MULTIPLIER : 1) *
      GLOBAL_MULTIPLIER
  )
}

export default generateQuiz
