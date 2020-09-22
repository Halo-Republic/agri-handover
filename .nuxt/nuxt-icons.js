export default async function (ctx, inject) {
  const icons = {"64x64":"/_nuxt/icons/icon_64.ade1e5.png","120x120":"/_nuxt/icons/icon_120.ade1e5.png","144x144":"/_nuxt/icons/icon_144.ade1e5.png","152x152":"/_nuxt/icons/icon_152.ade1e5.png","192x192":"/_nuxt/icons/icon_192.ade1e5.png","384x384":"/_nuxt/icons/icon_384.ade1e5.png","512x512":"/_nuxt/icons/icon_512.ade1e5.png"}
  const getIcon = size => icons[size + 'x' + size] || ''
  inject('icon', getIcon)
}
