import firebase from 'firebase/app'

const config = {"apiKey":"AIzaSyDasJZDwGeFlc2m26MwXyUvTeOdPUg1Wig","authDomain":"test-halo-projects.firebaseapp.com","databaseURL":"https:\u002F\u002Ftest-halo-projects.firebaseio.com","projectId":"test-halo-projects","storageBucket":"test-halo-projects.appspot.com","messagingSenderId":"874056508972","appId":"1:874056508972:web:92eacac0dc860a1f735389","measurementId":"G-VM98TWRDL9"}

export default async ({ res }, inject) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
  const session = firebase.apps[0]

  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------------- FIREBASE AUTH ---------------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  await import(/* webpackChunkName: 'firebase-auth' */'firebase/auth')

  const fireAuth = session.auth()
  const fireAuthObj = firebase.auth
  inject('fireAuth', fireAuth)
  inject('fireAuthObj', fireAuthObj)

  /** --------------------------------------------------------------------------------------------- **/
  /** ------------------------------------ FIREBASE REALTIME DB ----------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  await import(/* webpackChunkName: 'firebase-database' */'firebase/database')

  const fireDb = session.database()
  const fireDbObj = firebase.database
  inject('fireDb', fireDb)
  inject('fireDbObj', fireDbObj)

  /** --------------------------------------------------------------------------------------------- **/
  /** ------------------------------------- FIREBASE FIRESTORE ------------------------------------ **/
  /** --------------------------------------------------------------------------------------------- **/

  await import(/* webpackChunkName: 'firebase-auth' */'firebase/firestore')

  const fireStore = session.firestore()
  const fireStoreObj = firebase.firestore
  inject('fireStore', fireStore)
  inject('fireStoreObj', fireStoreObj)

  // persistence should only be enabled client side
  if (process.client) {
    try {
      await fireStore.enablePersistence({})
    } catch (err) {
      if (err.code == 'failed-precondition') {
        console.warn('[@nuxtjs/firebase]: Firestore Persistence not enabled. Multiple tabs open, persistence can only be enabled in one tab at a a time.')
      } else if (err.code == 'unimplemented') {
        console.info('[@nuxtjs/firebase]: Firestore Persistence not enabled. The current browser does not support all of the features required to enable persistence.')
      }
    }
  }

  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------------- FIREBASE STORAGE ------------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  await import(/* webpackChunkName: 'firebase-storage' */'firebase/storage')

  const fireStorage = session.storage()
  const fireStorageObj = firebase.storage
  inject('fireStorage', fireStorage)
  inject('fireStorageObj', fireStorageObj)

  /** --------------------------------------------------------------------------------------------- **/
  /** ------------------------------------ FIREBASE FUNCTIONS ------------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  await import(/* webpackChunkName: 'firebase-functions' */'firebase/functions')

  const fireFunc = session.functions("us-central1")
  const fireFuncObj = firebase.functions

  fireFunc.useFunctionsEmulator('http://localhost:12345')

  inject('fireFunc', fireFunc)
  inject('fireFuncObj', fireFuncObj)

  /** --------------------------------------------------------------------------------------------- **/
  /** ------------------------------------ FIREBASE MESSAGING ------------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  // Firebase Messaging can only be initiated on client side
  if (process.client) {
    await import(/* webpackChunkName: 'firebase-messaging' */'firebase/messaging')

    if (firebase.messaging.isSupported()) {
      const fireMess = session.messaging()
      const fireMessObj = firebase.messaging

      if (config.fcmPublicVapidKey) {
        fireMess.usePublicVapidKey(config.fcmPublicVapidKey)
      }

      inject('fireMess', fireMess)
      inject('fireMessObj', fireMessObj)
    }
  }

  /** --------------------------------------------------------------------------------------------- **/
  /** ----------------------------------- FIREBASE PERFORMANCE ------------------------------------ **/
  /** --------------------------------------------------------------------------------------------- **/

  // Firebase Performance can only be initiated on client side
  if(process.client) {
    await import(/* webpackChunkName: 'firebase-performance' */'firebase/performance')

    const firePerf = session.performance()
    const firePerfObj = firebase.performance
    inject('firePerf', firePerf)
    inject('firePerfObj', firePerfObj)
  }

  /** --------------------------------------------------------------------------------------------- **/
  /** ----------------------------------- FIREBASE ANALYTICS -------------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  // Firebase Analytics can only be initiated on the client side
  if (process.client) {
    await import(/* webpackChunkName: 'firebase-analytics' */'firebase/analytics')

    const fireAnalytics = session.analytics()
    const fireAnalyticsObj = firebase.analytics
    inject('fireAnalytics', fireAnalytics)
    inject('fireAnalyticsObj', fireAnalyticsObj)
  }

  /** --------------------------------------------------------------------------------------------- **/
  /** -------------------------------- FIREBASE REMOTE CONFIG DB ---------------------------------- **/
  /** --------------------------------------------------------------------------------------------- **/

  // Firebase Remote Config can only be initiated on the client side
  if (process.client) {
    await import(/* webpackChunkName: 'firebase-remote-config' */'firebase/remote-config')

    const fireConfig = session.remoteConfig()
    const fireConfigObj = firebase.remoteConfig

    fireConfig.settings = {
      fetchTimeoutMillis: 60000,
      minimumFetchIntervalMillis: 43200000
    }

    inject('fireConfig', fireConfig)
    inject('fireConfigObj', fireConfigObj)
  }
}
