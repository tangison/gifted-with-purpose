/**
 * Route-level loading state. Skeletons mirror the real card geometry so the
 * swap to content causes no layout shift.
 */
export default function Loading() {
  return (
    <main id="main" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading</span>
      <section className="sec">
        <div className="wrap">
          <div className="sk sk-title" />
          <div className="sk sk-line" style={{ maxWidth: '46ch' }} />
          <div className="grid" style={{ marginTop: 28 }}>
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="card" key={i} aria-hidden="true">
                <div className="card-media">
                  <div className="ar sk" />
                </div>
                <div className="card-body">
                  <div className="sk sk-line" style={{ width: '72%' }} />
                  <div className="sk sk-line" style={{ width: '48%', height: 12 }} />
                  <div className="sk sk-line" style={{ width: '90%', height: 12 }} />
                  <div className="sk sk-btn" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
