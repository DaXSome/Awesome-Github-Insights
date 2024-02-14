import { dummyMD } from "@/data/contributions";
import * as cheerio from "cheerio";
import showdown from "showdown";

/**
 * Fetches the Ghana contributions MD from GitHub
 * @returns The markdown in text
 */
export async function FetchMD() {
  const response = await fetch(
    "https://raw.githubusercontent.com/gayanvoice/top-github-users/main/markdown/total_contributions/ghana.md",
  );

  return await response.text();
}

/**
 * Parses the markdown depending on the environment
 * @returns last update time and users
 */
export async function ParseMDData() {
  const converter = new showdown.Converter();

  const md = process.env.NODE_ENV === "development" ? dummyMD : await FetchMD();

  const mdHtml = converter.makeHtml(md);

  const $ = cheerio.load(mdHtml);

  const timeRegex = /\b(\d{4}\/\d{1,2}\/\d{1,2} \d{1,2}:\d{2} (AM|PM) UTC)\b/;

  const lastUpdateMatch = $.text().match(timeRegex);

  let lastUpdateTime = "Unknown";

  if (lastUpdateMatch) {
    lastUpdateTime = lastUpdateMatch[0];
  }

  // It's the 4th table in the html
  const contributionsTableEl = $("tbody").eq(3).children();

  const users: MDUserData[] = [];

  // $("tbody").eq(3).find("tr") unfortunately returns only one row
  contributionsTableEl.each((rowIndex, rowEl) => {
    const userData = {} as MDUserData;

    // Ignore table headers
    if (rowIndex === 0) return;

    $(rowEl)
      .children()
      .each((dataIndex, dataEl) => {
        const elText = $(dataEl).text().trim();

        switch (dataIndex) {
          case 1:
            const nameAndUsername = elText.split("\n");

            userData.username = nameAndUsername[0].trim();
            userData.name = nameAndUsername[2].trim();
            break;

          case 2:
            userData.company = elText;
            break;

          case 3:
            userData.twitter_user_name = elText;
            break;

          case 4:
            userData.location = elText;
            break;

          case 5:
            userData.public_contributions = parseInt(elText);
            break;

          case 6:
            userData.total_contributions = parseInt(elText);
            break;

          default:
            break;
        }
      });

    userData.private_contributions =
      userData.total_contributions - userData.public_contributions;

    users.push(userData);
  });

  return {
    users,
    lastUpdate: lastUpdateTime,
  };
}
