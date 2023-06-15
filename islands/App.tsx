import { useEffect, useMemo, useState } from "preact/hooks";
import confetti from "confetti";
import Denosaur from "../components/Denosaur.tsx";

function Drop() {
  const x = Math.random();
  const delay = Math.random();
  return (
    <div
      class="fixed w-px h-96 bg-white"
      style={{
        animationName: "rain-drop",
        animationDuration: "2s",
        animationDelay: 10 * delay + "s",
        animationIterationCount: "infinite",
        top: "-50rem",
        left: x * 100 + "%",
      }}
    >
    </div>
  );
}

function Rain() {
  const drops = useMemo(() => new Array(1000).fill(0).map(() => <Drop />), []);
  return (
    <div class="fixed w-full h-screen z-10 bg-black opacity-20">
      {drops}
    </div>
  );
}

function confettiRandom() {
  confetti({
    origin: {
      x: 0.8 * Math.random() + 0.2,
      y: 0.8 * Math.random() + 0.2,
    },
    angle: 90 * Math.random() + 45,
  });
}

export default (props: { count: number }) => {
  const [count, setCount] = useState(10000);
  const bc = useMemo(() => new BroadcastChannel("main"), []);
  useEffect(() => {
    bc.onmessage = (e) => {
      setCount((n) => n + 1);
      confettiRandom();
    };
    return () => {
      bc.close();
    };
  }, [bc]);
  return (
    <div class="flex w-full h-0 min-h-screen bg-gray-800 text-green-300 relative overflow-hidden">
      {new Array(Math.ceil(count / 100)).fill(0).map((_) => <Denosaur />)}
      {count >= 10000 && <Rain />}
      <div
        class="m-auto flex flex-col justify-center items-center z-20 bg-black rounded-xl bg-opacity-20 w-96 h-96"
        style={{ "backdrop-filter": "blur(1px)" }}
      >
        <p class="text-6xl font-bold">{count}</p>
        <p>/ 10000</p>
        <button
          class="border p-4 rounded mt-4"
          onClick={() => {
            fetch("/api/countup");
            setCount((n) => n + 1);
            bc.postMessage("countup");
            confettiRandom();
          }}
        >
          Count Up
        </button>
      </div>
    </div>
  );
};
