import { DataTable, Then } from '@cucumber/cucumber';
import { expect } from 'expect';
import { E2EWorld } from 'features/support/env';

function autoJson(json: string) {
  try {
    return JSON.parse(json);
  } catch {
    return json;
  }
}

Then(
  'the response status should be {int}',
  function (this: E2EWorld, status: number) {
    expect(this.response.status).toBe(status);
  },
);

Then(
  'the response body should include {string}',
  function (this: E2EWorld, property: string) {
    expect(this.response.body).toHaveProperty(property);
  },
);

Then(
  'the response body should be:',
  function (this: E2EWorld, dataTable: DataTable) {
    const expected = dataTable
      .hashes()
      .map((row) =>
        Object.fromEntries(
          Object.entries(row).map(([key, value]) => [key, autoJson(value)]),
        ),
      );
    expect(this.response.body).toEqual(expected);
  },
);

Then(
  'the response body should be an array containing:',
  function (this: E2EWorld, dataTable: DataTable) {
    const expected = dataTable.rows().map((row) => autoJson(row[0]));
    expect(this.response.body).toEqual(expected);
  },
);
