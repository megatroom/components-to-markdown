export PATH=$(npm bin):$PATH

DIST_TAG=$1
VERSION=`yarn -s auto version`

if [ ! -z "$VERSION" ]; then
  echo "\nUpdating changelog..."
  yarn auto changelog --dry-run

  echo "\nBumping $VERSION version..."
  cd packages/components-to-markdown
  TAG_NAME=$(npm version $VERSION -m "[skip ci] Bump version to: %s" --no-git-tag-version)
  echo "New tag: $TAG_NAME"
  VERSION_NUMBER=$(echo "$TAG_NAME" | cut -c2-)
  cd -
  echo "New version: $VERSION_NUMBER"

  echo "\nPublishing package..."
  echo "NPM dist tag: $DIST_TAG"
  # yarn nx publish components-to-markdown --tag=$DIST_TAG --ver=$VERSION_NUMBER


  echo "\nCreating GitHub Release..."
  # git push --follow-tags --set-upstream origin ${CIRCLE_BRANCH}
  yarn auto release --dry-run

else

  echo "\nNo new version defined. Skipping release."

fi

echo "\nDone.\n"
