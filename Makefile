DAY?=1

run:
	deno run --unstable --allow-read src/day$(DAY)/index.ts
test:
	deno test --unstable src/day$(DAY) --watch
fmt: 
	deno fmt src/*.ts
create: 
	touch inputs/day$(DAY) && mkdir -p ./src/day$(DAY) && cd ./src/day$(DAY) && touch index.ts && touch lib.ts && touch day$(DAY).test.ts