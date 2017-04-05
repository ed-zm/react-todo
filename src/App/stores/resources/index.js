/*
  This is a combination of some generic reducers
  which can be used with any 'resource'.

  A 'resource' is a model of data that is usually
  fetched from the API.
 */

import { combineReducers } from 'redux'
import { createSelector } from 'reselect'

import byId, * as fromById from './byId'
import idsList, * as fromIdsList from './idsList'
import status, * as fromStatus from './status'
import pagination, * as fromPagination from './pagination'
import filterList, * as fromFilterList from './filterList'
import setActive, * as fromSetActive from './setActive'


export default (type) => combineReducers({
  byId: byId(type),
  idsList: idsList(type),
  status: status(type),
  pagination: pagination(type),
  filterList: filterList(type),
  setActive: setActive(type)
})
// Get one item in a state of this reducer
export const getEntity = (type, id) => createSelector(
  state => fromById.getEntity(state[type].byId, id),
  entity => { if (entity){
      return entity} }
)

// Get all items in a state of this reducer
export const getEntitiesOne = (type) => createSelector(
  state => state,
  state => fromIdsList.getIds(state[type].idsList),
  state => fromFilterList.getFilter(state[type].filterList),
  (state, entitiesIds, filterParam) => {
      if (entitiesIds){
          let entities = entitiesIds.map(id => fromById.getEntity(state[type].byId, id))
          if (filterParam === false){
              return entities.filter(entity => entity.completed === false && entity.listID === 1)
          }
          else if (filterParam === true){
              return entities.filter(entity => entity.completed === true && entity.listID === 1)
          }
              return entities.filter(entity => entity.listID ===  1)
      }
  }
)

export const getEntitiesTwo = (type) => createSelector(
  state => state,
  state => fromIdsList.getIds(state[type].idsList),
  state => fromFilterList.getFilter(state[type].filterList),
  (state, entitiesIds, filterParam) => {
      if (entitiesIds){
          let entities = entitiesIds.map(id => fromById.getEntity(state[type].byId, id))
          if (filterParam === false){
              return entities.filter(entity => entity.completed === false && entity.listID === 2)
          }
          else if (filterParam === true){
              return entities.filter(entity => entity.completed === true && entity.listID === 2)
          }
              return entities.filter(entity => entity.listID === 2)
      }
  }
)

export const getActive = (type) => createSelector(
    state => state,
    state => fromSetActive.getActive(state[type].setActive)
)


// Get child entities by its parent ID
export const getChildEntities = (childType, parentType, parentId) => createSelector(
  state => state,
  state => fromById.getEntity(state[parentType].byId, parentId),
  (state, parent) => {
    if (parent && parent[childType]) {
      return parent[childType].map(id => fromById.getEntity(state[childType].byId, id))
    }
  }
)

export const isLoading = (state, type) => fromStatus.isLoading(state[type].status)

export const getErrors = (state, type) => fromStatus.getErrors(state[type].status)

export const getPagination = (state, type) => fromPagination.getPagination(state[type].pagination)
