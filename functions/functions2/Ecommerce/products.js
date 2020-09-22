const functions = require('firebase-functions')
const moment = require('moment')
const admin = require('firebase-admin')

exports.productsResellerUpdate = functions.firestore
  .document('apps/crm/{activebusinessID}/products/products/{productID}')
  .onCreate((snap, context) => {
    let productRef = context.params.productID
    let companyRef = context.params.activebusinessID
    let product_name = snap.data().product_name
    let branch = snap.data().branch
    let price = snap.data().price
    let quantity = snap.data().quantity
    let description = snap.data().description
    let active = snap.data().active
    let vat = snap.data().vat
    let category = snap.data().category
    let featured = snap.data().featured
    let brand = snap.data().brand
    let discount = snap.data().discount
    let ctc = snap.data().ctc
    let comm = snap.data().comm
    let rating = 0
    let times_rated = 0
    let addedItems = snap.data().addedItems
    let images = snap.data().images
    let reseller_id = snap.data().reseller_id
    let last_active = moment().format('DD-MM-YYYY')
    let created_month = moment().format('DD-MM-YYYY')
    let timestamp = Date.now()

    const docRef = admin
      .firestore()
      .collection('apps')
      .doc('crm')
      .collection(reseller_id)
      .doc('products')
      .collection('resells')
      .doc(productRef)
    return docRef.set({
      productRef: productRef,
      companyRef: companyRef,
      ctc: ctc,
      product_name: product_name,
      branch: branch,
      price: price,
      quantity: quantity,
      description: description,
      active: active,
      vat: vat,
      category: category,
      featured: featured,
      brand: brand,
      discount: discount,
      rating: 0,
      comm: comm,
      times_rated: 0,
      addedItems: addedItems,
      images: images,
      reseller_id: reseller_id,
      last_active: last_active,
      created_month: created_month,
      timestamp: timestamp
    })
  })
