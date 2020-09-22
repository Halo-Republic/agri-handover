const functions = require('firebase-functions')
const moment = require('moment')
const admin = require('firebase-admin')

function updateAssets() {}

function updateWarehouse() {
  docWarehouse.set(item_complete)
}

function setBookEntry() {}

function updateClient() {
  docClient.add(item_complete)
}

exports.salesUpdate = functions.firestore
  .document('apps/crm/{businessID}/sales/sales/{salesID}')
  .onCreate((snap, context) => {
    console.log('snaping', snap.data().cart_items.addedItems.length)
    for (let i = 0; i < snap.data().cart_items.addedItems.length; i++) {
      let assetsAdd = {
        debit: `Cash: ${Number(
          snap.data().cart_items.addedItems[i].product.price
        ) * Number(snap.data().cart_items.addedItems[i].quantity)} `,
        credit: `${snap.data().cart_items.addedItems[i].product.name}: ${Number(
          snap.data().cart_items.addedItems[i].product.price
        ) * Number(snap.data().cart_items.addedItems[i].quantity)} `,
        uid: snap.data().client_uid,
        ref: snap.data().item_ref,
        entry_type: 'Sales Allocation',
        branch: snap.data().cart_items.branch,
        ass_type: 'Current Assets',
        c_asset: 'Inventory',
        inv: 'Finished Goods',
        ass_name: snap.data().cart_items.addedItems[i].product.name,
        i_cost: Number(snap.data().cart_items.addedItems[i].product.price),
        t_cost:
          Number(snap.data().cart_items.addedItems[i].product.price) *
          Number(snap.data().cart_items.addedItems[i].quantity),
        qty: Number(snap.data().cart_items.addedItems[i].quantity),
        desc: 'vm.description',
        val_type: 'None',
        trans_type: 'Cash',
        last: moment().format('DD-MM-YYYY'),
        date: moment().format('DD-MM-YYYY'),
        month: moment().format('MM-YYYY'),
        timestamp: Date.now()
      }

      admin
        .firestore()
        .collection('apps')
        .doc('crm')
        .collection(context.params.businessID)
        .doc('book')
        .collection('book')
        .add(assetsAdd)
    }
  })

exports.purchaseUpdate = functions.firestore
  .document('apps/crm/{businessID}/purchases/purchases/{salesID}')
  .onCreate((snap, context) => {
    let dataAdd = snap.data()
    ;(dataAdd.entry_type = 'Purchase Allocation'),
      (dataAdd.branch = snap.data().deliveryToo.branch)
    ;(dataAdd.last = moment().format('DD-MM-YYYY')),
      (dataAdd.date = moment().format('DD-MM-YYYY')),
      (dataAdd.month = moment().format('MM-YYYY')),
      admin
        .firestore()
        .collection('apps')
        .doc('crm')
        .collection(context.params.businessID)
        .doc('book')
        .collection('book')
        .add(dataAdd)
  })

exports.transactionUpdate = functions.firestore
  .document('apps/crm/{businessID}/sales/sales/{salesID}')
  .onCreate((snap, context) => {
    console.log('snaping', snap.data().cart_items.addedItems.length)
    for (let i = 0; i < snap.data().cart_items.addedItems.length; i++) {
      let assetsAdd = {
        debit: `Cash: ${Number(
          snap.data().cart_items.addedItems[i].product.price
        ) * Number(snap.data().cart_items.addedItems[i].quantity)} `,
        credit: `${snap.data().cart_items.addedItems[i].product.name}: ${Number(
          snap.data().cart_items.addedItems[i].product.price
        ) * Number(snap.data().cart_items.addedItems[i].quantity)} `,
        uid: snap.data().client_uid,
        ref: snap.data().item_ref,
        entry_type: 'Profit Allocation',
        branch: snap.data().cart_items.branch,
        ass_type: 'Current Assets',
        c_asset: 'Inventory',
        inv: 'Finished Goods',
        ass_name: snap.data().cart_items.addedItems[i].product.name,
        i_cost: Number(snap.data().cart_items.addedItems[i].product.price),
        t_cost:
          Number(snap.data().cart_items.addedItems[i].product.price) *
          Number(snap.data().cart_items.addedItems[i].quantity),
        qty: Number(snap.data().cart_items.addedItems[i].quantity),
        desc: 'vm.description',
        val_type: 'None',
        trans_type: 'Cash',
        last: moment().format('DD-MM-YYYY'),
        date: moment().format('DD-MM-YYYY'),
        month: moment().format('MM-YYYY'),
        timestamp: Date.now()
      }

      admin
        .firestore()
        .collection('apps')
        .doc('crm')
        .collection(context.params.businessID)
        .doc('book')
        .collection('book')
        .add(assetsAdd)
    }
  })
