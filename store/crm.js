export const state = () => ({
  company: {},
  staff: [],
  total_inv: {},
  total_data: {},
  total_data_month: {},
  total_month_jan: {},
  total_month_feb: {},
  total_month_march: {},
  total_month_april: {},
  total_month_may: {},
  total_month_june: {},
  total_month_july: {},
  total_month_aug: {},
  total_month_sept: {},
  total_month_oct: {},
  total_month_nov: {},
  total_month_dec: {},
  total_assets: [],
  assets_indv: [],
  total_exp: [],
  exp_indv: [],
  inc_indv: [],

  total_liab: [],
  liab_indv: [],
  total_eq: [],
  eq_indv: []
})

export const mutations = {
  SET_COMPANY(state, payload) {
    state.company = payload
  },
  UPDATE_STAFF(state, payload) {
    state.staff = payload
  },
  TOTAL_INV(state, payload) {
    state.total_inv = payload
  },
  TOTAL_UPDATE(state, payload) {
    state.total_data = payload
  },
  TOTAL_UPDATE_MONTH(state, payload) {
    state.total_data_month = payload
  },
  TOTAL_UPDATE_MONTH_JAN(state, payload) {
    state.total_data_month_jan = payload
  },
  TOTAL_UPDATE_MONTH_FEB(state, payload) {
    state.total_data_month_feb = payload
  },
  TOTAL_UPDATE_MONTH_MARCH(state, payload) {
    state.total_data_month_march = payload
  },
  TOTAL_UPDATE_MONTH_APRIL(state, payload) {
    state.total_data_month_april = payload
  },
  TOTAL_UPDATE_MONTH_MAY(state, payload) {
    state.total_data_month_may = payload
  },
  TOTAL_UPDATE_MONTH_JUNE(state, payload) {
    state.total_data_month_june = payload
  },
  TOTAL_UPDATE_MONTH_JULY(state, payload) {
    state.total_data_month_july = payload
  },
  TOTAL_UPDATE_MONTH_AUG(state, payload) {
    state.total_data_month_aug = payload
  },
  TOTAL_UPDATE_MONTH_SEPT(state, payload) {
    state.total_data_month_sept = payload
  },
  TOTAL_UPDATE_MONTH_OCT(state, payload) {
    state.total_data_month_oct = payload
  },
  TOTAL_UPDATE_MONTH_NOV(state, payload) {
    state.total_data_month_nov = payload
  },
  TOTAL_UPDATE_MONTH_DEC(state, payload) {
    state.total_data_month_dec = payload
  },

  ASSETS_UPDATE(state, payload) {
    state.total_assets = payload
  },
  ASSETS_INDV_UPDATE(state, payload) {
    state.assets_indv = payload
  },

  EXP_UPDATE(state, payload) {
    state.total_exp = payload
  },
  EXP_INDV_UPDATE(state, payload) {
    state.exp_indv = payload
  },
  INC_INDV_UPDATE(state, payload) {
    state.inc_indv = payload
  },
  LIAB_UPDATE(state, payload) {
    state.total_liab = payload
  },
  LIAB_INDV_UPDATE(state, payload) {
    state.liab_indv = payload
  },
  EQ_UPDATE(state, payload) {
    state.total_eq = payload
  },
  EQ_INDV_UPDATE(state, payload) {
    state.eq_indv = payload
  }
}

export const actions = {
  // uploaded_images({commit}, payload){
  //     commit('UPLOADED_IMAGES', payload)
  // }
}

export const getters = {
  staff: state => state.staff
}
