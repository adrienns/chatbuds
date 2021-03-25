import React, { useEffect, useRef } from "react";

const ScrollToBottom = () => {
  const bottomEl = useRef();
  useEffect(() => bottomEl.current.scrollIntoView());
  return <div ref={bottomEl} />;
};

export default ScrollToBottom;
