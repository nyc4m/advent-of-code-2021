export type Node<T> = { value: T; next: Node<T> | null };

export class LinkedList<T> {
  private constructor() {}

  private _head: Node<T> | null = null;
  get head(): Node<T> | null {
    return this._head;
  }

  get last(): Node<T> | null {
    const last = [...this].at(-1);
    return last === undefined ? null : last;
  }

  get size(): number {
    return [...this].length;
  }

  public static empty<T>(): LinkedList<T> {
    return new LinkedList();
  }

  public static from<T>(values: Iterable<T>): LinkedList<T> {
    const linkedList = LinkedList.empty<T>();
    for (const value of values) {
      linkedList.add(value);
    }
    return linkedList;
  }

  add(value: T) {
    if (!this.head) {
      return (this._head = { value, next: null });
    }
    this.last!.next = { value, next: null };
  }

  insertAfter(node1: Node<T>, value: T) {
    const newNode = { value, next: node1.next };
    node1.next = newNode;
  }

  *[Symbol.iterator]() {
    let curr = this.head;
    if (!curr) {
      return;
    }
    while (curr) {
      yield curr;
      curr = curr.next;
    }
  }
}

export function parsePolymerInstructions(
  instructions: string[]
): ReadonlyMap<string, string> {
  const parsedInstructions = new Map();
  return instructions.reduce((parsed, instruction) => {
    const [key, value] = instruction.split(" -> ");
    parsed.set(key, value);
    return parsedInstructions;
  }, parsedInstructions);
}
