# Branch protection

`dev` and `main` are protected by two GitHub rulesets. Their definitions are committed in
[`.github/rulesets/`](../.github/rulesets/) as GitHub returns them. GitHub does not read these files: they record what
the repository settings hold.

| Branch | Ruleset file | Required checks | Approvals | Other rules |
|---|---|---|---|---|
| `dev` | `dev-protection.json` | `CI Gate`, `Conventional Commit Title` | 0 | Pull request only, merge queue (squash), no deletion, no force-push |
| `main` | `main-protection.json` | `CI Gate`, `Check source branch` | 0 | Pull request only, no deletion, no force-push |

No actor can bypass either ruleset, and no rule asks for code-owner review.

## Check that the files match GitHub

Only a maintainer changes the rulesets, in the repository settings. After a change, export them again:

```bash
gh api repos/Digital-Assistant/Digital-Assistant-SDK/rulesets --jq '.[] | [.id, .name] | @tsv'
gh api repos/Digital-Assistant/Digital-Assistant-SDK/rulesets/<id> \
  | jq 'del(.id, .source, .source_type, ._links, .created_at, .updated_at, .node_id, .current_user_can_bypass)'
```

Commit the result over the matching file, in a pull request.
