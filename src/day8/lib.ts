export function parseSegments(
  input: ReadonlyArray<string>
): Record<"signalPatterns" | "outputDigits", string[]>[] {
  const trimAndSplit: (s: string) => string[] = (s) => s.trim().split(" ");
  const signalsAndOutput = input.map((i) => {
    const [signals, output] = i.split("|");
    return {
      signalPatterns: trimAndSplit(signals),
      outputDigits: trimAndSplit(output),
    };
  });
  return signalsAndOutput;
}
