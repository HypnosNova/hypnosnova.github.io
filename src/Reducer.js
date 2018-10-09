import * as ActionTypes from './ActionTypes.js';

export default (state, action) => {
  const { backgroundShader, language } = action;
  switch (action.type) {
    case ActionTypes.CHANGE_BACKGROUND_SHADER:
      return { ...state, backgroundShader };
    case ActionTypes.CHANGE_LANGUAGE:
      return { ...state, language };
    default:
      return state
  }
}
