export const state = () => ({
  uploaded_images: [],
  form_active: false
})

export const mutations = {
  UPLOADED_IMAGES(state, payload) {
    state.uploaded_images = payload
  },
  FORM_ACTIVE(state, payload) {
    state.form_active = payload
  }
}

export const actions = {}

export const getters = {}
