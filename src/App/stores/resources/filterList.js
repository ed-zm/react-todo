import createReducer from '../utils/createReducer'
import { createSelector } from 'reselect'
import t from './actions/constants'
import isEmpty from 'lodash/isEmpty'

export const defaultState = null

export default (type) => createReducer({
  initialState: defaultState,
  [t.FILTER_ENTITY]: (state, {payload, meta}) => {
      if(type !==meta.type){
          return state
      }
      return payload.filtered
  }
})

export const getFilter = createSelector(state => state, props => props)
