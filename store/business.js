const businessDefaults = {
  b_uid: 's8Sz6QcaSsjgkJX6ablN',
  b_name: 'Agri Ensights',
  logo: require('@/static/icon.png')
}

const businessInfoLocalStorage = businessDefaults

// Set default values for active-user
// More data can be added by auth provider or other plugins/packages
const getBusinessInfo = () => {
  let businessInfo = {}

  // Update property in user
  Object.keys(businessDefaults).forEach(key => {
    // If property is defined in localStorage => Use that
    businessInfo[key] = businessInfoLocalStorage[key]
      ? businessInfoLocalStorage[key]
      : businessDefaults[key]
  })

  // Include properties from localStorage
  Object.keys(businessInfoLocalStorage).forEach(key => {
    if (businessInfo[key] == undefined && businessInfoLocalStorage[key] != null)
      businessInfo[key] = businessInfoLocalStorage[key]
  })

  return businessInfo
}

const mainBusinessLocalStorage = businessDefaults

const getMainBusiness = () => {
  let mainBusiness = {}

  // Update property in user
  Object.keys(businessDefaults).forEach(key => {
    // If property is defined in localStorage => Use that
    mainBusiness[key] = mainBusinessLocalStorage[key]
      ? mainBusinessLocalStorage[key]
      : businessDefaults[key]
  })

  // Include properties from localStorage
  Object.keys(mainBusinessLocalStorage).forEach(key => {
    if (mainBusiness[key] == undefined && mainBusinessLocalStorage[key] != null)
      mainBusiness[key] = mainBusinessLocalStorage[key]
  })

  return mainBusiness
}

export const state = () => ({
  reseller: 'agri_ensights',
  reseller_id: 's8Sz6QcaSsjgkJX6ablN',
  sub_sellers: [],
  app_active_business: getBusinessInfo(),
  app_main_business: getMainBusiness(),
  staff: [],
  users: []
})

export const mutations = {
  // /////////////////////////////////////////////
  // Business/Account
  // /////////////////////////////////////////////

  // Updates user info in state and localstorage
  UPDATE_BUSINESS_INFO(state, payload) {
    if (process.client) {
      // Get Data localStorage
      let businessInfo = state.app_active_business

      for (const property of Object.keys(payload)) {
        if (payload[property] != null) {
          // If some of user property is null - user default property defined in state.app_active_business
          state.app_active_business[property] = payload[property]

          // Update key in localStorage
          businessInfo[property] = payload[property]
        }
      }
      // Store data in localStorage
      localStorage.setItem('businessInfo', JSON.stringify(businessInfo))
    }
  },

  UPDATE_MAIN_BUSINESS_INFO(state, payload) {
    if (process.client) {
      // Get Data localStorage
      let mainBusiness = state.app_main_business

      for (const property of Object.keys(payload)) {
        if (payload[property] != null) {
          // If some of user property is null - user default property defined in state.app_main_business
          state.app_main_business[property] = payload[property]

          // Update key in localStorage
          mainBusiness[property] = payload[property]
        }
      }
      // Store data in localStorage
      localStorage.setItem('mainBusiness', JSON.stringify(mainBusiness))
    }
  },
  UPDATE_STAFF(state, payload) {
    state.staff = payload
  }
}

export const actions = {}

export const getters = {
  app_active_business: state => state.app_active_business,
  isBusinessSet: state => {
    try {
      return state.app_active_business.b_uid !== 0
    } catch {
      return false
    }
  }
}

export const strict = false
