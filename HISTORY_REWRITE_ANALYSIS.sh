#!/bin/bash
# =============================================================================
# HISTORY REWRITE ANALYSIS SCRIPT
# =============================================================================
# Purpose: Remove commits containing secrets from git history
# Target: commit 0acf652b497d989d8bc832f5ad1cfc759ab1e34b (firebase.ts with API key)
# 
# WARNING: This script is for ANALYSIS ONLY. Do not run git commands directly.
# Run each command separately to understand the impact before proceeding.
# =============================================================================

REPO_PATH="/Users/gunawan/dev/web/tunaskarya"
TARGET_COMMIT="0acf652b497d989d8bc832f5ad1cfc759ab1e34b"
REMOTE_NAME="landingpage"

echo "=============================================="
echo "GIT HISTORY REWRITE ANALYSIS"
echo "=============================================="
echo ""
echo "Target: Remove commit containing exposed Google API Key"
echo "Commit: $TARGET_COMMIT"
echo "File: firebase.ts (line 5)"
echo ""

# =============================================================================
# STEP 1: CURRENT STATE ANALYSIS
# =============================================================================
echo "=============================================="
echo "STEP 1: CURRENT STATE"
echo "=============================================="

echo ""
echo "--- Current branch ---"
echo "cd $REPO_PATH && git branch --show-current"

echo ""
echo "--- Last 10 commits ---"
echo "cd $REPO_PATH && git log --oneline -10"

echo ""
echo "--- Commits in history (from oldest to newest) ---"
echo "cd $REPO_PATH && git log --oneline --reverse | head -20"

# =============================================================================
# STEP 2: TARGET COMMIT ANALYSIS
# =============================================================================
echo ""
echo "=============================================="
echo "STEP 2: TARGET COMMIT ANALYSIS"
echo "=============================================="

echo ""
echo "--- Commit details ---"
echo "cd $REPO_PATH && git show $TARGET_COMMIT --stat"

echo ""
echo "--- Commit date and author ---"
echo "cd $REPO_PATH && git show $TARGET_COMMIT --format='%H%n%ai%n%an%n%ae%n%s' --quiet"

echo ""
echo "--- Files changed in this commit ---"
echo "cd $REPO_PATH && git show $TARGET_COMMIT --name-only --format=''"

echo ""
echo "--- Was firebase.ts created in this commit? ---"
echo "cd $REPO_PATH && git show $TARGET_COMMIT --format='' -- firebase.ts | head -20"

# =============================================================================
# STEP 3: CHECK IF COMMIT IS ANCESTOR OF HEAD
# =============================================================================
echo ""
echo "=============================================="
echo "STEP 3: COMMIT RELATIONSHIP CHECK"
echo "=============================================="

echo ""
echo "--- Is target commit in current branch history? ---"
echo "cd $REPO_PATH && git merge-base --is-ancestor $TARGET_COMMIT HEAD && echo 'YES - IS ancestor' || echo 'NO - NOT ancestor'"

echo ""
echo "--- How many commits between target and HEAD? ---"
echo "cd $REPO_PATH && git log --format='%H' $TARGET_COMMIT..HEAD | wc -l"

# =============================================================================
# STEP 4: REWRITING COMMAND OPTIONS
# =============================================================================
echo ""
echo "=============================================="
echo "STEP 4: REWRITE OPTIONS"
echo "=============================================="

echo ""
echo "--- Option A: Remove specific commit from history ---"
echo "cd $REPO_PATH && git filter-branch --force --index-filter \\"
echo "  'git reset --hard \$COMMIT_SHA' --prune-empty --tag-name-filter cat -- $TARGET_COMMIT^..HEAD"
echo ""
echo "Note: This will fail because it creates an empty branch"

echo ""
echo "--- Option B: Use git filter-repo (recommended) ---"
echo "cd $REPO_PATH && pip install git-filter-repo  # if not installed"
echo "cd $REPO_PATH && git filter-repo --invert-paths --path firebase.ts --force"

echo ""
echo "--- Option C: Interactive rebase to drop commit ---"
echo "cd $REPO_PATH && git rebase -i \$(git log --format='%H' --reverse | grep -n $TARGET_COMMIT | cut -d: -f1)"

echo ""
echo "--- Option D: Create fresh branch without the commit ---"
echo "cd $REPO_PATH && git checkout --orphan clean-history $(git rev-parse $TARGET_COMMIT^)"
echo "cd $REPO_PATH && git cherry-pick \$(git rev-list --ancestry-path $TARGET_COMMIT^..HEAD --reverse)"

# =============================================================================
# STEP 5: DAMAGE ASSESSMENT CHECKLIST
# =============================================================================
echo ""
echo "=============================================="
echo "STEP 5: DAMAGE ASSESSMENT CHECKLIST"
echo "=============================================="

echo ""
echo "Before rewriting, verify:"
echo ""
echo "1. [ ] How many files will be affected?"
echo "   Command: git show $TARGET_COMMIT --name-only --format=''"
echo ""
echo "2. [ ] Are there other important commits in the removed commits?"
echo "   Command: git log $TARGET_COMMIT^..HEAD --oneline"
echo ""
echo "3. [ ] Will any branches lose commits?"
echo "   Command: for branch in \$(git branch -r); do"
echo "              commits_in=\$(git log \$branch --oneline | grep -c $TARGET_COMMIT)"
echo "              if [ \$commits_in -gt 0 ]; then echo \$branch; fi"
echo "            done"
echo ""
echo "4. [ ] Are there remote collaborators who pulled this history?"
echo "   Check: Has anyone forked or cloned this repo?"
echo ""
echo "5. [ ] Will tags be affected?"
echo "   Command: git tag --contains $TARGET_COMMIT"

# =============================================================================
# STEP 6: BACKUP RECOMMENDATION
# =============================================================================
echo ""
echo "=============================================="
echo "STEP 6: BACKUP RECOMMENDATION"
echo "=============================================="

echo ""
echo "Before rewriting history, create a backup:"
echo ""
echo "--- Backup current state ---"
echo "cd $REPO_PATH && cp -r .git .git.backup"
echo ""
echo "--- Or create a backup branch ---"
echo "cd $REPO_PATH && git branch backup-before-rewrite"

# =============================================================================
# STEP 7: POST-REWRITE VERIFICATION
# =============================================================================
echo ""
echo "=============================================="
echo "STEP 7: POST-REWRITE VERIFICATION"
echo "=============================================="

echo ""
echo "After rewriting, verify:"
echo ""
echo "1. [ ] Commit count should decrease"
echo "   Command: git rev-list --count HEAD"
echo ""
echo "2. [ ] Secret should no longer appear in history"
echo "   Command: git log --all -p -S 'YOUR_FIREBASE_API_KEY'"
echo ""
echo "3. [ ] Code should still work"
echo "   Command: npm run build"
echo ""
echo "4. [ ] Push to remote (will require force push)"
echo "   Command: git push $REMOTE_NAME --force"

# =============================================================================
# FINAL SUMMARY
# =============================================================================
echo ""
echo "=============================================="
echo "SUMMARY"
echo "=============================================="
echo ""
echo "To proceed with history rewrite:"
echo ""
echo "1. Review the analysis above"
echo "2. Create backup: git branch backup-before-rewrite"
echo "3. Run rewrite command"
echo "4. Verify with post-rewrite commands"
echo "5. Force push: git push $REMOTE_NAME --force"
echo ""
echo "Remember: Force pushing rewrites shared history!"
echo "Only do this if no one else has pulled this branch."
echo ""
