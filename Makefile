DAY?=1

run:
	deno run --allow-read src/day$(DAY)/index.ts
test:
	deno test --unstable src/day$(DAY) --watch
fmt: 
	deno fmt src/*.ts
create: 
	mkdir -p ./src/day$(DAY) && cd ./src/day$(DAY) && touch index.ts && touch input.day$(DAY) && touch lib.ts && touch day$(DAY).test.ts