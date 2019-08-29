install:
	install-deps

install-deps:
	npm install

run:
	npx babel-node src/bin/gendiff.js

lint:
	npx eslint .

test:
	npm test

publish:
	npm publish --dry-run
