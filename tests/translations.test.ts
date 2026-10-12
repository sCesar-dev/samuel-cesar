import test from 'node:test';
import assert from 'node:assert';
import {
  ptBR,
  enUS,
  formatString,
  formatNumber,
  formatDate,
} from '../src/i18n/translations.ts';

// Helper to flatten nested object keys
function getObjectPaths(obj: Record<string, any>, prefix = ''): string[] {
  let paths: string[] = [];
  for (const key of Object.keys(obj)) {
    const fullPath = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      paths = paths.concat(getObjectPaths(value, fullPath));
    } else {
      paths.push(fullPath);
    }
  }
  return paths;
}

// Helper to get nested value by dot path
function getNestedValue(obj: Record<string, any>, path: string): any {
  return path.split('.').reduce((acc, part) => (acc ? acc[part] : undefined), obj);
}

// Helper to extract interpolation placeholders like {name}
function extractPlaceholders(text: string): string[] {
  const matches = text.match(/\{(\w+)\}/g) || [];
  return matches.map((m) => m.slice(1, -1)).sort();
}

test('pt-BR and en-US dictionaries have 100% identical key tree parity', () => {
  const ptPaths = getObjectPaths(ptBR).sort();
  const enPaths = getObjectPaths(enUS).sort();

  assert.strictEqual(
    ptPaths.length,
    enPaths.length,
    `Key count mismatch: pt-BR has ${ptPaths.length} keys, en-US has ${enPaths.length} keys`
  );

  for (let i = 0; i < ptPaths.length; i++) {
    assert.strictEqual(
      ptPaths[i],
      enPaths[i],
      `Key parity failure at index ${i}: pt-BR has "${ptPaths[i]}", en-US has "${enPaths[i]}"`
    );
  }
});

test('No translated string in pt-BR or en-US is empty or whitespace-only', () => {
  const paths = getObjectPaths(ptBR);

  for (const path of paths) {
    const valPt = getNestedValue(ptBR, path);
    const valEn = getNestedValue(enUS, path);

    if (typeof valPt === 'string') {
      assert.ok(valPt.trim().length > 0, `Empty pt-BR string at path "${path}"`);
    } else if (Array.isArray(valPt)) {
      assert.ok(valPt.length > 0, `Empty pt-BR array at path "${path}"`);
      valPt.forEach((item, idx) => {
        assert.ok(typeof item === 'string' && item.trim().length > 0, `Empty string at pt-BR array "${path}[${idx}]"`);
      });
    }

    if (typeof valEn === 'string') {
      assert.ok(valEn.trim().length > 0, `Empty en-US string at path "${path}"`);
    } else if (Array.isArray(valEn)) {
      assert.ok(valEn.length > 0, `Empty en-US array at path "${path}"`);
      valEn.forEach((item, idx) => {
        assert.ok(typeof item === 'string' && item.trim().length > 0, `Empty string at en-US array "${path}[${idx}]"`);
      });
    }
  }
});

test('Interpolation placeholders match identically between pt-BR and en-US', () => {
  const paths = getObjectPaths(ptBR);

  for (const path of paths) {
    const valPt = getNestedValue(ptBR, path);
    const valEn = getNestedValue(enUS, path);

    if (typeof valPt === 'string' && typeof valEn === 'string') {
      const placeholdersPt = extractPlaceholders(valPt);
      const placeholdersEn = extractPlaceholders(valEn);

      assert.deepStrictEqual(
        placeholdersPt,
        placeholdersEn,
        `Placeholder mismatch at path "${path}": pt-BR has [${placeholdersPt.join(', ')}], en-US has [${placeholdersEn.join(', ')}]`
      );
    }
  }
});

test('formatString interpolates tokens correctly and preserves unmatched tokens', () => {
  const template = 'Image {index} of {total}';
  const result = formatString(template, { index: 2, total: 5 });
  assert.strictEqual(result, 'Image 2 of 5');

  const partial = formatString('Hello {name}, your role is {role}', { name: 'Samuel' });
  assert.strictEqual(partial, 'Hello Samuel, your role is {role}');
});

test('formatNumber and formatDate format values according to Intl rules', () => {
  const numPt = formatNumber(1234.5, 'pt-BR');
  const numEn = formatNumber(1234.5, 'en-US');

  assert.ok(numPt.includes('1.234') || numPt.includes('1234'), `Unexpected pt-BR format: ${numPt}`);
  assert.ok(numEn.includes('1,234') || numEn.includes('1234'), `Unexpected en-US format: ${numEn}`);

  const testDate = new Date('2026-05-20T12:00:00Z');
  const datePt = formatDate(testDate, 'pt-BR', { year: 'numeric', month: 'numeric' });
  const dateEn = formatDate(testDate, 'en-US', { year: 'numeric', month: 'numeric' });

  assert.ok(datePt.length > 0);
  assert.ok(dateEn.length > 0);
});

test('Proper nouns and core technologies are preserved in translations', () => {
  // Brand name
  assert.strictEqual(ptBR.hero.role, 'Software Developer');
  assert.strictEqual(enUS.hero.role, 'Software Developer');

  // Author name
  assert.ok(ptBR.hero.greeting.includes('Samuel Cesar'));
  assert.ok(enUS.hero.greeting.includes('Samuel Cesar'));

  // University name
  assert.ok(ptBR.about.bioP1.includes('UNEB'));
  assert.ok(enUS.about.bioP1.includes('UNEB'));

  // Tech stack
  assert.ok(ptBR.hero.bottomStack.includes('Python • SQL • AWS'));
  assert.ok(enUS.hero.bottomStack.includes('Python • SQL • AWS'));
});
