const functions = require('firebase-functions')
const admin = require('firebase-admin')
const moment = require('moment')
//Business registration

exports.loadBusiness = functions.firestore
  .document('apps/info/general/{businessID}')
  .onCreate((snap, context) => {
    const businessID = context.params.businessID
    const uid = snap.data().uid
    const appname = snap.data().appname
    const unique_name = snap.data().unique_name
    const industry = snap.data().industry
    const contact_person = snap.data().contact_person
    const contact_surname = snap.data().contact_surname
    const contact_company = snap.data().contact_company
    const contact_email = snap.data().contact_email
    const contact_number = snap.data().contact_number
    const created_date = snap.data().created_date
    const created_month = snap.data().created_month
    const display_name = snap.data().display_name
    const registered_email = snap.data().registered_email
    const logo = snap.data().logo

    //Load business details
    const docSoc = admin
      .firestore()
      .collection('apps')
      .doc('info')
      .collection('social_links')
      .doc(businessID)

    const docFront = admin
      .firestore()
      .collection('apps')
      .doc('info')
      .collection('front_end')
      .doc(businessID)

    const docGroup = admin
      .firestore()
      .collection('apps')
      .doc('info')
      .collection('groups')
      .doc(businessID)

    const docRef = admin
      .firestore()
      .collection('apps')
      .doc('info')
      .collection('general')
      .doc(businessID)

    // Load business under user

    const docUser = admin
      .firestore()
      .collection('user')
      .doc('apps')
      .collection(uid)
      .doc(businessID)

    //Load admin user under business

    const docUserAdmin = admin
      .firestore()
      .collection('apps')
      .doc('users')
      .collection(businessID)
      .doc('info')
      .collection('general')
      .doc(uid)

    return docSoc
      .set({
        twitter: '',
        facebook: '',
        instagram: '',
        github: '',
        linkedin: '',
        slack: '',
        codepen: ''
      })
      .then(() => {
        return docFront
          .set({
            primary: '#1DA1F2',
            success: '#28C76F',
            danger: '#EA5455',
            warning: '#FF9F43',
            dark: '#1E1E1E',
            theme: 'light',
            rtl: false,
            sidebarCollapsed: false,
            homeChat: false,
            locationShare: false,
            layoutType: 'horizontal',
            navbarColor: '#fff',
            navbarType: 'static',
            footerType: 'static',
            routerTransition: 'zoom-fade',
            disableCustomizer: true,
            hideScrollToTop: false,
            disableThemeTour: true,
            downloadURLs: '',
            downloadUrls: '',
            backgroundURL: '',
            layoutStyle: 'scroll',
            backgroundcolor: '',
            buttoncolor: '#1DA1F2',
            buttontextcolor: '#fff',
            buttonHeight: 20,
            buttonPadding: 5,
            fontSize: 20
          })
          .then(() => {
            return docGroup
              .set({
                push_notes: ['All'],
                views: ['Started'],
                positions: ['Sales', 'Development', 'Management'],
                branches: [],
                customer_groups: [],
                sales_types: [],
                employee_target_types: [],
                employee_leave: [],
                employee_claims: []
              })
              .then(() => {
                return docRef
                  .update({
                    b_uid: businessID
                  })
                  .then(() => {
                    return docUser
                      .set({
                        b_uid: businessID,
                        uid: uid,
                        appname: appname,
                        unique_name: unique_name,
                        logo: logo,
                        industry: industry,
                        contact_person: contact_person,
                        contact_surname: contact_surname,
                        contact_company: contact_company,
                        contact_email: contact_email,
                        contact_number: contact_number,
                        created_date: created_date,
                        created_month: created_month
                      })
                      .then(() => {
                        return docUserAdmin.set({
                          status: 'Active',
                          online_status: 'Online',
                          role: 'Admin',
                          uid: uid,
                          display_name: display_name,
                          photoURL: '',
                          email: registered_email,
                          name: '',
                          surname: '',
                          company: '',
                          position: [],
                          branch: [],
                          push_notes: [],
                          verified: false,
                          last_active: moment().format('DD-MM-YYYY'),
                          created_month: moment().format('DD-MM-YYYY'),
                          timestamp: Date.now()
                        })
                      })
                  })
              })
          })
      })
  })
