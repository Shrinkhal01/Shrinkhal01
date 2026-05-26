const { Octokit } = require("@octokit/rest");
const fs = require("fs");

const octokit = new Octokit({
  auth: process.env.METRICS_TOKEN,
});

async function main() {
  // ONE API CALL ONLY (scales to 100+ repos)
  const repos = await octokit.paginate(octokit.repos.listForUser, {
    username: "Shrinkhal01",
    per_page: 100,
  });

  const languageMap = {};

  for (const repo of repos) {
    if (repo.fork) continue;
    if (!repo.language) continue;

    // weighted by repo size for better accuracy
    const weight = repo.size || 1;

    languageMap[repo.language] =
      (languageMap[repo.language] || 0) + weight;
  }

  const total = Object.values(languageMap).reduce((a, b) => a + b, 0);

  // SORT by usage (important for readability)
  const sorted = Object.entries(languageMap)
    .sort((a, b) => b[1] - a[1]);

  // SVG generation (clean bar-style layout)
  let y = 30;

  let svg = `
<svg width="500" height="${50 + sorted.length * 25}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .text { font: 14px sans-serif; fill: #e6e6e6; }
    .title { font: 16px bold sans-serif; fill: #ffffff; }
  </style>

  <text x="10" y="20" class="title">Language Usage</text>
`;

  for (const [lang, value] of sorted) {
    const percent = ((value / total) * 100).toFixed(1);

    svg += `
  <text x="10" y="${y}" class="text">
    ${lang}: ${percent}%
  </text>
`;
    y += 22;
  }

  svg += `</svg>`;

  fs.writeFileSync("languages.svg", svg);
}

main();