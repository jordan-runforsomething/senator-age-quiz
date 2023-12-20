import QuizData from "./data.json"
import _ from "lodash"

// Some Config
const NUM_QUESTIONS = 20
const NUM_OPTIONS = 4 // Total number of options, including correct answer

export type Question = {
  senator_name: string
  song_url: string
  song_title: string
  song_author: string
  all_options: string[]
  answer_duration_seconds?: number[]
  correct?: boolean
}

/**
 * This function generates 20 senator age quiz Questions in a random order
 * and with random incorrect answer options
 * @returns
 */
const generateQuiz: () => Question[] = () => {
  const senatorNames = _.map(QuizData, "ballotpedia_id")
  const shuffledQuestions = _.shuffle(QuizData).slice(0, NUM_QUESTIONS)
  // We go through each question and indicate other options
  return _.map(shuffledQuestions, (q) => {
    const shuffledNames = _.shuffle(
      _.filter(senatorNames, (n) => n !== q.ballotpedia_id)
    )
    const otherOptions = shuffledNames.slice(0, NUM_OPTIONS - 1)
    return {
      senator_name: q.ballotpedia_id,
      song_url: q["song link"],
      song_title: q.Title,
      song_author: q.Artist,
      all_options: _.shuffle([q.ballotpedia_id, ...otherOptions]),
    }
  })
}

export default generateQuiz
