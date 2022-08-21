yarn build components-to-markdown

cd dist/packages/components-to-markdown

yarn

cd -

./dist/packages/components-to-markdown/bin/components-to-markdown \
  --output packages/docusaurus-demo/docs/components \
  --loglevel debug \
  --watch \
  packages/example-react-components/src/lib
