import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _fe646474 = () => interopDefault(import('../pages/360.vue' /* webpackChunkName: "pages/360" */))
const _fdb4c234 = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _4523c820 = () => interopDefault(import('../pages/advisory.vue' /* webpackChunkName: "pages/advisory" */))
const _07f73696 = () => interopDefault(import('../pages/agriEvent.vue' /* webpackChunkName: "pages/agriEvent" */))
const _2ed94094 = () => interopDefault(import('../pages/contact_us.vue' /* webpackChunkName: "pages/contact_us" */))
const _4f10fa3a = () => interopDefault(import('../pages/crm/index.vue' /* webpackChunkName: "pages/crm/index" */))
const _2c60baa0 = () => interopDefault(import('../pages/dashboard/index.vue' /* webpackChunkName: "pages/dashboard/index" */))
const _54f2f908 = () => interopDefault(import('../pages/eCommerce/index.vue' /* webpackChunkName: "pages/eCommerce/index" */))
const _6a851cc2 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _862c4eec = () => interopDefault(import('../pages/news.vue' /* webpackChunkName: "pages/news" */))
const _4a68ce12 = () => interopDefault(import('../pages/pp.vue' /* webpackChunkName: "pages/pp" */))
const _2b258a5f = () => interopDefault(import('../pages/pricing.vue' /* webpackChunkName: "pages/pricing" */))
const _4e446a7c = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _d282a64c = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _3c944738 = () => interopDefault(import('../pages/social.vue' /* webpackChunkName: "pages/social" */))
const _3e306c34 = () => interopDefault(import('../pages/tc.vue' /* webpackChunkName: "pages/tc" */))
const _51add10e = () => interopDefault(import('../pages/crm/assets/index.vue' /* webpackChunkName: "pages/crm/assets/index" */))
const _47d77328 = () => interopDefault(import('../pages/crm/company/index.vue' /* webpackChunkName: "pages/crm/company/index" */))
const _cc5fde00 = () => interopDefault(import('../pages/crm/customers/index.vue' /* webpackChunkName: "pages/crm/customers/index" */))
const _1f6251d0 = () => interopDefault(import('../pages/crm/equity/index.vue' /* webpackChunkName: "pages/crm/equity/index" */))
const _6d9e36a6 = () => interopDefault(import('../pages/crm/expenses/index.vue' /* webpackChunkName: "pages/crm/expenses/index" */))
const _75d807b4 = () => interopDefault(import('../pages/crm/income/index.vue' /* webpackChunkName: "pages/crm/income/index" */))
const _3ae920d4 = () => interopDefault(import('../pages/crm/liabilities/index.vue' /* webpackChunkName: "pages/crm/liabilities/index" */))
const _026a6df0 = () => interopDefault(import('../pages/crm/orders/index.vue' /* webpackChunkName: "pages/crm/orders/index" */))
const _78c33daf = () => interopDefault(import('../pages/crm/products/index.vue' /* webpackChunkName: "pages/crm/products/index" */))
const _760b2145 = () => interopDefault(import('../pages/crm/projects/index.vue' /* webpackChunkName: "pages/crm/projects/index" */))
const _3ed30cf7 = () => interopDefault(import('../pages/crm/sales/index.vue' /* webpackChunkName: "pages/crm/sales/index" */))
const _583ab3e7 = () => interopDefault(import('../pages/dashboard/analytics/index.vue' /* webpackChunkName: "pages/dashboard/analytics/index" */))
const _579b4527 = () => interopDefault(import('../pages/dashboard/bulk/index.vue' /* webpackChunkName: "pages/dashboard/bulk/index" */))
const _1a7c06d0 = () => interopDefault(import('../pages/dashboard/business_details/index.vue' /* webpackChunkName: "pages/dashboard/business_details/index" */))
const _5ade880f = () => interopDefault(import('../pages/eCommerce/checkout/index.vue' /* webpackChunkName: "pages/eCommerce/checkout/index" */))
const _f4674646 = () => interopDefault(import('../pages/crm/assets/breakdown.vue' /* webpackChunkName: "pages/crm/assets/breakdown" */))
const _78a509a0 = () => interopDefault(import('../pages/crm/assets/breakdown/index.vue' /* webpackChunkName: "pages/crm/assets/breakdown/index" */))
const _376adfe6 = () => interopDefault(import('../pages/crm/assets/breakdowns.vue' /* webpackChunkName: "pages/crm/assets/breakdowns" */))
const _737eb86e = () => interopDefault(import('../pages/crm/company/customers/index.vue' /* webpackChunkName: "pages/crm/company/customers/index" */))
const _11d49654 = () => interopDefault(import('../pages/crm/company/meeting/index.vue' /* webpackChunkName: "pages/crm/company/meeting/index" */))
const _48b38b9c = () => interopDefault(import('../pages/crm/company/view-company/index.vue' /* webpackChunkName: "pages/crm/company/view-company/index" */))
const _6feeac9f = () => interopDefault(import('../pages/crm/equity/breakdown.vue' /* webpackChunkName: "pages/crm/equity/breakdown" */))
const _7d3f9316 = () => interopDefault(import('../pages/crm/expenses/breakdown.vue' /* webpackChunkName: "pages/crm/expenses/breakdown" */))
const _f1e25efa = () => interopDefault(import('../pages/crm/income/breakdown.vue' /* webpackChunkName: "pages/crm/income/breakdown" */))
const _1a277765 = () => interopDefault(import('../pages/crm/liabilities/breakdown.vue' /* webpackChunkName: "pages/crm/liabilities/breakdown" */))
const _4eeb0e9c = () => interopDefault(import('../pages/dashboard/business_details/business_edit/index.vue' /* webpackChunkName: "pages/dashboard/business_details/business_edit/index" */))
const _7ca6b0a2 = () => interopDefault(import('../pages/dashboard/users/clients/index.vue' /* webpackChunkName: "pages/dashboard/users/clients/index" */))
const _27dd133a = () => interopDefault(import('../pages/dashboard/users/staff/index.vue' /* webpackChunkName: "pages/dashboard/users/staff/index" */))
const _d39c2978 = () => interopDefault(import('../pages/eCommerce/checkout/saved.vue' /* webpackChunkName: "pages/eCommerce/checkout/saved" */))
const _426f7961 = () => interopDefault(import('../pages/eCommerce/components/ItemGridView.vue' /* webpackChunkName: "pages/eCommerce/components/ItemGridView" */))
const _07fa728e = () => interopDefault(import('../pages/eCommerce/components/ItemListView.vue' /* webpackChunkName: "pages/eCommerce/components/ItemListView" */))
const _211d4fb7 = () => interopDefault(import('../pages/dashboard/users/staff/user-edit/index.vue' /* webpackChunkName: "pages/dashboard/users/staff/user-edit/index" */))
const _694e5692 = () => interopDefault(import('../pages/dashboard/users/staff/user-view/index.vue' /* webpackChunkName: "pages/dashboard/users/staff/user-view/index" */))
const _0c52ecb0 = () => interopDefault(import('../pages/eCommerce/detail_view/_id.vue' /* webpackChunkName: "pages/eCommerce/detail_view/_id" */))
const _19f60a34 = () => interopDefault(import('../pages/blogs-single/_id.vue' /* webpackChunkName: "pages/blogs-single/_id" */))
const _1d35f7de = () => interopDefault(import('../pages/ind_invoice/_id.vue' /* webpackChunkName: "pages/ind_invoice/_id" */))
const _161edcf1 = () => interopDefault(import('../pages/invoice/_id.vue' /* webpackChunkName: "pages/invoice/_id" */))
const _dfd80270 = () => interopDefault(import('../pages/invoices/_id.vue' /* webpackChunkName: "pages/invoices/_id" */))
const _be450caa = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/360",
    component: _fe646474,
    name: "360"
  }, {
    path: "/about",
    component: _fdb4c234,
    name: "about"
  }, {
    path: "/advisory",
    component: _4523c820,
    name: "advisory"
  }, {
    path: "/agriEvent",
    component: _07f73696,
    name: "agriEvent"
  }, {
    path: "/contact_us",
    component: _2ed94094,
    name: "contact_us"
  }, {
    path: "/crm",
    component: _4f10fa3a,
    name: "crm"
  }, {
    path: "/dashboard",
    component: _2c60baa0,
    name: "dashboard"
  }, {
    path: "/eCommerce",
    component: _54f2f908,
    name: "eCommerce"
  }, {
    path: "/login",
    component: _6a851cc2,
    name: "login"
  }, {
    path: "/news",
    component: _862c4eec,
    name: "news"
  }, {
    path: "/pp",
    component: _4a68ce12,
    name: "pp"
  }, {
    path: "/pricing",
    component: _2b258a5f,
    name: "pricing"
  }, {
    path: "/profile",
    component: _4e446a7c,
    name: "profile"
  }, {
    path: "/register",
    component: _d282a64c,
    name: "register"
  }, {
    path: "/social",
    component: _3c944738,
    name: "social"
  }, {
    path: "/tc",
    component: _3e306c34,
    name: "tc"
  }, {
    path: "/crm/assets",
    component: _51add10e,
    name: "crm-assets"
  }, {
    path: "/crm/company",
    component: _47d77328,
    name: "crm-company"
  }, {
    path: "/crm/customers",
    component: _cc5fde00,
    name: "crm-customers"
  }, {
    path: "/crm/equity",
    component: _1f6251d0,
    name: "crm-equity"
  }, {
    path: "/crm/expenses",
    component: _6d9e36a6,
    name: "crm-expenses"
  }, {
    path: "/crm/income",
    component: _75d807b4,
    name: "crm-income"
  }, {
    path: "/crm/liabilities",
    component: _3ae920d4,
    name: "crm-liabilities"
  }, {
    path: "/crm/orders",
    component: _026a6df0,
    name: "crm-orders"
  }, {
    path: "/crm/products",
    component: _78c33daf,
    name: "crm-products"
  }, {
    path: "/crm/projects",
    component: _760b2145,
    name: "crm-projects"
  }, {
    path: "/crm/sales",
    component: _3ed30cf7,
    name: "crm-sales"
  }, {
    path: "/dashboard/analytics",
    component: _583ab3e7,
    name: "dashboard-analytics"
  }, {
    path: "/dashboard/bulk",
    component: _579b4527,
    name: "dashboard-bulk"
  }, {
    path: "/dashboard/business_details",
    component: _1a7c06d0,
    name: "dashboard-business_details"
  }, {
    path: "/eCommerce/checkout",
    component: _5ade880f,
    name: "eCommerce-checkout"
  }, {
    path: "/crm/assets/breakdown",
    component: _f4674646,
    children: [{
      path: "",
      component: _78a509a0,
      name: "crm-assets-breakdown"
    }]
  }, {
    path: "/crm/assets/breakdowns",
    component: _376adfe6,
    name: "crm-assets-breakdowns"
  }, {
    path: "/crm/company/customers",
    component: _737eb86e,
    name: "crm-company-customers"
  }, {
    path: "/crm/company/meeting",
    component: _11d49654,
    name: "crm-company-meeting"
  }, {
    path: "/crm/company/view-company",
    component: _48b38b9c,
    name: "crm-company-view-company"
  }, {
    path: "/crm/equity/breakdown",
    component: _6feeac9f,
    name: "crm-equity-breakdown"
  }, {
    path: "/crm/expenses/breakdown",
    component: _7d3f9316,
    name: "crm-expenses-breakdown"
  }, {
    path: "/crm/income/breakdown",
    component: _f1e25efa,
    name: "crm-income-breakdown"
  }, {
    path: "/crm/liabilities/breakdown",
    component: _1a277765,
    name: "crm-liabilities-breakdown"
  }, {
    path: "/dashboard/business_details/business_edit",
    component: _4eeb0e9c,
    name: "dashboard-business_details-business_edit"
  }, {
    path: "/dashboard/users/clients",
    component: _7ca6b0a2,
    name: "dashboard-users-clients"
  }, {
    path: "/dashboard/users/staff",
    component: _27dd133a,
    name: "dashboard-users-staff"
  }, {
    path: "/eCommerce/checkout/saved",
    component: _d39c2978,
    name: "eCommerce-checkout-saved"
  }, {
    path: "/eCommerce/components/ItemGridView",
    component: _426f7961,
    name: "eCommerce-components-ItemGridView"
  }, {
    path: "/eCommerce/components/ItemListView",
    component: _07fa728e,
    name: "eCommerce-components-ItemListView"
  }, {
    path: "/dashboard/users/staff/user-edit",
    component: _211d4fb7,
    name: "dashboard-users-staff-user-edit"
  }, {
    path: "/dashboard/users/staff/user-view",
    component: _694e5692,
    name: "dashboard-users-staff-user-view"
  }, {
    path: "/eCommerce/detail_view/:id?",
    component: _0c52ecb0,
    name: "eCommerce-detail_view-id"
  }, {
    path: "/blogs-single/:id?",
    component: _19f60a34,
    name: "blogs-single-id"
  }, {
    path: "/ind_invoice/:id?",
    component: _1d35f7de,
    name: "ind_invoice-id"
  }, {
    path: "/invoice/:id?",
    component: _161edcf1,
    name: "invoice-id"
  }, {
    path: "/invoices/:id?",
    component: _dfd80270,
    name: "invoices-id"
  }, {
    path: "/",
    component: _be450caa,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
