"use client";

import {
  ArrowCounterClockwise,
  Pause,
  Play,
  Shuffle,
} from "@phosphor-icons/react";
import {
  useEffect,
  useRef,
  useState,
  type PointerEvent,
  type KeyboardEvent,
} from "react";
import type { Body, Constraint } from "matter-js";
import BrandIcon from "@/app/components/BrandIcon";
import { skillCategories } from "@/data/portfolio";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const tools = skillCategories.flatMap((category, group) =>
  category.skills.map((name) => ({ name, group })),
);
const tileSize = 44;
type PhysicsControls = {
  reset: () => void;
  shuffle: () => void;
  pause: (value: boolean) => void;
  grab: (index: number, x: number, y: number) => void;
  move: (x: number, y: number) => void;
  release: () => void;
  nudge: (index: number, x: number, y: number) => void;
};

export default function SkillPlayground() {
  const reduced = useReducedMotion();
  const tray = useRef<HTMLDivElement>(null);
  const tiles = useRef<(HTMLButtonElement | null)[]>([]);
  const controls = useRef<PhysicsControls | null>(null);
  const gesture = useRef({ x: 0, y: 0, moved: false, active: false });
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [activeTool, setActiveTool] = useState("");

  useEffect(() => {
    const container = tray.current;
    if (!container || reduced) return;
    container.dataset.physics = "waiting";
    let disposed = false;
    let cleanup = () => {};
    let visible = false;
    let wake = () => {};
    let initializing = false;
    const observer = new IntersectionObserver(
      (entries) => {
        visible = entries[0].isIntersecting;
        container.dataset.physics = visible ? "visible" : "offscreen";
        if (visible && !initializing) {
          initializing = true;
          void initialize().catch(() => {
            container.dataset.physics = "unavailable";
          });
        }
        wake();
      },
      { threshold: 0.05 },
    );

    async function initialize() {
      container!.dataset.physics = "loading";
      const { Engine, Bodies, Body, Composite, Constraint, Sleeping } =
        await import("matter-js");
      if (disposed || !container) return;
      const engine = Engine.create({ enableSleeping: true });
      engine.gravity.y = 1.15;
      let bodies: Body[] = [];
      let drag: Constraint | null = null;
      let frame = 0;
      let previous = 0;
      let stopped = false;

      const paint = () =>
        bodies.forEach((body, index) => {
          const tile = tiles.current[index];
          if (tile)
            tile.style.transform = `translate3d(${body.position.x - tileSize / 2}px,${body.position.y - tileSize / 2}px,0) rotate(${body.angle}rad)`;
        });
      const tick = (time: number) => {
        frame = 0;
        if (disposed || stopped || !visible || document.hidden) {
          previous = 0;
          return;
        }
        Engine.update(engine, Math.min(time - previous || 16.67, 33.33));
        previous = time;
        paint();
        if (drag || bodies.some((body) => !body.isSleeping))
          frame = requestAnimationFrame(tick);
        else previous = 0;
      };
      wake = () => {
        if (!frame && !stopped && visible && !document.hidden)
          frame = requestAnimationFrame(tick);
      };
      const reset = () => {
        Composite.clear(engine.world, false);
        drag = null;
        const width = container.clientWidth;
        const height = container.clientHeight;
        const columns = Math.max(1, Math.floor((width - 20) / (tileSize + 8)));
        bodies = tools.map((_, index) => {
          const body = Bodies.rectangle(
            30 + (index % columns) * (tileSize + 8),
            30 + Math.floor(index / columns) * (tileSize + 8),
            tileSize,
            tileSize,
            {
              restitution: 0.48,
              friction: 0.25,
              frictionAir: 0.018,
              chamfer: { radius: 8 },
              sleepThreshold: 70,
            },
          );
          Body.setAngle(body, (Math.random() - 0.5) * 0.3);
          return body;
        });
        Composite.add(engine.world, [
          ...bodies,
          Bodies.rectangle(width / 2, height + 30, width + 120, 60, {
            isStatic: true,
          }),
          Bodies.rectangle(-30, height / 2, 60, height * 3, { isStatic: true }),
          Bodies.rectangle(width + 30, height / 2, 60, height * 3, {
            isStatic: true,
          }),
          Bodies.rectangle(width / 2, -30, width + 120, 60, { isStatic: true }),
        ]);
        paint();
        wake();
      };
      controls.current = {
        reset,
        shuffle: () => {
          bodies.forEach((body) => {
            Sleeping.set(body, false);
            Body.setVelocity(body, {
              x: (Math.random() - 0.5) * 14,
              y: -7 - Math.random() * 8,
            });
            Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.25);
          });
          wake();
        },
        pause: (value) => {
          stopped = value;
          if (value) {
            if (frame) cancelAnimationFrame(frame);
            frame = 0;
            previous = 0;
          } else wake();
        },
        grab: (index, x, y) => {
          if (stopped) return;
          Sleeping.set(bodies[index], false);
          if (drag) Composite.remove(engine.world, drag);
          drag = Constraint.create({
            pointA: { x, y },
            bodyB: bodies[index],
            length: 0,
            stiffness: 0.16,
            damping: 0.1,
          });
          Composite.add(engine.world, drag);
          wake();
        },
        move: (x, y) => {
          if (drag) {
            drag.pointA = { x, y };
            wake();
          }
        },
        release: () => {
          if (drag) Composite.remove(engine.world, drag);
          drag = null;
          wake();
        },
        nudge: (index, x, y) => {
          if (stopped) return;
          Sleeping.set(bodies[index], false);
          Body.setVelocity(bodies[index], { x, y });
          Body.setAngularVelocity(bodies[index], 0.08);
          wake();
        },
      };
      reset();
      setReady(true);
      container.dataset.physics = "ready";
      const resize = new ResizeObserver(reset);
      resize.observe(container);
      document.addEventListener("visibilitychange", wake);
      cleanup = () => {
        resize.disconnect();
        document.removeEventListener("visibilitychange", wake);
        cancelAnimationFrame(frame);
        Composite.clear(engine.world, false);
        Engine.clear(engine);
        controls.current = null;
        tiles.current.forEach((tile) => {
          if (tile) tile.style.transform = "";
        });
      };
    }
    observer.observe(container);
    return () => {
      disposed = true;
      observer.disconnect();
      cleanup();
    };
  }, [reduced]);

  const point = (event: PointerEvent<HTMLButtonElement>) => {
    const rect = tray.current!.getBoundingClientRect();
    return {
      x: Math.max(
        tileSize / 2,
        Math.min(rect.width - tileSize / 2, event.clientX - rect.left),
      ),
      y: Math.max(
        tileSize / 2,
        Math.min(rect.height - tileSize / 2, event.clientY - rect.top),
      ),
    };
  };
  const grab = (event: PointerEvent<HTMLButtonElement>, index: number) => {
    if (paused || reduced || !controls.current) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const { x, y } = point(event);
    gesture.current = { x, y, moved: false, active: true };
    controls.current.grab(index, x, y);
  };
  const move = (event: PointerEvent<HTMLButtonElement>) => {
    if (!gesture.current.active) return;
    const { x, y } = point(event);
    if (Math.hypot(x - gesture.current.x, y - gesture.current.y) > 4)
      gesture.current.moved = true;
    controls.current?.move(x, y);
  };
  const release = () => {
    gesture.current.active = false;
    controls.current?.release();
  };
  const key = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const vectors: Record<string, [number, number]> = {
      ArrowLeft: [-6, -3],
      ArrowRight: [6, -3],
      ArrowUp: [0, -10],
      ArrowDown: [0, 6],
    };
    if (vectors[event.key]) {
      event.preventDefault();
      controls.current?.nudge(index, ...vectors[event.key]);
    }
  };

  return (
    <div className="skill-playground">
      <div className="playground-toolbar">
        <span className="micro-label">{activeTool || "Toolbox"}</span>
        <div>
          <button
            type="button"
            title={paused ? "Resume motion" : "Pause motion"}
            aria-label={paused ? "Resume motion" : "Pause motion"}
            disabled={reduced || !ready}
            onClick={() => {
              controls.current?.release();
              controls.current?.pause(!paused);
              setPaused(!paused);
            }}
          >
            {paused ? <Play size={16} /> : <Pause size={16} />}
          </button>
          <button
            type="button"
            title="Shuffle tools"
            aria-label="Shuffle tools"
            disabled={reduced || paused || !ready}
            onClick={() => controls.current?.shuffle()}
          >
            <Shuffle size={17} />
          </button>
          <button
            type="button"
            title="Reset tools"
            aria-label="Reset tools"
            disabled={reduced || !ready}
            onClick={() => controls.current?.reset()}
          >
            <ArrowCounterClockwise size={17} />
          </button>
        </div>
      </div>
      <div
        ref={tray}
        className="tool-tray"
        data-ready={ready && !reduced}
        data-paused={paused || reduced}
      >
        {tools.map((tool, index) => (
          <button
            key={tool.name}
            type="button"
            ref={(element) => {
              tiles.current[index] = element;
            }}
            className={`physics-tool tool-group-${tool.group}`}
            aria-label={tool.name}
            title={tool.name}
            onFocus={() => setActiveTool(tool.name)}
            onPointerEnter={() => setActiveTool(tool.name)}
            onPointerDown={(event) => grab(event, index)}
            onPointerMove={move}
            onPointerUp={release}
            onPointerCancel={release}
            onLostPointerCapture={release}
            onKeyDown={(event) => key(event, index)}
            onClick={() => {
              if (!gesture.current.moved)
                controls.current?.nudge(index, (Math.random() - 0.5) * 8, -10);
              gesture.current.moved = false;
            }}
          >
            <BrandIcon name={tool.name} className="h-5 w-5" />
          </button>
        ))}
      </div>
    </div>
  );
}
