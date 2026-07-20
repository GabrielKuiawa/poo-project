import { vi } from "vitest";

let intersectionObservers: MockIntersectionObserver[] = [];

export class MockIntersectionObserver implements IntersectionObserver {
  readonly root = null;
  readonly rootMargin: string;
  readonly scrollMargin: string;
  readonly thresholds: readonly number[];
  private readonly callback: IntersectionObserverCallback;
  private readonly targets = new Set<Element>();

  constructor(
    callback: IntersectionObserverCallback,
    options: IntersectionObserverInit = {},
  ) {
    this.callback = callback;
    this.rootMargin = options.rootMargin ?? "0px";
    this.scrollMargin = options.scrollMargin ?? "0px";
    this.thresholds = Array.isArray(options.threshold)
      ? options.threshold
      : [options.threshold ?? 0];
    intersectionObservers.push(this);
  }

  disconnect(): void {
    this.targets.clear();
  }

  observe(target: Element): void {
    this.targets.add(target);
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve(target: Element): void {
    this.targets.delete(target);
  }

  trigger(isIntersecting = true): void {
    const entries = [...this.targets].map(
      (target) =>
        ({
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRatio: isIntersecting ? 1 : 0,
          intersectionRect: target.getBoundingClientRect(),
          isIntersecting,
          rootBounds: null,
          target,
          time: performance.now(),
        }) satisfies IntersectionObserverEntry,
    );

    this.callback(entries, this);
  }
}

export class MockResizeObserver implements ResizeObserver {
  private readonly callback: ResizeObserverCallback;

  constructor(callback: ResizeObserverCallback) {
    this.callback = callback;
  }

  disconnect(): void {}

  observe(target: Element): void {
    const targetRect = target.getBoundingClientRect();
    this.callback(
      [
        {
          borderBoxSize: [],
          contentBoxSize: [],
          contentRect: DOMRectReadOnly.fromRect({
            height: targetRect.height,
            width: 1024,
            x: targetRect.x,
            y: targetRect.y,
          }),
          devicePixelContentBoxSize: [],
          target,
        },
      ],
      this,
    );
  }

  unobserve(): void {}
}

export function installBrowserObserverMocks(): void {
  vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
  vi.stubGlobal("ResizeObserver", MockResizeObserver);
}

export function resetBrowserObserverMocks(): void {
  intersectionObservers = [];
}

export function getLatestIntersectionObserver(): MockIntersectionObserver {
  const observer = intersectionObservers.at(-1);
  if (!observer) {
    throw new Error("Expected an IntersectionObserver to have been created.");
  }

  return observer;
}
