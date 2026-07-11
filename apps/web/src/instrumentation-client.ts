if (typeof performance !== "undefined") {
  const guardedPerformance = performance as Performance & {
    __zanderMeasureGuard?: boolean;
  };

  if (
    typeof guardedPerformance.measure === "function" &&
    !guardedPerformance.__zanderMeasureGuard
  ) {
    const originalMeasure = guardedPerformance.measure.bind(guardedPerformance);

    Object.defineProperty(guardedPerformance, "__zanderMeasureGuard", {
      configurable: false,
      enumerable: false,
      value: true,
    });

    guardedPerformance.measure = ((...args: unknown[]) => {
      try {
        return originalMeasure(...(args as [string, never, never]));
      } catch (error) {
        const message =
          error && typeof error === "object" && "message" in error
            ? String(error.message)
            : "";

        if (message.includes("cannot have a negative time stamp")) {
          return undefined;
        }

        throw error;
      }
    }) as Performance["measure"];
  }
}
