const functions = require('firebase-functions')
const moment = require('moment')
const admin = require('firebase-admin')

// Submitting too

let docBook

let docAssets

let docLiability

let docBookEntry

// When Assets are registered as a whole
exports.AssetsUpdate = functions.firestore
  .document('apps/crm/{businessID}/equity/equity/{equityID}')
  .onCreate((snap, context) => {
    const businessID = context.params.businessID
    const assetID = context.params.assetID
    const branch = snap.data().branch
    const liability_type = snap.data().liability_type
    const total_liability = snap.data().total_liability
    const loan_term = snap.data().loan_term
    const interest = snap.data().interest
    const interest_type = snap.data().interest_type
    const linked_asset = snap.data().linked_asset
    const asset_type = snap.data().asset_type
    const fixed_liability = snap.data().fixed_liability
    const created_date = snap.data().created_date
    const created_month = snap.data().created_month

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

    return docRef.get().then(doc => {
      if (doc.exists) {
        let newQuantity = doc.data().value + total_value

        return docRef.set({
          value: newQuantity,
          last_active: created_date
        })
      } else {
        let current_liabilities_value = 0
        let current_liabilities_data = []
        let current_contigent_value = 0
        let current_contigent_data = []
        let fixed_liabilities_value = 0
        let fixed_liabilities_data = []
        let liabilities = 0
        let liabilities_value = []

        let assetType = ''

        if (liability_type == 'Current') {
          current_asset_value = total_value
          current_asset_data.push(total_value)
          assetType = current_asset
          assets = assets + total_value
          assets.push(total_value)
        } else if (liability_type == 'Fixed') {
          fixed_asset_value = total_value
          fixed_asset_data.push(total_value)
          assetType = fixed_asset
          assets = assets + total_value
          assets.push(total_value)
        } else if (liability_type == 'Contigent') {
          fixed_asset_value = total_value
          fixed_asset_data.push(total_value)
          assetType = fixed_asset
          assets = assets + total_value
          assets.push(total_value)
        }

        let liabilityAllocation = {
          asset_value: assets,
          assets_data: assets_value,
          last_active: created_date,
          current_asset_value: current_asset_value,
          current_asset_data: current_asset_data,
          current_asset_last_active: created_date,
          fixed_asset_value: fixed_asset_value,
          fixed_asset_data: fixed_asset_data,
          fixed_asset_last_active: created_date,
          [`${assetType}_value`]: total_value,
          [`${assetType}_data`]: [total_value],
          [`${assetType}_active`]: created_date
        }

        if (assetType == 'inventory') {
          assetAllocation[`${inventory}_value`] = total_value
          assetAllocation[`${inventory}_data`] = [total_value]
          assetAllocation[`${inventory}_last_active`] = created_date
        } else if (assetType == 'Cash Equivalent') {
          assetAllocation[`${cash_equivalent}_value`] = total_value
          assetAllocation[`${cash_equivalent}_data`] = [total_value]
          assetAllocation[`${cash_equivalent}_last_active`] = created_date
        }

        if (transaction_type == 'Credit') {
          assets = assets - deposit
          assets.push(-deposit)
          assetAllocation.cash_value = -deposit
          assetAllocation.cash_data.push(-deposit)
          assetAllocation.cash_last_active = created_date
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
        } else if (transaction_type == 'Cash') {
          assets = assets - total_value
          assets.push(-total_value)
          assetAllocation.cash_value = -total_value
          assetAllocation.cash_data.push(-total_value)
          assetAllocation.cash_last_active = created_date
        }

        return docRef.set(liabilityAllocation)
      }
    })
  })
