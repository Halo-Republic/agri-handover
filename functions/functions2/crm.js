const functions = require('firebase-functions')
const moment = require('moment')
const admin = require('firebase-admin')

// exports.SaleQuantityUpdate = functions.firestore
//   .document('{businessName}/{businessID}/crm/crm/sales/{salesID}')
//   .onCreate((snap, context) => {
//     const Quant = snap.data().totalQuantity
//     const sellerName = snap.data().ItemsAdd.sellerName
//     const sellerID = snap.data().ItemsAdd.sellerID
//     const itemRef = snap.data().itemRef

//     const docRef = admin
//       .firestore()
//       .collection(sellerName)
//       .doc(sellerID)
//       .collection('crm')
//       .doc('crm')
//       .collection('physical')
//       .doc(itemRef)
//     return docRef.get().then(doc => {
//       let newQuantity = doc.data().stock - Quant

//       return docRef.update({
//         stock: newQuantity
//       })
//     })
//   })

// exports.SaleQuantityUpdate = functions.firestore
//   .document('apps/crm/{businessID}/assets/assets/{assetID}')
//   .onCreate((snap, context) => {
//     const businessID = context.params.businessID
//     const branch = snap.data().branch
//     const asset_type = snap.data().asset_type
//     const current_asset = snap.data().current_asset
//     const fixed_asset = snap.data().fixed_asset
//     const price = snap.data().price
//     const quantity = snap.data().quantity
//     const total_value = price * quantity

//     const docRef = admin
//       .firestore()
//       .collection('apps')
//       .doc('crm')
//       .collection(businessID)
//       .doc('value')
//       .collection('assets')
//       .doc('total')

//     const docCurrent = admin
//       .firestore()
//       .collection('apps')
//       .doc('crm')
//       .collection(businessID)
//       .doc('value')
//       .collection('assets')
//       .doc('current')

//     const docFixed = admin
//       .firestore()
//       .collection('apps')
//       .doc('crm')
//       .collection(businessID)
//       .doc('value')
//       .collection('assets')
//       .doc('fixed')

//     const docMixed = admin
//       .firestore()
//       .collection('apps')
//       .doc('crm')
//       .collection(businessID)
//       .doc('value')
//       .collection('assets')
//       .doc(asset_type)

//     return docRef.get().then(doc => {
//       let newQuantity = doc.data().value + total_value

//       return docRef.set({
//         value: newQuantity,
//         last_active: moment().format('DD-MM-YYYY')
//       })
//     })
//   })

exports.CompanyQuantityUpdate = functions.firestore
  .document('apps/crm/{businessID}/company/company/{companyID}')
  .onCreate((snap, context) => {
    const businessID = context.params.businessID
    const created_month = snap.data().created_month
    const created_date = snap.data().created_date
    const uid = snap.data().uid

    const docRef = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('stats')
      .collection('total')
      .doc(created_month)

    const docDate = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('stats')
      .collection('user')
      .doc('total')
      .collection(created_month)
      .doc(uid)

    //Get created months Doc
    return docRef.get().then(doc => {
      if (doc.exists) {
        //if exist setting the data
        console.log('Document data:', doc.data())
        console.log('Document data:', doc.data())
        let newQuantity = 0
        let data = []
        let current_day = 1
        let last_active = ''

        if(doc.data().company_last_active){
          last_active = doc.data().company_last_active
        }

        // check if data of each exist
        if (doc.data().company_value) {
          newQuantity = doc.data().company_value + 1
        } else {
          newQuantity = 1
        }

        if (doc.data().company_data) {
          data = doc.data().company_data
          // check if last update was on same day so that we can add numbers together
          if (last_active == created_date) {
            let length = data.length
            let last = data[length - 1]
            let number = last + 1
            current_day = number
            data.push(number)
          } else {
            data.push(1)
          }
        } else {
          data = [1]
        }
        return docRef
          .update({
            company_value: newQuantity,
            company_data: data,
            company_last_active: created_date,
            [`company_${created_date}`]: current_day
          })
          .then(() => {
            return docDate.get().then(doc => {
              if (doc.exists) {
                console.log('Document data:', doc.data())
                let newQuantity = 0
                let data = []
                let current_day = 1
                let last_active = ''

                if(doc.data().company_last_active){
                  last_active = doc.data().company_last_active
                }

                // check if data of each exist
                if (doc.data().company_value) {
                  newQuantity = doc.data().company_value + 1
                } else {
                  newQuantity = 1
                }

                if (doc.data().company_data) {
                  data = doc.data().company_data
                  // check if last update was on same day so that we can add numbers together
                  if (last_active == created_date) {
                    let length = data.length
                    let last = data[length - 1]
                    let number = last + 1
                    current_day = number
                    data.push(number)
                  } else {
                    data.push(1)
                  }
                } else {
                  data = [1]
                }
                return docDate.update({
                  company_value: newQuantity,
                  company_data: data,
                  company_last_active: created_date,
                  [`company_${created_date}`]: current_day
                })
              } else {
                // doc.data() will be undefined in this case
                console.log('No such document!')
                return docDate.set({
                  company_value: 1,
                  company_data: [1],
                  company_last_active: created_date,
                  [`company_${created_date}`]: 1
                })
              }
            })
          })
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
        return docRef
          .set({
            company_value: 1,
            company_data: [1],
            company_last_active: created_date,
            [`company_${created_date}`]: 1
          })
          .then(() => {
            return docDate.get().then(doc => {
              if (doc.exists) {
                console.log('Document data:', doc.data())
                let newQuantity = 0
                let data = []
                let current_day = 1
                let last_active = ''

          if(doc.data().company_last_active){
            last_active = doc.data().company_last_active
          }

                // check if data of each exist
                if (doc.data().company_value) {
                  newQuantity = doc.data().company_value + 1
                } else {
                  newQuantity = 1
                }

                if (doc.data().company_data) {
                  data = doc.data().company_data
                  // check if last update was on same day so that we can add numbers together
                  if (last_active == created_date) {
                    let length = data.length
                    let last = data[length - 1]
                    let number = last + 1
                    current_day = number
                    data.push(number)
                  } else {
                    data.push(1)
                  }
                } else {
                  data = [1]
                }

                return docDate.update({
                  company_value: newQuantity,
                  company_data: data,
                  company_last_active: created_date,
                  [`company_${created_date}`]: current_day
                })
              } else {
                // doc.data() will be undefined in this case
                console.log('No such document!')
                return docDate.set({
                  company_value: 1,
                  company_data: [1],
                  company_last_active: created_date,
                  [`company_${created_date}`]: 1
                })
              }
            })
          })
      }
    })
  })

exports.CustomerQuantityUpdate = functions.firestore
  .document('apps/users/{businessID}/info/general/{companyID}')
  .onCreate((snap, context) => {
    const businessID = context.params.businessID
    const created_month = snap.data().created_month
    const created_date = snap.data().created_date
    const uid = snap.data().uid
    const role = snap.data().role

    const docRef = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('stats')
      .collection('total')
      .doc(created_month)

    const docDate = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('stats')
      .collection('user')
      .doc('total')
      .collection(created_month)
      .doc(uid)
    if (role == 'User') {
      //Get created months Doc
      return docRef.get().then(doc => {
        if (doc.exists) {
          //if exist setting the data
          console.log('Document data:', doc.data())
          let newQuantity = 0
          let data = []
          let current_day = 1
          let last_active = ''

          if(doc.data().customer_last_active){
            last_active = doc.data().customer_last_active
          }

          // check if data of each exist
          if (doc.data().customer_value) {
            newQuantity = doc.data().customer_value + 1
          } else {
            newQuantity = 1
          }

          

          if (doc.data().customer_data) {
            data = doc.data().customer_data
            // check if last update was on same day so that we can add numbers together
            if (last_active == created_date) {
              let length = data.length
              let last = data[length - 1]
              let number = last + 1
              current_day = number
              data.push(number)
            } else {
              data.push(1)
            }
          } else {
            data = [1]
          }

          console.log('qu', newQuantity)
          console.log('data', data)
          console.log('created_date', created_date)
          console.log('current_day', current_day)


          return docRef
            .update({
              customer_value: newQuantity,
              customer_data: data,
              customer_last_active: created_date,
              [`customer_${created_date}`]: current_day
            })
            .then(() => {
              return docDate.get().then(doc => {
                if (doc.exists) {
                  console.log('Document data:', doc.data())
                  console.log('Document data:', doc.data())
                  let newQuantity = 0
                  let data = []
                  let current_day = 1
                  let last_active = ''

          if(doc.data().customer_last_active){
            last_active = doc.data().customer_last_active
          }

                  // check if data of each exist
                  if (doc.data().customer_value) {
                    newQuantity = doc.data().customer_value + 1
                  } else {
                    newQuantity = 1
                  }

                  if (doc.data().customer_data) {
                    data = doc.data().customer_data
                    // check if last update was on same day so that we can add numbers together
                    if (last_active == created_date) {
                      let length = data.length
                      let last = data[length - 1]
                      let number = last + 1
                      current_day = number
                      data.push(number)
                    } else {
                      data.push(1)
                    }
                  } else {
                    data = [1]
                  }
                  return docDate.update({
                    customer_value: newQuantity,
                    customer_data: data,
                    customer_last_active: created_date,
                    [`customer_${created_date}`]: current_day
                  })
                } else {
                  // doc.data() will be undefined in this case
                  console.log('No such document!')
                  return docDate.set({
                    customer_value: 1,
                    customer_data: [1],
                    customer_last_active: created_date,
                    [`customer_${created_date}`]: 1
                  })
                }
              })
            })
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
          return docRef
            .set({
              customer_value: 1,
              customer_data: [1],
              customer_last_active: created_date,
              [`customer_${created_date}`]: 1
            })
            .then(() => {
              return docDate.get().then(doc => {
                if (doc.exists) {
                  console.log('Document data:', doc.data())
                  let newQuantity = 0
                  let data = []
                  let current_day = 1
                  let last_active = ''

                  if(doc.data().customer_last_active){
                    last_active = doc.data().customer_last_active
                  }

                  // check if data of each exist
                  if (doc.data().customer_value) {
                    newQuantity = doc.data().customer_value + 1
                  } else {
                    newQuantity = 1
                  }

                  if (doc.data().customer_data) {
                    data = doc.data().customer_data
                    // check if last update was on same day so that we can add numbers together
                    if (last_active == created_date) {
                      let length = data.length
                      let last = data[length - 1]
                      let number = last + 1
                      current_day = number
                      data.push(number)
                    } else {
                      data.push(1)
                    }
                  } else {
                    data = [1]
                  }
                  return docDate.update({
                    customer_value: newQuantity,
                    customer_data: data,
                    customer_last_active: created_date,
                    [`customer_${created_date}`]: current_day
                  })
                } else {
                  // doc.data() will be undefined in this case
                  console.log('No such document!')
                  return docDate.set({
                    customer_value: 1,
                    customer_data: [1],
                    customer_last_active: created_date,
                    [`customer_${created_date}`]: 1
                  })
                }
              })
            })
        }
      })
    }
  })

// exports.CustomerQuantityUpdate = functions.firestore
//   .document('apps/users/{businessID}/info/general/{companyID}')
//   .onCreate((snap, context) => {
//     const businessID = context.params.businessID
//     const created_month = snap.data().created_month
//     const created_date = snap.data().created_date
//     const role = snap.data().role
//     const uid = snap.data().uid

//     const docRef = admin
//       .firestore()
//       .collection('apps')
//       .doc('crm')
//       .collection(businessID)
//       .doc('stats')
//       .collection('total')
//       .doc(created_month)

//     const docDate = admin
//       .firestore()
//       .collection('apps')
//       .doc('crm')
//       .collection(businessID)
//       .doc('stats')
//       .collection('user')
//       .doc('total')
//       .collection(created_month)
//       .doc(uid)

//         //See first if employee or company staff member
//     if (role == 'User') {
//       //Get created months Doc
//       return docRef.get().then(doc => {
//         if (doc.exists) {
//           //if exist setting the data
//           console.log('Document data:', doc.data())
//           let newQuantity = doc.data().customer_value + 1
//           let data = doc.data().customer_data
//           let last_active = doc.data().customer_last_active

//           // check if last update was on same day so that we can add numbers together
//           if (last_active == created_date) {
//             let length = data.length
//             let last = data[length - 1]
//             let number = last + 1
//             data.push(number)
//           } else {
//             data.push(1)
//           }
//           return docRef
//             .update({
//               customer_value: newQuantity,
//               customer_data: data,
//               customer_last_active: created_date
//             })
//             .then(() => {
//               return docDate.get().then(doc => {
//                 if (doc.exists) {
//                   console.log('Document data:', doc.data())
//                   let newQuantity = doc.data().customer_value + 1
//                   let data = doc.data().customer_data
//                   let last_active = doc.data().customer_last_active

//                   if (last_active == created_date) {
//                     let length = data.length
//                     let last = data[length - 1]
//                     let number = last + 1
//                     data.push(number)
//                   } else {
//                     data.push(1)
//                   }
//                   return docDate.update({
//                     customer_value: newQuantity,
//                     customer_data: data,
//                     customer_last_active: created_date
//                   })
//                 } else {
//                   // doc.data() will be undefined in this case
//                   console.log('No such document!')
//                   return docDate.set({
//                     customer_value: 1,
//                     customer_data: [1],
//                     customer_last_active: created_date
//                   })
//                 }
//               })
//             })
//         } else {
//           // doc.data() will be undefined in this case
//           console.log('No such document!')
//           return docRef
//             .set({
//               customer_value: 1,
//               customer_data: [1],
//               customer_last_active: created_date
//             })
//             .then(() => {
//               return docDate.get().then(doc => {
//                 if (doc.exists) {
//                   console.log('Document data:', doc.data())
//                   let newQuantity = doc.data().customer_value + 1
//                   let data = doc.data().customer_data
//                   let last_active = doc.data().customer_last_active

//                   if (last_active == created_date) {
//                     let length = data.length
//                     let last = data[length - 1]
//                     let number = last + 1
//                     data.push(number)
//                   } else {
//                     data.push(1)
//                   }
//                   return docDate.update({
//                     customer_value: newQuantity,
//                     customer_data: data,
//                     customer_last_active: created_date
//                   })
//                 } else {
//                   // doc.data() will be undefined in this case
//                   console.log('No such document!')
//                   return docDate.set({
//                     customer_value: 1,
//                     customer_data: [1],
//                     customer_last_active: created_date
//                   })
//                 }
//               })
//             })
//         }
//       })
//     } else {
//       return
//     }
//   })
