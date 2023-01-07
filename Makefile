
# Bump version, perform git tag and publish to npm:
	# make release bump=<VERSION>|major|minor|patch notes="<NOTES>"
		# NOTE: OTP required for 2FA npm publish and multi-word notes must be provided with ""
			# Example: make release bump=patch notes="test release"
release:
	npm version $(bump) -m "$(notes)"
	npm publish

