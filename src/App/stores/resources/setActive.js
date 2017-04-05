import createReducer from '../utils/createReducer'
import { createSelector } from 'reselect'
import t from './actions/constants'

export const defaultState = 1

export default (type) => createReducer({
  initialState: defaultState,
  [t.SET_ACTIVE]: (state, {payload, meta}) => {
      if (type !== meta.type){
          return state
      }
      return payload.active
  }
})

export const getActive = createSelector(state => state, props => props)
