export const state = () => ({
  firstLoad: true
})

export const mutations = {
  FIRST_ROUTE(state, payload) {
    console.log('payload', payload)
    state.firstLoad = payload
  }
}

export const actions = {
  isMobile({ commit }, payload) {
    console.log('payload')
  }
}

export const getters = {}

export const strict = false
