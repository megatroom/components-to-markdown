set -e

export PATH=$(npm bin):$PATH

DIST_TAG=$1

echo ""

if [ -z "$DIST_TAG" ]; then
  echo "Error: You must specify a dist-tag."
  echo ""
  exit 1
fi

VERSION=`yarn -s auto version`

if [ ! -z "$VERSION" ]; then
  echo "Updating changelog..."
  yarn auto changelog -m "[skip ci] Update CHANGELOG.md"

  echo ""
  echo "Bumping $VERSION version..."
  cd packages/components-to-markdown
  TAG_NAME=$(npm --no-git-tag-version version $VERSION)
  VERSION_NUMBER=$(echo "$TAG_NAME" | cut -c2-)
  echo "New tag: $TAG_NAME"
  echo "New version: $VERSION_NUMBER"
  npm pkg get name version
  cd -

  echo ""
  echo "Commiting changes..."
  git add packages/components-to-markdown/package.json
  git commit -m "[skip ci] Bump version to: %s"
  git tag -a $TAG_NAME -m "Version $VERSION_NUMBER"

  echo ""
  echo "Publishing package..."
  echo "NPM dist tag: $DIST_TAG"
  # yarn nx publish components-to-markdown --tag=$DIST_TAG --ver=$VERSION_NUMBER

  echo ""
  echo "Creating GitHub Release..."
  echo "Branch: $CIRCLE_BRANCH"
  git --no-pager log --name-status -p -3
  # git push --follow-tags --set-upstream origin $CIRCLE_BRANCH
  # yarn auto release --use-version=$TAG_NAME

else

  echo "No new version defined. Skipping release."

fi

echo ""
echo "Done."
echo ""
