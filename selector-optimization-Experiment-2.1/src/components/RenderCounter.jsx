import { useRef } from "react";

function RenderCounter() {
  const renderCount = useRef(0);

  renderCount.current++;

  return (
    <div className="render-box">
      <h3>Component Render Count</h3>

      <h1>{renderCount.current}</h1>

      <p>
        If the selector is memoized correctly,
        this number should increase only when
        necessary.
      </p>
    </div>
  );
}

export default RenderCounter;