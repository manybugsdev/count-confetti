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
    <div class="fixed w-full h-screen-d z-10 bg-black opacity-20">
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
  const [count, setCount] = useState(props.count);
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
  function onClick() {
    fetch("/api/count", {
      method: "POST",
      body: JSON.stringify(count + 1),
    }).then((res) => {
      if (res.ok) {
        res.json().then((c) => {
          setCount((n) => c > n ? c : n);
        });
      }
    });
    setCount((n) => n + 1);
    bc.postMessage("countup");
    confettiRandom();
  }
  return (
    <div class="flex w-full h-screen-d bg-gray-800 text-green-300 relative overflow-hidden">
      {new Array(Math.ceil(count / 100)).fill(0).map((_) => <Denosaur />)}
      {count >= 10000 && <Rain />}
      <div
        class="m-auto flex flex-col justify-center items-center z-20 bg-black rounded-xl bg-opacity-80 w-96 h-96 select-none cursor-pointer"
        onClick={onClick}
      >
        <p class="text-6xl font-bold">{count}</p>
        <p>/ 10000</p>
        <button class="border p-4 rounded mt-4 select-none">
          Count Up
        </button>
      </div>
    </div>
  );
};
