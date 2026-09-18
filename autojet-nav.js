/* Auto-jet navigation — Wix Studio Custom Element
 * Tag: <autojet-nav>
 * Attributes: logo-src, logo-href, phone, quote-href, search-action
 *
 * SINGLE HEADER, ALL WIDTHS. There is one header row at every screen size:
 * logo, search field, Get Quote button, hamburger. There is no separate
 * "desktop" row of nav items/hours/phone below it — every link, the Get
 * Quote button (duplicated for reachability), the phone number, and the
 * open/closed status all live in the hamburger sheet, opened by tapping the
 * burger. This replaces an earlier two-tier responsive system (a compact
 * tier that dropped the hours text, then a mobile tier that dropped to a
 * hamburger) — that system worked, but surfaced a real problem: the Wix
 * widget's own box does not reliably report the visitor's actual viewport
 * width (see RESPONSIVE MEASUREMENT below, still true), so the two-tier
 * breakpoints could not be trusted to fire at the right physical width. A
 * single fixed layout with no width-dependent branching sidesteps that
 * entirely — there is nothing for a bad width reading to get wrong.
 *
 * The one place this still bends to width is the Get Quote button in the
 * top bar: below 560px (real phones, not the Wix-widget-width problem
 * above — an actual narrow device reliably reports its own width) it hides
 * and the search field takes the freed space, so logo + field + burger
 * never overflow a phone screen. Get Quote is never lost — it's always in
 * the sheet footer too.
 *
 * RESPONSIVE MEASUREMENT NOTE (kept from the old system, still relevant):
 * Inside Wix, this component's box can be narrower than the browser
 * viewport (a fixed-width widget setting, a non-stretched container,
 * editor-side scaling). If the widget's box doesn't reach full browser
 * width even on a wide screen, that's a Wix Editor layout setting (width
 * set to "Stretch"/"Full Width", not a fixed pixel width), not something
 * this file controls.
 *
 * EDIT THE NAV ARRAY BELOW. The mobile sheet's accordion reads it directly,
 * so every label and URL is maintained in exactly one place.
 * Replace every "#" with the real destination before go-live.
 *
 * INFORMATION ARCHITECTURE (settled)
 * Vehicle categories stay top level: School Bus, Truck, Off-Road.
 * A category earns a mega/grouped entry when it has 2+ facets intrinsic to
 * itself, each with 3+ children, both used in one visit. School Bus and
 * Truck qualify (brand + system). Off-Road and Resources are single-facet.
 * Catalog columns list every PDF for that vehicle, alphabetized, with the
 * complete catalog first.
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
 * Both vehicle entries use the SAME three groups in the same order:
 *   1 Parts by <vehicle> brand   2 Parts by system   3 Download PDF Catalogs
 * Brand links are bare brand names (the heading already says "brand"), and
 * no group carries an overview row: the parent nav item already goes there.
 * PDF hosts differ by division on purpose: School Bus rows use the auto-jet.com
 * "School Bus Exhaust Parts" files, Truck rows the usrfiles truck imports.
 * Keep this parallel — a mechanic who learns one panel can read the other.
 *
 * Every top-level parent (School Bus, Truck, Off-Road, Resources) is a REAL link
 * to its own page: tapping the label navigates, only the chevron opens the
 * accordion group. Because the parent goes to the category page, the groups
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
        heading: 'Parts by bus brand',
        items: [
          { label: 'Blue Bird', href: '/blue-bird-school-bus-exhaust-parts' },
          { label: 'Chevrolet-GMC', href: 'https://www.auto-jet.com/_files/ugd/3978df_bf3f5d93eb0448f9a509b62589ec7830.pdf?index=true', pdf: true },
          { label: 'Ford', href: 'https://www.auto-jet.com/_files/ugd/3978df_26970388efc04bba8c3c252909f97c0d.pdf?index=true', pdf: true },
          { label: 'Freightliner', href: '/freightliner-school-bus-exhaust-parts' },
          { label: 'IC Bus', href: '/ic-bus-school-bus-exhaust-parts' },
          { label: 'Navistar International', href: 'https://www.auto-jet.com/_files/ugd/3978df_57f0cde034894b7a943d42cbd848ef28.pdf', pdf: true },
          { label: 'Thomas Built', href: '/thomas-built-school-bus-exhaust-parts' }
        ]
      },
      {
        heading: 'Parts by system',
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
    ]
  },

  {
    label: 'Truck', href: '/truck', type: 'mega',
    columns: [
      {
        heading: 'Parts by truck brand',
        items: [
          // no truck brand pages yet, so these rows serve the brand catalog PDFs
          { label: 'Chevrolet-GMC', href: 'https://f6ae10c3-cc7d-49f5-9cfb-e003058ae4c4.usrfiles.com/ugd/3978df_1199d42a933d44eca1c6d0098e7ddf6d.pdf', pdf: true },
          { label: 'Ford', href: 'https://f6ae10c3-cc7d-49f5-9cfb-e003058ae4c4.usrfiles.com/ugd/3978df_a2a9e1966089407896bcb941a8cd7320.pdf', pdf: true },
          { label: 'Freightliner', href: 'https://f6ae10c3-cc7d-49f5-9cfb-e003058ae4c4.usrfiles.com/ugd/3978df_33525896d14940349da522216a8e8536.pdf', pdf: true },
          { label: 'Isuzu', href: '/parts?brand=Isuzu' },
          { label: 'Navistar International', href: 'https://f6ae10c3-cc7d-49f5-9cfb-e003058ae4c4.usrfiles.com/ugd/3978df_aff7fd91fee341e992c6bb99d53d2d4b.pdf', pdf: true }
        ]
      },
      {
        heading: 'Parts by system',
        items: [
          // Truck has no vehicle-specific pages yet; these share the generic
          // system pages until the truck versions ship.
          { label: 'DPF and Emissions', href: '/dpf-and-emissions' },
          { label: 'Catalytic Converters and Mufflers', href: '/catalytic-converters-and-mufflers' },
          { label: 'Performance Exhaust', href: 'https://f6ae10c3-cc7d-49f5-9cfb-e003058ae4c4.usrfiles.com/ugd/3978df_1a36d6e3b86b4e5c847456bf19688c06.pdf', pdf: true },
          { label: 'Crossover Pipes', href: 'https://f6ae10c3-cc7d-49f5-9cfb-e003058ae4c4.usrfiles.com/ugd/3978df_3273b0cda0dc47caa0b91a58d58929dd.pdf', pdf: true },
          { label: 'Accessories', href: 'https://f6ae10c3-cc7d-49f5-9cfb-e003058ae4c4.usrfiles.com/ugd/3978df_872c682e617749b0870031c4fd48148a.pdf', pdf: true }
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
    ]
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
  docSmall: '<svg viewBox="0 0 128 128" width="15" height="15" aria-hidden="true"><rect width="128" height="128" rx="20" ry="20" fill="#056EB7"/><polygon points="82.17 65.39 82.17 21.51 45.83 21.51 45.83 65.4 16 65.4 64 112.49 112 65.39 82.17 65.39" fill="#fff"/></svg>',
  phone: '<svg viewBox="0 0 20 20" width="15" height="15" fill="#056EB7" aria-hidden="true"><path d="M6.6 2.2a1.4 1.4 0 011.9.5l1.4 2.5a1.4 1.4 0 01-.35 1.75l-1.2.95a9.3 9.3 0 003.8 3.8l.95-1.2a1.4 1.4 0 011.75-.35l2.5 1.4a1.4 1.4 0 01.5 1.9l-1 1.7a2 2 0 01-2.3.9A15.2 15.2 0 013.9 5.8a2 2 0 01.9-2.3l1.8-1.3z"/></svg>',
  arrow: '<svg viewBox="0 0 14 14" width="13" height="13" fill="none" stroke="#056EB7" stroke-width="1.6" aria-hidden="true"><path d="M2 7h9M7.5 3.5L11 7l-3.5 3.5"/></svg>',
  chevronM: '<svg viewBox="0 0 10 10" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M1.5 3.5L5 7 8.5 3.5"/></svg>',
  burger: '<svg viewBox="0 0 20 20" width="36" height="36" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M2 5h16M2 10h16M2 15h16"/></svg>',
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

.bar{display:block;background:#1A1A1A;position:relative;z-index:2}
.bar-top{display:flex;align-items:center;height:72px;box-sizing:border-box}
.wrap{display:flex;align-items:center;justify-content:space-between;gap:20px;width:100%;max-width:1600px;margin:0 auto;padding:0 clamp(20px, 5vw, 80px);box-sizing:border-box}
.logo{display:block;flex:0 0 auto;width:158px;color:#fff}
.logo svg{display:block;width:100%;height:auto}
.logo img{display:block;width:100%;height:auto}
.tools{display:flex;align-items:center;gap:14px;flex:1 1 auto;justify-content:flex-end;min-width:0}

.field{display:flex;align-items:center;gap:8px;flex:0 1 340px;min-width:120px;height:36px;padding:0 16px;border:1px solid #C9CED4;border-radius:2px;background:#fff}
.field svg{flex:0 0 auto;order:2}
.field input{order:1;font-size:14px;min-width:0}
.field input{border:0;outline:0;width:100%;font:400 14px/1 'Wix Madefor Text',sans-serif;color:#333;background:none}
.field input::placeholder{color:#8A9099}
.quote{display:flex;align-items:center;justify-content:center;flex:0 0 auto;width:140px;height:36px;background:#FBBF13;border-radius:2px;font-family:'Wix Madefor Text',sans-serif;font-weight:700;font-size:15px;letter-spacing:.04em;text-transform:uppercase;color:#1A1A1A}
.quote:hover{background:#e6ad0c;color:#1A1A1A}

.burger{display:flex;align-items:center;justify-content:center;width:52px;height:52px;color:#fff;flex:0 0 auto;margin-right:-10px}

/* below real-phone widths, drop Get Quote from the top bar (it's always in
   the sheet footer too) so logo + field + burger never overflow */
@media (max-width:560px){
  .quote{display:none}
}

/* mobile sheet — the only navigation surface at every width: items, Get
   Quote, phone and open/closed status all live here */
.sheet{display:none;position:fixed;inset:0;width:100%;height:100%;max-width:none;max-height:none;margin:0;padding:0;border:0;background:#fff;color:#333;z-index:9999;flex-direction:column;overscroll-behavior:contain}
.sheet[open]{display:flex}
.sheet::backdrop{background:#fff}
.sheet-bar{display:flex;align-items:center;justify-content:space-between;height:72px;padding:0 20px;background:#1A1A1A;flex:0 0 auto}
.sheet-bar .logo{width:132px}
.sheet-x{display:flex;align-items:center;justify-content:center;width:44px;height:44px;margin-right:-10px;color:#fff}
.sheet-search{padding:16px 20px;flex:0 0 auto}
.sheet-search .field{width:100%;max-width:none;flex:1 1 auto;height:46px}
.sheet-search input{font-size:14px}
.tree{flex:1 1 auto;overflow-y:auto;-webkit-overflow-scrolling:touch;border-top:1px solid #EDEFF2}
.trow{display:flex;align-items:center;justify-content:space-between;width:100%;height:52px;padding:0 20px;border-bottom:1px solid #EDEFF2;font-weight:400;font-size:14px;color:#333;text-align:left}
.trow .tname{display:flex;align-items:center;flex:1 1 auto;height:100%;color:inherit}
.trow .tchev{display:flex;align-items:center;justify-content:center;width:52px;height:100%;margin-right:-20px;color:#5A6069;cursor:pointer}
.trow .tchev svg{transition:transform .12s ease}
.trow:has([aria-expanded="true"]){background:#F4F6F8;color:#056EB7}
.trow:has([aria-expanded="true"]) .tchev{color:#056EB7}
.trow:has([aria-expanded="true"]) .tchev svg{transform:rotate(180deg)}
.tsub{display:none;flex-direction:column;gap:8px;padding:14px 20px 16px;border-bottom:1px solid #EDEFF2}
.tsub[data-open]{display:flex}
.tlabel{font-weight:700;font-size:14px;line-height:1.2;letter-spacing:.08em;text-transform:uppercase;color:#056EB7;margin:0 0 4px}
.tsub .tlabel:not(:first-child){margin-top:6px}
.tlink{display:flex;align-items:center;gap:9px;min-height:22px;line-height:1.35;font-size:14px;color:#333}
.tlink[data-bold]{font-weight:700}
.sheet-foot{flex:0 0 auto;padding:20px 20px 24px}
.sheet-foot .quote{width:100%;justify-content:center;height:50px;font-size:14px}
.sheet-foot .status{display:flex;align-items:center;justify-content:center;gap:7px;margin:16px 0 0}
.sheet-foot .status .dot{flex:0 0 auto;width:8px;height:8px;border-radius:50%;background:#1E9E52}
.sheet-foot .status .state{font-weight:700;font-size:13px;color:#333}
.sheet-foot .status .until{font-weight:400;font-size:13px;color:#5A6069}
.sheet-foot .status[data-closed] .dot{background:#8A9099}
.sheet-foot .status[data-closed] .state{color:#5A6069}
.sheet-foot .tel{align-items:center;justify-content:center;margin:8px 0 0}
.sheet-foot .tel a{font-size:20px;color:#056EB7}
.sheet-foot .tel svg{display:none}
.tel{display:flex;align-items:baseline;gap:8px}
.tel a{flex:0 0 auto;font-weight:700;font-size:20px;line-height:1.1;color:#333}
.tel a:hover{color:#056EB7}
`;

/* ---------------------------------------------------------------- markup */

const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* Mobile sheet mirrors the old desktop panels exactly: the same groups in the
 * same order with the same rows, stacked in an accordion. Catalog rows carry
 * the document glyph. This is the ONLY place nav items render now. */
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

/* ---------------------------------------------------------------- element */

class AutojetNav extends HTMLElement {
  static get observedAttributes() { return ['logo-src', 'phone']; }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this._teardown();
    this._phone = this.getAttribute('phone') || PHONE;
    this.shadowRoot.innerHTML = this._render();

    try {
      this._wire();
    } catch (err) {
      console.error('autojet-nav: _wire() failed, menu interactions may be degraded', err);
    }

    clearInterval(this._statusTimer);
    this._statusTimer = setInterval(() => {
      const el = this.shadowRoot.querySelector('.sheet-foot .status');
      if (el) el.outerHTML = this._status();
    }, 60000);
  }

  disconnectedCallback() { clearInterval(this._statusTimer); this._teardown(); }

  _teardown() {
    if (this._onKey) document.removeEventListener('keydown', this._onKey);
    this._onKey = null;
  }

  attributeChangedCallback() { if (this.shadowRoot.childElementCount) this.connectedCallback(); }

  /* Business hours, America/Chicago. Mon-Fri 7:00am-5:00pm.
   * HOLIDAYS force a closed day; HALF_DAYS close at noon. Shown in the
   * sheet footer, not the top bar — the top bar now only carries logo,
   * search, Get Quote and the burger. */
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
    return `<style>${CSS}</style>
    <header class="bar">
      <div class="bar-top">
        <div class="wrap">
          ${this._logo()}
          <div class="tools">
            <form class="field" data-bar-search>${ICON.searchGray}<input type="search" placeholder="Search by Part, OE, or Model" aria-label="Search by Part, OE, or Model"></form>
            <a class="quote" href="${esc(this.getAttribute('quote-href') || '#')}">Get Quote</a>
          </div>
          <button class="burger" type="button" data-burger aria-label="Open menu" aria-expanded="false">${ICON.burger}</button>
        </div>
      </div>
    </header>
    <dialog class="sheet" data-sheet aria-label="Menu">
      <div class="sheet-bar">${this._logo()}<button class="sheet-x" type="button" data-close aria-label="Close menu">${ICON.close}</button></div>
      <div class="sheet-search"><form class="field" data-sheet-search>${ICON.searchGray}<input type="search" placeholder="Search by Part, OE, or Model" aria-label="Search by Part, OE, or Model"></form></div>
      <nav class="tree" aria-label="Main">${treeHTML(this._phone)}</nav>
      <div class="sheet-foot">
        <a class="quote" href="${esc(this.getAttribute('quote-href') || '#')}">Get Quote</a>
        ${this._status()}
        <div class="tel">${ICON.phone}<a href="tel:${this._phone.replace(/\D/g, '')}">${esc(this._phone)}</a></div>
      </div>
    </dialog>`;
  }

  _wire() {
    const root = this.shadowRoot;

    this._onKey = e => {
      if (e.key !== 'Escape') return;
      this._closeSheet();
    };
    document.addEventListener('keydown', this._onKey);

    // mobile sheet — the only nav surface now
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
    root.querySelectorAll('form[data-bar-search],form[data-sheet-search]').forEach(form => {
      form.addEventListener('submit', e => {
        e.preventDefault();
        const q = form.querySelector('input').value.trim();
        if (!q) return;
        const action = this.getAttribute('search-action') || '/parts';
        this.dispatchEvent(new CustomEvent('autojet-search', { detail: { query: q }, bubbles: true, composed: true }));
        window.location.href = `${action}?q=${encodeURIComponent(q)}`;
      });
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
