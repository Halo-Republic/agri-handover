const functions = require('firebase-functions')
const nodemailer = require('nodemailer')

/*
 * Email templates
 */
var transporter = nodemailer.createTransport({
  host: 'mail.pocketfox.co.za',
  port: 465,
  secure: true,
  auth: {
    user: 'peet.stander@pocketfox.co.za',
    pass: '5a9etiplXIkSma'
  }
})

let resellerSalesEmail = 'sales@agriensights.co.za'
let resellerPurchaseEmail = 'purchases@agriensights.co.za'

// let resellerSalesEmail = 'thepartnersinbiz@gmail.com'
// let resellerPurchaseEmail = 'thepartnersinbiz@gmail.com'
//Invoice to buyer Company

exports.sendBuyersMail = functions.firestore
  .document('apps/crm/{businessID}/purchases/purchases/{salesID}')
  .onCreate((snap, context) => {
    let mailOptions = {}

    mailOptions = {
      from: resellerSalesEmail,
      to: snap.data().c_email,
      subject: 'Thank you for your business',
      html: `
      <p> 
      Thank you for your support
     </p>
      <a href="https://agri-ensights.web.app/invoice/${context.params.businessID}&${context.params.salesID}">Visit Invoice!</a>                    
                         `
    }
    return transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        console.log(error)
        return
      }
      console.log('Sent! Invoice to buyer Company', snap.data().c_email)
    })
  })

//Invoice to buyer Persone
exports.sendPersonMail = functions.firestore
  .document('user/info/purchases/{businessID}/invoice/{salesID}')
  .onCreate((snap, context) => {
    let mailOptions = {}

    mailOptions = {
      from: resellerSalesEmail,
      to: snap.data().c_email,
      subject: 'Thank you for your business',
      html: `
      <p> 
      Thank you for your support
     </p>
      <a href="https://agri-ensights.web.app/ind_invoice/${context.params.businessID}&${snap.id}">Visit Invoice!</a>                    
                         `
    }
    return transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        console.log(error)
        return
      }
      console.log('Sent Invoice to buyer Persone!')
    })
  })

//Invoice sent to buyer for reseller
exports.sendBuyerResellerMail = functions.firestore
  .document('apps/crm/{businessID}/purchases/purchases/{salesID}')
  .onCreate((snap, context) => {
    let mailOptions = {}

    mailOptions = {
      from: resellerSalesEmail,
      to: resellerSalesEmail,
      subject: 'Invoices sent to buyer',
      html: `
      <p> 
      Thank you for your support
     </p>
      <a href="https://agri-ensights.web.app/invoice/${context.params.businessID}&${context.params.salesID}">Visit Invoice!</a>                    
                         `
    }
    return transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        console.log(error)
        return
      }
      console.log('Sent Invoice sent to buyer for reseller!')
    })
  })

//Invoice sent to buyer for reseller
exports.sendBuyerResellerMail = functions.firestore
  .document('user/info/purchases/{businessID}/invoice/{salesID}')
  .onCreate((snap, context) => {
    let mailOptions = {}

    mailOptions = {
      from: resellerSalesEmail,
      to: resellerSalesEmail,
      subject: 'Invoices sent to buyer',
      html: `
      <p> 
      Thank you for your support
     </p>
      <a href="https://agri-ensights.web.app/ind_invoice/${context.params.businessID}&${snap.id}">Visit Invoice!</a>                    
                         `
    }
    return transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        console.log(error)
        return
      }
      console.log('Sent Invoice sent to buyer for reseller!')
    })
  })

//Invoice from Seller to reseller
exports.sendSalesMail = functions.firestore
  .document('apps/crm/{businessID}/sales/sales/{salesID}')
  .onCreate((snap, context) => {
    let mailOptions = {}
    mailOptions = {
      from: resellerPurchaseEmail,
      to: snap.data().seller_email,
      subject: 'Sale made from Agri-Ensight',
      html: `
      <p> 
      Thank you for your support
     </p>
      <a href="https://agri-ensights.web.app/invoices/${context.params.businessID}&${snap.id}">Visit Invoice!</a>                    
                         `
    }
    return transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        console.log(error)
        return
      }
      console.log(
        'Sent Invoice from Seller to reseller!',
        snap.data().seller_email
      )
    })
  })

//Invoice from seller that is sent
exports.sendSalesResellerMail = functions.firestore
  .document('apps/crm/{businessID}/sales/sales/{salesID}')
  .onCreate((snap, context) => {
    let mailOptions = {}

    mailOptions = {
      from: resellerPurchaseEmail,
      to: resellerPurchaseEmail,
      subject: 'Thank you for your business',
      html: `<p> 
      Thank you for your support
     </p>
      <a href="https://agri-ensights.web.app/invoices/${context.params.businessID}&${snap.id}">Visit Invoice!</a>                    
                         `
    }
    return transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        console.log(error)
        return
      }
      console.log('Sent! Invoice from seller that is sent ')
    })
  })

exports.sendWelcomeEmail = functions.auth.user().onCreate(user => {
  let mailOptions = {}

  const email = user.email // The email of the user.

  mailOptions = {
    from: 'info@agriensights.co.za',
    to: email,
    subject: 'Hello',
    html: `<h1>Welcome to Agri Ensights</h1>
    `
  }
  return transporter.sendMail(mailOptions, (error, data) => {
    if (error) {
      console.log(error)
      return
    }
    console.log('Sent Welcome Email!')
  })
})

exports.sendContactUs = functions.firestore
  .document('all/forms/contact_us/{formID}')
  .onCreate((snap, context) => {
    console.log('snap', snap)
    let client_email = snap.data().email
    let mailOptions = {}

    mailOptions = {
      from: client_email,
      to: 'info@agriensights.co.za',
      subject: `Message from Contact us ${snap.data().name} ${
        snap.data().surname
      }`,
      html: `
      <p> 
      <b>Client: </b>${snap.data().client_name} ${snap.data().surname}<br>
      <b>Email: </b>${snap.data().company}<br>
      <b>Text: </b>${snap.data().textarea}<br></p>
           
                         `
    }

    return transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        console.log(error)
        return
      }
      console.log('Sent Contact Email!')
    })
  })

exports.sendSalesWelcome = functions.firestore
  .document('apps/info/general/{formID}')
  .onCreate((snap, context) => {
    console.log('snap', snap)
    let client_email = snap.data().u_email
    let mailOptions = {}

    let reg_type = snap.data().reg_type

    if (reg_type == 'Seller') {
      mailOptions = {
        from: 'registration@agriensights.co.za',
        to: client_email,
        subject: `Message from Contact us ${snap.data().name} ${
          snap.data().surname
        }`,
        html: `
       <p> Hello Seller,</p>

       <p> Thank you for registering with Agri Ensights. In order to complete your registration, please send the following documents to registration@agriensights.co.za</p>

        
       <p>Individual Registration</p>
          <ul>
       <li> - Copy of ID </li>
       <li>- Proof of address not older than 3 months</li>
       <li> - Bank confirmation letter not older than 3 months</li>
        </ul>
        
        <p> Company Registration</p>
        <ul>
        <li> - Company registration documents</li>
        <li> - Director / Member ID</li>
        <li>  - Business proof of address not older than 3 months</li>
        <li> - Director or Member proof of address not older than 3 months</li>
        <li>  - Bank confirmation letter not older than 3 months</li>
        </ul>
        <p>Email subject </p>

        <p> Insert your company name if you are a company/cc and individual if you are registering as a sole proprietor. </p>

        
        <p>You will receive an approval confirmation email within 48 hours of registration completion and submission of all documents. Registrations with outstanding documents will delay approval.</p>

        <p>Kind regards,<p>

        <p>The Agri Ensights Team<p>
                           `
      }
    } else if (reg_type == 'Buyer') {
      mailOptions = {
        from: 'registrations@agriensights.co.za',
        to: client_email,
        subject: `Message from Contact us ${snap.data().name} ${
          snap.data().surname
        }`,
        html: `
       <p> Hello Buyer,</p>
  
       <p>We hope you enjoy the Shopping experience</p>
  
       <p>The Agri Ensights Team</p>
             
                           `
      }
    }

    return transporter.sendMail(mailOptions, (error, data) => {
      if (error) {
        console.log(error)
        return
      }
      console.log('Sent Contact Email!')
    })
  })
