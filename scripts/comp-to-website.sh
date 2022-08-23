yarn build components-to-markdown

cd dist/packages/components-to-markdown

yarn

cd -

./dist/packages/components-to-markdown/bin/components-to-markdown \
  --output packages/website/demo/brachiosaurus \
  --loglevel debug \
  packages/example-react-components/src/lib
