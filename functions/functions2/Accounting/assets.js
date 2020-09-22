const functions = require('firebase-functions')
const moment = require('moment')
const admin = require('firebase-admin')

// Variables received from document/asset created
let businessID = '123'
let assetID = ''
let branch = ''
let asset_type = ''
let current_asset = ''
let fixed_asset = ''
let cost = ''
let quantity = ''
let total_cost = ''
let created_month = ''
let created_date = ''
let transaction_type = ''
let value_type = ''
let inventory = ''
let cash_equivalent = ''
let residual = ''
let expected_life = ''
let deposit = ''
let loan_amount = ''
let loan_term = ''
let interest = ''
let interest_type = ''
let documentation = ''
let asset_name = ''

// Submitting too

let docBook

let docAssets

let docLiability

let docBookEntry

// Variables created
let asset_value = 0 // total asset value
let asset_data = [] // total asset array
let asset_type_sub = '' // sub cat from asset type (fixed/current)
let asset_type_sub_sub = '' // sub cat from inventory or cash equivalent
let fixed_asset_value = 0 // total fixed asset value
let fixed_asset_data = [] // total fixed asset data
let current_asset_value = 0 // total current asset value
let current_asset_data = [] // total current asset data

// Asset allocation for total
let assetAllocation

// Book entry allocation
let bookAllocation = {
  branch: branch,
  documentation: documentation,
  linked_asset: assetID,
  created_date: created_date,
  created_month: created_month
}

//Upload total assets
function totalAssets(doc) {
  // check first of doc exist
  if (doc) {
    docBook.update(assetAllocation)
  } else {
    docBook.set(assetAllocation)
  }
}

//Upload fixed/current assets
function typeAssets(doc) {
  if (doc) {
    docAssets.update({
      fixed_asset_value: fixed_asset_value,
      fixed_asset_data: fixed_asset_data,
      current_asset_value: current_asset_value,
      current_asset_data: current_asset_data
    })
  } else {
    docAssets.set({
      fixed_asset_value: fixed_asset_value,
      fixed_asset_data: fixed_asset_data,
      current_asset_value: current_asset_value,
      current_asset_data: current_asset_data
    })
  }
}

// Upload liability if asset bought on credit
function setLiability() {
  docLiability.add({
    liability_type: 'Fixed',
    total_liability: loan_amount,
    loan_term: loan_term,
    interest: interest,
    interest_type: interest_type,
    linked_asset: assetID,
    asset_type: asset_type,
    fixed_liability: 'Long Term Loans',
    created_date: created_date,
    created_month: created_month
  })
}

function setBookEntry() {
  console.log('BOOOKS')
  docBookEntry.add(bookAllocation)
}

exports.AssetsUpdate = functions.firestore
  .document('apps/crm/{businessID}/assets/assets/{assetID}')
  .onCreate((snap, context) => {
    businessID = context.params.businessID
    assetID = context.params.assetID
    branch = snap.data().branch
    asset_type = snap.data().asset_type
    current_asset = snap.data().current_asset
    fixed_asset = snap.data().fixed_asset
    cost = snap.data().cost
    quantity = snap.data().quantity
    total_cost = snap.data().total_cost
    created_month = snap.data().created_month
    created_date = snap.data().created_date
    transaction_type = snap.data().transaction_type
    value_type = snap.data().value_type
    inventory = snap.data().inventory
    cash_equivalent = snap.data().cash_equivalent
    residual = snap.data().residual
    expected_life = snap.data().expected_life
    deposit = snap.data().deposit
    loan_amount = snap.data().loan_amount
    loan_term = snap.data().loan_term
    interest = snap.data().interest
    interest_type = snap.data().interest_type
    documentation = snap.data().documentation
    asset_name = snap.data().asset_name

    docBook = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('stats')
      .collection('total')
      .doc('total')

    docAssets = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('stats')
      .collection('total')
      .doc('assets')

    docLiability = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('liabilities')
      .collection('liabilities')

    docBookEntry = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(businessID)
      .doc('bookEntry')
      .collection('bookEntry')

    if (asset_type == 'Current Assets') {
      asset_type_sub = current_asset
      if (asset_type_sub == 'Inventory') {
        asset_type_sub_sub = inventory
      }
      if (asset_type_sub == 'Cash Equivalent') {
        asset_type_sub_sub = cash_equivalent
      }
    } else if (asset_type == 'Fixed Assets') {
      asset_type_sub = fixed_asset
    }

    return docBook
      .get()
      .then(doc => {
        // if doc exists get current asset value and data and set it
        if (doc.exists) {
          if (doc.data().asset_value) {
            asset_value = doc.data().asset_value
          }
          if (doc.data().asset_data) {
            asset_data = doc.data().asset_data
          }
        }
        if (transaction_type == 'Cash') {
          asset_data.push(total_cost, -total_cost)
        } else {
          asset_value = total_cost - deposit
          asset_data.push(total_cost, -deposit)
          setLiability()
        }
        assetAllocation = {
          asset_value: asset_value,
          asset_data: asset_data
        }
        totalAssets(doc.exists)
      })
      .then(() => {
        return docAssets
          .get()
          .then(docs => {
            if (docs.exists) {
              if (docs.data().fixed_asset_value) {
                fixed_asset_value = docs.data().fixed_asset_value
              }
              if (docs.data().fixed_asset_data) {
                fixed_asset_data = docs.data().fixed_asset_data
              }
              if (docs.data().current_asset_value) {
                current_asset_value = docs.data().current_asset_value
              }
              if (docs.data().current_asset_data) {
                current_asset_data = docs.data().current_asset_data
              }
            }

            if (transaction_type == 'Cash') {
              bookAllocation = {
                branch: branch,
                documentation: documentation,
                linked_asset: assetID,
                created_date: created_date,
                created_month: created_month
              }
              if (asset_type == 'Current Assets') {
                current_asset_value = current_asset_value + total_cost
                current_asset_data.push(total_cost)
                current_asset_value = current_asset_value - total_cost
                current_asset_data.push(-total_cost)
              } else if (asset_type == 'Fixed Assets') {
                fixed_asset_value = fixed_asset_value + total_cost
                fixed_asset_data.push(total_cost)
                current_asset_value = current_asset_value - total_cost
                current_asset_data.push(-total_cost)
              }
              bookAllocation.asset_name = asset_name
              bookAllocation.asset = asset_type_sub
              bookAllocation.debit = asset_type_sub
              bookAllocation.credit = 'Cash'
              bookAllocation.debit_val = total_cost
              bookAllocation.credit_val = total_cost
              if (asset_type_sub_sub) {
                bookAllocation.asset_type_sub_sub = asset_type_sub_sub
              }

              setBookEntry()
              typeAssets(docs.exists)
            } else if (transaction_type == 'Credit') {
              bookAllocation = {
                branch: branch,
                documentation: documentation,
                linked_asset: assetID,
                created_date: created_date,
                created_month: created_month
              }
              if (asset_type == 'Current Assets') {
                current_asset_value = current_asset_value + total_cost
                current_asset_data.push(total_cost)
                current_asset_value = current_asset_value - deposit
                current_asset_data.push(-deposit)
              } else if (asset_type == 'Fixed Assets') {
                fixed_asset_value = fixed_asset_value + total_cost
                fixed_asset_data.push(total_cost)
                current_asset_value = current_asset_value - deposit
                current_asset_data.push(-deposit)
              }

              bookAllocation.asset_name = asset_name
              bookAllocation.asset = asset_type_sub
              bookAllocation.debit = asset_type_sub
              bookAllocation.credit = 'Cash'
              bookAllocation.credit2 = 'Long Term Loans'
              bookAllocation.debit_val = total_cost
              bookAllocation.credit_val = deposit
              bookAllocation.credit_val2 = loan_amount
              if (asset_type_sub_sub) {
                bookAllocation.asset_type_sub_sub = asset_type_sub_sub
              }
              setBookEntry()
              typeAssets(docs.exists)
            }
          })
          .then(() => {
            businessID = '123'
            assetID = ''
            branch = ''
            asset_type = ''
            current_asset = ''
            fixed_asset = ''
            cost = ''
            quantity = ''
            total_cost = ''
            created_month = ''
            created_date = ''
            transaction_type = ''
            value_type = ''
            inventory = ''
            cash_equivalent = ''
            residual = ''
            expected_life = ''
            deposit = ''
            loan_amount = ''
            loan_term = ''
            interest = ''
            interest_type = ''
            documentation = ''
            asset_name = ''
          })
      })
  })
