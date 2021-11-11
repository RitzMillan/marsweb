import { useRef, useEffect, useState } from "react";
import "./Cursor1.scss";

const Cursor = () => {
  const delay = 7;

  const dot = useRef(null);
  const dotOutline = useRef(null);

  const cursorVisible = useRef(true);
  const cursorEnlarged = useRef(false);

  const endX = useRef(window.innerWidth / 2);
  const endY = useRef(50);
  const _x = useRef(0);
  const _y = useRef(0);

  const requestRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", mouseOverEvent);
    document.addEventListener("mouseup", mouseOutEvent);
    document.addEventListener("mousemove", mouseMoveEvent);
    document.addEventListener("mouseenter", mouseEnterEvent);
    document.addEventListener("mouseleave", mouseLeaveEvent);
    // handleScroll();
    animateDotOutline();

    return () => {
      document.removeEventListener("mousedown", mouseOverEvent);
      document.removeEventListener("mouseup", mouseOutEvent);
      document.removeEventListener("mousemove", mouseMoveEvent);
      document.removeEventListener("mouseenter", mouseEnterEvent);
      document.removeEventListener("mouseleave", mouseLeaveEvent);

      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const toggleCursorVisibility = () => {
    if (cursorVisible.current) {
      dot.current.style.opacity = 1;
      dotOutline.current.style.opacity = 1;
    } else {
      dot.current.style.opacity = 0;
      dotOutline.current.style.opacity = 0;
    }
  };

  const toggleCursorSize = () => {
    if (cursorEnlarged.current) {
      dot.current.style.transform = "translate(-50%, -50%) scale(0.75)";
      dotOutline.current.style.transform = "translate(-50%, 0%) scale(1.5)";
    } else {
      dot.current.style.transform = "translate(-50%, -50%) scale(1)";
      dotOutline.current.style.transform = "translate(-50%, 0%) scale(1)";
    }
  };

  //   Links file
  const mouseOverEvent = () => {
    cursorEnlarged.current = true;
    toggleCursorSize();
  };

  //   Links file
  const mouseOutEvent = () => {
    cursorEnlarged.current = false;
    toggleCursorSize();
  };

  const mouseEnterEvent = () => {
    cursorVisible.current = true;
    toggleCursorVisibility();
  };

  const mouseLeaveEvent = () => {
    cursorVisible.current = false;
    toggleCursorVisibility();
  };

  const mouseMoveEvent = (e) => {
    cursorVisible.current = true;
    toggleCursorVisibility();

    endX.current = e.pageX;
    endY.current = e.pageY;

    dot.current.style.top = endY.current + "px";
    dot.current.style.left = endX.current + "px";
  };

  const animateDotOutline = () => {
    _x.current += (endX.current - _x.current) / delay;
    _y.current += (endY.current - _y.current) / delay;

    dotOutline.current.style.top = _y.current + "px";
    dotOutline.current.style.left = _x.current + "px";

    requestRef.current = requestAnimationFrame(animateDotOutline);
  };

  //   ***********************************************************************************

  // const handleScroll = () => {
  //   if (!dotOutline.current) return;

  //   let box = document.querySelector(".cursor-dot-outline");
  //   let boxBoundingRect = box.getBoundingClientRect();
  //   let boxCenter = {
  //     x: boxBoundingRect.left + boxBoundingRect.width / 2,
  //     y: boxBoundingRect.top,
  //   };

  //   document.addEventListener("mousemove", (e) => {
  //     let angle =
  //       Math.atan2(e.pageX - boxCenter.x, -(e.pageY - boxCenter.y)) *
  //       (180 / Math.PI);
  //     box.style.transform = `rotate(${angle}deg)`;
  //   });
  // };
  //   ***********************************************************************************

  return (
    <>
      <div ref={dotOutline} className="cursor-dot-outline"></div>
      <div ref={dot} className="cursor-dot"></div>
    </>
  );
};

export default Cursor;
