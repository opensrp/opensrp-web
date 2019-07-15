# Code Quality

## Guidelines on code conventions

1. the stack used for this project is React on *Typescript*, emphasis on typescript, Here is a nice comprehensive yet minimalist [getting started & reference](https://basarat.gitbooks.io/typescript/content/docs/getting-started.html) on typescript
2. all and any testable functionality should be accompanied with tests,
3. commits should be as [atomic](https://www.freshconsulting.com/atomic-commits/) as possible
4. consider objects as immutable outside their creation scope
5. use JsDOC style comments for functions, interfaces, enums and classes
6. use JSDOC style comment for variables and types declaration where necessary

### Linters and hooks

code checking tools integrated into the workflow include:

1. tslint linter on commit
