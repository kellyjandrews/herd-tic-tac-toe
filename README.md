# New app

A Next.js app provisioned by AI Code Factory.

## Local development

`npm install`
`npm run dev`

## Tests

- `npm run verify` runs Biome, TypeScript, and Vitest (`tests/unit/`).
- `npm run test:e2e` runs Playwright (`tests/e2e/`); run `npx playwright install chromium` once first. Set `BASE_URL` to test a deployed preview.

## Feature workflow

1. Add a feature from the AI Code Factory dashboard, or open a Feature request issue. It waits for approval.
2. Approve it on the factory's project page (or add the `feature-queue` label). The Feature queue workflow assigns approved features to GitHub Copilot one at a time.
3. When Copilot finishes, the queue marks its pull request ready and runs CI (verify and build); Vercel posts a preview.
4. When CI passes, the queue squash-merges the pull request, Vercel deploys production, and the next queued feature starts. If CI fails or the branch conflicts, the queue asks Copilot to fix it (up to 3 times), then leaves it for you.

Set the `FEATURE_AUTO_MERGE` repository variable to `false` to review and merge pull requests yourself.

The factory copies a `COPILOT_ASSIGN_TOKEN` repository secret when it creates or repairs this repo; Copilot sessions bill to that token's owner. Pause the queue by setting the `FEATURE_QUEUE_PAUSED` repository variable to `true` (the dashboard does this for you).

Copilot coding agent must be enabled for the repository and your account must have an eligible Copilot plan. Vercel Hobby and GitHub usage limits apply.

## Feature batches from CSV

1. Open a **Feature batch (CSV)** issue and attach a CSV with a `title,body,labels` header (up to 50 rows). For private repos, paste the CSV in a `csv` code block if the attachment can't be read.
2. The Feature queue workflow creates one `feature` issue per row and closes the batch issue. The rows wait for approval like any other feature.
3. Once approved, Copilot builds them in order; each time a queued issue closes (its PR merges), the next one is assigned.

If Copilot's PR is closed without merging, unassign Copilot or close the issue, then press Retry on the project's dashboard page (or run the Feature queue workflow manually) to continue.
