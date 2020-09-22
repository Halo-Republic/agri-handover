const functions = require('firebase-functions')
const { Nuxt } = require('nuxt')
const express = require('express')
const app = express()
const algoliasearch = require('algoliasearch')
const nodemailer = require('nodemailer')
const admin = require('firebase-admin')

const user = require('./functions/User/index')
const crm = require('./functions/CRM/index')
const business = require('./functions/Business/index')

const products = require('./functions/Ecommerce/products')
const sales = require('./functions/Ecommerce/sales')
const emails = require('./functions/Email/index')
const accounting = require('./functions/Accounting/index')

// User
exports.loadBusinessUserInfo = user.loadBusinessUserInfo

// CRM
exports.CompanyQuantityUpdate = crm.CompanyQuantityUpdate
exports.CustomerQuantityUpdate = crm.CustomerQuantityUpdate

// Business
exports.loadBusiness = business.loadBusiness

exports.sendBuyersMail = emails.sendBuyersMail
exports.sendBuyerResellerMail = emails.sendBuyerResellerMail
exports.sendSalesMail = emails.sendSalesMail
exports.sendSalesResellerMail = emails.sendSalesResellerMail
exports.sendPersonMail = emails.sendPersonMail
exports.sendWelcomeEmail = emails.sendWelcomeEmail
exports.sendContactUs = emails.sendContactUs
exports.sendSalesWelcome = emails.sendSalesWelcome

exports.salesUpdate = sales.salesUpdate
exports.purchaseUpdate = sales.purchaseUpdate
exports.transactionUpdate = sales.transactionUpdate
exports.productsResellerUpdate = products.productsResellerUpdate
exports.bookUpdate = accounting.bookUpdate

const config = {
  dev: false
}

const nuxt = new Nuxt(config)

let isReady = false
const readyPromise = nuxt
  .ready()
  .then(() => {
    isReady = true
  })
  .catch(() => {
    process.exit(1)
  })

async function handleRequest(req, res) {
  if (!isReady) {
    await readyPromise
  }
  res.set('Cache-Control', 'public, max-age=1, s-maxage=1')
  await nuxt.render(req, res)
}

app.get('*', handleRequest)
app.use(handleRequest)
exports.nuxtssr = functions.https.onRequest(app)

const APP_ID = functions.config().algolia.app
const ADMIN_KEY = functions.config().algolia.key

const client = algoliasearch(APP_ID, ADMIN_KEY)

const index = client.initIndex('products')

exports.addToStore = functions.firestore
  .document('apps/crm/{businessID}/products/products/{productID}')
  .onCreate(snapshot => {
    const data = snapshot.data()
    const objectID = snapshot.id
    return index.saveObject({ ...data, objectID })
  })

exports.updateStore = functions.firestore
  .document('apps/crm/{businessID}/products/products/{productID}')
  .onUpdate((change, context) => {
    const data = change.after.data()
    const objectID = change.after.id

    return index.saveObject({ ...data, objectID })
  })

exports.deleteFromStore = functions.firestore
  .document('apps/crm/{businessID}/products/products/{productID}')
  .onDelete(snapshot => index.deleteObject(snapshot.id))

exports.addToIndex = functions.firestore
  .document('agri-ensights/crm/physical/{productID}')
  .onCreate(snapshot => {
    const data = snapshot.data()
    const objectID = snapshot.id
    return index.saveObject({ ...data, objectID })
  })

exports.updateIndex = functions.firestore
  .document('agri-ensights/crm/physical/{productID}')
  .onUpdate(snapshot => {
    const data = change.after.data()
    const objectID = change.after.id

    return index.saveObject({ ...data, objectID })
  })

exports.deleteFromIndex = functions.firestore
  .document('agri-ensights/crm/physical/{productID}')
  .onDelete(snapshot => index.deleteObject(snapshot.id))

/*
 * Email templates
 */
var transporter = nodemailer.createTransport({
  host: 'mail.agriensights.co.za',
  port: 465,
  secure: true,
  auth: {
    user: 'info@agriensights.co.za',
    pass: 'Baks@2020'
  }
})
//aobakwe@agriensights.co.za
// exports.sendAgriSale = functions.firestore
//   .document('agri-ensights/crm/sales/{sales}')
//   .onCreate((snap, context) => {
//     let myID = context.params.sales
//     console.log('my ID', myID)
//     console.log('snap', snap)
//     let client_email = snap.data().client_email
//     let mailOptions = {}
//     if (snap.data().stage == 'Payment') {
//       mailOptions = {
//         from: 'sales@agriensights.co.za',
//         to: client_email,
//         subject: 'Check for Payment!',
//         html: `<h1>Waiting for payment: ${snap.data().totalPrice}</h1>
//       <p>
//       <b>Client: </b>${snap.data().client_displayname}<br>
//       <b>Email: </b>${snap.data().client_email}<br>
//       <b>Mobile: </b>${snap.data().client_phone}<br></p>
//       <a href="https://agri-ensights.web.app/invoice/${myID}">Visit Invoice!</a>

//                          `
//       }
//     } else if (snap.data().stage == 'Quote') {
//       mailOptions = {
//         from: 'aobakwe@agriensights.co.za',
//         to: client_email,
//         subject: 'Quote Requested',
//         html: `<h1>Quote for payment: ${snap.data().totalPrice}</h1>
//       <p>
//       <b>Client: </b>${snap.data().client_displayname}<br>
//       <b>Email: </b>${snap.data().client_email}<br>
//       <b>Mobile: </b>${snap.data().client_phone}<br></p>
//       <a href="https://agri-ensights.web.app/quote/${myID}">Visit Invoice!</a>

//                          `
//       }
//     } else {
//       mailOptions = {
//         from: 'aobakwe@agriensights.co.za',
//         to: client_email,
//         subject: 'Please phone client',
//         html: `<h1>Waiting for payment: ${snap.data().totalPrice}</h1>
//           <p>
//           <b>Client: </b>${snap.data().client_displayname}<br>
//           <b>Email: </b>${snap.data().client_email}<br>
//           <b>Mobile: </b>${snap.data().client_phone}<br></p>
//           <a href="https://agri-ensights.web.app/quote/${myID}">Visit Invoice!</a>

//                              `
//       }
//     }

//     return transporter.sendMail(mailOptions, (error, data) => {
//       if (error) {
//         console.log(error)
//         return
//       }
//       console.log('Sent!')
//     })
//   })

// exports.sendAgriSaleTwo = functions.firestore
//   .document('{businessName}/{businessID}/crm/crm/sales/{salesID}')
//   .onCreate((snap, context) => {
//     console.log('snap', snap)
//     let client_email = snap.data().client_email
//     let mailOptions = {}
//     if (snap.data().stage == 'Payment') {
//       mailOptions = {
//         from: client_email,
//         to: 'purchases@agriensights.co.za',
//         subject: 'Check for Payment!',
//         html: `<h1>Waiting for payment: ${snap.data().totalPrice}</h1>
//       <p>
//       <b>Client: </b>${snap.data().client_displayname}<br>
//       <b>Email: </b>${snap.data().client_email}<br>
//       <b>Mobile: </b>${snap.data().client_phone}<br></p>
//       <a href="https://agri-ensights.web.app/invoices/${myID}">Visit Invoice!</a>

//                          `
//       }
//     } else if (snap.data().stage == 'Quote') {
//       mailOptions = {
//         from: client_email,
//         to: 'purchases@agriensights.co.za',
//         subject: 'Quote Requested',
//         html: `<h1>Quote for payment: ${snap.data().totalPrice}</h1>
//       <p>
//       <b>Client: </b>${snap.data().client_displayname}<br>
//       <b>Email: </b>${snap.data().client_email}<br>
//       <b>Mobile: </b>${snap.data().client_phone}<br></p>
//       <a href="https://agri-ensights.web.app/invoices/${myID}">Visit Invoice!</a>

//                          `
//       }
//     } else {
//       mailOptions = {
//         from: client_email,
//         to: 'purchases@agriensights.co.za',
//         subject: 'Please phone client',
//         html: `<h1>Waiting for payment: ${snap.data().totalPrice}</h1>
//           <p>
//           <b>Client: </b>${snap.data().client_displayname}<br>
//           <b>Email: </b>${snap.data().client_email}<br>
//           <b>Mobile: </b>${snap.data().client_phone}<br></p>
//           <a href="https://agri-ensights.web.app/invoices/${myID}">Visit Invoice!</a>

//                              `
//       }
//     }

//     return transporter.sendMail(mailOptions, (error, data) => {
//       if (error) {
//         console.log(error)
//         return
//       }
//       console.log('Sent!')
//     })
//   })

// exports.sendAgriSaleTwo = functions.firestore
//   .document('{businessName}/{businessID}/crm/crm/sales/{salesID}')
//   .onCreate((snap, context) => {
//     console.log('snap', snap)
//     let client_email = snap.data().client_email
//     let mailOptions = {}
//     if (snap.data().stage == 'Payment') {
//       mailOptions = {
//         from: 'sales@agriensights.co.za',
//         to: 'purchases@agriensights.co.za',
//         subject: 'Check for Payment!',
//         html: `<h1>Waiting for payment: ${snap.data().totalPrice}</h1>
//       <p>
//       <b>Client: </b>${snap.data().client_displayname}<br>
//       <b>Email: </b>${snap.data().client_email}<br>
//       <b>Mobile: </b>${snap.data().client_phone}<br></p>
//       <a href="https://agri-ensights.web.app/invoice/${myID}">Visit Invoice!</a>

//                          `
//       }
//     } else if (snap.data().stage == 'Quote') {
//       mailOptions = {
//         from: 'sales@agriensights.co.za',
//         to: 'purchases@agriensights.co.za',
//         subject: 'Quote Requested',
//         html: `<h1>Quote for payment: ${snap.data().totalPrice}</h1>
//       <p>
//       <b>Client: </b>${snap.data().client_displayname}<br>
//       <b>Email: </b>${snap.data().client_email}<br>
//       <b>Mobile: </b>${snap.data().client_phone}<br></p>
//       <a href="https://agri-ensights.web.app/invoice/${myID}">Visit Invoice!</a>

//                          `
//       }
//     } else {
//       mailOptions = {
//         from: 'sales@agriensights.co.za',
//         to: 'purchases@agriensights.co.za',
//         subject: 'Please phone client',
//         html: `<h1>Waiting for payment: ${snap.data().totalPrice}</h1>
//           <p>
//           <b>Client: </b>${snap.data().client_displayname}<br>
//           <b>Email: </b>${snap.data().client_email}<br>
//           <b>Mobile: </b>${snap.data().client_phone}<br></p>
//           <a href="https://agri-ensights.web.app/invoice/${myID}">Visit Invoice!</a>

//                              `
//       }
//     }

//     return transporter.sendMail(mailOptions, (error, data) => {
//       if (error) {
//         console.log(error)
//         return
//       }
//       console.log('Sent!')
//     })
//   })
