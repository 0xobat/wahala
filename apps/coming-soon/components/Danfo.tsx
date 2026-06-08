/*
 * The Danfo bus — pure CSS art assembled from positioned divs.
 * All visual logic lives in globals.css under `.danfo`.
 * Index 4 is the empty "YOU?" seat (left of centre).
 */

const WIN_COUNT = 6;
const EMPTY_IDX = 4;

export default function Danfo() {
  return (
    <div
      className="danfo"
      role="img"
      aria-label="WAHALA Transit danfo bus with five passengers and one empty seat marked 'YOU?'"
    >
      <div className="exhaust" />
      <div className="chassis" />
      <div className="hood" />
      <div className="cabin" />
      <div className="placard">WAHALA TRANSIT · DEST. SUMMER ’26</div>
      <div className="stripe" />
      <div className="windows">
        {Array.from({ length: WIN_COUNT }).map((_, i) =>
          i === EMPTY_IDX ? (
            <div className="win empty" key={i}>
              <span className="caret-tall" />
              <span className="you-label">YOU?</span>
            </div>
          ) : (
            <div className="win" key={i}>
              <div className="passenger">
                <div className="head" />
                <div className="body" />
              </div>
            </div>
          )
        )}
      </div>
      <div className="door-board" />
      <div className="door-driver" />
      <div className="headlight" />
      <div className="taillight" />
      <div className="wheel back" />
      <div className="wheel front" />
    </div>
  );
}
