/*
 * Full-viewport scanline overlay + vignette.
 * Both layers are styled in globals.css. Scanline opacity is driven by
 * --scanline-opacity (scrubbed by GSAP); vignette is static.
 */
export default function ScanlineOverlay() {
  return (
    <>
      <div className="vignette" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
    </>
  );
}
