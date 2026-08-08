# CLAUDE AI - GLOBAL AUTOMATION AGENT RULES

> **Scope:** Applies to all Test Automation tasks performed by Claude (Claude Code) in this project.
> **Goal:** Produce effective, stable test scripts — easy to debug — easy to scale — CI friendly.
>
> **Tradeoff:** The principles below prioritize caution and **token efficiency** over speed. After coding, verify with a compile check (`tsc --noEmit`); do NOT auto-run Playwright tests unless the user requests it. For simple (trivial) tasks, use reasonable judgment.

---

## Core Behavioral Principles

### 1. Think Before Coding

**Do not assume. Do not hide ambiguities. State tradeoffs clearly.**

Before implementing:

- State assumptions clearly. If unsure → ask.
- If there are multiple interpretations → present them all, DO NOT choose silently on your own.
- If there is a simpler way → suggest it. Challenge when necessary.
- If anything is unclear → stop, point out the confusing part, and ask.

### 2. Simplicity First

**Minimum code to solve the problem. Do not overdo it.**

- Do not add features outside the requirements.
- Do not create abstractions for single-use code.
- Do not add unrequested "flexibility" / "configurability".
- Do not write error handling for scenarios that cannot occur.
- If you write 200 lines but it can be reduced to 50 → rewrite it.

Ask yourself: "Would a senior engineer think this part is over-complicated?" If yes → simplify.

### 3. Surgical Changes

**Only touch what is mandatory. Only clean up what you created.**

When modifying existing code:

- Do not "improve" surrounding code/comments/formatting.
- Do not refactor what is not broken.
- Follow the existing style, even if you prefer otherwise.
- If you see unrelated dead code → report it, DO NOT delete it yourself.

When changes create orphans:

- Delete imports/variables/functions that your OWN changes made redundant.
- Do not delete existing dead code unless requested.

Criterion: Every line changed must trace directly back to a user requirement.

### 4. Goal-Driven Execution

**Define success criteria. Iterate until verified.**

Translate tasks into verifiable goals:

- "Add validation" → "Write test for invalid input, then make it pass"
- "Fix bug" → "Write test reproducing the bug, then make it pass"
- "Refactor X" → "Ensure tests pass before and after refactoring"

For multi-step tasks, outline a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria → allows independent iteration. Weak criteria ("make it work") → requires continuous clarification.

> **These principles are effective when:** diffs have fewer redundant changes, less rewriting is needed due to over-complication, and clarifying questions come BEFORE implementation rather than AFTER a mistake is made.

---

## Git Pull Restriction Rule

* Strictly DO NOT use GIT commands that change the code state (such as `git pull`, `git checkout`, `git merge`, `git rebase`, `git reset`) to pull code or change branches.
* Since code on the remote server might not be up-to-date in some cases, pulling code can overwrite and mess up the code currently being modified on the local machine.
* Always keep the current local code state to work on.
* If you need new files or content, ask the user to provide them instead of using git on your own.
* **Allowed** to use read-only commands: `git status`, `git diff`, `git log` — to inspect the status without modifying code.

---

## Browser Rules (MANDATORY)

### 🖥️ Viewport & Mode

* **Playwright test runs:** the standard is a **maximized window** — `viewport: null` + `--start-maximized` (do NOT set a fixed viewport for chromium headed runs). Fixed viewport `1920×1080` applies only to the `edge` project (headless).
* All **UI debugging via Playwright MCP** must run with a desktop viewport: **`1920x1080`** (`browser_resize`).
* Opening a **real browser** is mandatory when debugging (headed mode).
* **Headless mode** is only allowed **after the test has successfully passed (PASS) on the UI**.
* CI/CD pipeline is **allowed to run headless by default**.

### 🔁 Mandatory Debugging Sequence (Playwright MCP)

When using Playwright MCP to debug UI, **ALWAYS** follow this sequence:

```
navigate → resize(1920×1080) → wait_for(page_load) → snapshot → interact → screenshot(on_fail)
```

* **DO NOT** call `browser_navigate` again if already on the correct page — to avoid unwanted reloads.
* **ALWAYS** call `browser_resize(width=1920, height=1080)` immediately after `browser_navigate`.
* **ALWAYS** verify the page has finished loading before taking a snapshot or interacting.

> **Detail (config, headed/headless switch, MCP order):** see [Playwright Rules § 1](.claude/rules/playwright_rules.md).

### 📸 Screenshot & Snapshot

* Use **`snapshot`** to analyze the DOM and identify locators.
* Use **`screenshot`** to capture evidence when a test fails or for reporting.
* Capture a **screenshot immediately when an assertion fails** to assist in error tracking.
* **DO NOT** capture screenshots excessively — only when necessary (failures / key milestones).

---

## Tools

### 🛠️ Priority Usage

* Prioritize using **Playwright MCP** for all UI debugging tasks.
* Refer to detailed rules: [Playwright Rules](.claude/rules/playwright_rules.md)

### 🔍 Inspect & Debug

* Open a real browser to debug (headed mode).
* Inspect the **actual DOM / HTML** on the browser — **DO NOT guess locators**.
* Execute and debug tests directly on the UI before generating code.
* **DO NOT** generate code without inspecting the DOM.

### ⚡ Principles

* A locator must be **verified as working** on the current browser before being added to code.
* If the locator is taken from old code → **re-verification is mandatory** before use.

---

## Cleanup & Delivery

### ✅ Definition of Done (DoD)

A test is only considered **complete** when **all** of the following criteria are met:

#### 🧹 Code Cleanup

- [ ] Remove all `print()`, `console.log()`, and temporary debug logs.
- [ ] Remove unused locators.
- [ ] Do not leave commented-out code.
- [ ] No hardcoded `waitForTimeout` / `Thread.sleep`.
- [ ] No hardcoded test data (emails, usernames, IDs must be random/traceable).

#### 🏗️ Structure & POM

- [ ] Adhere to the **Page Object Model (POM)** — separate Page class, Test class, and Utils.
- [ ] Locators must be defined in the Page class, not inline in the test.
- [ ] File, class, and method names must follow a clear and consistent convention.
- [ ] No unused imports.

#### ⚙️ Test Quality

- [ ] Code **passes the compile check** (`npx tsc --noEmit`). Running Playwright tests is OPTIONAL — only when the user requests it (token-saving). If tests are run, fix at most 1 round on failure, then report.
- [ ] Assertions must have clear messages, making them easy to debug on failure.
- [ ] Each test case must be independent — no execution order dependency.
- [ ] Test data must be generated dynamically (timestamp/random) and be traceable.

#### 📁 File Output

- [ ] Source code must be saved in the correct location within the project structure.
- [ ] No temporary files or redundant test files in the source directory.
- [ ] Configuration files (config, .env) must not contain real credentials.

#### 📊 Result Reporting

- [ ] Result summary: number of **PASS / FAIL / SKIP** tests.
- [ ] Clearly list implemented TCs and which TCs were skipped (with reasons).
- [ ] Note any known issues or limitations, if applicable.

---

## Project Context & Architecture (OnePay Paygate)

> **Project:** End-to-end automation for **OnePay Paygate** (payment gateway) — **Playwright + TypeScript** (this repo is TS-only). Covers payment across card types (international, domestic), methods (BNPL, QR/VietQR, token, installment, direct debit), and backends (Merchant Portal, MA, iPortal).

### Project Structure

```
lib/
├── pages/        → POM: locators (getters) + atomic same-page actions; NO assertions, NO cross-page business flow
├── helpers/      → Business actions per feature — NEVER imported directly in tests (wrap in fixtures)
├── fixture/      → Composed fixtures — import via @fixtures/index
├── strategies/   → Business workflows via Strategy + Resolver (no if/else/switch)
├── dataFactory/  → Test data factories with overrides
├── types/        → TypeScript types (namespaced)
├── utils/        → Common utilities (API, data, DB, Excel, filter)
├── setup/        → Global / staging / token setup
└── env.ts        → Multi-environment config (URLs, DB connections, credentials)

tests/
├── 00.paygate/   → Paygate payment tests (UI + API)
├── 01.mp/        → Merchant Portal
├── 02.ma/        → MA
├── 03.iportal/   → iPortal
├── 04.mp/        → MP (additional)
├── 100.example/  → Example tests
├── gitlab/       → Gitlab tests
├── simulator/    → Simulator tests
└── unit/         → Unit tests
```

> Save Page classes under `lib/pages/`, **NOT** a top-level `pages/`. Tests import only the composed fixture + use strategies.

### Path Aliases (tsconfig.json)

| Alias | Maps to |
| --- | --- |
| `@pages/*` | `lib/pages/*` |
| `@helper/*` | `lib/helpers/*` |
| `@fixtures/*` | `lib/fixture/*` |
| `@type/*` | `lib/types/*` |
| `@dataFactory/*` | `lib/dataFactory/*` |
| `@strategies/*` | `lib/strategies/*` |
| `@utils/*` | `lib/utils/*` |
| `@setup/*` | `lib/setup/*` |
| `@env/*` | `env/*` |
| `@lib/*` | `lib/*` |

> `@strategies/*` is the only valid alias for `lib/strategies/*` — the legacy misspelled alias was removed (2026-06-12) after migrating all imports.

### Key Patterns

- **Fixture composition:** one composed fixture at `lib/fixture/index.ts` → import via `@fixtures/index`. Helpers (`lib/helpers/`) are NEVER imported directly in tests — always wrapped in a fixture.
- **Strategy + Resolver:** one strategy class per payment type / login system; NO `if/else`/`switch` — use the resolver for runtime selection (e.g. `CreatePaymentResolver.strategies.INTERNATIONAL(page, cardData)`).
- **POM split:** `lib/pages/` = locators (getters) + atomic actions on that page (fill/click with their waits — NO assertions); `lib/helpers/` = cross-page / business flows (UI + API + DB); tests = fixture + strategies + assertions.

### Test Naming

- Describe: `@<system> <action> Tests` (e.g. `@paygate Create Transaction Tests`)
- Test name: `<ID> | <description>` (e.g. `PG-001 | international - general`)
- Filter via `--grep "<ID-or-tag>"`

### Environment Configuration

> ⚠️ **Many environments — NOT fixed to one.** Select at runtime; NEVER hardcode or assume an env. Confirm with the user before running.

- Select via `$env:ENV="<env>"` (PowerShell) — **mandatory**: `lib/env.ts → ENV()` throws if missing (no default).
- **URLs are generated from the env name**, not hardcoded — same name → all endpoints:
  - `mp` → `https://<env>-mp.opdev.vn/` · `ma` → `https://<env>-ma.opdev.vn/`
  - `iportal` → `https://<env>-iportal.opdev.vn/iportal/` · `simulator` → `https://<env>-mtf.opdev.vn/client/qt/`
  - paygate / invoice / API → `https://<env>.opdev.vn/...`
  - `stg` is special-cased (staging URLs from `process.env.*`).
- **DB connections** exist only for envs defined in `configEnv` (`lib/env.ts`) — currently `dev9`, `dev25` active. A new DB-backed env needs an entry there.
- **Skip DB verify (`stg`/`prod`):** `canVerifyDb()` (`lib/env.ts`) is the single rule — `false` on env in `NO_DB_ENVS` (`stg`, `prod`) or when `SKIP_DB_VERIFY=1`. `loadConnectionEnv()` tự gọi `test.skip()` khi `canVerifyDb()` = false → mọi test có bước verify DB tự skip, KHÔNG cần sửa spec. Test muốn giữ phần verify UI trên stg thì tự guard `if (!canVerifyDb()) { ... }` trước khi gọi `loadConnectionEnv()` (mẫu: `tests/00.paygate/ui/01.international/06.AVS/check.autofilling.FirstLastName.spec.ts`).
- **Credentials/secrets:** read via `process.env.*` inside `ENV()`. **NEVER read `.env` directly** — use the `ENV()` helper. Do not commit real credentials.

### Running Tests (npm scripts)

```powershell
$env:ENV="<env>"                # e.g. dev9, dev25, stg — REQUIRED first

npm test                         # chromium, 1 worker
npm run test:headless            # edge channel, 1 worker
npm run test:ui                  # Playwright UI mode (interactive)
npm run test:setup               # login setup → storageState token
npm run report                   # open Playwright HTML report
npm run show:trace <trace.zip>   # open a trace

npm test -- tests/<path> --grep "<ID-or-tag>"   # filter by ID/tag
```

### Playwright Config (authoritative — playwright.config.ts)

| Setting | Value |
| --- | --- |
| globalSetup | `lib/setup/staging.setup.ts` |
| Test timeout | 7,200,000 ms (2h) |
| Action / Navigation timeout | 15,000 ms / 120,000 ms |
| fullyParallel | false |
| Retries / Workers | 2 / 1 on CI · 0 / default locally |
| headless | false (headed by default; **maximized** — `viewport: null` + `--start-maximized`) |
| Screenshot / Video / Trace | only-on-failure / retain-on-failure / **on (always)** |
| storageState | `storage/stg.json` when `ENV=stg` |
| Browsers | chromium (default, maximized), edge (`msedge`, viewport 1920×1080 — headless), firefox, webkit |

> ℹ️ This table is the **authoritative** Playwright config — it overrides any example values in `playwright_rules.md`.

### 🌐 iPortal — Cấu trúc Website (Reference)

> Cây menu iPortal (18 modules), URL/Auth, navigation pattern, test & POM structure là tài liệu tĩnh, **lớn và dễ lỗi thời** → đã tách ra file riêng để tiết kiệm context.
> **Đọc on-demand khi làm task iPortal:** [`.claude/rules/iportal_structure.md`](.claude/rules/iportal_structure.md).

---

### Excel Testcase Files — How to Read

Manual testcase files (`.xlsx`) chứa test cases thủ công. Dùng **MCP Excel tool** để đọc theo 3 bước:

1. **Liệt kê sheets:** `mcp_excel_excel_describe_sheets` với `fileAbsolutePath` (đường dẫn tuyệt đối tới file `.xlsx`).
2. **Đọc header row** (thường ở dòng 6) để biết cột nào là gì: `mcp_excel_excel_read_sheet` với `sheetName` + `range: "A6:Z6"` (định dạng `startCell:endCell`).
3. **Đọc data row** để xem test case cụ thể: `mcp_excel_excel_read_sheet` với cùng `sheetName` + `range: "A9:Z9"` (đổi số dòng theo TC cần đọc).

**Header columns chuẩn (dòng 6):**

| Column | Ý nghĩa |
| --- | --- |
| A | Test Suite Name |
| B | Test Case Name |
| C | Summary |
| D | Preconditions |
| E | Step Number |
| F | Action |
| G | Expected Result |
| H | Execution Type |

> Chỉ đọc đúng `range` cần thiết (header + đúng dòng TC), KHÔNG đọc tràn cả sheet để tiết kiệm token.

---

## 1. Language & Communication

> **Note:** This rules document is written in English for precision; it does NOT change the runtime communication language. All conversation, explanations, and reports with the user MUST be in Vietnamese.

- Always communicate, explain ideas, and report in **Vietnamese**.
- Always address the user as **"Đại ca"** and refer to yourself as **"Tiểu đệ"**.
- Keep explanations **concise, clear, and easy to understand**.
- Avoid programming speculation or vague error explanations without direct evidence.

## 2. Workflow

- **Recon (Investigation):** Always inspect the actual UI or DOM/HTML/XML before writing automation. Absolutely **DO NOT GUESS** locators.
- **Implementation:** Maintain the **Page Object Model (POM)**. Clearly separate Page objects, Test execution, and Utils/Test data.
- **Verify & Self-fix (token-saving):** After coding, run **only a compile check (`npx tsc --noEmit`)** — DO NOT auto-run Playwright tests unless the user explicitly requests it (to save tokens). If the user asks to run tests and a test **FAILS** → read the log → analyze the root cause → fix → rerun **at most 1 round**, then report back (do NOT loop until PASS). Only ask the User when encountering conflicting business rules.
- **Cleanup:** Remove debug logs, redundant code, and unused locators before delivery.

## 3. Supported Tech Stack

| Type | Technology |
| --- | --- |
| Language | TypeScript |
| Web Automation | Playwright (TypeScript) |
| Mobile Automation | Appium *(reference only — chưa dùng thực tế)* |
| Test Framework | Playwright Test |
| Build Tool | npm |

## 4. Reference to Detailed Rules

The agent must refer to the detailed rules in `.claude/rules/`:

- [General Automation Rules](.claude/rules/automation_rules.md) — POM, Test Data, Naming, Assertions
- [Locator Selection Strategy](.claude/rules/locator_strategy.md) — Locator priority order
- [Playwright Rules](.claude/rules/playwright_rules.md) — Browser setup, locator semantic, wait strategy
- [Appium Rules](.claude/rules/appium_rules.md) — Mobile locator, scroll, permission *(reference only)*
- [iPortal Structure](.claude/rules/iportal_structure.md) — iPortal menu tree, navigation, POM structure *(read on-demand)*

## 5. Reference to Skills

The agent uses skills in `.claude/skills/` depending on the task:

| Skill | Role |
| --- | --- |
| `qa_automation_engineer` | Master skill for automation — coordinates the entire process |
| `rbt_manual_testing` | Master skill for manual testing — 2 modes: QUICK (fast TC generation) and FULL RBT (6 steps) |
| `framework_architect` | Design & scaffold a complete automation framework (Playwright/Appium) — structure, base classes, config, reporting, CI/CD |
| `requirements_analyzer` | Analyze requirements from website/documents |
| `ui_debug_agent` | Inspect UI/DOM, collect locators |
| `smart_locator_agent` | Generate new stable locators |
| `locator_healer_agent` | Heal broken locators |
| `test_data_generator` | Generate unique, traceable test data — supports multi-step pipeline & combinatorial data |
| `flaky_test_analyzer` | Analyze and resolve flaky tests |
| `jira_integration` | Jira/Xray integration — fetch requirements, push test results |

## 6. Test Plans (`plans/`)

The `plans/` directory stores generated automation plan documents (planning output, no code). Current files:

- `plans/automation/automation_plan_installment.md`
- `plans/automation_plan_direct_debit_register_to_payment.md`

Plans are produced/consumed by the corresponding workflows (see Section 10):

| Process | Workflow |
| --- | --- |
| Manual TCs — QUICK mode | `/generate_testcases_from_requirements` |
| Manual TCs — FULL RBT mode | `/generate_manual_testcases_rbt` |
| Automation plan (planning only) | `/plan_automation` |
| Manual TCs → automation scripts | `/generate_automation_from_testcases` |
| Cross-module analysis & matrix | `/generate_cross_module_test_plan` |
| Combinatorial test data | `/generate_combinatorial_test_data` |

> New plan documents should be saved under `plans/` following the existing naming pattern (`automation_plan_<feature>.md`).

## 7. Test Data

- All fields requiring **uniqueness** (Email, Username, Code/ID): **MANDATORY** to use random + **traceable** data (`test_name + timestamp + prefix`), never hardcoded.

> **Detail & format examples:** see [General Automation Rules § 2](.claude/rules/automation_rules.md).

## 8. Code Quality (Smart Waits)

- **DO NOT** use hard sleep (`waitForTimeout`, `Thread.sleep`, fixed delay).
- Only use **smart waits** / auto-waiting: Playwright → `expect()` web-first assertions + Locator APIs; Appium → `WebDriverWait` + custom conditions.

> **Detail (wait priority order, `waitForResponse`/`waitForURL`, allowed exceptions):** see [Playwright Rules § 3](.claude/rules/playwright_rules.md) and [Appium Rules § 3](.claude/rules/appium_rules.md).

## 9. Anti-Patterns (FORBIDDEN)

| ❌ Anti-Pattern | ✅ Correct Replacement |
| --- | --- |
| Guess selector / guessing locator | Inspect actual DOM before coding |
| Hard sleep (`waitForTimeout`, `Thread.sleep`) | Smart waits (`expect()`, `WebDriverWait`) |
| Copy selector from old code without verifying | Always verify selector on the current browser |
| Auto-run Playwright tests / loop fixing until PASS without being asked | Run `tsc --noEmit`; only run tests on user request, fix max 1 round then report |
| Commit failing tests (FAIL) | Only commit when tests pass stably (PASS) |
| Leave debug logs / commented code on delivery | Cleanup before delivery |
| Use duplicate hardcoded test data | Generate random + traceable data |

## 10. Reference to Workflows

The agent uses workflows in `.claude/commands/` via slash commands:

| Workflow | Description |
| --- | --- |
| `/generate_requirements_from_website` | Generate requirements from website/module |
| `/analyze_requirement_document` | Analyze requirement document (Jira/.doc) → generate analysis document, DO NOT generate TCs |
| `/generate_manual_testcases_rbt` | Generate manual test cases following AI-RBT 6 steps (FULL RBT mode) |
| `/generate_testcases_from_requirements` | Generate test cases quickly from requirements (QUICK mode) |
| `/generate_automation_from_testcases` | Convert manual test cases → automation scripts |
| `/generate_automation_from_ui_flow` | Generate automation from UI flow directly |
| `/generate_application_test_plan` | Discover app, generate test plan (Mode PLAN) or full suite (Mode FULL) |
| `/generate_automation_framework` | Design automation framework |
| `/generate_locator` | Generate stable locator for UI element |
| `/generate_test_data` | Generate structured test data |
| `/generate_cross_module_test_plan` | Analyze cross-module (2 modes: DOCUMENT/BROWSER), generate combinatorial matrix using pairwise script |
| `/generate_combinatorial_test_data` | Generate test data for combinatorial matrix — offline or pipeline via browser |
| `/generate_api_tests_from_swagger` | Generate API tests from Swagger spec |
| `/analyze_flaky_tests` | Analyze and resolve flaky tests |
| `/fetch_jira_requirements` | Fetch requirements/user stories from Jira |
| `/import_test_results_xray` | Push test results to Xray |
| `/plan_automation` | Analyze requirements/UI flow/API spec → build automation plan (planning only, NO code) |
| `/review_playwright_automation` | Review Playwright/TS automation code → issues table + score + refactor examples |
| `/review_testcase_manual` | Review manual test cases against requirements (9 coverage dimensions) |
| `/update_locator` | Detect & update broken/outdated locators in a Page class |
