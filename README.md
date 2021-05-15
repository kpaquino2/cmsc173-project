### Installation
---
1. Clone the repository
```
git clone https://github.com/kpaquino2/cmsc173-project
```
2. Inside the project folder, install the dependencies
```
npm i
```
3. Run the app
```
npm start
```
### Workflow
---
1. Pick a task/feature that you want to work on
2. From the develop branch, base a new feature branch with a name prefixed with `feature/`, `fix/`, or `chore/` followed by the branch name.
  - `feature/` → for new features/implementations
  - `fix/` → for bug fixes
  - `chore/` → for miscellaneous stuff (refactor, documentation, testing, etc.) 
3. Commit and push changes on that branch.
4. Create a pull request and assign reviewers if the feature is ready for merging to develop.
### Commit Message Prefix
---
For every commit, we will be using these prefix:
- `feat: <commit-message>` → if the commit has new feature/implementation added
- `fix: <commit-message>` → if the commit has fixed bugs
- `chore: <commit-message>` → if the commit has any code reformat or refactor
