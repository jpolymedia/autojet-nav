/* Auto-jet navigation — Wix Studio Custom Element
 * Tag: <autojet-nav>
 * Attributes: logo-src, logo-href, phone, quote-href, search-action,
 * compact-breakpoint, phone-breakpoint, quote-breakpoint, mobile-breakpoint
 *
 * FOUR-TIER RESPONSIVE COLLAPSE. The bottom row (nav items + hours status +
 * phone) does not drop to the hamburger menu all at once. There are four
 * independent width thresholds, each one dropping a little more before the
 * hamburger is ever needed:
 *
 * 1. compact-breakpoint (default 1260) is the point where the FULL bottom
 *    row (items + hours/status + phone) stops fitting. Below this width the
 *    component adds [data-compact]: the "Open Now / Closes 5 PM CT" status
 *    text hides (the phone number itself stays put, still in the bottom
 *    row). Nav items, the phone number, and the top-bar search field all
 *    stay visible in place through this whole tier — this buys room so the
 *    hamburger does not have to appear yet. The search field has its own
 *    headroom at every width down to the mobile tier and doesn't need to
 *    change here.
 *    Derivation: the 8 top-level items need ~660px unconstrained, the
 *    status+phone block is a fixed 404px, the row gap is 24px, and the
 *    wrap's side padding is clamp(24px, 6.25vw, 80px) per side. Solving
 *    width = 660 + 24 + 404 + 2*(0.0625*width) gives ~1244px as the exact
 *    overlap point; 1260 adds a small buffer.
 *
 * 2. phone-breakpoint (default 960) is the point where items + phone
 *    TOGETHER (status already hidden by the compact tier) stop fitting the
 *    bottom row. Below this width the component adds [data-phone-top] (on
 *    top of [data-compact], which stays set): the phone number moves out of
 *    the bottom row entirely and reappears in the top bar, to the right of
 *    Get Quote (.util-tel-top). The bottom row now carries nav items alone,
 *    which buys another tier of room before the hamburger.
 *    Derivation: this is the same math the old single mobile-breakpoint
 *    used — 660 (items) + 24 (gap) + 140 (phone block alone, no status) +
 *    2*(0.0625*width) = width gives ~942px; 960 adds a small buffer.
 *
 * 3. mobile-breakpoint (default 770) is the point where items ALONE
 *    (phone already relocated to the top bar by the phone tier) still do
 *    not fit. Only below this width does the component switch to the
 *    hamburger: items, the quote button, and the top-bar phone all move into
 *    the mobile sheet, and the whole bottom row hides. The search field does
 *    NOT move into the sheet — it stays visible in the top bar at every
 *    width below this point, just relaid out: the top bar goes from one row
 *    (logo, search, quote, phone) to two — logo + hamburger on row one,
 *    search alone filling the full width of row two — and stays a two-row
 *    layout the rest of the way down, since the search field's width is a
 *    percentage and simply keeps scaling with the viewport with no further
 *    row/column switch needed.
 *    Derivation: 660 (items) + 2*(0.0625*width) = width gives ~754px; 770
 *    adds a small buffer. This value is an initial estimate — confirm
 *    against the real rendered width in the browser and adjust if the
 *    items row wraps before this point.
 *
 * quote-breakpoint (default 900) is nested INSIDE the phone tier (it only
 * ever applies between mobile-breakpoint and phone-breakpoint): once the top
 * bar itself (logo + search field + Get Quote + the relocated phone number)
 * runs out of room, the component adds [data-quote-hidden] and Get Quote
 * drops from the top bar first, ahead of the phone number — Auto-jet's
 * sales close by phone, not the quote form, so the phone stays and Get Quote
 * remains reachable via the mega-menu tile CTAs and the Contact nav link
 * until the hamburger tier recovers it in the mobile sheet footer.
 * Derivation: logo 158 + wrap gap 40 + tools row (search 260 + gap 14 +
 * quote 140 + gap 14 + phone ~140) + 2*(0.0625*width) side padding gives a
 * rough overlap in the 810-925px range depending on where the clamped
 * padding sits; 900 is a starting estimate — confirm live and adjust.
 *
 * If the NAV array below changes (an item added/removed/renamed), or the
 * phone/status/quote block widths change, re-measure the real item row's
 * width (nav.shadowRoot.querySelector('.items').scrollWidth with
 * data-mobile, data-compact, data-phone-top, and data-quote-hidden forced
 * off) and recompute ALL FOUR thresholds — don't just nudge these numbers
 * by feel, or the tiers drift
 * out of sync with what the content actually needs, which is the bug this
 * replaced.
 *
 * RESPONSIVE MEASUREMENT: the mobile/compact/desktop switch watches this
 * element's own rendered width (ResizeObserver on `this`), not
 * window.innerWidth, with a window resize listener as a backup signal.
 * Inside Wix, this component's box can be narrower than the browser
 * viewport (a fixed-width widget setting, a non-stretched container,
 * editor-side scaling) and a viewport-based matchMedia will report
 * "desktop" even when the box itself has no room for the desktop row. If
 * the widget's box still doesn't reach full browser width even on a wide
 * screen, that's a Wix Editor layout setting (width set to "Stretch"/
 * "Full Width", not a fixed pixel width), not something this file controls.
 *
 * EDIT THE NAV ARRAY BELOW. Desktop panels and the mobile accordion both read it,
 * so every label and URL is maintained in exactly one place.
 * Replace every "#" with the real destination before go-live.
 *
 * INFORMATION ARCHITECTURE (settled)
 * Vehicle categories stay top level: School Bus, Truck, Off-Road.
 * A category earns a mega menu when it has 2+ facets intrinsic to itself, each
 * with 3+ children, both used in one visit. School Bus and Truck qualify
 * (brand + system). Off-Road and Resources are single-facet dropdowns.
 * Catalog columns list every PDF for that vehicle, alphabetized, with the
 * complete catalog first. Mobile lists the same rows.
 * Brand and catalog lists are alphabetized. System columns are ordered by demand
 * (DPF first, accessories last), because frequency beats spelling there.
 * Other exceptions: the complete catalog leads its column, Off-Road's catalog
 * leads its dropdown, and Vintage & Discontinued always sits last.
 *
 * SOURCE OF TRUTH for School Bus: the 233-page catalog's table of contents.
 * Its eight sections are Accessories/Radiators/Fuel Tanks/EGR Coolers, Diesel
 * (EGR content now lives on the /dpf-and-emissions hub, so it has no nav row.)
 * Particulate Filters, Navistar International, Ford, Chevrolet/GMC, Bluebird,
 * Thomas, Freightliner. The brand and system columns and the catalog column all
 * derive from that list, so nav, catalog and PDFs never diverge.
 *
 * Both vehicle panels use the SAME three columns in the same order:
 *   1 Parts by <vehicle> brand   2 Parts by system   3 Download PDF Catalogs
 * Brand links are bare brand names (the heading already says "brand"), and each
 * no column carries an overview row: the parent nav item already goes there.
 * PDF hosts differ by division on purpose: School Bus rows use the auto-jet.com
 * "School Bus Exhaust Parts" files, Truck rows the usrfiles truck imports.
 * Keep this parallel — a mechanic who learns one panel can read the other.
 *
 * Every top-level parent (School Bus, Truck, Off-Road, Resources) is a REAL link
 * to its own page: clicking the label navigates, only the chevron opens the panel.
 * Same split on mobile. Because the parent goes to the category page, the panels
 * carry no "…Parts Overview" row — it would duplicate the parent link.
 * Nothing in the nav is a redirect: set each href to its final destination.
 */

const PHONE = '800-247-5391';

const NAV = [
  { label: 'Catalog', href: '/parts', type: 'link' }, // catalog search page, no dropdown

  {
    label: 'School Bus', href: '/school-bus', type: 'mega',
    columns: [
      {
        heading: 'Bus Brands',
        items: [
          { label: 'Blue Bird', href: '/blue-bird-school-bus-exhaust-parts' },
          // Chevrolet-GMC and Ford have no dedicated hub page; routed to /truck per
          // the 2026-09-11 orphan-page redirect decision (same targets used there).
          { label: 'Chevrolet-GMC', href: '/truck' },
          { label: 'Ford', href: '/truck' },
          { label: 'Freightliner', href: '/freightliner-school-bus-exhaust-parts' },
          { label: 'IC Bus', href: '/ic-bus-school-bus-exhaust-parts' },
          // Navistar/International has no dedicated hub page; routed to IC Bus,
          // which runs the Navistar chassis (same target used in the 2026-09-11 redirect).
          { label: 'Navistar International', href: '/ic-bus-school-bus-exhaust-parts' },
          { label: 'Thomas Built', href: '/thomas-built-school-bus-exhaust-parts' }
        ]
      },
      {
        heading: 'Systems',
        items: [
          { label: 'DPF and Emissions', href: '/dpf-and-emissions' },
          { label: 'Catalytic Converters and Mufflers', href: '/catalytic-converters-and-mufflers' },
          { label: 'Cooling and Radiators', href: '/cooling-and-radiators' },
          { label: 'Fuel Tanks', href: '/fuel-tanks' },
          { label: 'Accessories', href: '/school-bus-exhaust-accessories' }
        ]
      },
      {
        heading: 'Download PDF Catalogs', secondary: true,
        items: [
          { label: 'School Bus Catalog', href: 'https://www.auto-jet.com/_files/ugd/3978df_c9854d9dabef456581bb3f5983c4488e.pdf?index=true', bold: true, pdf: true },
          { label: 'Accessories', href: 'https://www.auto-jet.com/_files/ugd/3978df_96b767f23abd4dff8626aafe0a7961d6.pdf?index=true', pdf: true },
          { label: 'Blue Bird', href: 'https://www.auto-jet.com/_files/ugd/3978df_6dbdead6404145cebe986f8287086671.pdf?index=true', pdf: true },
          { label: 'Chevrolet-GMC', href: 'https://www.auto-jet.com/_files/ugd/3978df_bf3f5d93eb0448f9a509b62589ec7830.pdf?index=true', pdf: true },
          { label: 'Converters & Mufflers', href: 'https://www.auto-jet.com/_files/ugd/3978df_843d7ab810c049db92382bd066e7f01e.pdf?index=true', pdf: true },
          { label: 'DPF', href: 'https://www.auto-jet.com/_files/ugd/3978df_8db1639b462b4ef5b34ddcc5a49b39c6.pdf?index=true', pdf: true },
          { label: 'Ford', href: 'https://www.auto-jet.com/_files/ugd/3978df_26970388efc04bba8c3c252909f97c0d.pdf?index=true', pdf: true },
          { label: 'Freightliner', href: 'https://www.auto-jet.com/_files/ugd/3978df_c4a92aacb83e4c07979ca0ffd8f248eb.pdf?index=true', pdf: true },
          { label: 'Navistar International', href: 'https://www.auto-jet.com/_files/ugd/3978df_57f0cde034894b7a943d42cbd848ef28.pdf', pdf: true },
          { label: 'Thomas Built', href: 'https://www.auto-jet.com/_files/ugd/3978df_d1256cdb76ef4885b34d5f3d49332a4c.pdf?index=true', pdf: true }
        ]
      }
    ],
    featured: {
      heading: 'Find your part',
      placeholder: 'Search by Part, OE, or Model',
      quoteLabel: 'Request a Quote',
      quoteHref: '/contact'
    }
  },

  {
    label: 'Truck', href: '/truck', type: 'mega',
    columns: [
      {
        heading: 'Truck Brands',
        items: [
          // No truck brand pages exist yet. Routed to /truck as an interim
          // stopgap, not a PDF, until dedicated truck brand pages are built.
          { label: 'Chevrolet-GMC', href: '/truck' },
          { label: 'Ford', href: '/truck' },
          { label: 'Freightliner', href: '/truck' },
          // CORRECTED 2026-09-19 per Autojet_Nav_Rollout_Deliverables_2026-09-16.md:
          // Isuzu is not empty. The live Parts (Import2) collection has 3 real,
          // published records under brand:"Isuzu" (DPF8057, DPFISU057,
          // CUS-069-24), so routing it to the generic /truck page like its
          // siblings above buries three sellable parts. /parts?brand=Isuzu is a
          // real, working destination: autojet-search.js's boot(d) reads `brand`
          // off the URL (`['category','type','brand'].forEach(...)`) straight
          // into state.facets.busBrand on load, the same mechanism the site's
          // breadcrumb links already use for `?category=` and `?type=`.
          { label: 'Isuzu', href: '/parts?brand=Isuzu' },
          { label: 'Navistar International', href: '/truck' }
        ]
      },
      {
        heading: 'Systems',
        items: [
          // Truck has no vehicle-specific pages yet; DPF and Catalytic share
          // the generic system pages until the truck versions ship. Performance
          // Exhaust, Crossover Pipes, and Accessories have no pages at all yet,
          // routed to /truck as an interim stopgap, not a PDF.
          { label: 'DPF and Emissions', href: '/dpf-and-emissions' },
          { label: 'Catalytic Converters and Mufflers', href: '/catalytic-converters-and-mufflers' },
          { label: 'Performance Exhaust', href: '/truck' },
          { label: 'Crossover Pipes', href: '/truck' },
          { label: 'Accessories', href: '/truck' }
        ]
      },
      {
        heading: 'Download PDF Catalogs', secondary: true,
        items: [
          { label: 'Truck Catalog', href: 'https://www.auto-jet.com/_files/ugd/3978df_121a7e754f2448c2b031c6caedb82b2e.pdf?index=true', bold: true, pdf: true },
          { label: 'Accessories', href: 'https://f6ae10c3-cc7d-49f5-9cfb-e003058ae4c4.usrfiles.com/ugd/3978df_872c682e617749b0870031c4fd48148a.pdf', pdf: true },
          { label: 'Chevrolet-GMC', href: 'https://f6ae10c3-cc7d-49f5-9cfb-e003058ae4c4.usrfiles.com/ugd/3978df_1199d42a933d44eca1c6d0098e7ddf6d.pdf', pdf: true },
          { label: 'Crossover', href: 'https://f6ae10c3-cc7d-49f5-9cfb-e003058ae4c4.usrfiles.com/ugd/3978df_3273b0cda0dc47caa0b91a58d58929dd.pdf', pdf: true },
          { label: 'Emission Control', href: 'https://f6ae10c3-cc7d-49f5-9cfb-e003058ae4c4.usrfiles.com/ugd/3978df_84358508fd8e41f1bcc146eba4a33f0f.pdf', pdf: true },
          { label: 'Ford', href: 'https://f6ae10c3-cc7d-49f5-9cfb-e003058ae4c4.usrfiles.com/ugd/3978df_a2a9e1966089407896bcb941a8cd7320.pdf', pdf: true },
          { label: 'Freightliner', href: 'https://f6ae10c3-cc7d-49f5-9cfb-e003058ae4c4.usrfiles.com/ugd/3978df_33525896d14940349da522216a8e8536.pdf', pdf: true },
          { label: 'Mufflers', href: 'https://f6ae10c3-cc7d-49f5-9cfb-e003058ae4c4.usrfiles.com/ugd/3978df_3fac61dde47b4087b4223bf8bfc94a53.pdf', pdf: true },
          { label: 'Navistar International', href: 'https://f6ae10c3-cc7d-49f5-9cfb-e003058ae4c4.usrfiles.com/ugd/3978df_aff7fd91fee341e992c6bb99d53d2d4b.pdf', pdf: true },
          { label: 'Performance', href: 'https://f6ae10c3-cc7d-49f5-9cfb-e003058ae4c4.usrfiles.com/ugd/3978df_1a36d6e3b86b4e5c847456bf19688c06.pdf', pdf: true },
          // the six vintage files live on their own archive page
          { label: 'Vintage & Discontinued', href: '/vintage-and-discontinued', pdf: true }
        ]
      }
    ],
    featured: {
      heading: 'Find your part',
      placeholder: 'Search by Part, OE, or Model',
      quoteLabel: 'Request a Quote',
      quoteHref: '/contact'
    }
  },

  {
    label: 'Off-Road', href: '/off-road', type: 'dropdown', width: 280,
    items: [
      { label: 'Off-Road Catalog', href: 'https://f6ae10c3-cc7d-49f5-9cfb-e003058ae4c4.usrfiles.com/ugd/3978df_00c86f15b08f494e8daacf08277a36c4.pdf', pdf: true, bold: true },
      { label: 'Exhaust Gas Purifiers', href: '/exhaust-gas-purifiers' }
    ]
  },

  { label: 'OEM', href: '/oem', type: 'link' },

  {
    // Resources is a category, not a page: /resources IS the blog, so the parent
    // is not a link (noLink) and the Blog row carries that URL.
    label: 'Resources', type: 'dropdown', noLink: true, width: 280,
    items: [
      { label: 'Blog', href: '/resources' },
      { label: 'FAQ', href: '/faq' }
    ]
  },

  { label: 'About', href: '/about', type: 'link' },
  { label: 'Contact', href: '/contact', type: 'link' }
];

/* ---------------------------------------------------------------- icons */

const ICON = {
  searchGray: '<svg viewBox="0 0 20 20" width="15" height="15" fill="none" stroke="#8A9099" stroke-width="1.6" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M12.8 12.8L17 17"/></svg>',
  searchWhite: '<svg viewBox="0 0 20 20" width="17" height="17" fill="none" stroke="#fff" stroke-width="1.8" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="M12.8 12.8L17 17"/></svg>',
  docSmall: '<svg viewBox="0 0 128 128" width="15" height="15" aria-hidden="true"><rect width="128" height="128" rx="20" ry="20" fill="#056EB7"/><polygon points="82.17 65.39 82.17 21.51 45.83 21.51 45.83 65.4 16 65.4 64 112.49 112 65.39 82.17 65.39" fill="#fff"/></svg>',
  docSmallBold: '<svg viewBox="0 0 128 128" width="16" height="16" aria-hidden="true"><rect width="128" height="128" rx="20" ry="20" fill="#056EB7"/><polygon points="82.17 65.39 82.17 21.51 45.83 21.51 45.83 65.4 16 65.4 64 112.49 112 65.39 82.17 65.39" fill="#fff"/></svg>',
  phoneSm: '<svg viewBox="0 0 20 20" width="14" height="14" fill="#4DA8F0" aria-hidden="true"><path d="M6.6 2.2a1.4 1.4 0 011.9.5l1.4 2.5a1.4 1.4 0 01-.35 1.75l-1.2.95a9.3 9.3 0 003.8 3.8l.95-1.2a1.4 1.4 0 011.75-.35l2.5 1.4a1.4 1.4 0 01.5 1.9l-1 1.7a2 2 0 01-2.3.9A15.2 15.2 0 013.9 5.8a2 2 0 01.9-2.3l1.8-1.3z"/></svg>',
  phone: '<svg viewBox="0 0 20 20" width="15" height="15" fill="#056EB7" aria-hidden="true"><path d="M6.6 2.2a1.4 1.4 0 011.9.5l1.4 2.5a1.4 1.4 0 01-.35 1.75l-1.2.95a9.3 9.3 0 003.8 3.8l.95-1.2a1.4 1.4 0 011.75-.35l2.5 1.4a1.4 1.4 0 01.5 1.9l-1 1.7a2 2 0 01-2.3.9A15.2 15.2 0 013.9 5.8a2 2 0 01.9-2.3l1.8-1.3z"/></svg>',
  arrow: '<svg viewBox="0 0 14 14" width="13" height="13" fill="none" stroke="#056EB7" stroke-width="1.6" aria-hidden="true"><path d="M2 7h9M7.5 3.5L11 7l-3.5 3.5"/></svg>',
  chevron: '<svg viewBox="0 0 10 10" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M1.5 3.5L5 7 8.5 3.5"/></svg>',
  chevronM: '<svg viewBox="0 0 10 10" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M1.5 3.5L5 7 8.5 3.5"/></svg>',
  burger: '<svg viewBox="0 0 20 20" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M2 5h16M2 10h16M2 15h16"/></svg>',
  close: '<svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M3 3l14 14M17 3L3 17"/></svg>'
};

/* ---------------------------------------------------------------- styles */

/* 'YYYY-MM-DD' entries force a full-day closure.
 * TODO (confirm w/ Rich, mid-2027): 2027-07-04 falls on a Sunday and
 * 2027-12-25 on a Saturday, so both are no-ops as written. If AJ observes
 * them on the adjacent weekday, add '2027-07-05' and '2027-12-27' (or
 * promote the '2027-12-24' half-day to a full closure). */
const HOLIDAYS = [
  '2026-11-26', '2026-12-25', '2027-01-01', '2027-05-31',
  '2027-07-04', '2027-09-06', '2027-11-25', '2027-12-25',
];

// 'YYYY-MM-DD' entries close at noon instead of 5 PM
const HALF_DAYS = [
  '2026-11-27', '2026-12-24', '2026-12-31',
  '2027-11-26', '2027-12-24', '2027-12-31',
];

const LOGO_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 498 124.13" fill="currentColor" aria-hidden="true"><path d="M82.95,19.92h.16l-.1,27.17h-15.57l15.52-27.17ZM77.02,1.81l-44.79,71.85h19.85l6.7-11.68h24.28v11.68s19.84,0,19.84,0L99.67,1.81h-22.65Z"/><path d="M118.79,19.12h16.97l-8.33,28.18c-2.74,9.26-.57,12.48,5.12,12.48,6.01,0,11.79-4.12,14.44-13.08l8.15-27.57h16.98l-16.13,54.54h-16.49l2.08-7.05h-.16c-5.02,5.33-12.43,9.26-20.99,9.26-10.41,0-16.75-5.64-11.9-22.04l10.27-34.72Z"/><path d="M177.95,19.12h8.64l4.98-17.31h16.5l-4.98,17.31h10.9l-4.05,14.09h-10.9l-6.31,21.94c-1.42,4.93-.69,5.63,3.75,5.63,2.02,0,3.68-.1,5.9-.2l-3.82,13.28c-3.52.6-8,1-12.82,1-10.74,0-14.19-3.42-10.81-15.19l7.61-26.47h-8.64l4.05-14.09Z"/><path d="M228.07,46.39c-2.95,10.26.24,15.4,7.71,15.4s13.62-5.13,16.57-15.4c2.95-10.26-.24-15.4-7.71-15.4s-13.61,5.13-16.57,15.4M248.69,16.91c19.07,0,26.66,10.16,21.1,29.48-5.55,19.32-18.99,29.48-38.05,29.48s-26.65-10.16-21.1-29.48c5.55-19.32,18.99-29.48,38.05-29.48"/><polygon points="277.44 39.69 303.41 39.69 298.95 55.18 272.99 55.18 277.44 39.69"/><path d="M326.43,0h16.5l-3.7,12.88h-16.5l3.7-12.88ZM283.09,109.24h4.36c5.76,0,6.64-.9,8.41-7.05l25.08-83.07h16.5l-25.51,84.58c-4.51,15.7-9.06,20.42-22.45,20.42-3.12,0-8.42-.2-10.57-.3l4.19-14.59Z"/><path d="M376.93,40.35c.8-6.04-1.22-11.17-9.01-11.17s-12.76,5.13-15.43,11.17h24.44ZM388.2,57.46c-4.63,9.06-15.33,18.42-33.31,18.42-18.99,0-26.89-9.36-21.07-29.59,5.56-19.32,20.05-29.38,37.56-29.38s26.34,10.16,19.8,32.9l-.47,1.61h-41.41c-1.17,7.04,1.25,12.17,9.73,12.17,5.29,0,8.86-2.92,11.73-6.14h17.43Z"/><path d="M402.49,19.12h8.64l4.98-17.31h16.5l-4.98,17.31h10.9l-4.05,14.09h-10.9l-6.31,21.94c-1.42,4.93-.69,5.63,3.75,5.63,2.02,0,3.68-.1,5.9-.2l-3.82,13.28c-3.52.6-8,1-12.82,1-10.74,0-14.19-3.42-10.81-15.19l7.61-26.47h-8.64l4.05-14.09Z"/><path d="M37.36,45.05l-15.28,24.64s-5.42,8.88,2.96,8.88h266.18l-4.44,17.25H20.11c-16.76,0-42.39-14.79,17.25-50.77"/><polygon points="328.68 78.57 425.79 78.57 421.35 95.82 324.25 95.82 328.68 78.57"/><path d="M497.75,88.42c-1.72,2.71-6.41,4.19-6.41,4.19h-13.56l-2.46,2.71h-11.34l-9.12,15.77h-10.1l4.93-16.26c-4.19-.25-10.85-1.23-10.85-1.23l-4.93,8.63h-4.68l7.64-27.61h5.42l-.74,8.63s5.67-.74,11.09-1.23l4.68-16.27h10.1l-.25,15.77h9.36l2.46,2.71h12.57s4.69,1.48,6.41,4.19"/></svg>';

const CSS = `
:host{display:block;position:relative;isolation:isolate;z-index:9000;font-family:'Wix Madefor Text',system-ui,sans-serif;-webkit-font-smoothing:antialiased}
*{box-sizing:border-box}
a{text-decoration:none;color:#333}
button{font-family:inherit;border:0;background:none;padding:0;cursor:pointer}

.bar{display:block;background:#1A1A1A;position:relative;z-index:2;width:100vw;left:50%;right:50%;margin-left:-50vw;margin-right:-50vw}
.util-right{display:flex;align-items:center;gap:14px;flex:0 0 auto}
.util-tel{display:flex;align-items:baseline;justify-content:center;gap:6px;flex:0 0 auto;width:140px;font-weight:700;font-size:20px;letter-spacing:.01em;color:#4DA8F0;white-space:nowrap}
.util-tel svg{flex:0 0 auto}
.util-tel:hover{color:#fff}
.util-tel:hover svg{fill:#fff}
/* top-bar phone: hidden by default, shown only in the phone-top tier (see
 * [data-phone-top] below), to the right of Get Quote */
.util-tel-top{display:none;align-items:center;flex:0 0 auto;font-weight:700;font-size:20px;letter-spacing:.01em;color:#4DA8F0;white-space:nowrap}
.util-tel-top:hover{color:#fff}
.status{display:flex;align-items:center;justify-content:center;gap:7px;flex:0 0 auto;width:250px}
.status .dot{flex:0 0 auto;width:8px;height:8px;border-radius:50%;background:#4ED07A}
.status .state{font-weight:700;font-size:14px;color:#fff}
.status .until{font-weight:400;font-size:14px;color:#B4BAC2}
.status[data-closed] .dot{background:#8A9099}
.status[data-closed] .state{color:#B4BAC2}
.bar-top{display:flex;height:69px;box-sizing:border-box}
.bar-btm{display:flex;height:50px;padding-bottom:4px;border-top:1px solid rgba(255,255,255,.22);border-bottom:3px solid #4DA8F0;box-sizing:border-box}
.wrap{display:flex;align-items:center;justify-content:space-between;gap:40px;width:100%;max-width:1600px;margin:0 auto;padding:0 clamp(20px, 6.25vw, 80px);box-sizing:border-box}
.bar-btm .wrap{position:relative;gap:24px}
.logo{display:block;flex:0 0 auto;width:158px;color:#fff}
.logo svg{display:block;width:100%;height:auto}
.logo img{display:block;width:100%;height:auto}
.tools{display:flex;align-items:center;gap:14px;flex:0 0 auto}
.rule{display:none}

.items{display:flex;align-items:center;gap:22px;height:100%;flex:0 1 auto;min-width:0}
.item{position:relative;display:flex;align-items:center;gap:3px;height:100%;flex:0 0 auto;font-weight:400;font-size:14px;color:#fff;white-space:nowrap}
.item>a{display:flex;align-items:center;height:100%;color:inherit}
.item:hover,.item[data-open]{color:#4DA8F0}
.item .chev{display:flex;align-items:center;justify-content:center;width:22px;height:100%;color:rgba(255,255,255,.5);cursor:pointer}
.item:hover .chev,.item[data-open] .chev{color:#4DA8F0}
.item .chev svg{transition:transform .12s ease}
.item[data-open] .chev svg{transform:rotate(180deg)}


.field{display:flex;align-items:center;gap:8px;flex:0 0 auto;width:260px;height:36px;padding:0 16px;border:1px solid #C9CED4;border-radius:2px;background:#fff}
.field svg{flex:0 0 auto;order:2}
.field input{order:1;font-size:14px}
.field input::placeholder{color:#8A9099}
.field input{border:0;outline:0;width:100%;font:400 14px/1 'Wix Madefor Text',sans-serif;color:#333;background:none}
.field input::placeholder{color:#8A9099}
.quote{display:flex;align-items:center;justify-content:center;flex:0 0 auto;width:140px;height:36px;background:#FBBF13;border-radius:2px;font-family:'Wix Madefor Text',sans-serif;font-weight:700;font-size:15px;letter-spacing:.04em;text-transform:uppercase;color:#1A1A1A}
.quote:hover{background:#e6ad0c;color:#1A1A1A}

/* quick-search dropdown */
.search-wrap{position:relative;display:inline-block;vertical-align:top}
.search-dd{position:absolute;left:0;right:0;top:calc(100% + 6px);background:#fff;border:1px solid #E4E7EB;box-shadow:0 10px 18px -12px rgba(0,0,0,.2);z-index:20;display:none;overflow:hidden}
.search-dd[data-open]{display:block}
.srow{display:flex;align-items:center;gap:10px;padding:8px 12px;color:#333;border-bottom:1px solid #F1F3F5}
.srow:last-of-type{border-bottom:0}
.srow:hover,.srow[data-hi]{background:#F4F6F8}
.sthumb{flex:0 0 auto;width:40px;height:40px;border-radius:4px;overflow:hidden;background:#F4F6F8;border:1px solid #E9ECEF}
.sthumb img{display:block;width:100%;height:100%;object-fit:contain}
.sbody{min-width:0;display:flex;flex-direction:column;gap:2px}
.sname{font-size:13px;font-weight:600;color:#333;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.smeta{display:flex;align-items:center;gap:6px;font-size:12px;color:#5A6069;white-space:nowrap;overflow:hidden}
.spn{font-weight:700;color:#056EB7;flex:0 0 auto}
.sbrand{flex:0 0 auto;padding:1px 6px;border-radius:999px;background:#F4F6F8;border:1px solid #E4E7EB;font-size:11px;color:#5A6069;white-space:nowrap}
.sall{display:block;padding:10px 12px;font-weight:700;font-size:13px;color:#056EB7;background:#F4F6F8;text-align:center;border-top:1px solid #E4E7EB}
.sall:hover{background:#E8F2FB}
.snone{padding:12px;font-size:12.5px;color:#5A6069}

/* panels */
.panel{position:absolute;left:0;right:0;top:100%;background:#fff;box-shadow:0 10px 18px -12px rgba(0,0,0,.14);display:none;z-index:1}
.panel[data-open]{display:block}
.grid{display:grid;grid-template-columns:3fr 3fr 3fr 3.6fr;gap:40px;width:100%;max-width:1600px;margin:0 auto;padding:34px clamp(24px, 6.25vw, 80px) 40px;box-sizing:border-box}
.grid[data-cols="3"]{grid-template-columns:3fr 3fr 3fr 3.6fr}
.col{display:flex;flex-direction:column;gap:18px;min-width:0}
.head{display:flex;flex-direction:column;gap:7px}
.head-row{display:flex;align-items:center;gap:8px}
.head-row span{font-weight:700;font-size:14px;line-height:1.2;letter-spacing:.08em;text-transform:uppercase;color:#056EB7}
.head .rule{width:24px;height:2px}
.rows{display:flex;flex-direction:column;gap:8px}
.rows[data-secondary]{gap:8px}
.row{display:flex;align-items:center;gap:9px;min-height:22px;font-size:15px;line-height:1.35;color:#333}
.row:hover{color:#056EB7}
.row[data-secondary]{font-size:13.5px;color:#4A4F55}
.row[data-secondary][data-out]{color:#056EB7;font-weight:600}
.row[data-bold]{font-weight:700;color:#333}
.row[data-secondary][data-bold]{font-size:14px}
.row svg{flex:0 0 auto}

/* dropdown */
.dd{position:absolute;top:calc(100% + 7px);left:0;background:#fff;box-shadow:0 10px 18px -12px rgba(0,0,0,.14);padding:18px 20px;display:none;z-index:1}
.dd[data-open]{display:block}
.dd .rows{gap:8px}

/* featured tile */
.tile{background:#F4F6F8;padding:20px}
.tile .head{margin-bottom:14px}
.tile .search-wrap{display:block;width:100%}
.tile .field{width:100%;max-width:260px;margin-bottom:18px;box-sizing:border-box}
.tile .go{display:flex;align-items:center;justify-content:center;width:46px;height:42px;background:#056EB7;border-radius:0 2px 2px 0}
.tile .go:hover{background:#045a96}
.tel{display:flex;flex-direction:column;align-items:flex-start;gap:4px;margin-bottom:18px}
.tel-line{display:flex;align-items:center;gap:8px}
.tel svg{flex:0 0 auto}
.tel a{flex:0 0 auto;font-weight:700;font-size:20px;line-height:1.1;color:#333}
.tel a:hover{color:#056EB7}
.callus{font-size:13px;line-height:1.1;color:#5A6069}
.cta{display:flex;align-items:center;justify-content:center;width:100%;max-width:260px;height:44px;background:#056EB7;border-radius:2px;font-weight:700;font-size:13px;letter-spacing:.08em;text-transform:uppercase;color:#fff}
.cta:hover{background:#045a96;color:#fff}

/* mobile */
.burger{display:none;align-items:center;justify-content:center;width:48px;height:48px;color:#fff;margin-right:-10px}
.sheet{display:none;position:fixed;inset:0;width:100%;height:100%;max-width:none;max-height:none;margin:0;padding:0;border:0;background:#fff;color:#333;z-index:9999;flex-direction:column;overscroll-behavior:contain}
.sheet[open]{display:flex}
.sheet::backdrop{background:#fff}
.sheet-bar{display:flex;align-items:center;justify-content:space-between;height:72px;padding:0 clamp(20px, 6.25vw, 80px);background:#1A1A1A;flex:0 0 auto;box-sizing:border-box}
.sheet-bar .logo{width:132px}
.sheet-x{color:#fff}
.sheet-x{display:flex;align-items:center;justify-content:center;width:44px;height:44px;margin-right:-10px}
.sheet-search{padding:12px clamp(20px, 6.25vw, 80px);flex:0 0 auto;box-sizing:border-box}
.sheet-search .field{width:100%;max-width:none;height:46px}
.sheet-search input{font-size:14px}
.tree{flex:1 1 auto;overflow-y:auto;-webkit-overflow-scrolling:touch;border-top:1px solid #EDEFF2}
.trow{display:flex;align-items:center;justify-content:space-between;width:100%;height:52px;padding:0 clamp(20px, 6.25vw, 80px);border-bottom:1px solid #EDEFF2;font-weight:400;font-size:14px;color:#333;text-align:left;box-sizing:border-box}
.trow .tname{display:flex;align-items:center;flex:1 1 auto;height:100%;color:inherit}
.trow .tchev{display:flex;align-items:center;justify-content:center;width:52px;height:100%;margin-right:calc(-1 * clamp(20px, 6.25vw, 80px));color:#5A6069;cursor:pointer}
.trow .tchev svg{transition:transform .12s ease}
.trow:has([aria-expanded="true"]){background:#F4F6F8;color:#056EB7}
.trow:has([aria-expanded="true"]) .tchev{color:#056EB7}
.trow:has([aria-expanded="true"]) .tchev svg{transform:rotate(180deg)}
.tsub{display:none;flex-direction:column;gap:8px;padding:14px clamp(20px, 6.25vw, 80px) 16px;border-bottom:1px solid #EDEFF2;box-sizing:border-box}
.tsub[data-open]{display:flex}
.tlabel{font-weight:700;font-size:14px;line-height:1.2;letter-spacing:.08em;text-transform:uppercase;color:#056EB7;margin:0 0 4px}
.tsub .tlabel:not(:first-child){margin-top:6px}
.tlink{display:flex;align-items:center;gap:9px;min-height:22px;line-height:1.35;font-size:14px;color:#333}
.tlink[data-bold]{font-weight:700}
.sheet-foot{flex:0 0 auto;padding:20px clamp(20px, 6.25vw, 80px) 24px;box-sizing:border-box}
.sheet-foot .quote{width:100%;justify-content:center;height:50px;font-size:14px}
.sheet-foot .tel{flex-direction:row;align-items:center;justify-content:center;margin:16px 0 0}
.sheet-foot .tel a{font-size:20px;color:#056EB7}
.sheet-foot .tel svg{display:none}

:host([data-compact]) .util-right .status{display:none}

/* compact-tier mega panel: three text columns plus the Find Your Part tile
   no longer fit side by side once the host drops under ~1260px. Bus Brands
   stacks above Systems in one column so Download PDF Catalogs and the tile
   each keep a real column of their own — the tile's own field/button now
   shrink with their column (see .tile .search-wrap/.field below) instead of
   overflowing it. */
:host([data-compact]) .grid{grid-template-columns:1fr 1fr 1fr;grid-template-areas:"c1 c3 tile" "c2 c3 tile";column-gap:32px;row-gap:28px}
:host([data-compact]) .grid > .col:nth-of-type(1){grid-area:c1}
:host([data-compact]) .grid > .col:nth-of-type(2){grid-area:c2}
:host([data-compact]) .grid > .col:nth-of-type(3){grid-area:c3}
:host([data-compact]) .grid > .tile{grid-area:tile}

/* in the quote-hidden band (900px down to the mobile breakpoint) the panel
   itself is narrower still, so the tile drops to a full-width row below
   the two text columns instead of squeezing into a third one. */
:host([data-quote-hidden]) .grid{grid-template-columns:1fr 1fr;grid-template-areas:"c1 c3" "c2 c3" "tile tile"}
:host([data-quote-hidden]) .grid > .tile{display:block}

/* phone-top tier: phone number moves from the bottom row up to the top bar,
 * next to Get Quote */
:host([data-phone-top]) .bar-btm .util-tel{display:none}
:host([data-phone-top]) .bar-top .util-tel-top{display:flex}

/* within the phone-top tier, once the top bar itself runs out of room,
 * Get Quote drops before the phone number does */
:host([data-quote-hidden]) .bar-top .quote{display:none}

/* hamburger tier: search stays visible throughout, on its own full-width
 * row below logo + hamburger, rather than disappearing until the sheet
 * opens. Only Get Quote and the top-bar phone move fully into the sheet. */
:host([data-mobile]) .items,:host([data-mobile]) .bar-top .quote,:host([data-mobile]) .bar-top .util-tel-top{display:none}
:host([data-mobile]) .burger{display:flex}

:host([data-mobile]) .bar-top{height:auto;padding:12px 0}
:host([data-mobile]) .bar-top .wrap{flex-wrap:wrap;row-gap:12px}
:host([data-mobile]) .bar-top .burger{order:1}
:host([data-mobile]) .bar-top .tools{order:2;flex:1 0 100%;gap:0}
:host([data-mobile]) .bar-top .search-wrap{width:100%}
:host([data-mobile]) .bar-top .field{width:100%;max-width:none;height:44px}
:host([data-mobile]) .bar-btm{display:none}
:host([data-mobile]) .logo{width:140px}
`;

/* ---------------------------------------------------------------- markup */

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* PDF rows are marked by the document glyph in front of the label, so every row in
 * a catalogs column starts at the same x. No trailing "PDF" tag — right-aligned
 * tags never line up against labels of different lengths. */
function rowHTML(it, secondary) {
  const glyph = it.pdf ? (it.bold ? ICON.docSmallBold : ICON.docSmall) : (it.arrow && secondary ? ICON.arrow : '');
  const arrow = it.arrow && !secondary ? ICON.arrow : '';
  const attrs = `${secondary ? ' data-secondary' : ''}${it.bold ? ' data-bold' : ''}${it.arrow && secondary ? ' data-out' : ''}`;
  const target = it.pdf ? ' target="_blank" rel="noopener"' : '';
  return `<a class="row"${attrs} href="${esc(it.href)}"${target}>${glyph}${esc(it.label)}${arrow}</a>`;
}

function tileHTML(f, phone) {
  return `<div class="tile">
    <div class="head"><div class="head-row"><span>${esc(f.heading)}</span></div><div class="rule"></div></div>
    <div class="search-wrap"><form class="field" data-tile-search>${ICON.searchGray}<input type="search" placeholder="${esc(f.placeholder)}" aria-label="${esc(f.placeholder)}"></form></div>
    <div class="tel"><span class="callus">Call Our Team</span><div class="tel-line">${ICON.phone}<a href="tel:${phone.replace(/\D/g, '')}">${esc(phone)}</a></div></div>
    <a class="cta" href="${esc(f.quoteHref)}">${esc(f.quoteLabel)}</a>
  </div>`;
}

function megaHTML(entry, phone) {
  const cols = entry.columns.map(c => `<div class="col">
      <div class="head"><div class="head-row"><span>${esc(c.heading)}</span></div><div class="rule"></div></div>
      <div class="rows"${c.secondary ? ' data-secondary' : ''}>${c.items.map(it => rowHTML(it, c.secondary)).join('')}</div>
    </div>`).join('');
  return `<div class="panel" data-panel="${esc(entry.label)}" role="region" aria-label="${esc(entry.label)} menu">
    <div class="grid" data-cols="${entry.columns.length}">${cols}${tileHTML(entry.featured, phone)}</div>
  </div>`;
}

function ddHTML(entry) {
  return `<div class="dd" data-panel="${esc(entry.label)}" style="width:${entry.width}px" role="region" aria-label="${esc(entry.label)} menu">
    <div class="rows">${entry.items.map(it => rowHTML(it, false)).join('')}</div>
  </div>`;
}

/* Mobile mirrors the desktop panel exactly: the same three groups in the same
 * order with the same rows, stacked. Catalog rows carry the document glyph. */
function treeHTML(phone) {
  return NAV.map(entry => {
    if (entry.type === 'link') return `<a class="trow" href="${esc(entry.href)}">${esc(entry.label)}</a>`;

    let groups;
    if (entry.type === 'mega') {
      groups = entry.columns.map(c =>
        `<p class="tlabel">${esc(c.heading)}</p>` +
        c.items.map(it => `<a class="tlink"${it.bold ? ' data-bold' : ''} href="${esc(it.href)}"${it.pdf ? ' target="_blank" rel="noopener"' : ''}>${it.pdf ? ICON.docSmall : ''}${esc(it.label)}</a>`).join('')
      ).join('');
    } else {
      groups = entry.items.map(it =>
        `<a class="tlink" href="${esc(it.href)}"${it.pdf ? ' target="_blank" rel="noopener"' : ''}>${it.pdf ? ICON.docSmall : ''}${esc(it.label)}${it.arrow ? ICON.arrow : ''}</a>`).join('');
    }

    const tname = entry.noLink
      ? `<span class="tname">${esc(entry.label)}</span>`
      : `<a class="tname" href="${esc(entry.href || '#')}">${esc(entry.label)}</a>`;
    return `<div class="trow">${tname}<button class="tchev" type="button" data-acc="${esc(entry.label)}" aria-expanded="false" aria-label="Show ${esc(entry.label)} menu">${ICON.chevronM}</button></div>
      <div class="tsub" data-sub="${esc(entry.label)}">${groups}</div>`;
  }).join('');
}

/* ------------------------------------------------------ quick search data */

/* Fetch-once + sessionStorage cache, same pattern as autojet-header-search.js's
 * widget (cache key ajCat1). This uses a separate key because the slim row
 * shape here differs (adds image + brand, drops several columns that widget
 * doesn't need). Row shape from /_functions/catalog's r[] (see get_catalog in
 * backend/http-functions.js): r[0] autoJetPart, r[1] oe (pipe-delimited),
 * r[4] partTypeStandardized, r[8] hasImage (1/0), r[9] imgUrl,
 * r[11] canonBrands (pipe-delimited). */
const AJNAV_CACHE_KEY = 'ajNavCat2';
const AJNAV_MAX = 8;
const AJNAV_FALLBACK_IMG = 'https://static.wixstatic.com/media/3978df_4493127c97a84b909579252160cdbfc2~mv2.jpg';

let AJNAV_DATA = null, AJNAV_LOADING = false, AJNAV_WAITERS = [];

const ajnNorm = s => (s || '').toString().toLowerCase().replace(/[^a-z0-9]/g, '');

function ajnParse(slim) {
  return slim.map(r => {
    const part = r[0] || '';
    const oe = (r[1] || '').split('|').filter(Boolean);
    const partType = r[2] || '';
    const brand = (r[3] || '').split('|').filter(Boolean)[0] || '';
    const hasImage = !!r[4];
    const img = r[5] || '';
    return {
      part, oeList: oe, partType, brand, hasImage, img,
      _np: ajnNorm(part),
      _noe: oe.map(ajnNorm),
      _nkw: ajnNorm(partType + brand)
    };
  });
}

function ajnLoad(cb) {
  if (AJNAV_DATA) { cb(AJNAV_DATA); return; }
  AJNAV_WAITERS.push(cb);
  if (AJNAV_LOADING) return;
  AJNAV_LOADING = true;

  const finish = data => {
    AJNAV_DATA = data;
    AJNAV_LOADING = false;
    const waiters = AJNAV_WAITERS;
    AJNAV_WAITERS = [];
    waiters.forEach(fn => fn(data));
  };

  let cached = null;
  try { cached = sessionStorage.getItem(AJNAV_CACHE_KEY); } catch (e) { /* storage unavailable */ }
  if (cached) {
    try { finish(JSON.parse(cached)); return; } catch (e) { /* fall through to fetch */ }
  }

  fetch('/_functions/catalog')
    .then(r => r.json())
    .then(d => {
      const slim = (d.parts || []).map(r => [r[0] || '', r[1] || '', r[4] || '', r[11] || '', r[8] || 0, r[9] || '']);
      const parsed = ajnParse(slim);
      try { sessionStorage.setItem(AJNAV_CACHE_KEY, JSON.stringify(parsed)); } catch (e) { /* storage unavailable or full */ }
      finish(parsed);
    })
    .catch(() => finish([]));
}

/* Four-tier match, most-specific first, capped at AJNAV_MAX total: part number
 * prefix, part number substring, OE substring, then keyword (type+brand)
 * substring. Mirrors the priority order autojet-header-search.js already uses. */
function ajnSuggest(data, q) {
  const nq = ajnNorm(q);
  if (!nq) return [];
  const out = [];
  const seen = new Set();
  const add = list => {
    for (const p of list) {
      if (seen.has(p.part)) continue;
      seen.add(p.part);
      out.push(p);
      if (out.length >= AJNAV_MAX) return true;
    }
    return false;
  };
  if (add(data.filter(p => p._np.startsWith(nq)))) return out;
  if (add(data.filter(p => p._np.includes(nq)))) return out;
  if (add(data.filter(p => p._noe.some(o => o.includes(nq))))) return out;
  add(data.filter(p => p._nkw.includes(nq)));
  return out;
}

function ajnRowHTML(p) {
  const img = p.hasImage && p.img ? p.img : AJNAV_FALLBACK_IMG;
  return `<div class="srow" data-part="${esc(p.part)}" role="option">
    <div class="sthumb"><img src="${esc(img)}" alt="" loading="lazy"></div>
    <div class="sbody">
      <span class="sname">${esc(p.partType || 'Part')}</span>
      <span class="smeta"><span class="spn">${esc(p.part)}</span>${p.brand ? `<span class="sbrand">${esc(p.brand)}</span>` : ''}</span>
    </div>
  </div>`;
}

/* ---------------------------------------------------------------- element */

class AutojetNav extends HTMLElement {
  static get observedAttributes() { return ['logo-src', 'phone']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._open = null;
    this._hoverTimer = null;
    this._leaveTimer = null;
    this._searchDDs = [];
  }

  connectedCallback() {
    this._teardown();
    this._phone = this.getAttribute('phone') || PHONE;
    this.shadowRoot.innerHTML = this._render();

    // Responsive breakpoint setup runs BEFORE _wire() and is wrapped separately
    // from it on purpose. It used to run after _wire(), and when an unguarded
    // selector in _wire() threw (see the fix in _wire() below), the exception
    // aborted the rest of connectedCallback and this block never ran — silently
    // disabling the mobile/desktop switch and the hamburger menu with no visible
    // error unless the console was checked. Running this first, and wrapping
    // _wire() in try/catch, means a future _wire() bug can degrade menu clicks
    // without ever again taking down responsiveness with it.
    const mobileBreakpoint = parseInt(this.getAttribute('mobile-breakpoint'), 10) || 770;
    const quoteBreakpoint = parseInt(this.getAttribute('quote-breakpoint'), 10) || 900;
    const phoneBreakpoint = parseInt(this.getAttribute('phone-breakpoint'), 10) || 960;
    const compactBreakpoint = parseInt(this.getAttribute('compact-breakpoint'), 10) || 1260;
    this._sync = () => {
      const width = this.getBoundingClientRect().width;
      if (width > 0 && width <= mobileBreakpoint) {
        // true hamburger tier: items alone don't fit even with the phone
        // number already moved out of the bottom row
        this.setAttribute('data-mobile', '');
        this.removeAttribute('data-compact');
        this.removeAttribute('data-phone-top');
        this.removeAttribute('data-quote-hidden');
        // items (and the mega panels/dropdowns they open) are hidden at this
        // tier in favor of the hamburger sheet — close any panel left open
        // from a wider width so it can't render orphaned behind the burger
        this._closeMenu();
      } else if (width > 0 && width <= phoneBreakpoint) {
        // phone-top tier: items + phone together no longer fit the bottom
        // row, so the phone number moves up next to Get Quote and the
        // bottom row carries items alone. Status/hours stays hidden here too.
        this.removeAttribute('data-mobile');
        this.setAttribute('data-compact', '');
        this.setAttribute('data-phone-top', '');
        this._closeSheet();
        // Within this tier, once the top bar itself (logo + search + Get
        // Quote + phone) runs out of room, Get Quote drops before the phone
        // number does — Auto-jet's sales close by phone, not the quote
        // form, and Get Quote stays reachable via the mega-menu tile CTAs
        // and the Contact nav link at this width.
        if (width <= quoteBreakpoint) this.setAttribute('data-quote-hidden', '');
        else this.removeAttribute('data-quote-hidden');
      } else if (width > 0 && width <= compactBreakpoint) {
        // compact tier: drop the hours/status text first, before ever
        // reaching for the hamburger
        this.removeAttribute('data-mobile');
        this.setAttribute('data-compact', '');
        this.removeAttribute('data-phone-top');
        this.removeAttribute('data-quote-hidden');
        this._closeSheet();
      } else {
        this.removeAttribute('data-mobile');
        this.removeAttribute('data-compact');
        this.removeAttribute('data-phone-top');
        this.removeAttribute('data-quote-hidden');
        this._closeSheet();
      }
    };
    if (typeof ResizeObserver !== 'undefined') {
      this._ro = new ResizeObserver(() => this._sync());
      this._ro.observe(this);
    } else {
      // very old browsers only: falls back to viewport width via matchMedia,
      // and only tracks the mobile tier since matchMedia can't watch two
      // thresholds as cleanly as ResizeObserver can
      this._mq = window.matchMedia(`(max-width:${mobileBreakpoint}px)`);
      this._mq.addEventListener('change', this._sync);
    }
    // Backup signal alongside ResizeObserver: belt-and-suspenders in case a
    // browser or embedding context ever delays or skips a resize-observer tick.
    window.addEventListener('resize', this._sync);
    this._sync();

    try {
      this._wire();
    } catch (err) {
      console.error('autojet-nav: _wire() failed, menu interactions may be degraded', err);
    }

    clearInterval(this._statusTimer);
    this._statusTimer = setInterval(() => {
      const el = this.shadowRoot.querySelector('.util-right .status');
      if (el) el.outerHTML = this._status();
    }, 60000);
  }

  disconnectedCallback() { clearInterval(this._statusTimer); this._teardown(); }

  _teardown() {
    clearTimeout(this._hoverTimer);
    clearTimeout(this._leaveTimer);
    if (this._ro) this._ro.disconnect();
    if (this._mq && this._sync) this._mq.removeEventListener('change', this._sync);
    if (this._sync) window.removeEventListener('resize', this._sync);
    if (this._onDocClick) document.removeEventListener('click', this._onDocClick, true);
    if (this._onKey) document.removeEventListener('keydown', this._onKey);
    this._ro = this._mq = this._sync = this._onDocClick = this._onKey = null;
    this._open = null;
    this._searchDDs = [];
  }

  _closeAllQuickSearch() {
    this._searchDDs.forEach(dd => { dd.removeAttribute('data-open'); dd.innerHTML = ''; });
  }

  attributeChangedCallback() { if (this.shadowRoot.childElementCount) this.connectedCallback(); }

  /* Business hours, America/Chicago. Mon-Fri 7:00am-5:00pm.
   * HOLIDAYS force a closed day; HALF_DAYS close at noon. */
  _status() {
    const open = 7;
    const fmt = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Chicago', weekday: 'short', hour: 'numeric', hour12: false });
    const parts = {};
    for (const p of fmt.formatToParts(new Date())) parts[p.type] = p.value;
    const day = parts.weekday, hour = parseInt(parts.hour, 10);
    const ymd = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Chicago' }).format(new Date());
    const weekday = !['Sat', 'Sun'].includes(day);
    const close = HALF_DAYS.includes(ymd) ? 12 : 17;
    const closeLabel = close === 12 ? '12 PM CT' : '5 PM CT';
    const isOpen = weekday && !HOLIDAYS.includes(ymd) && hour >= open && hour < close;
    const next = this._nextOpen(ymd, day, hour, open, close, weekday);
    return isOpen
      ? `<div class="status"><span class="dot"></span><span class="state">Open Now</span><span class="until">Closes ${closeLabel}</span></div>`
      : `<div class="status" data-closed><span class="dot"></span><span class="state">Closed</span><span class="until">Opens 7 AM CT ${next}</span></div>`;
  }

  /* Walks forward from today to the next day the shop actually opens,
   * skipping weekends and HOLIDAYS. Returns 'today', 'tomorrow' or a weekday name. */
  _nextOpen(ymd, day, hour, open, close, weekday) {
    if (weekday && !HOLIDAYS.includes(ymd) && hour < open) return 'today';
    const names = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const cursor = new Date(`${ymd}T12:00:00Z`);
    for (let i = 1; i <= 14; i++) {
      cursor.setUTCDate(cursor.getUTCDate() + 1);
      const iso = cursor.toISOString().slice(0, 10);
      const dow = cursor.getUTCDay();
      if (dow === 0 || dow === 6 || HOLIDAYS.includes(iso)) continue;
      return i === 1 ? 'tomorrow' : names[dow];
    }
    return 'Monday';
  }

  _logo() {
    const src = this.getAttribute('logo-src');
    const inner = src ? `<img src="${esc(src)}" alt="Auto-jet">` : LOGO_SVG;
    return `<a class="logo" href="${esc(this.getAttribute('logo-href') || '/')}" aria-label="Auto-jet home">${inner}</a>`;
  }

  _render() {
    const items = NAV.map(e => {
      if (e.type === 'link') return `<a class="item" href="${esc(e.href)}">${esc(e.label)}</a>`;
      // the label is a real link to the category page; only the chevron toggles the panel
      const parent = e.noLink
        ? `<span>${esc(e.label)}</span>`
        : `<a href="${esc(e.href || '#')}">${esc(e.label)}</a>`;
      return `<div class="item" data-item="${esc(e.label)}">${parent}<button class="chev" type="button" data-trigger="${esc(e.label)}" aria-expanded="false" aria-haspopup="true" aria-label="Show ${esc(e.label)} menu">${ICON.chevron}</button></div>`;
    }).join('');

    const dds = NAV.filter(e => e.type === 'dropdown').map(ddHTML).join('');
    const megas = NAV.filter(e => e.type === 'mega').map(e => megaHTML(e, this._phone)).join('');

    return `<style>${CSS}</style>
    <header class="bar">
      <div class="bar-top">
        <div class="wrap">
          ${this._logo()}
          <div class="tools">
            <div class="search-wrap"><form class="field" data-bar-search>${ICON.searchGray}<input type="search" placeholder="Search by Part, OE, or Model" aria-label="Search by Part, OE, or Model"></form></div>
            <a class="quote" href="${esc(this.getAttribute('quote-href') || '#')}">Get Quote</a>
            <a class="util-tel-top" href="tel:${this._phone.replace(/\D/g, '')}">${esc(this._phone)}</a>
          </div>
          <button class="burger" type="button" data-burger aria-label="Open menu" aria-expanded="false">${ICON.burger}</button>
        </div>
      </div>
      <div class="bar-btm">
        <div class="wrap">
          <nav class="items" aria-label="Main">${items}</nav>
          <div class="util-right">
            ${this._status()}
            <a class="util-tel" href="tel:${this._phone.replace(/\D/g, '')}">${esc(this._phone)}</a>
          </div>
        </div>
      </div>
    </header>
    ${megas}${dds}
    <dialog class="sheet" data-sheet aria-label="Menu">
      <div class="sheet-bar">${this._logo()}<button class="sheet-x" type="button" data-close aria-label="Close menu">${ICON.close}</button></div>
      <div class="sheet-search"><form class="field" data-sheet-search>${ICON.searchGray}<input type="search" placeholder="Search by Part, OE, or Model" aria-label="Search by Part, OE, or Model"></form></div>
      <nav class="tree" aria-label="Main">${treeHTML(this._phone)}</nav>
      <div class="sheet-foot">
        <a class="quote" href="${esc(this.getAttribute('quote-href') || '#')}">Get Quote</a>
        <div class="tel">${ICON.phone}<a href="tel:${this._phone.replace(/\D/g, '')}">${esc(this._phone)}</a></div>
      </div>
    </dialog>`;
  }

  /* ----- desktop open/close: 150ms hover intent, click, Escape, outside ----- */

  _panelFor(label) { return this.shadowRoot.querySelector(`[data-panel="${label}"]`); }

  _openMenu(label) {
    if (this._open === label) return;
    this._closeMenu();
    const panel = this._panelFor(label);
    const wrap = this.shadowRoot.querySelector(`[data-item="${label}"]`);
    const trigger = this.shadowRoot.querySelector(`[data-trigger="${label}"]`);
    if (!panel) return;
    // dropdowns align to their parent item; mega panels are full width
    if (panel.classList.contains('dd') && wrap) {
      const row = this.shadowRoot.querySelector('.bar-btm .wrap').getBoundingClientRect();
      panel.style.left = (wrap.getBoundingClientRect().left - row.left) + 'px';
    }
    panel.setAttribute('data-open', '');
    if (wrap) wrap.setAttribute('data-open', '');
    if (trigger) trigger.setAttribute('aria-expanded', 'true');
    this._open = label;
  }

  _closeMenu() {
    if (!this._open) return;
    const panel = this._panelFor(this._open);
    const wrap = this.shadowRoot.querySelector(`[data-item="${this._open}"]`);
    const trigger = this.shadowRoot.querySelector(`[data-trigger="${this._open}"]`);
    if (panel) panel.removeAttribute('data-open');
    if (wrap) wrap.removeAttribute('data-open');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
    this._open = null;
  }

  _wire() {
    const root = this.shadowRoot;

    root.querySelectorAll('[data-item]').forEach(wrap => {
      const label = wrap.getAttribute('data-item');
      const chev = wrap.querySelector('[data-trigger]');

      wrap.addEventListener('mouseenter', () => {
        clearTimeout(this._leaveTimer);
        clearTimeout(this._hoverTimer);
        this._hoverTimer = setTimeout(() => this._openMenu(label), 150);
      });
      wrap.addEventListener('mouseleave', () => clearTimeout(this._hoverTimer));

      // chevron toggles; the label anchor is left alone so it navigates
      chev.addEventListener('click', e => {
        e.preventDefault();
        e.stopPropagation();
        clearTimeout(this._hoverTimer);
        if (this._open === label) this._closeMenu(); else this._openMenu(label);
      });
      chev.addEventListener('focus', () => this._openMenu(label));
      // Resources has noLink: true, so its wrap holds a <span>, not an <a> — guard
      // this instead of assuming every item wrap contains an anchor. Unguarded, this
      // threw on that entry and aborted the rest of connectedCallback before it ever
      // reached the responsive breakpoint setup below, which is what actually caused
      // the "not responsive, no hamburger" bug (confirmed live: the whole sync/
      // ResizeObserver setup never ran because this line crashed first).
      const labelEl = wrap.querySelector('a');
      if (labelEl) labelEl.addEventListener('focus', () => this._openMenu(label));
    });

    // leaving the whole header + panel region closes; re-entering cancels
    const region = [root.querySelector('.bar'), ...root.querySelectorAll('.panel,.dd')];
    region.forEach(el => {
      el.addEventListener('mouseenter', () => clearTimeout(this._leaveTimer));
      el.addEventListener('mouseleave', () => {
        clearTimeout(this._leaveTimer);
        this._leaveTimer = setTimeout(() => this._closeMenu(), 120);
      });
    });

    this._onKey = e => {
      if (e.key !== 'Escape') return;
      this._closeMenu();
      this._closeSheet();
      this._closeAllQuickSearch();
    };
    document.addEventListener('keydown', this._onKey);

    this._onDocClick = e => {
      const path = e.composedPath();
      if (!path.includes(this)) this._closeMenu();
      if (!path.some(el => el instanceof Element && el.classList && el.classList.contains('search-wrap'))) {
        this._closeAllQuickSearch();
      }
    };
    document.addEventListener('click', this._onDocClick, true);

    // mobile sheet
    root.querySelector('[data-burger]').addEventListener('click', () => this._openSheet());
    root.querySelector('[data-close]').addEventListener('click', () => this._closeSheet());
    const sheetEl = root.querySelector('[data-sheet]');
    sheetEl.addEventListener('close', () => {
      root.querySelector('[data-burger]').setAttribute('aria-expanded', 'false');
      document.documentElement.style.overflow = '';
    });
    root.querySelectorAll('[data-acc]').forEach(btn => {
      btn.addEventListener('click', () => {
        const label = btn.getAttribute('data-acc');
        const sub = root.querySelector(`[data-sub="${label}"]`);
        const isOpen = btn.getAttribute('aria-expanded') === 'true';
        root.querySelectorAll('[data-acc]').forEach(b => b.setAttribute('aria-expanded', 'false'));
        root.querySelectorAll('[data-sub]').forEach(s => s.removeAttribute('data-open'));
        if (!isOpen) { btn.setAttribute('aria-expanded', 'true'); sub.setAttribute('data-open', ''); }
      });
    });

    // search submits -> /parts?q=  (override the path with search-action)
    root.querySelectorAll('form[data-bar-search],form[data-sheet-search],form[data-tile-search]').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const q = form.querySelector('input').value.trim();
        if (!q) return;
        const action = this.getAttribute('search-action') || '/parts';
        this.dispatchEvent(new CustomEvent('autojet-search', { detail: { query: q }, bubbles: true, composed: true }));
        window.location.href = `${action}?q=${encodeURIComponent(q)}`;
      });
    });

    // quick-search dropdown: header bar field + mega-menu "Find your part" tile
    // field only (not the mobile sheet field, which keeps plain submit-to-/parts).
    this._searchDDs = [];
    root.querySelectorAll('form[data-bar-search],form[data-tile-search]').forEach(form => {
      this._setupQuickSearch(form);
    });
  }

  _setupQuickSearch(form) {
    const wrap = form.closest('.search-wrap');
    const input = form.querySelector('input');
    if (!wrap || !input) return;

    const dd = document.createElement('div');
    dd.className = 'search-dd';
    dd.setAttribute('role', 'listbox');
    wrap.appendChild(dd);
    this._searchDDs.push(dd);

    let hi = -1;
    let debounceTimer = null;
    const action = () => this.getAttribute('search-action') || '/parts';

    const close = () => { dd.removeAttribute('data-open'); dd.innerHTML = ''; hi = -1; };

    const go = part => { window.location.href = `${action()}/${encodeURIComponent(part)}`; };

    const render = q => {
      ajnLoad(data => {
        const results = ajnSuggest(data, q);
        hi = -1;
        if (!results.length) {
          dd.innerHTML = `<div class="snone">No matches. Press Enter to search all parts for "${esc(q)}".</div>`;
          dd.setAttribute('data-open', '');
          return;
        }
        dd.innerHTML = results.map(ajnRowHTML).join('')
          + `<a class="sall" data-see-all href="${esc(action())}?q=${encodeURIComponent(q)}">See all results for "${esc(q)}"</a>`;
        dd.setAttribute('data-open', '');
        dd.querySelectorAll('.srow').forEach(row => {
          row.addEventListener('click', () => go(row.getAttribute('data-part')));
        });
      });
    };

    input.addEventListener('input', () => {
      const q = input.value.trim();
      clearTimeout(debounceTimer);
      if (!q) { close(); return; }
      debounceTimer = setTimeout(() => render(q), 120);
    });

    input.addEventListener('focus', () => {
      const q = input.value.trim();
      if (q) render(q);
    });

    input.addEventListener('keydown', e => {
      const rows = Array.from(dd.querySelectorAll('.srow'));
      if (e.key === 'ArrowDown' && rows.length) {
        e.preventDefault();
        hi = Math.min(hi + 1, rows.length - 1);
        rows.forEach((r, i) => r.toggleAttribute('data-hi', i === hi));
        rows[hi].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'ArrowUp' && rows.length) {
        e.preventDefault();
        hi = Math.max(hi - 1, 0);
        rows.forEach((r, i) => r.toggleAttribute('data-hi', i === hi));
        rows[hi].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter' && hi >= 0 && rows[hi]) {
        e.preventDefault();
        go(rows[hi].getAttribute('data-part'));
      } else if (e.key === 'Escape') {
        close();
      }
    });
  }

  _openSheet() {
    const sheet = this.shadowRoot.querySelector('[data-sheet]');
    if (sheet.open) return;
    if (typeof sheet.showModal === 'function') sheet.showModal();
    else sheet.setAttribute('open', '');
    this.shadowRoot.querySelector('[data-burger]').setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
    // every accordion starts collapsed so the tree opens short and scannable
    this.shadowRoot.querySelectorAll('[data-acc]').forEach(b => b.setAttribute('aria-expanded', 'false'));
    this.shadowRoot.querySelectorAll('[data-sub]').forEach(sub => sub.removeAttribute('data-open'));
    this.shadowRoot.querySelector('.tree').scrollTop = 0;
  }

  _closeSheet() {
    const sheet = this.shadowRoot && this.shadowRoot.querySelector('[data-sheet]');
    if (!sheet || !sheet.open) return;
    if (typeof sheet.close === 'function') sheet.close();
    else sheet.removeAttribute('open');
    this.shadowRoot.querySelector('[data-burger]').setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
  }
}

if (!customElements.get('autojet-nav')) customElements.define('autojet-nav', AutojetNav);
