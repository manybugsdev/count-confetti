import clsx from "clsx";
import { useEffect, useState } from "preact/hooks";

export default () => {
  const [x, setX] = useState(Math.random());
  const [y, setY] = useState(Math.random());
  const [right, setRight] = useState(false);
  const [moving, setMoving] = useState(false);
  useEffect(() => {
    function tick() {
      const nx = Math.random();
      setX((x) => {
        setRight(nx > x);
        return nx;
      });
      setY(Math.random());
      setMoving(true);
      setTimeout(() => setMoving(false), 5000);
      setTimeout(tick, 5000 * Math.random() + 5000);
    }
    setTimeout(tick, 5000 * Math.random());
  }, []);
  return (
    <svg
      class={clsx("denosaur", {
        "moving": moving,
      })}
      width="32"
      height="32"
      style={{
        position: "absolute",
        left: (x * 100) + "%",
        top: (y * 100) + "%",
        transform: `scaleX(${right ? -1 : 1})`,
        transitionProperty: "top, left",
        transitionDuration: "5s",
        transitionTimingFunction: "linear",
      }}
      viewBox="0,0,128,128"
      fill="white"
    >
      <ellipse cx="24" cy="24" rx="24" ry="18" />
      <rect
        x="8"
        y="28"
        width="32"
        height="64"
        transform="rotate(-15)"
      />

      <ellipse cx="64" cy="84" rx="44" ry="38" />
      <path d="M 90 62 q 40 60 38 60 q -60 0 -60 -40 z" />
      <rect
        x="32"
        y="72"
        width="18"
        height="56"
        rx="8"
        ry="8"
        class="front-leg"
      />
      <rect
        x="76"
        y="72"
        width="18"
        height="56"
        rx="8"
        ry="8"
        class="behind-leg"
      />
      <circle cx="24" cy="18" r="4" fill="black" />
    </svg>
  );
};
