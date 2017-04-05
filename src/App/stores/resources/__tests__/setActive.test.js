import makeSetActiveReducer, {defaultState,  getActive} from '../setActive'

const type = 'models'
const reducer = makeSetActiveReducer(type)

import * as actions from '../actions'
import * as types from '../actions/constants'

describe('setActive reducer', () => {
    it('should initialize default state', () => {
    const actual = reducer(undefined, {})
    const expected = defaultState
    expect(actual).toEqual(expected)
    })

    it('should handle SET_ACTIVE action', () => {
        const active = {active: 1}
        const result = active.active
        const action = actions.setActive({result}, {type})
        const actual = reducer(undefined, action)
        const expected = action[type]
        expect(actual).toEqual(expected)
    })
})
describe('setActive reducer when type does not match', () => {
    const state = {active: 1}

    it('it should NOT handle SET_ACTIVE action and return previous state', () => {
        const active = {active: 2}
        const result = active.active
        const action = actions.setActive({result}, {type : "anotherType"})
        const actual = reducer(state, action)
        const expected = state
        expect(actual).toEqual(expected)
    })
})
describe('getActive selector', () => {
    it('should return the boolan value of the active if It exist in the state', () => {
        const active = {active: 1}
        const state = {active: active}
        const actual = getActive(state, active.active)
        const expected = {active}
        expect(actual).toEqual(expected)
    })
})
