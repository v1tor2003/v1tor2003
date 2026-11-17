import fs from "node:fs";
import path from "node:path";

// Verified historical enterprise contributions from v1tor2003/portfolio
const HISTORICAL_WORK_CONTRIBUTIONS = {
  "2025-11-04": 1, "2025-11-06": 1, "2025-11-07": 1, "2025-11-11": 3,
  "2025-11-19": 1, "2025-11-24": 1, "2025-11-27": 1, "2025-11-28": 1,
  "2025-12-08": 1, "2025-12-10": 2, "2026-01-12": 1, "2026-01-22": 1,
  "2026-01-26": 1, "2026-02-04": 1, "2026-02-05": 1, "2026-02-06": 1,
  "2026-02-11": 1, "2026-02-12": 1, "2026-02-20": 1, "2026-02-23": 1,
  "2026-03-11": 1, "2026-03-23": 1, "2026-03-25": 1, "2026-03-30": 2,
  "2026-04-06": 1, "2026-04-10": 1, "2026-04-13": 1, "2026-04-14": 1,
  "2026-04-15": 2, "2026-04-20": 1, "2026-04-22": 1, "2026-04-23": 3,
  "2026-04-27": 1, "2026-04-29": 2, "2026-04-30": 1, "2026-05-05": 3,
  "2026-05-06": 2, "2026-05-07": 1, "2026-05-11": 1, "2026-05-12": 2,
  "2026-05-14": 4, "2026-05-15": 3, "2026-05-18": 1, "2026-05-19": 3,
  "2026-05-20": 4, "2026-05-21": 3, "2026-05-22": 3, "2026-05-25": 1,
  "2026-05-26": 5, "2026-05-27": 3, "2026-05-28": 3, "2026-05-29": 7,
  "2026-06-01": 1, "2026-06-02": 2, "2026-06-03": 7, "2026-06-04": 1,
  "2026-06-05": 7, "2026-06-08": 1, "2026-06-09": 7, "2026-06-10": 1,
  "2026-06-12": 7, "2026-06-15": 3, "2026-06-16": 5, "2026-06-18": 1,
  "2026-06-19": 1, "2026-06-22": 4, "2026-06-23": 2, "2026-06-25": 10,
  "2026-06-26": 4, "2026-06-27": 1, "2026-06-30": 9, "2026-07-01": 14,
  "2026-07-02": 6, "2026-07-03": 5, "2026-07-06": 5, "2026-07-07": 5,
  "2026-07-09": 9, "2026-07-10": 4, "2026-07-13": 1,
};

async function fetchWorkContributionsFromGitHub(token) {
  if (!token) return null;
  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `query { viewer { contributionsCollection { contributionCalendar { weeks { contributionDays { date contributionCount } } } } } }`,
      }),
    });
    const json = await res.json();
    const weeks = json?.data?.viewer?.contributionsCollection?.contributionCalendar?.weeks;
    if (!weeks) return null;

    const map = new Map(Object.entries(HISTORICAL_WORK_CONTRIBUTIONS));
    for (const w of weeks) {
      for (const d of w.contributionDays ?? []) {
        if (d.contributionCount > 0) {
          const existing = map.get(d.date) ?? 0;
          map.set(d.date, Math.max(existing, d.contributionCount));
        }
      }
    }
    return map;
  } catch {
    return null;
  }
}

// Fallback: scrape initialActivity directly from v1tor2003-portfolio.vercel.app/projects if GITHUB_WORK_TOKEN is not set
async function fetchWorkContributionsFromPortfolio() {
  try {
    const res = await fetch("https://v1tor2003-portfolio.vercel.app/projects");
    const html = await res.text();
    const map = new Map(Object.entries(HISTORICAL_WORK_CONTRIBUTIONS));
    const regex = /\\"date\\":\\"(\d{4}-\d{2}-\d{2})\\"[^}]*?\\"workCount\\":(\d+)/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      const count = Number.parseInt(match[2], 10);
      if (count > 0) map.set(match[1], count);
    }
    return map.size > Object.keys(HISTORICAL_WORK_CONTRIBUTIONS).length ? map : null;
  } catch {
    return null;
  }
}

async function main() {
  const workMap =
    (await fetchWorkContributionsFromGitHub(process.env.GITHUB_WORK_TOKEN)) ??
    (await fetchWorkContributionsFromPortfolio()) ??
    new Map(Object.entries(HISTORICAL_WORK_CONTRIBUTIONS));

  const weeksCount = 52;
  const today = new Date();
  const todayDayOfWeek = today.getDay(); // 0 = Sun .. 6 = Sat (matches git-activity.service.ts)
  const totalDays = weeksCount * 7 + todayDayOfWeek;

  const days = [];
  let totalWork = 0;

  for (let i = totalDays; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split("T")[0];
    const workCount = workMap.get(dateStr) ?? 0;
    totalWork += workCount;
    days.push({ date: dateStr, workCount });
  }

  // Group into columns of 7 days (weeks), matching GitActivityGraph.tsx
  const weeks = [];
  let currentWeek = [];
  for (const day of days) {
    currentWeek.push(day);
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) weeks.push(currentWeek);

  const cellSize = 11;
  const cellGap = 3;
  const step = cellSize + cellGap;
  const gridWidth = weeks.length * step - cellGap;
  const gridHeight = 7 * step - cellGap;
  const padX = 24;
  const topY = 54;
  const width = gridWidth + padX * 2;
  const height = topY + gridHeight + 42;

  let rects = "";
  for (let w = 0; w < weeks.length; w++) {
    for (let d = 0; d < weeks[w].length; d++) {
      const item = weeks[w][d];
      const x = padX + w * step;
      const y = topY + d * step;

      let fill = "#18181B";
      let stroke = "#27272A";

      if (item.workCount > 8) {
        fill = "#C084FC";
        stroke = "#D8B4FE";
      } else if (item.workCount > 4) {
        fill = "#A855F7";
        stroke = "#C084FC";
      } else if (item.workCount > 0) {
        fill = "#7E22CE";
        stroke = "#9333EA";
      }

      rects += `<rect x="${x}" y="${y}" width="${cellSize}" height="${cellSize}" rx="2" fill="${fill}" stroke="${stroke}" stroke-width="0.8"><title>${item.date}: ${item.workCount} commits</title></rect>\n`;
    }
  }

  const labelText = `Work: ${totalWork} commits`;
  const centerX = Math.round(width / 2);

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" fill="none">
  <rect width="${width}" height="${height}" rx="8" fill="#09090B" stroke="#27272A" stroke-width="1.2"/>

  <!-- Centered Header matching GitActivityGraph.tsx -->
  <rect x="${centerX - 68}" y="19" width="10" height="10" rx="2" fill="#A855F7"/>
  <text x="${centerX - 52}" y="28" fill="#C084FC" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-size="12" font-weight="600">${labelText}</text>

  <line x1="${padX}" y1="40" x2="${width - padX}" y2="40" stroke="#27272A" stroke-width="1"/>

  <!-- Grid -->
  ${rects}

  <!-- Footer -->
  <text x="${padX}" y="${height - 14}" fill="#71717A" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-size="10.5">Enterprise &amp; private organization commits</text>

  <text x="${width - 115}" y="${height - 14}" fill="#71717A" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-size="10.5">Less</text>
  <rect x="${width - 84}" y="${height - 23}" width="9" height="9" rx="2" fill="#18181B" stroke="#27272A" stroke-width="0.8"/>
  <rect x="${width - 72}" y="${height - 23}" width="9" height="9" rx="2" fill="#7E22CE"/>
  <rect x="${width - 60}" y="${height - 23}" width="9" height="9" rx="2" fill="#A855F7"/>
  <rect x="${width - 48}" y="${height - 23}" width="9" height="9" rx="2" fill="#C084FC"/>
  <text x="${width - 34}" y="${height - 14}" fill="#71717A" font-family="ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" font-size="10.5">More</text>
</svg>`;

  const outPath = path.resolve(process.cwd(), "assets/enterprise-contributions.svg");
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, svg, "utf8");
  console.log(`Generated ${outPath} (${totalWork} commits)`);
}

main();
