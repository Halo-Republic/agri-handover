/* eslint-disable no-undef */
/* eslint-disable no-console */
let firstRoute = false
export default function(context) {
  // current route
  if (context) {
    firstRoute = true
  }
  console.log('route=', context.route.name)
  // previous route
  if (process.client) {
    const from = context.from
    console.log('from=', from)
  }
  return firstRoute
}
