export const GET_QUESTION = 'GET_QUESTION'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ANSWER_QUESTION = 'ANSWER_QUESTION'

export function getQuestion (question) {
	return {
    	type: GET_QUESTION,
      	question
    }
}

export function handleAddQuestion (question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleSaveQuestion (auth, qid, option) {
  return {
    type: ANSWER_QUESTION,
    auth,
    qid,
    option
  }
}