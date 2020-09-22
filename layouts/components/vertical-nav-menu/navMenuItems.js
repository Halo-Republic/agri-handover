/* =========================================================================================
  File Name: sidebarItems.js
  Description: Sidebar Items list. Add / Remove menu items from here.
  Strucutre:
          url     => router path
          name    => name to display in sidebar
          slug    => router path name
          icon    => Feather Icon component/icon name
          tag     => text to display on badge
          tagColor  => class to apply on badge element
          i18n    => Internationalization
          submenu   => submenu of current item (current item will become dropdown )
                NOTE: Submenu don't have any icon(you can add icon if u want to display)
          isDisabled  => disable sidebar item/group
  ----------------------------------------------------------------------------------------
  
========================================================================================== */

export default [
  {
    header: '.',
    icon: 'PackageIcon',
    i18n: 'Apps',
    items: [
      {
        url: '/about',
        name: 'About Us',
        slug: 'about',
        icon: 'MessageSquareIcon',
        i18n: 'About'
      },
      {
        url: '/news',
        name: 'Latest News',
        slug: 'chat',
        icon: 'MessageSquareIcon',
        i18n: 'Chat'
      },
      {
        url: '/eCommerce',
        name: 'Agri Market Place',
        slug: 'agriMarket',
        icon: 'MessageSquareIcon',
        i18n: 'Agri Market Place'
      },
      {
        url: '/agriEvent',
        name: 'Events',
        slug: 'events',
        icon: 'MessageSquareIcon',
        i18n: 'Events'
      },
      {
        url: '/social',
        name: 'Social',
        slug: 'social',
        icon: 'MessageSquareIcon',
        i18n: 'Social'
      },
      {
        url: '/pricing',
        name: 'Pricing',
        slug: 'Pricing',
        icon: 'MessageSquareIcon',
        i18n: 'Pricing'
      },
      {
        url: '/contact_us',
        name: 'Contact Us',
        slug: 'contact',
        icon: 'MessageSquareIcon',
        i18n: 'Contact Us'
      },
      {
        url: '/tc',
        name: 'Terms & Conditions',
        slug: 'tc',
        icon: 'MessageSquareIcon',
        i18n: 'Terms & Conditions'
      },
      {
        url: '/pp',
        name: 'Privacy Policy',
        slug: 'pp',
        icon: 'MessageSquareIcon',
        i18n: 'Privacy Policy'
      }
    ]
  }
]
