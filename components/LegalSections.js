'use client';

import { Children, isValidElement } from 'react';

/**
 * Splits long-form legal copy into disclosures keyed on each h2, so the page
 * reads as a scannable contents list rather than a wall of policy text.
 * The first section stays open so the page never opens fully collapsed.
 */
export default function LegalSections({ children }) {
  const nodes = Children.toArray(children);
  const groups = [];
  let current = null;

  for (const node of nodes) {
    if (isValidElement(node) && node.type === 'h2') {
      if (current) groups.push(current);
      current = { heading: node.props.children, body: [] };
    } else if (current) {
      current.body.push(node);
    } else {
      groups.push({ heading: null, body: [node] });
    }
  }
  if (current) groups.push(current);

  return (
    <>
      {groups.map((g, i) =>
        g.heading == null ? (
          <div key={i}>{g.body}</div>
        ) : (
          <details className="legal-sec" key={i} open={i <= 1}>
            <summary>
              <h2>{g.heading}</h2>
              <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </summary>
            <div className="legal-sec-body">{g.body}</div>
          </details>
        )
      )}
    </>
  );
}
