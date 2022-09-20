# =============================================================================
# ======== Build the lib and run against the example-react-components =========
# =============================================================================

yarn build components-to-markdown

cd dist/packages/components-to-markdown

yarn

cd -

./dist/packages/components-to-markdown/bin/components-to-markdown \
  --output packages/website/demo/brachiosaurus/demonstration \
  --loglevel debug \
  packages/example-react-components/src/lib packages/example-prop-types/src/lib

./dist/packages/components-to-markdown/bin/components-to-markdown \
  --output packages/website/demo/stegosaurus/demonstration \
  --loglevel debug \
  --template stegosaurus \
  packages/example-react-components/src/lib packages/example-prop-types/src/lib
