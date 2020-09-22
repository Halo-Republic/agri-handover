const functions = require('firebase-functions')
const moment = require('moment')
const admin = require('firebase-admin')

// When Assets are registered as a whole
let businessID = ''
let assetID = ''
let branch = ''
let liability_type = ''
let loan_term = ''
let interest = ''
let interest_type = ''
let linked_asset = ''
let asset_type = ''
let contigent_liability = ''
let current_liability = ''
let fixed_liability = ''
let created_date = ''
let created_month = ''
let loan_amount = ''

let docBook
let docLiability
let docBookEntry

let liability_value = 0
let liability_data = []
let fixed_liability_value = 0
let fixed_liability_data = []
let current_liability_value = 0
let current_liability_data = []
let contingent_liability_value = 0
let contingent_liability_data = []

let liabilityAllocation

//Upload total assets
function totalLiabilities(doc) {
  // check first of doc exist
  if (doc) {
    docBook.update(liabilityAllocation)
  } else {
    docBook.set(liabilityAllocation)
  }
}

exports.LiabilitiesUpdate = functions.firestore
  .document('apps/crm/{businessID}/liabilities/liabilities/{liabilityID}')
  .onCreate((snap, context) => {
    businessID = context.params.businessID
    assetID = context.params.assetID
    branch = snap.data().branch
    liability_type = snap.data().liability_type
    loan_term = snap.data().loan_term
    interest = snap.data().interest
    interest_type = snap.data().interest_type
    linked_asset = snap.data().linked_asset
    asset_type = snap.data().asset_type
    contigent_liability = snap.data().contigent_liability
    current_liability = snap.data().current_liability
    fixed_liability = snap.data().fixed_liability
    created_date = snap.data().created_date
    created_month = snap.data().created_month
    loan_amount = snap.data().total_liability

    docBook = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('stats')
      .collection('total')
      .doc('total')

    docLiability = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('stats')
      .collection('total')
      .doc('liability')

    docBookEntry = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('bookEntry')
      .collection('bookEntry')

    return docBook.get().then(doc => {
      liability_value = 0
      liability_data = []
      if (doc.exists) {
        if (doc.data().liability_value) {
          liability_value = doc.data().liability_value
        }
        if (doc.data().liability_data) {
          liability_data = doc.data().liability_data
        }
      }

      liability_value = liability_value + loan_amount
      liability_data.push(loan_amount)

      liabilityAllocation = {
        liability_value: liability_value,
        liability_data: liability_data,
        liability_last_active: created_date
      }
      totalLiabilities(doc.exists)
      return docLiability.get().then(docs => {
        fixed_liability_value = 0
        fixed_liability_data = []
        current_liability_value = 0
        current_liability_data = []
        contingent_liability_value = 0
        contingent_liability_data = []

        if (docs.exists) {
          if (docs.data().fixed_liability_value) {
            fixed_liability_value = docs.data().fixed_liability_value
          }
          if (docs.data().fixed_liability_data) {
            fixed_liability_data = docs.data().fixed_liability_data
          }
          if (docs.data().current_liability_value) {
            current_liability_value = docs.data().current_liability_value
          }
          if (docs.data().current_liability_data) {
            current_liability_data = docs.data().current_liability_data
          }
          if (docs.data().contingent_liability_value) {
            contingent_liability_value = docs.data().contingent_liability_value
          }
          if (docs.data().contingent_liability_data) {
            contingent_liability_data = docs.data().contingent_liability_data
          }
        }

        if (liability_type == 'Fixed') {
          fixed_liability_value = fixed_liability_value + loan_amount
          fixed_liability_data.push(loan_amount)
        }

        if (liability_type == 'Contigent') {
          contingent_liability_value = contingent_liability_value + loan_amount
          contingent_liability_data.push(loan_amount)
        }

        if (liability_type == 'Current') {
          current_liability_value = current_liability_value + loan_amount
          current_liability_data.push(loan_amount)
        }

        let liabilityAllocation = {
          fixed_liability_value: fixed_liability_value,
          fixed_liability_data: fixed_liability_data,
          current_liability_value: current_liability_value,
          current_liability_data: current_liability_data,
          contingent_liability_value: contingent_liability_value,
          contingent_liability_data: contingent_liability_data
        }
        if (docs.exists) {
          return docLiability.update(liabilityAllocation)
        } else {
          return docLiability.set(liabilityAllocation)
        }
      })
    })
  })
