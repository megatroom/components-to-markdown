CHANGES=$(git diff-index --name-status HEAD)

if [ -n "$CHANGES" ]; then
    echo "You have uncommitted changes:"
    echo "$CHANGES"
    exit 1
fi
