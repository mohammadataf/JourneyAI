# Development Guidelines

## Git Workflow

main
│
develop
│
feature/authentication
feature/maps

---

## Rules

- Never commit directly to main.
- Never commit directly to develop.
- One feature = One branch.
- Push only working code.
- Use meaningful commit messages.

---

## Commit Message Convention

feat: New feature

fix: Bug fix

refactor: Code improvement

docs: Documentation changes

chore: Setup/configuration

---

## Daily Workflow

1. git status
2. git pull origin <feature-branch>
3. Code
4. Test
5. Update documentation
6. Commit
7. Push