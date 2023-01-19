import * as decamelize from 'decamelize';

export function SnakeCaseKeys<T = unknown>(obj: T, sep = '-'): T {
  if (typeof obj !== 'object' || obj == null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(o => SnakeCaseKeys(o, sep)) as any;
  }

  const result: Record<string, unknown> = {};
  for (let [k, v] of Object.entries(obj)) {
    // we don't want to snake case environment variables
    if (k !== 'env' && typeof v === 'object' && v != null) {
      v = SnakeCaseKeys(v);
    }
    result[decamelize(k, { separator: sep })] = v;
  }
  return result as any;
}