import * as ActionTypes from './ActionTypes.js';

export const changeBackgroundShader = (str) => {
  return {
    type: ActionTypes.CHANGE_BACKGROUND_SHADER,
    backgroundShader: str
  };
};

export const changeLanguage = (str) => {
  return {
    type: ActionTypes.CHANGE_LANGUAGE,
    language: str
  };
};