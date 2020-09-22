const functions = require('firebase-functions')
const admin = require('firebase-admin')
const moment = require('moment')
//Business registration

exports.loadBusiness = functions.firestore
  .document('apps/info/general/{businessID}')
  .onCreate((snap, context) => {
    const businessID = context.params.businessID
    const uid = snap.data().uid
    const b_name = snap.data().b_name
    const unique_name = snap.data().un_name
    const industry = snap.data().indstr
    const contact_person = snap.data().c_name
    const contact_surname = snap.data().c_surname
    const contact_company = snap.data().c_company
    const contact_email = snap.data().c_email
    const contact_number = snap.data().c_number
    const created_date = snap.data().date
    const created_month = snap.data().month
    const display_name = snap.data().disp_name
    const registered_email = snap.data().u_email
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
        twt: '',
        fb: '',
        insta: '',
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
            sidebarCollapsed: true,
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
            layoutStyle: 'scroll'
          })
          .then(() => {
            return docGroup
              .set({
                p_notes: ['All'],
                views: ['Started'],
                pos: ['Sales', 'Development', 'Management'],
                branches: ['HQ'],
                c_grps: [],
                s_types: [],
                trgt_type: [],
                leave: [],
                claims: []
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
                        b_name: b_name,
                        un_name: unique_name,
                        logo: logo,
                        indstr: industry,
                        c_person: contact_person,
                        c_surname: contact_surname,
                        c_company: contact_company,
                        c_email: contact_email,
                        c_number: contact_number,
                        date: created_date,
                        month: created_month
                      })
                      .then(() => {
                        return docUserAdmin
                          .set({
                            status: 'Active',
                            online_status: 'Online',
                            role: 'Admin',
                            uid: uid,
                            disp_name: display_name,
                            avatar: '',
                            u_email: registered_email,
                            name: '',
                            surname: '',
                            company: '',
                            pos: [],
                            branch: [],
                            p_notes: [],
                            verified: false,
                            last_active: moment().format('DD-MM-YYYY'),
                            month: moment().format('DD-MM-YYYY'),
                            timestamp: Date.now()
                          })
                          .then(() => {
                            return docGroup
                              .collection('branches')
                              .doc('HQ')
                              .set({
                                branch: 'HQ',
                                email: snap.data().c_email,
                                phone: 0,
                                website: 'www...',
                                adr_address: snap.data().adr_address,
                                for_address: snap.data().for_address,
                                addr_url: snap.data().addr_url,
                                vicinity: snap.data().vicinity,
                                lat: snap.data().lat,
                                lng: snap.data().lng,
                                geo1: snap.data().geo1,
                                geo2: snap.data().geo2,
                                geo3: snap.data().geo3,
                                geo4: snap.data().geo4,
                                geo5: snap.data().geo5,
                                geo6: snap.data().geo6,
                                geo7: snap.data().geo7,
                                geo8: snap.data().geo8,
                                geo9: snap.data().geo9,
                                date: snap.data().date,
                                month: snap.data().month,
                                desc: snap.data().desc,
                                t_stamp: snap.data().t_stamp
                              })
                          })
                      })
                  })
              })
          })
      })
  })
