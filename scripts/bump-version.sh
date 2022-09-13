export PATH=$(npm bin):$PATH

DIST_TAG=$1
VERSION=`yarn -s auto version`

echo ""

if [ ! -z "$VERSION" ]; then
  echo "Updating changelog..."
  yarn auto changelog

  echo ""
  echo "Bumping $VERSION version..."
  cd packages/components-to-markdown
  TAG_NAME=$(npm version $VERSION -m "[skip ci] Bump version to: %s")
  echo "New tag: $TAG_NAME"
  VERSION_NUMBER=$(echo "$TAG_NAME" | cut -c2-)
  cd -
  echo "New version: $VERSION_NUMBER"

  echo ""
  echo "Publishing package..."
  echo "NPM dist tag: $DIST_TAG"
  yarn nx publish components-to-markdown --tag=$DIST_TAG --ver=$VERSION_NUMBER

  echo ""
  echo "Creating GitHub Release..."
  git push --follow-tags --set-upstream origin ${CIRCLE_BRANCH}
  yarn auto release

else

  echo "No new version defined. Skipping release."

fi

echo ""
echo "Done."
echo ""
