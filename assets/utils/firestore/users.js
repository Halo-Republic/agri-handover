function getStaff(user, business, store, fireStore) {
  let myStaff = []

  let getUsers = fireStore
    .collection('apps')
    .doc('users')
    .collection(business.b_uid)
    .doc('info')
    .collection('general')

  getUsers.onSnapshot(snapshot => {
    snapshot
      .docChanges()
      .forEach(change => {
        let doc = change.doc
        myStaff.push({
          status: doc.data().status,
          online_status: doc.data().online_status,
          role: doc.data().role,
          uid: doc.data().uid,
          display_name: doc.data().display_name,
          photoURL: doc.data().email,
          email: doc.data().email,
          name: doc.data().name,
          surname: doc.data().surname,
          company: doc.data().company,
          position: doc.data().position,
          branch: doc.data().branch,
          push_notes: doc.data().push_notes,
          verified: doc.data().verified,
          last_active: moment().format('DD-MM-YYYY'),

          created_month: doc.data().created_month,
          timestamp: doc.data().timestamp
        })
      })
      .then(() => {
        console.log('store', store, myStaff)
        //   store.commit('business/UPDATE_STAFF', myStaff)
      })
  })
}

export { getStaff } // a list of exported variables
