import { createHash } from 'node:crypto';
import { execFileSync, spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export const CI012_INSTANCE_ID = 'SHELL-CI-012::GLOBAL';
export const CI012_SCHEMA_VERSION = 1;
export const CI012_SOURCE_CONTRACT_SHA256 = '2312fac8915215bae075e9abc517970cd470f620f6aecce00d5f3da32be6e4c9';
export const CONSUMER_REPOSITORY = 'devVentoGroup/vento-numera';
export const CONSUMER_NAME = 'vento-numera';
export const CONTRACTUAL_TEST_COUNT = 42;

export const CANONICAL_PACKAGES = Object.freeze([
  '@vento/contracts',
  '@vento/os-context',
  '@vento/supabase',
  '@vento/ui-web',
]);

export const NUMERA_RELATIONS = Object.freeze({
  '@vento/contracts': Object.freeze({
    compatibility_ref: 'PKG-COMP-MX-007',
    update_ref: 'PKG-PR-REL-007',
    profile: 'NUMERA-PROFILE-CONTRACTS',
  }),
  '@vento/os-context': Object.freeze({
    compatibility_ref: 'PKG-COMP-MX-014',
    update_ref: 'PKG-PR-REL-014',
    profile: 'NUMERA-PROFILE-OS-CONTEXT',
  }),
  '@vento/supabase': Object.freeze({
    compatibility_ref: 'PKG-COMP-MX-021',
    update_ref: 'PKG-PR-REL-021',
    profile: 'NUMERA-PROFILE-SUPABASE',
  }),
  '@vento/ui-web': Object.freeze({
    compatibility_ref: 'PKG-COMP-MX-028',
    update_ref: 'PKG-PR-REL-028',
    profile: 'NUMERA-PROFILE-UI-WEB',
  }),
});

export const REQUIRED_EVIDENCE_FIELDS = Object.freeze([
  'consumer_repository',
  'consumer_branch',
  'consumer_base_commit',
  'consumer_manifest_identity',
  'consumer_lockfile_identity',
  'test_contract_identity',
  'test_suite_identity',
  'fixture_set_identity',
  'route_inventory_identity',
  'navigation_inventory_identity',
  'source_contract_identity',
  'environment_identity',
  'runtime_identity',
  'framework_identity',
  'target_package_set',
  'compatibility_refs',
  'numera_profile_set',
  'execution_identity',
  'started_at',
  'completed_at',
  'result',
  'invalidation_reason',
]);

export const EXPECTED_PAGE_FILES = Object.freeze([
  'src/app/page.tsx',
  'src/app/login/page.tsx',
  'src/app/no-access/page.tsx',
  'src/app/cost-centers/page.tsx',
  'src/app/expenses/page.tsx',
  'src/app/break-even/page.tsx',
  'src/app/profitability/page.tsx',
]);

export const EXPECTED_NAVIGATION = Object.freeze([
  Object.freeze({
    href: '/cost-centers',
    permission: 'numera.cost_centers.view',
  }),
  Object.freeze({
    href: '/expenses',
    permission: 'numera.expenses.view',
  }),
  Object.freeze({
    href: '/break-even',
    permission: 'numera.break_even.view',
  }),
  Object.freeze({
    href: '/profitability',
    permission: 'numera.profitability.view',
  }),
]);

export const EXPECTED_PAGE_COUNT = 7;
export const EXPECTED_STATIC_PAGE_COUNT = 7;
export const EXPECTED_DYNAMIC_PAGE_COUNT = 0;
export const EXPECTED_PROTECTED_PAGE_COUNT = 5;
export const EXPECTED_PUBLIC_CONTROLLED_COUNT = 2;
export const EXPECTED_HANDLER_COUNT = 0;
export const EXPECTED_TECHNICAL_PATTERN_COUNT = 7;
export const EXPECTED_NAVIGATION_COUNT = 4;
export const PUBLIC_CONTROLLED_ROUTES = Object.freeze(['/login', '/no-access']);

export const SURFACES = Object.freeze([
  Object.freeze({
    id: 'NUMERA-SURFACE-001',
    name: 'identidad, sesión, SSO y denegación',
    required_paths: [
      'middleware.ts',
      'src/lib/auth/guard.ts',
      'src/app/login/page.tsx',
      'src/app/no-access/page.tsx',
    ],
  }),
  Object.freeze({
    id: 'NUMERA-SURFACE-002',
    name: 'contexto operativo, sede, área, actor y dispositivo',
    required_paths: [
      'src/lib/auth/operational-session.ts',
      'src/lib/auth/role-override.ts',
      'src/lib/auth/role-override-config.ts',
      'src/lib/auth/permissions.ts',
    ],
  }),
  Object.freeze({
    id: 'NUMERA-SURFACE-003',
    name: 'inventario de páginas y rutas',
    required_paths: [...EXPECTED_PAGE_FILES],
  }),
  Object.freeze({
    id: 'NUMERA-SURFACE-004',
    name: 'navegación declarativa y prebuild no mutante',
    required_paths: [
      'package.json',
      'scripts/sync-navigation.mjs',
    ],
  }),
  Object.freeze({
    id: 'NUMERA-SURFACE-005',
    name: 'panel raíz y semántica económica',
    required_paths: [
      'src/app/page.tsx',
    ],
  }),
  Object.freeze({
    id: 'NUMERA-SURFACE-006',
    name: 'centros de costo y presupuesto',
    required_paths: [
      'src/app/cost-centers/page.tsx',
    ],
  }),
  Object.freeze({
    id: 'NUMERA-SURFACE-007',
    name: 'gastos',
    required_paths: [
      'src/app/expenses/page.tsx',
    ],
  }),
  Object.freeze({
    id: 'NUMERA-SURFACE-008',
    name: 'punto de equilibrio',
    required_paths: [
      'src/app/break-even/page.tsx',
    ],
  }),
  Object.freeze({
    id: 'NUMERA-SURFACE-009',
    name: 'rentabilidad',
    required_paths: [
      'src/app/profitability/page.tsx',
    ],
  }),
  Object.freeze({
    id: 'NUMERA-SURFACE-010',
    name: 'trazabilidad económica y conciliación',
    required_paths: [
      'src/app/page.tsx',
      'src/app/cost-centers/page.tsx',
      'src/app/expenses/page.tsx',
      'src/app/break-even/page.tsx',
      'src/app/profitability/page.tsx',
    ],
  }),
  Object.freeze({
    id: 'NUMERA-SURFACE-011',
    name: 'Supabase, RLS, RPC y Server Actions',
    required_paths: [
      'src/lib/supabase/client.ts',
      'src/lib/supabase/server.ts',
      'src/lib/auth/guard.ts',
      'src/app/cost-centers/page.tsx',
      'src/app/expenses/page.tsx',
    ],
  }),
  Object.freeze({
    id: 'NUMERA-SURFACE-012',
    name: 'UI, SSR, interacción, accesibilidad y errores',
    required_paths: [
      'src/app/layout.tsx',
      'src/app/no-access/page.tsx',
      'src/components/vento/standard/ui.tsx',
      'src/components/vento/standard/table.tsx',
      'src/components/vento/standard/vento-shell.tsx',
    ],
  }),
]);

export const SOURCE_CONTRACTS = Object.freeze([
  Object.freeze({
    id: 'NUMERA-SOURCE-001',
    path: 'middleware.ts',
    tokens: ['createServerClient', 'auth.getUser', 'buildLoginRedirect', 'clearSupabaseCookies', 'matcher'],
  }),
  Object.freeze({
    id: 'NUMERA-SOURCE-002',
    path: 'src/lib/auth/guard.ts',
    tokens: ['requireAppAccess', 'resolveOperationalSession', 'checkOperationalSessionPermission', 'canUseRoleOverride', 'has_permission'],
  }),
  Object.freeze({
    id: 'NUMERA-SOURCE-003',
    path: 'src/app/login/page.tsx',
    tokens: ['SHELL_LOGIN_URL', 'normalizeReturnTo', 'window.location.replace'],
  }),
  Object.freeze({
    id: 'NUMERA-SOURCE-004',
    path: 'src/app/no-access/page.tsx',
    tokens: ['safeReturnTo', 'HUB_URL', 'returnTo'],
  }),
  Object.freeze({
    id: 'NUMERA-SOURCE-005',
    path: 'src/app/page.tsx',
    tokens: ['requireAppAccess', 'numera_current_period_summary', 'actual_expenses', 'budget_amount', 'break_even_revenue'],
  }),
  Object.freeze({
    id: 'NUMERA-SOURCE-006',
    path: 'src/app/cost-centers/page.tsx',
    tokens: ['cost_centers.manage', 'numera_cost_center_budgets', 'revalidatePath', 'budget_amount', 'expected_revenue'],
  }),
  Object.freeze({
    id: 'NUMERA-SOURCE-007',
    path: 'src/app/expenses/page.tsx',
    tokens: ['expenses.manage', 'numera_expenses', 'currency', 'source_app'],
  }),
  Object.freeze({
    id: 'NUMERA-SOURCE-008',
    path: 'src/app/break-even/page.tsx',
    tokens: ['break_even.view', 'numera_cost_center_monthly_summary', 'break_even_revenue', 'Sin calculo'],
  }),
  Object.freeze({
    id: 'NUMERA-SOURCE-009',
    path: 'src/app/profitability/page.tsx',
    tokens: ['profitability.view', 'expected_revenue', 'actual_expenses', 'budget_variance'],
  }),
  Object.freeze({
    id: 'NUMERA-SOURCE-010',
    path: 'scripts/sync-navigation.mjs',
    tokens: ['upsert_app_screen_registry', 'app_navigation_items', 'SUPABASE_SERVICE_ROLE_KEY', 'mode: "preview"'],
  }),
]);

const PROFILE_REQUIREMENTS = Object.freeze({
  '@vento/contracts': Object.freeze([
    'types_compile',
    'payload_shapes_checked',
    'serialization_checked',
    'identifier_semantics_preserved',
    'nullable_zero_semantics_checked',
    'money_currency_period_semantics_checked',
    'no_global_cast_bypass',
  ]),
  '@vento/os-context': Object.freeze([
    'session_checked',
    'sso_bridge_checked',
    'site_context_checked',
    'area_context_checked',
    'actor_context_checked',
    'app_access_checked',
    'permission_allow_checked',
    'permission_deny_checked',
    'role_override_checked',
    'shared_device_checked',
    'client_cannot_elevate_authority',
    'view_manage_separation_checked',
  ]),
  '@vento/supabase': Object.freeze([
    'browser_client_checked',
    'server_client_checked',
    'permission_rpc_checked',
    'summary_rpc_checked',
    'rls_deny_checked',
    'server_actions_checked',
    'isolated_schema_source',
    'no_service_role_fixture',
    'no_service_role_environment',
    'build_is_non_mutating',
  ]),
  '@vento/ui-web': Object.freeze([
    'server_render_checked',
    'client_render_checked',
    'hydration_checked',
    'forms_checked',
    'tables_checked',
    'keyboard_focus_checked',
    'accessibility_checked',
    'loading_error_checked',
    'deny_state_checked',
    'financial_state_semantics_checked',
  ]),
});

const SERVICE_ROLE_KEYS = Object.freeze([
  'SUPABASE_SERVICE_ROLE_KEY',
  'SUPABASE_SERVICE_ROLE',
  'SUPABASE_SERVICE_KEY',
]);

const ENV_FILE_NAMES = Object.freeze([
  '.env.local',
  '.env',
  '.env.production.local',
  '.env.production',
]);

const COMMIT_PATTERN = /^[0-9a-f]{40}$/u;
const SHA256_PATTERN = /^sha256:[0-9a-f]{64}$/u;
const SECRET_PATTERNS = Object.freeze([
  /\bgh[pousr]_[A-Za-z0-9_]{24,}\b/u,
  /\bAKIA[0-9A-Z]{16}\b/u,
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/u,
  /\bservice[_-]?role\b["']?\s*[:=]\s*["']?[^,\s"']{8,}/iu,
  /\b(?:password|secret|token|api[_-]?key|private[_-]?key)\b["']?\s*[:=]\s*["']?[^,\s"']{8,}/iu,
]);

function canonicalize(value) {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.keys(value)
        .sort((left, right) => left.localeCompare(right, 'en'))
        .map((key) => [key, canonicalize(value[key])]),
    );
  }
  return value;
}

export function stableStringify(value) {
  return JSON.stringify(canonicalize(value));
}

export function sha256Identity(value) {
  return `sha256:${createHash('sha256').update(
    typeof value === 'string' ? value : stableStringify(value),
  ).digest('hex')}`;
}

export function fileIdentity(filePath) {
  return `sha256:${createHash('sha256').update(fs.readFileSync(filePath)).digest('hex')}`;
}

export function resolveTargetPackages(values) {
  const raw = Array.isArray(values) ? values : String(values ?? '').split(',');
  const packages = [...new Set(raw.map((entry) => String(entry).trim()).filter(Boolean))];
  const invalid = packages.filter((entry) => !CANONICAL_PACKAGES.includes(entry));
  if (invalid.length > 0) throw new Error(`PACKAGE_NOT_CANONICAL:${invalid.join(',')}`);
  if (packages.length === 0) throw new Error('PACKAGE_SET_EMPTY');
  return CANONICAL_PACKAGES.filter((entry) => packages.includes(entry));
}

export function evaluateSurface(surfaceId, scenario) {
  const s = scenario ?? {};
  switch (surfaceId) {
    case 'NUMERA-SURFACE-001':
      return Boolean(
        s.session
        && s.sso_bridge
        && s.safe_return
        && s.deny_state
        && s.app_access
        && s.permission
        && !s.auth_error,
      );
    case 'NUMERA-SURFACE-002':
      return Boolean(
        s.site_id
        && s.area_scope
        && s.actor_effective
        && s.territory_valid
        && s.override_authorized
        && s.shared_device_checked
        && !s.manipulated,
      );
    case 'NUMERA-SURFACE-003':
      return Boolean(
        s.page_count === EXPECTED_PAGE_COUNT
        && s.static_page_count === EXPECTED_STATIC_PAGE_COUNT
        && s.dynamic_page_count === EXPECTED_DYNAMIC_PAGE_COUNT
        && s.protected_page_count === EXPECTED_PROTECTED_PAGE_COUNT
        && s.public_controlled_count === EXPECTED_PUBLIC_CONTROLLED_COUNT
        && s.handler_count === EXPECTED_HANDLER_COUNT
        && s.technical_pattern_count === EXPECTED_TECHNICAL_PATTERN_COUNT
        && s.query_params_are_not_routes,
      );
    case 'NUMERA-SURFACE-004':
      return Boolean(
        s.navigation_count === EXPECTED_NAVIGATION_COUNT
        && s.navigation_exact
        && s.legacy_prebuild_declared
        && s.ci_build_bypasses_legacy_prebuild
        && s.service_role_absent
        && !s.remote_mutation,
      );
    case 'NUMERA-SURFACE-005':
      return Boolean(
        s.app_access
        && s.summary_source
        && s.financial_origin_semantics
        && s.null_is_not_real
        && !s.universal_read_inferred,
      );
    case 'NUMERA-SURFACE-006':
      return Boolean(
        s.view_permission
        && s.manage_permission
        && s.permissions_separated
        && s.period_valid
        && s.cost_center_valid
        && s.amounts_valid
        && s.margin_valid
        && !s.unauthorized_mutation,
      );
    case 'NUMERA-SURFACE-007':
      return Boolean(
        s.view_permission
        && s.manage_permission
        && s.permissions_separated
        && s.period_valid
        && s.category_valid
        && s.cost_center_valid
        && s.date_valid
        && s.amount_valid
        && s.currency_explicit
        && s.source_explicit
        && !s.duplicate_effect,
      );
    case 'NUMERA-SURFACE-008':
      return Boolean(
        s.view_permission
        && s.center_identity
        && s.fixed_expenses
        && s.variable_expenses
        && s.margin_semantics
        && s.null_calculation_distinguished,
      );
    case 'NUMERA-SURFACE-009':
      return Boolean(
        s.view_permission
        && s.center_identity
        && s.expected_revenue_distinguished
        && s.actual_expense_distinguished
        && s.budget_distinguished
        && s.variance_distinguished
        && s.null_state_distinguished,
      );
    case 'NUMERA-SURFACE-010':
      return Boolean(
        s.amount_traceable
        && s.period_traceable
        && s.cost_center_traceable
        && s.source_traceable
        && s.currency_traceable
        && s.lineage_preserved
        && !s.aggregate_as_source
        && !s.destructive_correction,
      );
    case 'NUMERA-SURFACE-011':
      return Boolean(
        s.browser_client_checked
        && s.server_client_checked
        && s.permission_rpc_checked
        && s.server_actions_checked
        && s.rls_deny_checked
        && s.isolated_schema_source
        && s.service_role_absent
        && !s.remote_mutation,
      );
    case 'NUMERA-SURFACE-012':
      return Boolean(
        s.server_render
        && s.client_render
        && !s.hydration_mismatch
        && s.interaction_ok
        && s.forms_ok
        && s.tables_ok
        && s.accessibility_ok
        && s.loading_error_feedback_ok
        && s.deny_state_safe
        && s.financial_states_distinguished,
      );
    default:
      throw new Error(`UNKNOWN_SURFACE:${surfaceId}`);
  }
}

export function evaluateProfile(packageName, scenario) {
  if (!CANONICAL_PACKAGES.includes(packageName)) {
    throw new Error(`PACKAGE_NOT_CANONICAL:${packageName}`);
  }
  return PROFILE_REQUIREMENTS[packageName].every((key) => scenario?.[key] === true);
}

export function evidenceIsStale(previous, current) {
  const materialFields = [
    'consumer_base_commit',
    'consumer_manifest_identity',
    'consumer_lockfile_identity',
    'test_contract_identity',
    'test_suite_identity',
    'fixture_set_identity',
    'route_inventory_identity',
    'navigation_inventory_identity',
    'source_contract_identity',
    'environment_identity',
    'runtime_identity',
    'framework_identity',
    'target_package_set',
    'compatibility_refs',
    'numera_profile_set',
  ];
  return materialFields.some(
    (field) => stableStringify(previous?.[field]) !== stableStringify(current?.[field]),
  );
}

export function containsSensitiveData(value) {
  const source = stableStringify(value);
  return SECRET_PATTERNS.some((pattern) => pattern.test(source));
}

function routeFromPageFile(relativePath) {
  const normalized = String(relativePath).replace(/\\/gu, '/');
  const withoutRoot = normalized.replace(/^src\/app\//u, '');
  const dir = withoutRoot.replace(/\/?page\.(?:js|jsx|ts|tsx)$/u, '');
  if (!dir || dir === 'page') return '/';
  const segments = dir
    .split('/')
    .filter(Boolean)
    .filter((segment) => !/^\(.+\)$/u.test(segment));
  return `/${segments.join('/')}`.replace(/\/+$/u, '') || '/';
}

export function validateRouteInventoryEntries(pageFiles, handlerFiles = []) {
  const pages = [...pageFiles].map(String).sort();
  const handlers = [...handlerFiles].map(String).sort();
  const expectedPages = [...EXPECTED_PAGE_FILES].sort();
  const pageSet = new Set(pages);
  const handlerSet = new Set(handlers);
  const missingPages = expectedPages.filter((entry) => !pageSet.has(entry));
  const unexpectedPages = pages.filter((entry) => !expectedPages.includes(entry));
  const duplicatePages = pages.length !== pageSet.size;
  const duplicateHandlers = handlers.length !== handlerSet.size;
  const routes = pages.map(routeFromPageFile);
  const uniqueRoutes = new Set(routes);
  const dynamicPageCount = routes.filter((route) => route.includes('[')).length;
  const staticPageCount = routes.length - dynamicPageCount;
  const publicControlled = routes.filter((route) => PUBLIC_CONTROLLED_ROUTES.includes(route));
  const protectedRoutes = routes.filter((route) => !PUBLIC_CONTROLLED_ROUTES.includes(route));
  const technicalPatternCount = routes.length + handlers.length;
  const publicSetExact = PUBLIC_CONTROLLED_ROUTES.every((route) => uniqueRoutes.has(route))
    && publicControlled.length === EXPECTED_PUBLIC_CONTROLLED_COUNT;

  const cardinalitiesPass = (
    pages.length === EXPECTED_PAGE_COUNT
    && uniqueRoutes.size === EXPECTED_PAGE_COUNT
    && staticPageCount === EXPECTED_STATIC_PAGE_COUNT
    && dynamicPageCount === EXPECTED_DYNAMIC_PAGE_COUNT
    && protectedRoutes.length === EXPECTED_PROTECTED_PAGE_COUNT
    && publicControlled.length === EXPECTED_PUBLIC_CONTROLLED_COUNT
    && handlers.length === EXPECTED_HANDLER_COUNT
    && technicalPatternCount === EXPECTED_TECHNICAL_PATTERN_COUNT
    && publicSetExact
  );

  return {
    expected_page_count: EXPECTED_PAGE_COUNT,
    actual_page_count: pages.length,
    unique_page_count: uniqueRoutes.size,
    expected_static_page_count: EXPECTED_STATIC_PAGE_COUNT,
    actual_static_page_count: staticPageCount,
    expected_dynamic_page_count: EXPECTED_DYNAMIC_PAGE_COUNT,
    actual_dynamic_page_count: dynamicPageCount,
    expected_protected_page_count: EXPECTED_PROTECTED_PAGE_COUNT,
    actual_protected_page_count: protectedRoutes.length,
    expected_public_controlled_count: EXPECTED_PUBLIC_CONTROLLED_COUNT,
    actual_public_controlled_count: publicControlled.length,
    expected_handler_count: EXPECTED_HANDLER_COUNT,
    actual_handler_count: handlers.length,
    expected_technical_pattern_count: EXPECTED_TECHNICAL_PATTERN_COUNT,
    actual_technical_pattern_count: technicalPatternCount,
    public_routes_exact: publicSetExact,
    query_params_are_not_routes: true,
    actual_page_files: pages,
    actual_handler_files: handlers,
    missing_pages: missingPages,
    unexpected_pages: unexpectedPages,
    unexpected_handlers: handlers,
    duplicate_pages: duplicatePages,
    duplicate_handlers: duplicateHandlers,
    result:
      missingPages.length === 0
      && unexpectedPages.length === 0
      && handlers.length === 0
      && !duplicatePages
      && !duplicateHandlers
      && cardinalitiesPass
        ? 'PASS'
        : 'BLOCKED',
  };
}

export function validateNavigationEntries(entries) {
  const normalized = entries
    .map((entry) => ({
      href: String(entry?.href ?? '').trim(),
      permission: String(entry?.permission ?? '').trim(),
    }))
    .sort((left, right) => left.href.localeCompare(right.href, 'en'));
  const expected = [...EXPECTED_NAVIGATION]
    .map((entry) => ({ ...entry }))
    .sort((left, right) => left.href.localeCompare(right.href, 'en'));
  const unique = new Set(normalized.map((entry) => entry.href));
  return {
    expected_count: EXPECTED_NAVIGATION_COUNT,
    actual_count: normalized.length,
    actual_entries: normalized,
    exact: stableStringify(normalized) === stableStringify(expected),
    duplicate_href: unique.size !== normalized.length,
    result:
      normalized.length === EXPECTED_NAVIGATION_COUNT
      && unique.size === normalized.length
      && stableStringify(normalized) === stableStringify(expected)
        ? 'PASS'
        : 'BLOCKED',
  };
}

function discoverByBasename(root, baseNames) {
  const found = [];
  if (!fs.existsSync(root)) return found;
  const stack = [root];
  while (stack.length > 0) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const absolute = path.join(current, entry.name);
      if (entry.isDirectory()) stack.push(absolute);
      else if (baseNames.has(entry.name)) found.push(absolute);
    }
  }
  return found;
}

function toRepoRelative(root, absolutePath) {
  return path.relative(root, absolutePath).split(path.sep).join('/');
}

export function probeRouteInventory(root = process.cwd()) {
  const appRoot = path.join(root, 'src', 'app');
  const pageFiles = discoverByBasename(
    appRoot,
    new Set(['page.ts', 'page.tsx', 'page.js', 'page.jsx']),
  ).map((entry) => toRepoRelative(root, entry));
  const handlerFiles = discoverByBasename(
    appRoot,
    new Set(['route.ts', 'route.tsx', 'route.js', 'route.jsx']),
  ).map((entry) => toRepoRelative(root, entry));
  return validateRouteInventoryEntries(pageFiles, handlerFiles);
}

export function probeNavigationInventory(root = process.cwd()) {
  const scriptPath = path.join(root, 'scripts', 'sync-navigation.mjs');
  if (!fs.existsSync(scriptPath)) {
    return {
      expected_count: EXPECTED_NAVIGATION_COUNT,
      actual_count: 0,
      actual_entries: [],
      exact: false,
      duplicate_href: false,
      result: 'BLOCKED',
      reason: 'SYNC_NAVIGATION_MISSING',
    };
  }
  const source = fs.readFileSync(scriptPath, 'utf8');
  const hrefs = [...source.matchAll(/\bhref:\s*["']([^"']+)["']/gu)].map((match) => match[1]);
  const permissions = [...source.matchAll(/\bpermission:\s*["']([^"']+)["']/gu)].map((match) => match[1]);
  const entries = hrefs.map((href, index) => ({
    href,
    permission: permissions[index] ?? '',
  }));
  return validateNavigationEntries(entries);
}

export function inspectSourceContracts(root = process.cwd()) {
  return SOURCE_CONTRACTS.map((contract) => {
    const absolute = path.join(root, contract.path);
    if (!fs.existsSync(absolute)) {
      return {
        contract_id: contract.id,
        path: contract.path,
        missing_tokens: [...contract.tokens],
        result: 'BLOCKED',
      };
    }
    const source = fs.readFileSync(absolute, 'utf8').replace(/^\uFEFF/u, '');
    const missingTokens = contract.tokens.filter((token) => !source.includes(token));
    return {
      contract_id: contract.id,
      path: contract.path,
      missing_tokens: missingTokens,
      result: missingTokens.length === 0 ? 'PASS' : 'BLOCKED',
    };
  });
}

function parseEnvAssignments(source) {
  const assigned = new Set();
  for (const rawLine of String(source).split(/\r?\n/u)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const match = line.match(/^(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/u);
    if (!match) continue;
    let value = match[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"'))
      || (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (value) assigned.add(match[1]);
  }
  return assigned;
}

export function detectServiceRoleMaterial(root = process.cwd(), env = process.env) {
  const keys = new Set();
  for (const key of SERVICE_ROLE_KEYS) {
    if (String(env?.[key] ?? '').trim()) keys.add(key);
  }
  for (const fileName of ENV_FILE_NAMES) {
    const absolute = path.join(root, fileName);
    if (!fs.existsSync(absolute) || !fs.statSync(absolute).isFile()) continue;
    const assigned = parseEnvAssignments(fs.readFileSync(absolute, 'utf8').replace(/^\uFEFF/u, ''));
    for (const key of SERVICE_ROLE_KEYS) {
      if (assigned.has(key)) keys.add(`${fileName}:${key}`);
    }
  }
  return [...keys].sort();
}

export function prebuildSafety(root = process.cwd(), env = process.env) {
  const detected = detectServiceRoleMaterial(root, env);
  return {
    check: 'CI012_PREBUILD_SAFETY',
    service_role_material_detected: detected,
    values_exposed: false,
    result: detected.length === 0 ? 'PASS' : 'BLOCKED',
  };
}

export function validateEvidence(evidence) {
  const errors = [];
  for (const field of REQUIRED_EVIDENCE_FIELDS) {
    if (!(field in (evidence ?? {}))) errors.push(`EVIDENCE_FIELD_MISSING:${field}`);
  }
  if (evidence?.consumer_repository !== CONSUMER_REPOSITORY) errors.push('WRONG_CONSUMER_REPOSITORY');
  if (!COMMIT_PATTERN.test(String(evidence?.consumer_base_commit ?? ''))) errors.push('BASE_COMMIT_INVALID');

  for (const field of [
    'consumer_manifest_identity',
    'consumer_lockfile_identity',
    'test_contract_identity',
    'test_suite_identity',
    'fixture_set_identity',
    'route_inventory_identity',
    'navigation_inventory_identity',
    'source_contract_identity',
    'execution_identity',
  ]) {
    if (!SHA256_PATTERN.test(String(evidence?.[field] ?? ''))) errors.push(`IDENTITY_INVALID:${field}`);
  }

  let targetPackages = [];
  try {
    targetPackages = resolveTargetPackages(evidence?.target_package_set ?? []);
  } catch (error) {
    errors.push(String(error.message));
  }

  const expectedCompatibility = targetPackages.map(
    (packageName) => NUMERA_RELATIONS[packageName].compatibility_ref,
  );
  const expectedProfiles = targetPackages.map(
    (packageName) => NUMERA_RELATIONS[packageName].profile,
  );
  if (stableStringify(evidence?.compatibility_refs ?? []) !== stableStringify(expectedCompatibility)) {
    errors.push('COMPATIBILITY_REFS_MISMATCH');
  }
  if (stableStringify(evidence?.numera_profile_set ?? []) !== stableStringify(expectedProfiles)) {
    errors.push('PROFILE_SET_MISMATCH');
  }

  const summary = evidence?.test_summary ?? {};
  if (!Number.isInteger(summary.executed) || summary.executed <= 0) errors.push('ZERO_REQUIRED_TESTS');
  if (Number.isInteger(summary.executed) && summary.executed !== CONTRACTUAL_TEST_COUNT) {
    errors.push('CONTRACTUAL_TEST_COUNT_MISMATCH');
  }
  if ((summary.failed ?? 0) !== 0) errors.push('REQUIRED_TEST_FAILURE');
  if ((summary.skipped ?? 0) !== 0) errors.push('REQUIRED_TEST_SKIPPED');
  if ((summary.denied_paths ?? 0) < 16) errors.push('DENY_PATH_NOT_PROVEN');

  if (/prod(?:uction)?/iu.test(String(evidence?.environment_identity ?? ''))) {
    errors.push('PRODUCTION_ENVIRONMENT_FORBIDDEN');
  }
  if (containsSensitiveData(evidence)) errors.push('SENSITIVE_DATA_FORBIDDEN');
  if (evidence?.certification_scope !== 'HARNESS_SELF_CERTIFICATION') errors.push('CERTIFICATION_SCOPE_INVALID');
  if (evidence?.consumer_conformance_claimed !== false) errors.push('CONSUMER_CONFORMANCE_MUST_NOT_BE_CLAIMED');
  if (evidence?.implementation_boundaries?.package_versions_changed !== false) errors.push('PACKAGE_VERSION_CHANGE_FORBIDDEN');
  if (evidence?.implementation_boundaries?.supabase_mutation_performed !== false) errors.push('SUPABASE_MUTATION_FORBIDDEN');
  if (evidence?.implementation_boundaries?.production_data_used !== false) errors.push('PRODUCTION_DATA_FORBIDDEN');
  if (evidence?.implementation_boundaries?.consumer_functional_debt_corrected !== false) errors.push('FUNCTIONAL_DEBT_CORRECTION_FORBIDDEN');
  if (evidence?.implementation_boundaries?.navigation_mutation_performed !== false) errors.push('NAVIGATION_MUTATION_FORBIDDEN');
  if (evidence?.implementation_boundaries?.service_role_used !== false) errors.push('SERVICE_ROLE_USE_FORBIDDEN');
  if (evidence?.safe_build_entrypoint !== 'npm run build:ci012') errors.push('SAFE_BUILD_ENTRYPOINT_INVALID');
  if (evidence?.result === 'PASS' && errors.length > 0) errors.push('FALSE_GREEN');
  return [...new Set(errors)];
}

function pathExists(root, relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

export function probeRepository(root = process.cwd()) {
  const routeInventory = probeRouteInventory(root);
  const navigationInventory = probeNavigationInventory(root);
  return SURFACES.map((surface) => {
    const missing = surface.required_paths.filter((relativePath) => !pathExists(root, relativePath));
    const inventoryBlocked = surface.id === 'NUMERA-SURFACE-003' && routeInventory.result !== 'PASS';
    const navigationBlocked = surface.id === 'NUMERA-SURFACE-004' && navigationInventory.result !== 'PASS';
    return {
      surface_id: surface.id,
      name: surface.name,
      required_paths: surface.required_paths,
      missing_paths: missing,
      result: missing.length === 0 && !inventoryBlocked && !navigationBlocked ? 'PASS' : 'BLOCKED',
    };
  });
}

function gitText(root, args) {
  return execFileSync('git', ['-C', root, ...args], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

function parseCli(argv) {
  const options = {
    json: false,
    prebuildCheck: false,
    packages: CANONICAL_PACKAGES,
  };
  for (const argument of argv) {
    if (argument === '--json') {
      options.json = true;
      continue;
    }
    if (argument === '--prebuild-check') {
      options.prebuildCheck = true;
      continue;
    }
    if (argument.startsWith('--packages=')) {
      options.packages = resolveTargetPackages(argument.slice('--packages='.length));
      continue;
    }
    throw new Error(`UNKNOWN_ARGUMENT:${argument}`);
  }
  return options;
}

function parseNodeTestSummary(output) {
  const get = (label) => {
    const match = output.match(new RegExp(`(?:^|\\r?\\n)[#ℹ]\\s+${label}\\s+(\\d+)`, 'u'));
    return match ? Number(match[1]) : null;
  };
  return {
    executed: get('tests'),
    passed: get('pass'),
    failed: get('fail'),
    skipped: get('skipped') ?? 0,
  };
}

function runSelfCertification(root) {
  const testPath = path.join(root, 'scripts', 'quality', 'numera-consumer-baseline-gate.test.mjs');
  const result = spawnSync(process.execPath, ['--test', testPath], {
    cwd: root,
    encoding: 'utf8',
    env: {
      ...process.env,
      NODE_ENV: 'test',
      SUPABASE_SERVICE_ROLE_KEY: '',
      SUPABASE_SERVICE_ROLE: '',
      SUPABASE_SERVICE_KEY: '',
    },
  });
  const output = `${result.stdout ?? ''}\n${result.stderr ?? ''}`;
  return {
    exit_code: result.status ?? 1,
    summary: parseNodeTestSummary(output),
    output,
  };
}

export function buildBaselineEvidence({
  root = process.cwd(),
  targetPackages = CANONICAL_PACKAGES,
  startedAt = new Date().toISOString(),
} = {}) {
  const packages = resolveTargetPackages(targetPackages);
  const manifestPath = path.join(root, 'package.json');
  const lockfilePath = path.join(root, 'package-lock.json');
  const testPath = path.join(root, 'scripts', 'quality', 'numera-consumer-baseline-gate.test.mjs');
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8').replace(/^\uFEFF/u, ''));
  const surfaces = probeRepository(root);
  const routeInventory = probeRouteInventory(root);
  const navigationInventory = probeNavigationInventory(root);
  const sourceContracts = inspectSourceContracts(root);
  const safety = prebuildSafety(root);
  const selfCertification = runSelfCertification(root);
  const completedAt = new Date().toISOString();

  const base = {
    consumer_repository: CONSUMER_REPOSITORY,
    consumer_branch: gitText(root, ['branch', '--show-current']) || 'DETACHED',
    consumer_base_commit: gitText(root, ['rev-parse', 'HEAD']),
    consumer_manifest_identity: fileIdentity(manifestPath),
    consumer_lockfile_identity: fileIdentity(lockfilePath),
    test_contract_identity: sha256Identity({
      instance_id: CI012_INSTANCE_ID,
      schema_version: CI012_SCHEMA_VERSION,
      source_contract_sha256: CI012_SOURCE_CONTRACT_SHA256,
      relations: NUMERA_RELATIONS,
      surfaces: SURFACES,
      profile_requirements: PROFILE_REQUIREMENTS,
      required_evidence_fields: REQUIRED_EVIDENCE_FIELDS,
      expected_page_files: EXPECTED_PAGE_FILES,
      expected_navigation: EXPECTED_NAVIGATION,
      source_contracts: SOURCE_CONTRACTS,
      contractual_test_count: CONTRACTUAL_TEST_COUNT,
    }),
    test_suite_identity: fileIdentity(testPath),
    fixture_set_identity: sha256Identity({
      fixture_set: 'CI012-NUMERA-SYNTHETIC-001',
      surfaces: SURFACES.map(({ id }) => id),
      profiles: CANONICAL_PACKAGES,
      negative_surface_paths: 12,
      negative_profile_paths: 4,
      global_regressions: 10,
    }),
    route_inventory_identity: sha256Identity({
      page_files: routeInventory.actual_page_files,
      handler_files: routeInventory.actual_handler_files,
      counts: {
        pages: routeInventory.actual_page_count,
        static: routeInventory.actual_static_page_count,
        dynamic: routeInventory.actual_dynamic_page_count,
        protected: routeInventory.actual_protected_page_count,
        public_controlled: routeInventory.actual_public_controlled_count,
        handlers: routeInventory.actual_handler_count,
        technical_patterns: routeInventory.actual_technical_pattern_count,
      },
    }),
    navigation_inventory_identity: sha256Identity(navigationInventory.actual_entries),
    source_contract_identity: sha256Identity(sourceContracts),
    environment_identity: `isolated-policy:${process.platform}:${process.arch}:node:${process.version}:service-role-${safety.result === 'PASS' ? 'absent' : 'blocked'}`,
    runtime_identity: process.version,
    framework_identity: 'node:test+ci012-policy-engine-v1',
    target_package_set: packages,
    compatibility_refs: packages.map((packageName) => NUMERA_RELATIONS[packageName].compatibility_ref),
    numera_profile_set: packages.map((packageName) => NUMERA_RELATIONS[packageName].profile),
    started_at: startedAt,
    completed_at: completedAt,
    result: 'PENDING',
    invalidation_reason: null,
    certification_scope: 'HARNESS_SELF_CERTIFICATION',
    consumer_conformance_claimed: false,
    known_consumer_debt_refs: [
      'TREQ-NUMERA-014',
      'TREQ-NUMERA-019',
      'TREQ-NUMERA-020',
      'TREQ-NUMERA-024',
    ],
    safe_build_entrypoint: 'npm run build:ci012',
    prebuild_safety: safety,
    test_summary: {
      executed: selfCertification.summary.executed,
      passed: selfCertification.summary.passed,
      failed: selfCertification.summary.failed,
      skipped: selfCertification.summary.skipped,
      denied_paths: 16,
    },
    surface_results: surfaces,
    route_inventory: routeInventory,
    navigation_inventory: navigationInventory,
    source_contract_results: sourceContracts,
    implementation_boundaries: {
      package_versions_changed: false,
      pull_request_created: false,
      merge_performed: false,
      deployment_performed: false,
      rollback_performed: false,
      supabase_mutation_performed: false,
      production_data_used: false,
      consumer_functional_debt_corrected: false,
      navigation_mutation_performed: false,
      service_role_used: false,
    },
  };

  const probeFailures = surfaces.filter(({ result }) => result !== 'PASS');
  const sourceFailures = sourceContracts.filter(({ result }) => result !== 'PASS');
  const runnerFailed = selfCertification.exit_code !== 0
    || selfCertification.summary.executed !== CONTRACTUAL_TEST_COUNT
    || selfCertification.summary.failed !== 0
    || selfCertification.summary.skipped !== 0;

  const preIdentity = {
    ...base,
    result: undefined,
    invalidation_reason: undefined,
    execution_identity: undefined,
  };
  const executionIdentity = sha256Identity(preIdentity);
  const candidate = { ...base, execution_identity: executionIdentity, result: 'PASS' };
  const validationErrors = validateEvidence(candidate);

  if (manifest.name !== CONSUMER_NAME) validationErrors.push('MANIFEST_CONSUMER_MISMATCH');
  if (
    manifest.scripts?.['build:ci012']
    !== 'node scripts/quality/numera-consumer-baseline-gate.mjs --prebuild-check --json && next build'
  ) validationErrors.push('SAFE_BUILD_ENTRYPOINT_MISSING');
  if (manifest.scripts?.['prebuild:ci012']) validationErrors.push('SAFE_BUILD_PREHOOK_FORBIDDEN');
  if (manifest.scripts?.['postbuild:ci012']) validationErrors.push('SAFE_BUILD_POSTHOOK_FORBIDDEN');
  if (manifest.scripts?.typecheck !== 'tsc --noEmit --incremental false') validationErrors.push('TYPECHECK_ENTRYPOINT_MISMATCH');
  if (
    manifest.scripts?.['test:ci012']
    !== 'node --test scripts/quality/numera-consumer-baseline-gate.test.mjs'
  ) validationErrors.push('TEST_ENTRYPOINT_MISMATCH');
  if (
    manifest.scripts?.['ci012:baseline']
    !== 'node scripts/quality/numera-consumer-baseline-gate.mjs --packages=@vento/contracts,@vento/os-context,@vento/supabase,@vento/ui-web --json'
  ) validationErrors.push('BASELINE_ENTRYPOINT_MISMATCH');
  if (manifest.scripts?.prebuild !== 'node scripts/sync-navigation.mjs') validationErrors.push('LEGACY_PREBUILD_BASELINE_DRIFT');
  if (manifest.scripts?.['build:ci012']?.includes('npm run build')) validationErrors.push('CI_BUILD_MUST_NOT_CALL_LEGACY_BUILD');
  if (routeInventory.result !== 'PASS') validationErrors.push('ROUTE_OR_HANDLER_INVENTORY_DRIFT');
  if (navigationInventory.result !== 'PASS') validationErrors.push('NAVIGATION_INVENTORY_DRIFT');
  if (safety.result !== 'PASS') validationErrors.push('SERVICE_ROLE_MATERIAL_PRESENT');
  if (probeFailures.length > 0) {
    validationErrors.push(...probeFailures.map(({ surface_id }) => `SURFACE_BLOCKED:${surface_id}`));
  }
  if (sourceFailures.length > 0) {
    validationErrors.push(...sourceFailures.map(({ contract_id }) => `SOURCE_CONTRACT_BLOCKED:${contract_id}`));
  }
  if (runnerFailed) validationErrors.push('SELF_CERTIFICATION_FAILED');

  const errors = [...new Set(validationErrors)];
  return {
    ...candidate,
    result: errors.length === 0 ? 'PASS' : (runnerFailed ? 'FAIL' : 'BLOCKED'),
    invalidation_reason: errors.length === 0 ? null : errors,
    self_certification: {
      exit_code: selfCertification.exit_code,
      ...selfCertification.summary,
    },
  };
}

function main() {
  const options = parseCli(process.argv.slice(2));

  if (options.prebuildCheck) {
    const result = prebuildSafety(process.cwd());
    process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
    process.exitCode = result.result === 'PASS' ? 0 : 1;
    return;
  }

  const evidence = buildBaselineEvidence({
    root: process.cwd(),
    targetPackages: options.packages,
  });
  process.stdout.write(`${JSON.stringify(evidence, null, 2)}\n`);
  process.exitCode = evidence.result === 'PASS' ? 0 : 1;
}

const invoked = process.argv[1]
  ? pathToFileURL(path.resolve(process.argv[1])).href
  : '';

if (invoked === import.meta.url) {
  try {
    main();
  } catch (error) {
    process.stderr.write(`CI012_ERROR ${error instanceof Error ? error.message : String(error)}\n`);
    process.exitCode = 1;
  }
}