const functions = require('firebase-functions')
const nodemailer = require('nodemailer')

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

// .collection('apps')
// .doc('crm')
// .collection(this.$store.state.business.app_main_business.b_uid)
// .doc('sales')
// .collection('resells')

exports.sendSalesMail = functions.firestore
  // .document('apps/crm/{businessID}/sales/sales/{salesID}')
  .document('agri-ensights/crm/sales/{sales}')
  .onCreate((snap, context) => {
    console.log('snap', snap)
    let myID = context.params.salesID
    let mailOptions = {}
    mailOptions = {
      from: 'peet@partnersinbiz.tech',
      to: 'peet@partnersinbiz.tech',
      subject: 'Check for Payment!',
      html: `<h1>Waiting for payment: ${snap.data().totalPrice}</h1>
      <p> 
      <b>Client: </b>${snap.data().client_displayname}<br>
      <b>Email: </b>${snap.data().client_email}<br>
      <b>Mobile: </b>${snap.data().client_phone}<br></p>
      <a href="https://agri-ensights.web.app/invoice/${myID}">Visit Invoice!</a>

          <a href="https://agri-ensights.web.app/invoices/${myID}">Visit Invoice!</a>
                                      `
    }
    return transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        console.log(error)
        return
      }
      console.log('Sent!')
    })
  })
