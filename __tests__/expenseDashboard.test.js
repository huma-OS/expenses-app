/**
 * @jest-environment jsdom
 */

const fs = require('fs');
const  path = require('path');
const { describe, test, beforeEach } = require('@jest/globals');


const html = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf-8');

describe('expense tracker dashboard', () => {
  let container;

  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    container = document.querySelector('.container');
  });

  test('renders main heading', () => {
    const heading = document.querySelector('h1');
    expect(heading.textContent).toBe('Expense App Dashboard');
  });

  test('has tabs for expense categories', () => {
    const tabs = document.querySelectorAll('.tabs li');
    expect(tabs.length).toBeGreaterThanOrEqual(5);
    expect(tabs[0].dataset.category).toBe('bills');
  });
   test('has form fields for inputting expenses', () => {
    expect(document.getElementById('description')).toBeTruthy();
    expect(document.getElementById('amount')).toBeTruthy();
    expect(document.getElementById('date')).toBeTruthy();
  });
   test('has summary section with budget and spent values', () => {
    expect(document.getElementById('budget-amount')).not.toBeNull();
    expect(document.getElementById('spent-amount')).not.toBeNull();
  });
   test('has canvas element for charts', () => {
    const barChart = document.getElementById('barChart');
    const pieChart = document.getElementById('pieChart');
    expect(barChart.tagName).toBe('CANVAS');
    expect(pieChart.tagName).toBe('CANVAS');
  });
   test('includes external Chart.js script', () => {
    const scripts = document.querySelectorAll('script');
    const hasChartScript = Array.from(scripts).some(s => s.src.includes('chart.js'));
    expect(hasChartScript).toBe(true);
  });
});
