# =============================================================================
# ========= Run only the builded lib with direct lint to the template =========
# =============================================================================

./dist/packages/components-to-markdown/bin/components-to-markdown \
  --output packages/website/demo/brachiosaurus \
  --loglevel debug \
  --template packages/components-to-markdown/templates/brachiosaurus.hbs \
  packages/example-react-components/src/lib packages/example-prop-types/src/lib

./dist/packages/components-to-markdown/bin/components-to-markdown \
  --output packages/website/demo/stegosaurus \
  --loglevel debug \
  --template packages/components-to-markdown/templates/stegosaurus.hbs \
  packages/example-react-components/src/lib packages/example-prop-types/src/lib
