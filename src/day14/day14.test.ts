import { assertEquals, assertThrows } from "../../deps.ts";
import { LinkedList, parsePolymerInstructions } from "./lib.ts";

Deno.test({
  name: "that the linked list is a thing",
  async fn(test) {
    const linkedList = LinkedList.empty();

    await test.step("that it is initialized with no head", () => {
      assertEquals(linkedList.head, null);
    });

    linkedList.add(1);

    await test.step("that adding a element sets the head", () => {
      assertEquals(linkedList.head, { value: 1, next: null });
    });

    linkedList.add(3);

    await test.step(
      "that adding an other element sets the next property  from head",
      () => {
        assertEquals(linkedList.head?.next, { value: 3, next: null });
      }
    );

    await test.step("that it can be used as an iterable", () => {
      assertEquals(
        Array.from(linkedList).map((n) => n.value),
        [1, 3]
      );
    });

    linkedList.add(5);
    linkedList.add(6);
    linkedList.add(7);

    await test.step("that it returns length", () => {
      assertEquals(linkedList.size, 5);
    });

    await test.step("that last is updated", () => {
      assertEquals(linkedList.last, { value: 7, next: null });
    });
  },
});

Deno.test({
  name: "it can create a linkedList from an iterable",
  fn() {
    const linkedList = LinkedList.from("NNCB");

    assertEquals(
      Array.from(linkedList).map((n) => n.value),
      ["N", "N", "C", "B"]
    );
  },
});

Deno.test({
  name: "inserting during a loop",
  async fn(test) {
    const linkedList = LinkedList.from("NNCB");
    for (const char of linkedList) {
      if (char.value === "N" && char.next?.value === "C") {
        linkedList.insertAfter(char, "H");
      }
    }
    await test.step("that it keeps the correct order", () => {
      assertEquals(
        Array.from(linkedList).map((i) => i.value),
        ["N", "N", "H", "C", "B"]
      );
    });
  },
});

Deno.test({
  name: "that it parses polymer instructions",
  fn() {
    assertEquals(
      parsePolymerInstructions(["CH -> B", "HH -> N"]),
      new Map([
        ["CH", "B"],
        ["HH", "N"],
      ])
    );
  },
});
