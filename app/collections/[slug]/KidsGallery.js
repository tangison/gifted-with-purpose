'use client';

import Image from 'next/image';
import { useLightbox } from '@/components/LightboxProvider';
import { kidsWork, kidsWorkBlank, waKidsPhoto } from '@/lib/catalog';

/**
 * Every flip-top bottle and sippy cup we have photographed, in one grid.
 *
 * All of them render at once. There is deliberately no "show more" control:
 * the client asked for all of the photos to be on the page, and a collapsed
 * gallery would defeat that while still technically containing them.
 *
 * Tapping a photo opens the lightbox that already exists in the layout, so
 * this adds a surface rather than a second lightbox implementation.
 */
export default function KidsGallery() {
  const { open } = useLightbox();

  return (
    <ul className="wg wg-contain">
      {kidsWork.map((w, i) => {
        const b = kidsWorkBlank(w);
        return (
          <li key={w.id}>
            <button
              type="button"
              className="wg-cell"
              onClick={() =>
                open({
                  img: `/assets/work/${w.file}.webp`,
                  title: b ? b.name : 'Kids item',
                  spec: w.alt,
                  wa: waKidsPhoto(w),
                })
              }
              aria-label={`View larger: ${w.alt}`}
            >
              <Image
                src={`/assets/work/${w.file}@sm.webp`}
                alt={w.alt}
                width={w.sw}
                height={w.sh}
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
