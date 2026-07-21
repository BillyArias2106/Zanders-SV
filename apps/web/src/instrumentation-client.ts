if (typeof performance !== "undefined") {
  const guardedPerformance = performance as Performance & {
    __cmsProfessionalMeasureGuard?: boolean;
  };

  if (
    typeof guardedPerformance.measure === "function" &&
    !guardedPerformance.__cmsProfessionalMeasureGuard
  ) {
    const originalMeasure = guardedPerformance.measure.bind(guardedPerformance);

    Object.defineProperty(guardedPerformance, "__cmsProfessionalMeasureGuard", {
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
