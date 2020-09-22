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
    for (let i = 0; i < snap.data().c_items.addedItems.length; i++) {
      console.log('ADD', snap.data().c_items.addedItems[i].product.name)
      console.log('INDEX', i)

      let quant =
        snap.data().t_quantity * snap.data().c_items.addedItems[i].quantity
      let val = quant * snap.data().c_items.addedItems[i].product.price

      let assetsAdd = {
        debit: `Cash: ${Number(
          snap.data().c_items.addedItems[i].product.price
        ) * Number(snap.data().c_items.addedItems[i].quantity)} `,
        credit: `${snap.data().c_items.addedItems[i].product.name}: ${Number(
          snap.data().c_items.addedItems[i].product.price
        ) * Number(snap.data().c_items.addedItems[i].quantity)} `,
        uid: snap.data().c_uid,
        ref: snap.data().item_ref,
        entry_type: 'Sales Allocation',
        branch: snap.data().c_items.branch,
        ass_type: 'Current Assets',
        c_asset: 'Inventory',
        inv: 'Finished Goods',
        ass_name: snap.data().c_items.addedItems[i].product.name,
        i_cost: Number(snap.data().c_items.addedItems[i].product.price),
        t_cost: val,
        qty: quant,
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
      (dataAdd.branch = snap.data().deliveryToo.name)
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

// exports.transactionUpdate = functions.firestore
//   .document('apps/crm/{businessID}/sales/transactions/{salesID}')
//   .onCreate((snap, context) => {
// let docID = context.params.salesID
// for (let i = 0; i < snap.data().c_items.length; i++) {
//   console.log('snap.data().c_items[i]', snap.data().c_items[i])
//   let individualTransaction = {
//     m_payment_id: snap.data().m_payment_id,
//     transaction_id: docID,
//     client_uid: snap.data().client_uid,
//     client_displayname: snap.data().client_displayname,
//     client_email: snap.data().client_email,
//     c_items: snap.data().c_items[i],
//     price: snap.data().c_items[i].price,
//     ctc: snap.data().c_items[i].ctc,
//     item_ref: snap.data().c_items[i].objectID,
//     entry_type: 'Profit Allocation',
//     total_price:
//       Number(snap.data().c_items[i].price) *
//       Number(snap.data().c_items[i].quantity),
//     total_profit:
//       (Number(snap.data().c_items[i].price) -
//         Number(snap.data().c_items[i].ctc)) *
//       Number(snap.data().c_items[i].quantity),
//     total_quantity: snap.data().c_items[i].quantity,
//     total_CTC:
//       Number(snap.data().c_items[i].ctc) *
//       Number(snap.data().c_items[i].quantity),
//     payment_received: false,
//     verify_payfast: false,
//     stage: snap.data().stage,
//     deliveryToo: snap.data().deliveryToo,
//     invoiced_date: moment().format('DD-MM-YYYY'),
//     invoiced_month: moment().format('MM-YYYY'),
//     created_date: moment().format('DD-MM-YYYY'),
//     created_month: moment().format('MM-YYYY'),
//     timestamp: Date.now()
//   }
//   admin
//     .firestore()
//     .collection('apps')
//     .doc('crm')
//     .collection(snap.data().c_items[i].sellerID)
//     .doc('sales')
//     .collection('sales')
//     .add(individualTransaction)
//     .then(docRef => {
//       admin
//         .firestore()
//         .collection('invoice_give')
//         .doc(docRef.id)
//         .set(individualTransaction)
//     })
//   admin
//     .firestore()
//     .collection('apps')
//     .doc('crm')
//     .collection(snap.data().c_items[i].sellerID)
//     .doc('book')
//     .collection('book')
//     .add(individualTransaction)
//   if (snap.data().deliveryToo.type == 'company') {
//     admin
//       .firestore()
//       .collection('apps')
//       .doc('crm')
//       .collection(snap.data().deliveryToo.id)
//       .doc('purchases')
//       .collection('purchases')
//       .add(individualTransaction)
//   } else if (snap.data().deliveryToo.type == 'person') {
//     admin
//       .firestore()
//       .collection('user')
//       .doc('info')
//       .collection('purchases')
//       .doc(snap.data().deliveryToo.id)
//       .collection('purchases')
//       .add(individualTransaction)
//   }
// }
// admin
//   .firestore()
//   .collection('invoice')
//   .doc(docRef.id)
//   .set(individualTransaction)
// })

exports.transactionUpdate = functions.firestore
  .document('apps/crm/{businessID}/sales/sales/{salesID}')
  .onCreate((snap, context) => {
    let dataAdd = snap.data()
    ;(dataAdd.entry_type = 'Profit Allocation'),
      (dataAdd.branch = snap.data().deliveryToo.name)
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
