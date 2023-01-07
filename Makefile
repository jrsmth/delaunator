
# Bump version, perform git tag and publish to npm:
	# make release bump=<VERSION>|major|minor|patch notes=<NOTES>
release:
	npm version $(bump) -m $(notes)
	npm publish

