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

test-coverage:
	npm test -- --coverage

publish:
	npm publish --dry-run
