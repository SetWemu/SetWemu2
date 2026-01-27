# Git Workflow Guide

## Branch Structure
```
main (production-ready code, protected)
  └── develop (integration branch, protected)
       ├── feature/auth-mueena
       ├── feature/maps-diara
       ├── feature/design-isa
       ├── fix/login-bug-oneth
       └── design/homepage-thisaga
```

## Branch Naming Conventions

### Feature Branches
Format: `feature/[feature-name]-[your-name]`

Examples:
- `feature/login-screen-mueena`
- `feature/event-card-diara`
- `feature/api-authentication-oneth`

### Bug Fix Branches
Format: `fix/[bug-description]-[your-name]`

Examples:
- `fix/navigation-crash-mueena`
- `fix/api-timeout-oneth`

### Design Branches
Format: `design/[screen-name]-[your-name]`

Examples:
- `design/homepage-isa`
- `design/event-detail-thisaga`

---

## Daily Workflow

### Start of Day

1. **Pull latest changes from develop:**
```bash
   git checkout develop
   git pull origin develop
```

2. **Create your feature branch:**
```bash
   git checkout -b feature/your-feature-yourname
```
   
   Example:
```bash
   git checkout -b feature/login-screen-mueena
```

---

### During Development

3. **Make changes to your code**

4. **Check what you changed:**
```bash
   git status
```

5. **Add your changes:**
```bash
   # Add specific files
   git add src/screens/LoginScreen.js
   
   # Or add all changed files
   git add .
```

6. **Commit with a clear message:**
```bash
   git commit -m "Add login screen with email validation"
```


7. **Push to GitHub:**
```bash
   git push origin feature/your-feature-yourname
```
   
   Example:
```bash
   git push origin feature/login-screen-mueena
```

---

### End of Day (or When Feature is Complete)

8. **Create a Pull Request:**
   
   **On GitHub Website:**
   - Go to the repository
   - Click **"Pull requests"** tab
   - Click **"New pull request"**
   - Base: `develop` ← Compare: `feature/your-feature-yourname`
   - Click **"Create pull request"**
   - Fill in the PR template
   - Assign 1-2 reviewers
   - Click **"Create pull request"**

9. **Request Review:**
   - Post in WhatsApp: "PR ready for review: [link]"
   - Tag 1-2 teammates to review

10. **Respond to Feedback:**
    - If reviewer requests changes, make them
    - Commit and push to the same branch
    - PR will auto-update

11. **After Approval:**
    - Click **"Merge pull request"**
    - Click **"Confirm merge"**
    - Click **"Delete branch"** (cleans up GitHub)

12. **Update your local repo:**
```bash
    git checkout develop
    git pull origin develop
    git branch -d feature/your-feature-yourname  # Delete local branch
```

---

## IMPORTANT RULES

### NEVER DO THESE:

1. **NEVER commit directly to `main` branch**
   - `main` is for production-ready code only
   - Always go through Pull Request

2. **NEVER commit directly to `develop` branch**
   - Always create a feature branch
   - Merge to `develop` via Pull Request

3. **NEVER push without testing first**
   - Always test your code locally
   - Make sure app runs without errors

4. **NEVER commit these files:**
   - `node_modules/` (dependencies)
   - `.env` (secrets)
   - `.DS_Store` (Mac files)
   - `build/` or `dist/` (build artifacts)
   - Personal IDE config files

5. **NEVER force push to shared branches**
   - Never use `git push --force` on `main` or `develop`
   - Only force push to your own feature branches if absolutely necessary

---

## Common Scenarios

### Scenario 1: You need latest changes from develop while working
```bash
# Save your work first
git add .
git commit -m "Work in progress"

# Switch to develop and update
git checkout develop
git pull origin develop

# Go back to your branch and merge develop into it
git checkout feature/your-feature-yourname
git merge develop

# Resolve any conflicts (ask for help if needed!)
# Then continue working
```

---

### Scenario 2: You made changes to the wrong branch
```bash
# If you haven't committed yet:
git stash  # Save your changes temporarily
git checkout develop
git checkout -b feature/correct-branch-yourname  # Create correct branch
git stash pop  # Get your changes back

# If you already committed to wrong branch:
# Ask Mueena for help! Don't try to fix alone.
```

---

### Scenario 3: You need to undo your last commit
```bash
# If you haven't pushed yet:
git reset HEAD~1  # Undo commit but keep changes

# If you already pushed:
# Don't try to fix yourself - ask in WhatsApp for help!
```

---

### Scenario 4: Merge Conflict

When you see "CONFLICT" during merge:
```bash
# 1. Don't panic!
# 2. Open the conflicted file in VS Code
# 3. Look for these markers:
<<<<<<< HEAD
your changes
=======
their changes
>>>>>>> develop

# 4. Decide what to keep, remove the markers
# 5. Save the file
# 6. Complete the merge:
git add .
git commit -m "Resolve merge conflict"
git push
```

**If confused, ask for help immediately!**

---

## Pull Request Review Process

### For PR Authors:

1. **Before creating PR:**
   - [ ] Test your code thoroughly
   - [ ] Remove console.log statements
   - [ ] Remove commented-out code
   - [ ] Check for typos
   - [ ] Run the app and verify no errors

2. **Creating the PR:**
   - [ ] Fill in ALL sections of the PR template
   - [ ] Add screenshots if UI changes
   - [ ] Add clear test instructions
   - [ ] Assign 1-2 reviewers

3. **After submitting:**
   - [ ] Monitor for comments
   - [ ] Respond within 24 hours
   - [ ] Make requested changes promptly
   - [ ] Be open to feedback

---

### For PR Reviewers:

1. **Check the code:**
   - [ ] Does it follow our coding style?
   - [ ] Is it readable and well-commented?
   - [ ] Are there any obvious bugs?
   - [ ] Does it match the design?

2. **Test the changes:**
   - [ ] Pull the branch locally
   - [ ] Run the app
   - [ ] Test the new feature
   - [ ] Try to break it (edge cases)

3. **Provide feedback:**
   - Be constructive and kind
   - Explain WHY, not just WHAT to change
   - Suggest improvements
   - Don't just say "this is wrong"

4. **Approve or Request Changes:**
   - If all good: Click **"Approve"**
   - If issues: Click **"Request changes"** with clear explanation

---

## Useful Git Commands

### Check Status
```bash
git status  # See what files changed
git log     # See commit history
git branch  # See all branches
```

### Undo Changes
```bash
git checkout -- filename.js   # Undo changes to one file
git reset --hard              # Undo ALL uncommitted changes (careful!)
```

### Update Branch
```bash
git fetch origin              # Get latest info from GitHub
git pull origin develop       # Update current branch
```

### Clean Up
```bash
git branch -d feature/old-branch  # Delete merged branch locally
git remote prune origin           # Clean up deleted remote branches
```

---

## 📚 Learning Resources

- [GitHub's Git Handbook](https://guides.github.com/introduction/git-handbook/)
- [Interactive Git Tutorial](https://learngitbranching.js.org/)
- [Git Cheat Sheet](https://education.github.com/git-cheat-sheet-education.pdf)

---

## Quick Reference

**Most Common Commands:**
```bash
# Start working
git checkout develop
git pull origin develop
git checkout -b feature/name-yourname

# Save work
git add .
git commit -m "Clear message"
git push origin feature/name-yourname

# Get latest changes
git checkout develop
git pull origin develop
git checkout feature/name-yourname
git merge develop

# After PR merged
git checkout develop
git pull origin develop
git branch -d feature/name-yourname
```
