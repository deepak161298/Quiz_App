import {
  CHANGE_CATEGORY,
  CHANGE_DIFFICULTY,
  CHANGE_NAME,
  CHANGE_LIMIT,
  CHANGE_SCORE,
  QUESTION_ANSWERS,
  USER_ANSWERS
} from "./actionTypes";

export const questionAnswers = (payload) => ({
  type: QUESTION_ANSWERS,
  payload,
});

export const userAnswers = (payload) => ({
  type: USER_ANSWERS,
  payload,
});

export const handleCategoryChange = (payload) => ({
  type: CHANGE_CATEGORY,
  payload,
});
export const handleDifficultyChange = (payload) => ({
  type: CHANGE_DIFFICULTY,
  payload,
});
export const handleNameChange = (payload) => ({
  type: CHANGE_NAME,
  payload,
});
export const handleScoreChnage = (payload) => ({
  type: CHANGE_SCORE,
  payload,
});
export const handleLimitChange = (payload) => ({
  type: CHANGE_LIMIT,
  payload,
});
