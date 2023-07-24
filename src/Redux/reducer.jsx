import {
  CHANGE_CATEGORY,
  CHANGE_DIFFICULTY,
  CHANGE_SCORE,
  CHANGE_LIMIT,
  CHANGE_NAME,
  QUESTION_ANSWERS,
  USER_ANSWERS
} from "./actionTypes";

const initialState = {
  question_category: "",
  question_difficulty: "",
  question_limit: "",
  name: "",
  score: 0,
  question_answers:[],
  user_answers:[]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_ANSWERS:
      return {
        ...state,
        user_answers:[{questionId:action.payload.questionId,selectedAnswer:action.payload.selectedAnswer},...state.user_answers],
      };

    case QUESTION_ANSWERS:
      return {
        ...state,
        question_answers: action.payload,
      };
    case CHANGE_CATEGORY:
      return {
        ...state,
        question_category: action.payload,
      };
    case CHANGE_DIFFICULTY:
      return {
        ...state,
        question_difficulty: action.payload,
      };
    case CHANGE_LIMIT:
      return {
        ...state,
        question_limit: action.payload,
      };
    case CHANGE_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case CHANGE_SCORE:
      return {
        ...state,
        score: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
