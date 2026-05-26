const { Octokit } = require("@octokit/rest");
const fs = require("fs");

const octokit = new Octokit({
  auth: process.env.METRICS_TOKEN,
});

async function getLanguages() {
  const repos = await octokit.paginate(octokit.repos.listForUser, {
    username: "Shrinkhal01",
    per_page: 100,
  });

  const languageMap = {};

  for (const repo of repos) {
    if (repo.fork) continue;

    const langs = await octokit.repos.listLanguages({
      owner: "Shrinkhal01",
      repo: repo.name,
    });

    for (const [lang, bytes] of Object.entries(langs.data)) {
      languageMap[lang] = (languageMap[lang] || 0) + bytes;
    }
  }

  return languageMap;
}

function generateSVG(data) {
  const total = Object.values(data).reduce((a, b) => a + b, 0);

  let y = 20;
  let svg = `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">`;
  svg += `<text x="10" y="15" font-size="14">Languages Used</text>`;

  for (const [lang, bytes] of Object.entries(data)) {
    const percent = ((bytes / total) * 100).toFixed(1);
    svg += `<text x="10" y="${y}">${lang}: ${percent}%</text>`;
    y += 20;
  }

  svg += `</svg>`;
  return svg;
}

async function main() {
  const data = await getLanguages();
  const svg = generateSVG(data);

  fs.writeFileSync("languages.svg", svg);
  console.log("Generated languages.svg");
}

main();