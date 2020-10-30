/**
 * A list with all numbers in range (from, to)
 */
export const range = (...args: number[]) =>
  args.length > 1 && args[1] < args[0]
    ? []
    : Array(
        args.length > 1
          ? Math.round((args[1] - args[0]) / (args.length > 2 ? args[2] : 1))
          : args[0]
      )
        .fill(null)
        .map((_, i) =>
          args.length > 1 ? args[0] + (args.length > 2 ? args[2] : 1) * i : i
        );
