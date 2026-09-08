'use client';

import Image from 'next/image';
import { useLightbox } from '@/components/LightboxProvider';
import { kidsDesigns, kidsDesignBlank, waDesignOrder } from '@/lib/catalog';

/**
 * The whole kids design library, on the Kids Selection page.
 *
 * The client's instruction (7 Sep): pressing Kids Selection must land on "the
 * images of the kids bottles all the designs". This is that surface, so the
 * collection page leads with it. Same conventions as KidsGallery next to it:
 * every cell renders at once (no "show more" that would hide designs), and a
 * tap opens the lightbox the layout already provides, with the WhatsApp
 * message naming the design and the item it fits.
 */
export default function KidsDesigns() {
  const { open } = useLightbox();

  return (
    <ul className="wg wg-contain kd-grid">
      {kidsDesigns.map((d, i) => {
        const b = kidsDesignBlank(d);
        return (
          <li key={d.id}>
            <button
              type="button"
              className="wg-cell"
              onClick={() =>
                open({
                  img: `/assets/designs/${d.file}.webp`,
                  title: d.name,
                  spec: `${d.id.toUpperCase()} · for the ${b ? b.short.toLowerCase() : 'kids item'}`,
                  wa: waDesignOrder({ design: d, blank: b }),
                })
              }
              aria-label={`View larger: ${d.alt}`}
            >
              <Image
                src={`/assets/designs/${d.file}@sm.webp`}
                alt={d.alt}
                width={d.sw}
                height={d.sh}
                sizes="(min-width:1100px) 240px, (min-width:600px) 31vw, 47vw"
                loading={i < 4 ? 'eager' : 'lazy'}
              />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
