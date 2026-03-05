import { NextRequest, NextResponse } from 'next/server';
import { parseInput, cleanIds, sqlInForDb } from '@/lib/sqlInGenerator';
import type { DbFlavor } from '@/lib/sqlInGenerator';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const ids: unknown = body.ids ?? body.input;
    let values: string[] = [];

    if (Array.isArray(ids)) {
      values = ids.map((x) => String(x).trim()).filter(Boolean);
    } else if (typeof ids === 'number') {
      values = [String(ids)];
    } else if (typeof ids === 'string') {
      values = parseInput(ids);
    } else {
      return NextResponse.json(
        { error: 'Request body must include "ids" (array) or "input" (string)' },
        { status: 400 }
      );
    }

    values = cleanIds(values);
    if (values.length === 0) {
      return NextResponse.json(
        { error: 'No valid IDs after parsing and cleaning' },
        { status: 400 }
      );
    }

    const db = (body.db as DbFlavor) || 'mysql';
    const valueMode = body.valueMode === 'string' ? 'string' : 'numeric';
    const quote = body.quote === '"' ? '"' : '\'';
    const parameterized = Boolean(body.parameterized);

    const inClause = sqlInForDb(values, db, {
      valueMode,
      quote,
      parameterized,
    });

    return NextResponse.json({
      sql: inClause,
      inClause,
      ids: values,
      count: values.length,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : 'Invalid request' },
      { status: 400 }
    );
  }
}
