
import { saveQuestionAnswer } from "../utils/api"
import { showLoading, hideLoading } from "react-redux-loading"

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function receiveQuestions (questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    }
}

export function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleQuestionAnswer (qid, answer) {
  return (dispatch, getState) => {
    const{ authedUser } = getState()
    dispatch(showLoading())
    return saveQuestionAnswer({
      authedUser,
      qid,
      answer
    }).then(question => dispatch(addQuestion(question)))
    .then(() => dispatch(hideLoading()))
  }
}