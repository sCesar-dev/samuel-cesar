import test from 'node:test';
import assert from 'node:assert';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validatePortfolioData } from '../scripts/validate-data.ts';

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

test('All /data/*.yaml files pass Zod schema, unique ID, PT/EN parity, and asset integrity checks', () => {
  const result = validatePortfolioData(rootDir);
  assert.strictEqual(
    result.valid,
    true,
    `Expected valid portfolio data, got issues:\n${result.issues
      .map((i) => `  [${i.file}] ${i.path}: ${i.message}`)
      .join('\n')}`
  );
  assert.ok(result.data, 'Validated data payload should be defined');
  assert.strictEqual(result.data.profile.name, 'Samuel Cesar');
  assert.strictEqual(result.data.projects.length, 7);
  assert.strictEqual(result.data.education.length >= 1, true);
  assert.strictEqual(result.data.experience.length >= 2, true);
  assert.strictEqual(result.data.skills.length, 4);
  assert.strictEqual(Array.isArray(result.data.badges), true);
  assert.strictEqual(result.data.achievements.length, 6);
});
