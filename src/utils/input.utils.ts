type Operation<INPUT, OUTPUT> = (arg: INPUT) => OUTPUT;

export function readInputFor(inputName: `day${number}`): Promise<string>;

export function readInputFor<A>(
  inputName: `day${number}`,
  op1: Operation<string, A>
): Promise<A>;

export function readInputFor<A, B>(
  inputName: `day${number}`,
  op1: Operation<string, A>,
  op2: Operation<A, B>
): Promise<B>;

export function readInputFor<A, B, C>(
  inputName: `day${number}`,
  op1: Operation<string, A>,
  op2: Operation<A, B>,
  op3: Operation<B, C>
): Promise<C>;

export async function readInputFor<A, B, C>(
  inputName: `day${number}`,
  op1?: Operation<string, A>,
  op2?: Operation<A, B>,
  op3?: Operation<B, C>
) {
  try {
    const content = await Deno.readTextFile(`./inputs/${inputName}`);
    if (op1 && !op2) return op1(content);
    else if (op1 && op2 && !op3) return op2(op1(content));
    else if (op1 && op2 && op3) return op3(op2(op1(content)));
    else return content;
  } catch {
    throw new Error("The input for day1 cannot be found");
  }
}

export function splitByLines(content: string): string[] {
  return content.split("\n");
}

export function mapToNumbers(numbers: readonly string[]): number[] {
  return numbers.map((n) => {
    const parsed = Number(n);
    if (Number.isNaN(parsed)) {
      throw new Error(`'${n}' is not a number, please verify the input`);
    }
    return parsed;
  });
}