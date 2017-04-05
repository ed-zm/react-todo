import makeFilterListReducer, {defaultState,  getFilter} from '../filterList'

const type = 'models'
const reducer = makeFilterListReducer(type)

import * as actions from '../actions'
import * as types from '../actions/constants'

describe('filterList reducer', () => {
    it('should initialize default state', () => {
    const actual = reducer(undefined, {})
    const expected = defaultState
    expect(actual).toEqual(expected)
    })
    
    it('should handle FILTER_LIST action', () => {
        const filtered = {filtered: true}
        const result = filtered.filtered
        const action = actions.filterEntity({result}, {type})
        const actual = reducer(undefined, action)
        const expected = filtered[type]
        expect(actual).toEqual(expected)
    })
})
describe('filterList reducer when type does not match', () => {
    const state = {filtered: true}

    it('it should NOT handle FILTER_LIST action and return previous state', () => {
        const filtered = {filtered: false}
        const result = filtered.filtered
        const action = actions.filterEntity({result}, {type : "anotherType"})
        const actual = reducer(state, action)
        const expected = state
        expect(actual).toEqual(expected)
    })
})
describe('getFilter selector', () => {
    it('should return the boolan value of the filtered if It exist in the state', () => {
        const filtered = {filtered: true}
        const state = {filtered: filtered}
        const actual = getFilter(state, filtered.filtered)
        const expected = {filtered}
        expect(actual).toEqual(expected)
    })
})
