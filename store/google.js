export const state = () => ({
  google_place: {},
  google_place_search: {},

  google_marker: {},
  google_marker_search: {},
  geo_hash: {},
  golf_mid: {},
  golf_front: {},
  golf_back: {},
  golf: {},
  google_man: {}
})

export const mutations = {
  MANUAL_SET(state, payload) {
    state.google_man = payload
  },
  GOOGLE_PLACE(state, payload) {
    state.google_place = payload
  },

  GOOGLE_MARKER(state, payload) {
    state.google_marker = payload
  },
  GOOGLE_PLACE_SEARCH(state, payload) {
    state.google_place_search = payload
  },

  GOOGLE_MARKER_SEARCH(state, payload) {
    state.google_marker_search = payload
  },
  GEO_HASH_SET(state, payload) {
    state.geo_hash = payload
  },
  GOLF_MID(state, payload) {
    state.golf_mid = payload
    state.golf.mid = payload
  },
  GOLF_BACK(state, payload) {
    state.golf_back = payload
    state.golf.back = payload
  },
  GOLF_FRONT(state, payload) {
    state.golf_front = payload
    state.golf.front = payload
  }
}

export const actions = {
  googlePlace({ commit }, payload) {
    commit('GOOGLE_PLACE', payload)
  },

  googleMarker({ commit }, payload) {
    commit('GOOGLE_MARKER', payload)
  },

  googlePlaceSearch({ commit }, payload) {
    commit('GOOGLE_PLACE_SEARCH', payload)
  },

  googleMarkerSearch({ commit }, payload) {
    commit('GOOGLE_MARKER_SEARCH', payload)
  },
  geoHashSet({ commit }, payload) {
    commit('GEO_HASH_SET', payload)
  },
  golfMid({ commit }, payload) {
    commit('GOLF_MID', payload)
  },
  golfBack({ commit }, payload) {
    commit('GOLF_BACK', payload)
  },
  golfFront({ commit }, payload) {
    commit('GOLF_FRONT', payload)
  }
}

export const getters = {
  google_place: state => state.google_place,
  google_place_search: state => state.google_place_search,

  google_marker: state => state.google_marker,
  google_marker_search: state => state.google_marker_search,

  geo_hash: state => state.geo_hash,
  golf: state => state.golf,

  golf_back: state => state.golf_back,
  golf_front: state => state.golf_front,
  golf_mid: state => state.golf_mid
}
