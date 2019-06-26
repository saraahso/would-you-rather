import { getInitialData } from '../utils/api'
import { receiveUsers } from '../actions/users'
import { setAuthedUser } from '../actions/authedUser'
import { showLoading, hideLoading } from 'react-redux-loading'
import { getQuestions, handleSaveQuestion, handleAddQuestion } from './questions'
import { saveQuestion, saveQuestionAnswer } from "../utils/api";

//const AUTHED_ID = 'tylermcginnis'

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users }) => {
        dispatch(receiveUsers(users))
        //dispatch(setAuthedUser(AUTHED_ID))
        dispatch(hideLoading())
      })
  }
}

export function handleAddQuestionAnswer(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());

    return saveQuestionAnswer({
      authedUser,
      qid,
      answer
    })
      .then(question => dispatch(handleAddQuestion(question)))
      .then(() => dispatch(hideLoading()));
  };
}
