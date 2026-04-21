#!/bin/bash
# =============================================================================
# HISTORY REWRITE DAMAGE CHECK SCRIPT
# =============================================================================
# Purpose: Check for potential damage from git history rewrite operation
# Usage: Run this script BEFORE and AFTER any history rewrite to compare states
# Agent: Paste this content into a new agent session for analysis
# =============================================================================

REPO_PATH="/Users/gunawan/dev/web/tunaskarya"
REMOTE_NAME="landingpage"
SECRET_PLACEHOLDER="YOUR_FIREBASE_API_KEY"

echo "=============================================="
echo "HISTORY REWRITE DAMAGE CHECK"
echo "=============================================="
echo ""

# =============================================================================
# CHECK 1: SECRET STILL IN HISTORY?
# =============================================================================
echo "=============================================="
echo "CHECK 1: SECRET DETECTION"
echo "=============================================="
echo ""
echo "Searching for exposed secret in git history..."
echo ""

if git log --all -p -S "$SECRET_DETECTED" --format="%H %s" 2>/dev/null | grep -q "$SECRET_DETECTED"; then
    echo "❌ FAIL: Secret still found in history!"
    echo ""
    echo "Commits containing secret:"
    git log --all -p -S "$SECRET_DETECTED" --format="%H %ai %an" -- . 2>/dev/null | head -20
else
    echo "✅ PASS: Secret NOT found in history - CLEAN!"
fi

# =============================================================================
# CHECK 2: COMMIT COUNT COMPARISON
# =============================================================================
echo ""
echo "=============================================="
echo "CHECK 2: COMMIT COUNT"
echo "=============================================="
echo ""

LOCAL_COUNT=$(git rev-list --count HEAD 2>/dev/null)
REMOTE_COUNT=$(git rev-list --count $REMOTE_NAME/main 2>/dev/null)

echo "Local branch commits:  $LOCAL_COUNT"
echo "Remote branch commits: $REMOTE_COUNT"

if [ -n "$REMOTE_COUNT" ] && [ "$LOCAL_COUNT" -lt "$REMOTE_COUNT" ]; then
    DIFF=$((REMOTE_COUNT - LOCAL_COUNT))
    echo "✅ Expected: $DIFF commits removed (matches target)"
elif [ -n "$REMOTE_COUNT" ] && [ "$LOCAL_COUNT" -eq "$REMOTE_COUNT" ]; then
    echo "⚠️ WARNING: Commit count unchanged - rewrite may have failed"
else
    echo "ℹ️ INFO: Cannot compare (first push or no remote)"
fi

# =============================================================================
# CHECK 3: FILE INTEGRITY
# =============================================================================
echo ""
echo "=============================================="
echo "CHECK 3: FILE INTEGRITY"
echo "=============================================="
echo ""

CRITICAL_FILES=(
    "app/page.tsx"
    "app/layout.tsx"
    "firebase.ts"
    "package.json"
    "prisma/schema.prisma"
)

for file in "${CRITICAL_FILES[@]}"; do
    if [ -f "$REPO_PATH/$file" ]; then
        echo "✅ $file - exists"
    else
        echo "❌ $file - MISSING!"
    fi
done

# =============================================================================
# CHECK 4: BRANCH STRUCTURE
# =============================================================================
echo ""
echo "=============================================="
echo "CHECK 4: BRANCH STRUCTURE"
echo "=============================================="
echo ""

echo "Local branches:"
git branch --verbose

echo ""
echo "Remote branches:"
git branch -r --verbose

# =============================================================================
# CHECK 5: TAG INTEGRITY
# =============================================================================
echo ""
echo "=============================================="
echo "CHECK 5: TAG INTEGRITY"
echo "=============================================="
echo ""

TAGS=$(git tag --list)
if [ -n "$TAGS" ]; then
    echo "Tags found:"
    echo "$TAGS"
    echo ""
    echo "⚠️ WARNING: Tags may need to be recreated after rewrite"
else
    echo "No tags found - OK"
fi

# =============================================================================
# CHECK 6: STASHED CHANGES
# =============================================================================
echo ""
echo "=============================================="
echo "CHECK 6: STASHED CHANGES"
echo "=============================================="
echo ""

STASH_COUNT=$(git stash list | wc -l)
if [ "$STASH_COUNT" -gt 0 ]; then
    echo "⚠️ WARNING: $STASH_COUNT stash entries exist"
    echo "These stashes reference old commit history and may need attention"
    echo ""
    git stash list
else
    echo "No stashes - OK"
fi

# =============================================================================
# CHECK 7: REFERENCE LOG INTEGRITY
# =============================================================================
echo ""
echo "=============================================="
echo "CHECK 7: REFERENCE LOG (REFS) STATUS"
echo "=============================================="
echo ""

echo "--- Backup refs still exist? ---"
if [ -d "$REPO_PATH/.git/refs/original" ]; then
    echo "⚠️ Original refs backup exists (from previous filter-branch)"
    echo "Location: $REPO_PATH/.git/refs/original"
else
    echo "✅ No original refs backup found"
fi

echo ""
echo "--- All remotes ---"
git remote -v

# =============================================================================
# CHECK 8: WORKING TREE STATUS
# =============================================================================
echo ""
echo "=============================================="
echo "CHECK 8: WORKING TREE STATUS"
echo "=============================================="
echo ""

git status --short

# =============================================================================
# CHECK 9: RECENT COMMITS VERIFICATION
# =============================================================================
echo ""
echo "=============================================="
echo "CHECK 9: RECENT COMMITS VERIFICATION"
echo "=============================================="
echo ""

echo "Last 10 commits in current branch:"
git log --oneline -10

# =============================================================================
# CHECK 10: DEPLOYMENT READINESS
# =============================================================================
echo ""
echo "=============================================="
echo "CHECK 10: DEPLOYMENT READINESS"
echo "=============================================="
echo ""

echo "--- Checking if key directories exist ---"
DIRS=("app" "lib" "prisma" "node_modules" ".env.local")

for dir in "${DIRS[@]}"; do
    if [ -d "$REPO_PATH/$dir" ]; then
        echo "✅ $dir/"
    else
        echo "❌ $dir/ - MISSING"
    fi
done

echo ""
echo "--- node_modules installed? ---"
if [ -d "$REPO_PATH/node_modules" ]; then
    echo "✅ Dependencies installed"
else
    echo "⚠️ Run: npm install"
fi

# =============================================================================
# SUMMARY
# =============================================================================
echo ""
echo "=============================================="
echo "DAMAGE CHECK SUMMARY"
echo "=============================================="
echo ""
echo "After reviewing the checks above, answer:"
echo ""
echo "1. Is the secret removed from history?"
echo "2. Are all critical files intact?"
echo "3. Is the commit count correct?"
echo "4. Are there any orphaned commits?"
echo ""
echo "If all checks pass, proceed with:"
echo "   git push $REMOTE_NAME --force"
echo ""
echo "If any checks fail, STOP and investigate before pushing!"
