import blanksData from '@/data/blanks.json';
import designsData from '@/data/designs.json';
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

export const counts = {
  designs: designs.length,
  blanks: blanks.length,
  priced: blanks.filter((b) => b.price != null).length,
};
