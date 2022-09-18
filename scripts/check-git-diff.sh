DIFF_PATH=$1

echo ""

if [ -z "$DIFF_PATH" ]; then
  echo "Error: You must specify the path to the diff."
  echo ""
  exit 1
fi

git diff --name-status --exit-code $DIFF_PATH
RESULT=$?
if [ $RESULT -ne 0 ]; then
  echo ""
  echo "ERROR: running the previous command has introduced changes. Hence, Failing the build."
  echo ""
  exit 1
fi

echo "Done."
echo ""
