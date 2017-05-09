# NextMetro
A toy application for displaying station metro predictions. Mainly created to explore javascript design patterns, TDD, and refactoring.

## Setup
```bash
pushd next-metro
yarn install
yarn link
popd

pushd web
yarn link next-metro
yarn install
popd

yarn compile & node server.js
```