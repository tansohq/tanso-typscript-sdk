.PHONY: test build lint install clean

install:
	npm install

build: install
	npx tsc -p tsconfig.json
	npx tsc -p tsconfig.cjs.json

test: install
	npx vitest run

lint: install
	npx tsc --noEmit

clean:
	rm -rf dist node_modules
