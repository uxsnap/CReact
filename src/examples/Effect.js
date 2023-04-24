import { useEffect, useState } from "../main/hooks";
import { createElement  } from "../main/render";

export const Effect = () => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    document.title = `Current conut: ${count}`;

    if (count > 0 && !started) {
      setStarted(true);
    }
  }, [count, started]);

  return (
    <div>
      Count: {count}
      <button onClick={() => setCount(count + 1)}>Increment</button>

      {started && <div>started!</div>}
    </div>
  );
};