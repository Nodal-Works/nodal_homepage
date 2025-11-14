const fs = require('fs-extra');
const path = require('path');

const pairs = [
  {
    from: path.join(__dirname, '../content/english/projects'),
    to: path.join(__dirname, '../content/swedish/projects'),
  },
  {
    from: path.join(__dirname, '../content/english/blog'),
    to: path.join(__dirname, '../content/swedish/blog'),
  },
];

async function copyContent() {
  for (const { from, to } of pairs) {
    try {
      await fs.copy(from, to, { overwrite: true });
      console.log(`Copied ${from} to ${to}`);
    } catch (err) {
      console.error(`Error copying ${from} to ${to}:`, err);
    }
  }
}

copyContent();
