'use client';

/**
 * Progressive disclosure via native <details>. No JS state, no library.
 * Per widget-master: secondary detail waits behind an interaction; the hero,
 * the primary CTA and the one unmissable fact stay visible.
 */
export default function Disclosure({ summary, children, className = '' }) {
  return (
    <details className={`disc ${className}`.trim()}>
      <summary>
        <span>{summary}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <div className="disc-body">{children}</div>
    </details>
  );
}
