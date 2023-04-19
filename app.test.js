const fs = require('fs');

describe('Config file', () => {
  test('contains my_app job with target localhost:3000', () => {
    const fileContent = fs.readFileSync('./prometheus.yml', 'utf-8');
    const expectedText = "scrape_configs:\n  - job_name: 'my_app'\n    static_configs:\n      - targets: ['localhost:3000']";
    expect(fileContent).toContain(expectedText);
  });
});