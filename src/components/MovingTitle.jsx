import { Card } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import "../assets/styles.css";

function MovingTitle({ title }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const textEl = textRef.current;

    //set timeout per far si che tutti gli elementi siano presenti e misurabili, altrimenti non funziona >.>''
    const timer = setTimeout(() => {
      if (container && textEl) {
        setShouldScroll(textEl.scrollWidth > container.clientWidth);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [title]);

  return (
    <Card.Title>
      <div className="movingTitle" ref={containerRef}>
        <span className={shouldScroll ? "marquee-hover" : ""} ref={textRef}>
          {title}
        </span>
      </div>
    </Card.Title>
  );
}

export default MovingTitle;
