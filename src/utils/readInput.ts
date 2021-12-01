export async function readInputFor(inputName: string) {
  try {
    return await Deno.readTextFile(`./inputs/${inputName}`);
  } catch (e) {
    throw new Error("The input for day1 cannot be found");
  }
}
