const functions = require('firebase-functions')
const admin = require('firebase-admin')
const moment = require('moment')
admin.initializeApp()
//User registration

exports.loadUserInfo = functions.auth.user().onCreate(user => {
  const uid = user.uid

  const docRef = admin
    .firestore()
    .collection('user')
    .doc('info')
    .collection('info')
    .doc(uid)

  const docSoc = admin
    .firestore()
    .collection('user')
    .doc('info')
    .collection('social_links')
    .doc(uid)

  const docNot = admin
    .firestore()
    .collection('user')
    .doc('info')
    .collection('notifications')
    .doc(uid)

  return docRef
    .set({
      about: 'this is me...',
      uid: uid,
      dob: '',
      gender: '',
      country: '',
      mobile: '',
      website: '',
      languages_known: []
    })
    .then(() => {
      return docSoc.set({
        uid: uid,
        twitter: '',
        facebook: '',
        instagram: '',
        github: '',
        linkedin: '',
        slack: '',
        codepen: ''
      })
    })
    .then(() => {
      return docNot.set({
        uid: uid,
        comment: false,
        answer: false,
        follow: false,
        news: false,
        product_update: false,
        blog: false
      })
    })
})

exports.loadBusinessUserInfo = functions.firestore
  .document('apps/users/{businessID}/info/general/{userID}')
  .onCreate((snap, context) => {
    const businessID = context.params.businessID
    const uid = context.params.userID

    const docRef = admin
      .firestore()
      .collection('apps')
      .doc('users')
      .collection(businessID)
      .doc('info')
      .collection('info')
      .doc(uid)

    const docSoc = admin
      .firestore()
      .collection('apps')
      .doc('users')
      .collection(businessID)
      .doc('info')
      .collection('social_links')
      .doc(uid)

    const docNot = admin
      .firestore()
      .collection('apps')
      .doc('users')
      .collection(businessID)
      .doc('info')
      .collection('notifications')
      .doc(uid)

    return docRef
      .set({
        about: 'this is me...',
        uid: uid,
        dob: '',
        gender: '',
        country: '',
        role: 'Staff',
        mobile: '',
        website: '',
        languages_known: [],
        add_line_1: '',
        add_line_2: '',
        post_code: '',
        city: '',
        state: '',
      })
      .then(() => {
        return docSoc
          .set({
            uid: uid,
            twitter: '',
            facebook: '',
            instagram: '',
            github: '',
            linkedin: '',
            slack: '',
            codepen: ''
          })
          .then(() => {
            return docNot.set({
              uid: uid,
              comment: false,
              answer: false,
              follow: false,
              news: false,
              product_update: false,
              blog: false
            })
          })
      })
  })
