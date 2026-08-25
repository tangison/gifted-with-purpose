import blanksData from '@/data/blanks.json';
import designsData from '@/data/designs.json';
import workData from '@/data/work.json';
import shapesData from '@/data/shapes.json';
import { brand } from '@/lib/site';

/**
 * The join between the two halves of the catalogue.
 *
 * The business is: FEW blanks (priced) x MANY designs (free choice).
 * Nothing here invents a price. A blank with price null stays null all the
 * way to the page, which renders "Price on request".
 */

export const blanks = [...blanksData.items].sort((a, b) => a.order - b.order);

/**
 * Round-robin the three source batches.
 *
 * In file order the library opens with 30 near-identical flip-top bottles,
 * which makes 141 designs look like 3. Interleaving is deterministic, so
 * the server and client render the same list.
 */
function interleave(items) {
  const buckets = new Map();
  for (const i of items) {
    if (!buckets.has(i.group)) buckets.set(i.group, []);
    buckets.get(i.group).push(i);
  }
  const order = ['design', 'sippy', 'fliptop'].filter((g) => buckets.has(g));
  for (const g of buckets.keys()) if (!order.includes(g)) order.push(g);
  const out = [];
  for (let n = 0; out.length < items.length; n += 1) {
    for (const g of order) {
      const b = buckets.get(g);
      if (n < b.length) out.push(b[n]);
    }
  }
  return out;
}

export const designs = interleave(designsData.items);
export const designThemes = designsData.themes;
export const designsNote = designsData.note;

export const blankById = (id) => blanks.find((b) => b.id === id);
export const designById = (id) => designs.find((d) => d.id === id);

/**
 * Blanks that can carry this design.
 *
 * The item the artwork was actually drawn for comes first, because that is
 * what someone clicking a sippy-cup wrap means. Everything else follows
 * cheapest first, with unpriced items last.
 */
export function blanksForDesign(design) {
  const list = blanks.filter((b) => b.accepts.includes(design.group));
  const drawnFor = (b) => (b.id === design.drawn_for ? 0 : 1);
  return list.sort((a, b) => {
    const d = drawnFor(a) - drawnFor(b);
    if (d !== 0) return d;
    if (a.price == null && b.price == null) return a.order - b.order;
    if (a.price == null) return 1;
    if (b.price == null) return -1;
    return a.price - b.price;
  });
}

/** Designs that can go on this blank. */
export function designsForBlank(blank) {
  return designs.filter((d) => blank.accepts.includes(d.group));
}

/** Lowest published price across the blanks this design fits. Null if none are priced. */
export function priceFromDesign(design) {
  const priced = blanksForDesign(design)
    .map((b) => b.price)
    .filter((p) => typeof p === 'number');
  return priced.length ? Math.min(...priced) : null;
}

export function money(n) {
  return `${brand.currency}${Number(n).toFixed(2)}`;
}

/** Price label for a blank. Never guesses. */
export function blankPriceLabel(b) {
  return b.price == null ? 'Price on request' : money(b.price);
}

/** "From N$120" for a design, or the honest fallback. */
export function fromLabel(design) {
  const p = priceFromDesign(design);
  return p == null ? 'Price on request' : `From ${money(p)}`;
}

export const isLicensed = (d) => d.licensed === true;

/** Designs safe for marketing surfaces: no third-party characters or brands. */
export const marketingSafe = () => designs.filter((d) => !d.licensed);

/** Substring search over name, alt text and themes. */
export function searchDesigns(list, q) {
  const term = q.trim().toLowerCase();
  if (!term) return list;
  const words = term.split(/\s+/);
  return list.filter((d) => {
    const hay = `${d.name} ${d.alt} ${d.themes.join(' ')} ${d.id}`.toLowerCase();
    return words.every((w) => hay.includes(w));
  });
}

/** Same group first, then shared themes. Never returns the design itself. */
export function relatedDesigns(design, n = 6) {
  const scored = designs
    .filter((d) => d.id !== design.id)
    .map((d) => {
      const shared = d.themes.filter((t) => design.themes.includes(t)).length;
      return { d, score: shared * 2 + (d.group === design.group ? 1 : 0) };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || a.d.id.localeCompare(b.d.id));
  return scored.slice(0, n).map((x) => x.d);
}

export const themeLabels = {
  affirmations: 'Affirmations',
  faith: 'Faith',
  afrikaans: 'Afrikaans',
  kids: 'Kids',
  school: 'School',
  characters: 'Characters',
  floral: 'Floral',
  personalised: 'Name on it',
  photo: 'Your photo',
  teacher: 'Teacher',
  selfcare: 'Self-care',
  retro: 'Retro',
  animals: 'Animals',
  vehicles: 'Cars and trucks',
  family: 'Family',
  friendship: 'Friendship',
  occasions: 'Birthdays',
  work: 'Work',
  sport: 'Sport',
  namibia: 'Namibia',
  fun: 'Fun',
  recipes: 'Recipes',
  abstract: 'Abstract',
  brands: 'Brands',
};

export const themeLabel = (t) => themeLabels[t] || t;

/** WhatsApp message for a design on a chosen blank. */
export function waDesignOrder({ design, blank, name, note, qty = 1 }) {
  const lines = [`Hi Gifted with Purpose, I would like to order:`, ''];
  lines.push(`Design: ${design.name} (${design.id.toUpperCase()})`);
  if (blank) {
    lines.push(`Item: ${blank.name}`);
    lines.push(`Price: ${blank.price == null ? 'please confirm' : money(blank.price)} each`);
  } else {
    lines.push(`Item: still deciding, please advise`);
  }
  if (qty && Number(qty) > 1) lines.push(`Quantity: ${qty}`);
  if (name) lines.push(`Name to print: ${name}`);
  if (note) lines.push(`Note: ${note}`);
  return `https://wa.me/${brand.wa_number}?text=${encodeURIComponent(lines.join('\n'))}`;
}

/* ------------------------------------------------------------------ *
 * The blank range.
 *
 * These are the unprinted containers themselves, as supplied. Every
 * spec comes from the supplier's live product page, matched to the SKU
 * printed on the photographs the client sent. None of them has a
 * confirmed selling price, so every one of them reads "Price on
 * request" and there is no code path here that can produce a number.
 * ------------------------------------------------------------------ */

export const shapes = [...shapesData.shapes].sort((a, b) => a.order - b.order);
export const shapesNote = shapesData.note;
export const shapesSource = shapesData.source;

export const shapeById = (id) => shapes.find((s) => s.id === id);

export const familyLabels = {
  mug: 'Mugs',
  tumbler: 'Tumblers',
  can: 'Cans',
  kids: 'Kids',
};

export const familyLabel = (f) => familyLabels[f] || f;

/** Shapes grouped by family, in range order, families in first-seen order. */
export function shapesByFamily() {
  const out = [];
  for (const s of shapes) {
    let g = out.find((x) => x.family === s.family);
    if (!g) {
      g = { family: s.family, label: familyLabel(s.family), items: [] };
      out.push(g);
    }
    g.items.push(s);
  }
  return out;
}

/** Designs that can be printed on this blank shape. */
export function designsForShape(shape) {
  return designs.filter((d) => shape.accepts.includes(d.group));
}

/**
 * The priced item in the range that is closest to this blank shape.
 *
 * This is a navigation aid only, never a price claim: it links a blank
 * to the catalogue item it most resembles so someone looking at a
 * shape can reach something they can actually order today. It returns
 * null when there is no honest match, and the caller must still print
 * the shape's own "Price on request".
 */
const NEAREST = {
  sb8000: 'mug-11oz',
  sb8005: 'tumbler-20oz',
  sb859: 'tumbler-20oz',
  sb8072: 'tumbler-20oz',
  sb889: 'can-tumbler',
  sb890: 'can-tumbler',
  sb856: 'kids-fliptop',
  sb893: 'sippy-cup',
};

export function nearestItem(shape) {
  const id = NEAREST[shape.id];
  return id ? blankById(id) || null : null;
}

/** Blank shapes whose nearest catalogue item is this one. */
export function shapesForBlank(blank) {
  return shapes.filter((s) => NEAREST[s.id] === blank.id);
}

/** Shapes in the same family, excluding the one given. */
export function relatedShapes(shape, n = 3) {
  const same = shapes.filter((s) => s.id !== shape.id && s.family === shape.family);
  if (same.length >= n) return same.slice(0, n);
  const rest = shapes.filter((s) => s.id !== shape.id && s.family !== shape.family);
  return [...same, ...rest].slice(0, n);
}

/** WhatsApp enquiry for a blank shape. Always an enquiry, never an order total. */
export function waShapeEnquiry(shape) {
  const lines = [
    'Hi Gifted with Purpose, I am asking about a blank container:',
    '',
    `Item: ${shape.name}`,
    `Supplier code: ${shape.sku_label}`,
    `Size: ${shape.capacity}`,
    '',
    'Could you please confirm the price and whether you have it in stock?',
  ];
  return `https://wa.me/${brand.wa_number}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export const counts = {
  designs: designs.length,
  blanks: blanks.length,
  priced: blanks.filter((b) => b.price != null).length,
  shapes: shapes.length,
};

/* ---------- finished work ---------- */

export const work = workData.items;
export const workNote = workData.note;
export const workWithheld = workData.withheld;

export const workTags = [...new Set(work.flatMap((w) => w.tags))].sort(
  (a, b) =>
    work.filter((w) => w.tags.includes(b)).length -
    work.filter((w) => w.tags.includes(a)).length
);

/** Photos safe for hero and marketing surfaces: no third-party characters or brands. */
export const workMarketingSafe = () => work.filter((w) => !w.licensed);

export const blankPhoto = (b) => (b.blank_photo ? `/assets/blanks/${b.blank_photo}.webp` : null);

/**
 * Sitewide LocalBusiness priceRange, derived rather than typed.
 *
 * This was hardcoded as "N$150 - N$250" and was wrong: the cheapest
 * confirmed item in the catalogue is the N$120 mug, so the schema was
 * telling search engines the floor was N$30 higher than it is. Deriving
 * it means it cannot drift out of step with blanks.json again.
 */
const _pricedBlanks = blanks.map((b) => b.price).filter((p) => typeof p === 'number');
export const priceRange = `${brand.currency}${Math.min(..._pricedBlanks)} - ${brand.currency}${Math.max(
  ..._pricedBlanks,
)}`;
