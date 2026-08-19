import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import {
  CANONICAL_PACKAGES,
  CONSUMER_REPOSITORY,
  CONTRACTUAL_TEST_COUNT,
  EXPECTED_NAVIGATION,
  EXPECTED_PAGE_FILES,
  NUMERA_RELATIONS,
  REQUIRED_EVIDENCE_FIELDS,
  SURFACES,
  containsSensitiveData,
  detectServiceRoleMaterial,
  evaluateProfile,
  evaluateSurface,
  evidenceIsStale,
  resolveTargetPackages,
  sha256Identity,
  validateEvidence,
  validateNavigationEntries,
  validateRouteInventoryEntries,
} from './numera-consumer-baseline-gate.mjs';

const positiveSurfaceScenarios = Object.freeze({
  'NUMERA-SURFACE-001': {
    session: true,
    sso_bridge: true,
    safe_return: true,
    deny_state: true,
    app_access: true,
    permission: true,
    auth_error: false,
  },
  'NUMERA-SURFACE-002': {
    site_id: 'SITE-001',
    area_scope: true,
    actor_effective: 'EMP-001',
    territory_valid: true,
    override_authorized: true,
    shared_device_checked: true,
    manipulated: false,
  },
  'NUMERA-SURFACE-003': {
    page_count: 7,
    static_page_count: 7,
    dynamic_page_count: 0,
    protected_page_count: 5,
    public_controlled_count: 2,
    handler_count: 0,
    technical_pattern_count: 7,
    query_params_are_not_routes: true,
  },
  'NUMERA-SURFACE-004': {
    navigation_count: 4,
    navigation_exact: true,
    legacy_prebuild_declared: true,
    ci_build_bypasses_legacy_prebuild: true,
    service_role_absent: true,
    remote_mutation: false,
  },
  'NUMERA-SURFACE-005': {
    app_access: true,
    summary_source: true,
    financial_origin_semantics: true,
    null_is_not_real: true,
    universal_read_inferred: false,
  },
  'NUMERA-SURFACE-006': {
    view_permission: true,
    manage_permission: true,
    permissions_separated: true,
    period_valid: true,
    cost_center_valid: true,
    amounts_valid: true,
    margin_valid: true,
    unauthorized_mutation: false,
  },
  'NUMERA-SURFACE-007': {
    view_permission: true,
    manage_permission: true,
    permissions_separated: true,
    period_valid: true,
    category_valid: true,
    cost_center_valid: true,
    date_valid: true,
    amount_valid: true,
    currency_explicit: true,
    source_explicit: true,
    duplicate_effect: false,
  },
  'NUMERA-SURFACE-008': {
    view_permission: true,
    center_identity: true,
    fixed_expenses: true,
    variable_expenses: true,
    margin_semantics: true,
    null_calculation_distinguished: true,
  },
  'NUMERA-SURFACE-009': {
    view_permission: true,
    center_identity: true,
    expected_revenue_distinguished: true,
    actual_expense_distinguished: true,
    budget_distinguished: true,
    variance_distinguished: true,
    null_state_distinguished: true,
  },
  'NUMERA-SURFACE-010': {
    amount_traceable: true,
    period_traceable: true,
    cost_center_traceable: true,
    source_traceable: true,
    currency_traceable: true,
    lineage_preserved: true,
    aggregate_as_source: false,
    destructive_correction: false,
  },
  'NUMERA-SURFACE-011': {
    browser_client_checked: true,
    server_client_checked: true,
    permission_rpc_checked: true,
    server_actions_checked: true,
    rls_deny_checked: true,
    isolated_schema_source: true,
    service_role_absent: true,
    remote_mutation: false,
  },
  'NUMERA-SURFACE-012': {
    server_render: true,
    client_render: true,
    hydration_mismatch: false,
    interaction_ok: true,
    forms_ok: true,
    tables_ok: true,
    accessibility_ok: true,
    loading_error_feedback_ok: true,
    deny_state_safe: true,
    financial_states_distinguished: true,
  },
});

const negativeSurfaceScenarios = Object.freeze({
  'NUMERA-SURFACE-001': {
    session: false,
    sso_bridge: false,
    safe_return: false,
    deny_state: false,
    app_access: false,
    permission: false,
    auth_error: true,
  },
  'NUMERA-SURFACE-002': {
    site_id: 'SITE-OTHER',
    area_scope: false,
    actor_effective: 'EMP-001',
    territory_valid: false,
    override_authorized: false,
    shared_device_checked: false,
    manipulated: true,
  },
  'NUMERA-SURFACE-003': {
    page_count: 6,
    static_page_count: 6,
    dynamic_page_count: 0,
    protected_page_count: 4,
    public_controlled_count: 2,
    handler_count: 1,
    technical_pattern_count: 7,
    query_params_are_not_routes: false,
  },
  'NUMERA-SURFACE-004': {
    navigation_count: 5,
    navigation_exact: false,
    legacy_prebuild_declared: true,
    ci_build_bypasses_legacy_prebuild: false,
    service_role_absent: false,
    remote_mutation: true,
  },
  'NUMERA-SURFACE-005': {
    app_access: true,
    summary_source: false,
    financial_origin_semantics: false,
    null_is_not_real: false,
    universal_read_inferred: true,
  },
  'NUMERA-SURFACE-006': {
    view_permission: true,
    manage_permission: false,
    permissions_separated: false,
    period_valid: false,
    cost_center_valid: false,
    amounts_valid: false,
    margin_valid: false,
    unauthorized_mutation: true,
  },
  'NUMERA-SURFACE-007': {
    view_permission: true,
    manage_permission: false,
    permissions_separated: false,
    period_valid: false,
    category_valid: false,
    cost_center_valid: false,
    date_valid: false,
    amount_valid: false,
    currency_explicit: false,
    source_explicit: false,
    duplicate_effect: true,
  },
  'NUMERA-SURFACE-008': {
    view_permission: false,
    center_identity: false,
    fixed_expenses: false,
    variable_expenses: false,
    margin_semantics: false,
    null_calculation_distinguished: false,
  },
  'NUMERA-SURFACE-009': {
    view_permission: false,
    center_identity: false,
    expected_revenue_distinguished: false,
    actual_expense_distinguished: false,
    budget_distinguished: false,
    variance_distinguished: false,
    null_state_distinguished: false,
  },
  'NUMERA-SURFACE-010': {
    amount_traceable: false,
    period_traceable: false,
    cost_center_traceable: false,
    source_traceable: false,
    currency_traceable: false,
    lineage_preserved: false,
    aggregate_as_source: true,
    destructive_correction: true,
  },
  'NUMERA-SURFACE-011': {
    browser_client_checked: true,
    server_client_checked: true,
    permission_rpc_checked: false,
    server_actions_checked: false,
    rls_deny_checked: false,
    isolated_schema_source: false,
    service_role_absent: false,
    remote_mutation: true,
  },
  'NUMERA-SURFACE-012': {
    server_render: true,
    client_render: true,
    hydration_mismatch: true,
    interaction_ok: false,
    forms_ok: false,
    tables_ok: false,
    accessibility_ok: false,
    loading_error_feedback_ok: false,
    deny_state_safe: false,
    financial_states_distinguished: false,
  },
});

const positiveProfiles = Object.freeze({
  '@vento/contracts': {
    types_compile: true,
    payload_shapes_checked: true,
    serialization_checked: true,
    identifier_semantics_preserved: true,
    nullable_zero_semantics_checked: true,
    money_currency_period_semantics_checked: true,
    no_global_cast_bypass: true,
  },
  '@vento/os-context': {
    session_checked: true,
    sso_bridge_checked: true,
    site_context_checked: true,
    area_context_checked: true,
    actor_context_checked: true,
    app_access_checked: true,
    permission_allow_checked: true,
    permission_deny_checked: true,
    role_override_checked: true,
    shared_device_checked: true,
    client_cannot_elevate_authority: true,
    view_manage_separation_checked: true,
  },
  '@vento/supabase': {
    browser_client_checked: true,
    server_client_checked: true,
    permission_rpc_checked: true,
    summary_rpc_checked: true,
    rls_deny_checked: true,
    server_actions_checked: true,
    isolated_schema_source: true,
    no_service_role_fixture: true,
    no_service_role_environment: true,
    build_is_non_mutating: true,
  },
  '@vento/ui-web': {
    server_render_checked: true,
    client_render_checked: true,
    hydration_checked: true,
    forms_checked: true,
    tables_checked: true,
    keyboard_focus_checked: true,
    accessibility_checked: true,
    loading_error_checked: true,
    deny_state_checked: true,
    financial_state_semantics_checked: true,
  },
});

for (const surface of SURFACES) {
  test(`POS ${surface.id} ${surface.name}`, () => {
    assert.equal(evaluateSurface(surface.id, positiveSurfaceScenarios[surface.id]), true);
  });
}

for (const surface of SURFACES) {
  test(`NEG ${surface.id} ${surface.name} falla cerrado`, () => {
    assert.equal(evaluateSurface(surface.id, negativeSurfaceScenarios[surface.id]), false);
  });
}

for (const packageName of CANONICAL_PACKAGES) {
  test(`PROFILE POS ${packageName}`, () => {
    assert.equal(evaluateProfile(packageName, positiveProfiles[packageName]), true);
  });
}

for (const packageName of CANONICAL_PACKAGES) {
  test(`PROFILE NEG ${packageName} no acepta cobertura incompleta`, () => {
    const incomplete = { ...positiveProfiles[packageName] };
    const firstKey = Object.keys(incomplete)[0];
    incomplete[firstKey] = false;
    assert.equal(evaluateProfile(packageName, incomplete), false);
  });
}

function validEvidence() {
  const targetPackageSet = [...CANONICAL_PACKAGES];
  const identity = sha256Identity('fixture');
  return {
    consumer_repository: CONSUMER_REPOSITORY,
    consumer_branch: 'main',
    consumer_base_commit: '1'.repeat(40),
    consumer_manifest_identity: identity,
    consumer_lockfile_identity: identity,
    test_contract_identity: identity,
    test_suite_identity: identity,
    fixture_set_identity: identity,
    route_inventory_identity: identity,
    navigation_inventory_identity: identity,
    source_contract_identity: identity,
    environment_identity: 'isolated:win32:x64:node:v24.19.0',
    runtime_identity: 'v24.19.0',
    framework_identity: 'node:test+ci012-policy-engine-v1',
    target_package_set: targetPackageSet,
    compatibility_refs: targetPackageSet.map(
      (packageName) => NUMERA_RELATIONS[packageName].compatibility_ref,
    ),
    numera_profile_set: targetPackageSet.map(
      (packageName) => NUMERA_RELATIONS[packageName].profile,
    ),
    execution_identity: identity,
    started_at: '2026-08-18T11:05:00-05:00',
    completed_at: '2026-08-18T11:06:00-05:00',
    result: 'PASS',
    invalidation_reason: null,
    certification_scope: 'HARNESS_SELF_CERTIFICATION',
    consumer_conformance_claimed: false,
    safe_build_entrypoint: 'npm run build:ci012',
    implementation_boundaries: {
      package_versions_changed: false,
      supabase_mutation_performed: false,
      production_data_used: false,
      consumer_functional_debt_corrected: false,
      navigation_mutation_performed: false,
      service_role_used: false,
    },
    test_summary: {
      executed: CONTRACTUAL_TEST_COUNT,
      passed: CONTRACTUAL_TEST_COUNT,
      failed: 0,
      skipped: 0,
      denied_paths: 16,
    },
  };
}

test('REG-01 evidencia válida tiene todos los campos contractuales', () => {
  const evidence = validEvidence();
  for (const field of REQUIRED_EVIDENCE_FIELDS) assert.ok(field in evidence);
  assert.deepEqual(validateEvidence(evidence), []);
});

test('REG-02 cero tests jamás se normaliza a PASS', () => {
  const evidence = validEvidence();
  evidence.test_summary.executed = 0;
  assert.ok(validateEvidence(evidence).includes('ZERO_REQUIRED_TESTS'));
});

test('REG-03 evidencia de otro consumidor jamás satisface NUMERA', () => {
  const evidence = validEvidence();
  evidence.consumer_repository = 'vento-group-sas/vento-viso';
  assert.ok(validateEvidence(evidence).includes('WRONG_CONSUMER_REPOSITORY'));
});

test('REG-04 cambiar commit vuelve STALE la evidencia', () => {
  const previous = validEvidence();
  const current = { ...previous, consumer_base_commit: '2'.repeat(40) };
  assert.equal(evidenceIsStale(previous, current), true);
});

test('REG-05 cambiar target package set vuelve STALE la evidencia', () => {
  const previous = validEvidence();
  const current = {
    ...previous,
    target_package_set: ['@vento/contracts'],
    compatibility_refs: ['PKG-COMP-MX-007'],
    numera_profile_set: ['NUMERA-PROFILE-CONTRACTS'],
  };
  assert.equal(evidenceIsStale(previous, current), true);
});

test('REG-06 entorno productivo queda bloqueado', () => {
  const evidence = validEvidence();
  evidence.environment_identity = 'production:remote';
  assert.ok(validateEvidence(evidence).includes('PRODUCTION_ENVIRONMENT_FORBIDDEN'));
});

test('REG-07 secretos reales o con forma de secreto quedan bloqueados', () => {
  assert.equal(containsSensitiveData({ password: 'synthetic-fixture-password-12345678' }), true);
});

test('REG-08 conjunto multi-package conserva orden canónico y perfiles exactos', () => {
  assert.deepEqual(
    resolveTargetPackages('@vento/ui-web,@vento/contracts,@vento/supabase'),
    ['@vento/contracts', '@vento/supabase', '@vento/ui-web'],
  );
});

test('REG-09 inventario exacto acepta 7 páginas, 7 estáticas, 0 dinámicas, 5 protegidas, 2 públicas, 0 handlers y 4 rutas de navegación', () => {
  const routes = validateRouteInventoryEntries(EXPECTED_PAGE_FILES, []);
  assert.equal(routes.result, 'PASS');
  assert.equal(routes.actual_page_count, 7);
  assert.equal(routes.actual_static_page_count, 7);
  assert.equal(routes.actual_dynamic_page_count, 0);
  assert.equal(routes.actual_protected_page_count, 5);
  assert.equal(routes.actual_public_controlled_count, 2);
  assert.equal(routes.actual_handler_count, 0);
  assert.equal(routes.actual_technical_pattern_count, 7);

  const navigation = validateNavigationEntries(EXPECTED_NAVIGATION);
  assert.equal(navigation.result, 'PASS');
  assert.equal(navigation.actual_count, 4);
  assert.equal(navigation.exact, true);
});

test('REG-10 material service-role queda detectado sin exponer su valor', () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'vento-ci012-service-role-'));
  try {
    fs.writeFileSync(
      path.join(root, '.env.local'),
      'SUPABASE_SERVICE_ROLE_KEY=synthetic-fixture-service-role-value\n',
      'utf8',
    );
    const detected = detectServiceRoleMaterial(root, {});
    assert.deepEqual(detected, ['.env.local:SUPABASE_SERVICE_ROLE_KEY']);
    assert.equal(detected.some((entry) => entry.includes('synthetic-fixture-service-role-value')), false);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});