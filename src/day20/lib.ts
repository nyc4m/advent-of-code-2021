import { Collections } from "../../deps.ts";

export class Picture {
  private constructor(
    private readonly pixels: string[],
    readonly width = 10,
    readonly height = 10,
  ) {}

  get litPixels(): number {
    return this.pixels.reduce((sum, pixel) => sum + (pixel === "." ? 0 : 1), 0);
  }

  static from(lines: string[]) {
    return new Picture(
      lines.flatMap((line) => [...line].map((i) => i)),
      lines[0].length,
      lines.length,
    );
  }

  pad(): Picture {
    return new Picture(
      [
        ...Array((this.width + 4) * 2).fill("."),
        ...Collections.chunk(this.pixels, this.width).map(
          (line) => [".", ".", ...line, ".", "."],
        ).reduce((arr, line) => [...arr, ...line], []),
        ...Array((this.width + 4) * 2).fill("."),
      ],
      this.width + 4,
      this.height + 4,
    );
  }

  get(y: number, x: number): string {
    return this.pixels[y * this.width + x];
  }

  private *adjacentPixels(y: number, x: number) {
    yield* [this.get(y - 1, x - 1), this.get(y - 1, x), this.get(y - 1, x + 1)];
    yield* [this.get(y, x - 1), this.get(y, x), this.get(y, x + 1)];
    yield* [this.get(y + 1, x - 1), this.get(y + 1, x), this.get(y + 1, x + 1)];
  }

  getIndex(y: number, x: number): number {
    const index = [];
    for (const pixel of this.adjacentPixels(y, x)) {
      index.push(pixel === "." ? "0" : "1");
    }
    return parseInt(index.join(""), 2);
  }

  refinePic(enhancement: string): Picture {
    const newRawPic = [];
    const expanded = this.pad();
    for (let y = 1; y < expanded.height - 1; y++) {
      for (let x = 1; x < expanded.width - 1; x++) {
        newRawPic.push(enhancement.charAt(expanded.getIndex(y, x)));
      }
    }
    return Picture.from(
      Collections.chunk(newRawPic, expanded.width - 2)
        .flatMap(
          (line) => line.join(""),
        ).slice(1, -1),
    );
  }

  toString() {
    const pic = [];
    for (let row = 0; row < this.height; row++) {
      const line = [];
      for (let col = 0; col < this.width; col++) {
        line.push(this.get(row, col));
      }
      pic.push(line.join(""));
    }
    return pic.join("\n");
  }
}
