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

  const sortedUsers: Record<string, MDUserData[]> = {};

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

            userData.avatar = $(dataEl).find("img").attr()!["src"];

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

    const firstLetter = userData.name[0].toUpperCase();

    if (sortedUsers[firstLetter]) {
      sortedUsers[firstLetter].push(userData);
    } else {
      sortedUsers[firstLetter] = [userData];
    }
  });

  return {
    users: sortedUsers,
    lastUpdate: lastUpdateTime,
  };
}

/**
 * Find a single user from the source mark down
 * @param id - Username of the account
 */
export async function GetUserFromMD(id: string) {
  const { users } = await ParseMDData();

  const firstLetter = id[0].toUpperCase();

  if (users[firstLetter]) {
    return users[firstLetter].find(
      (user) => user.username.toLowerCase() === id.toLowerCase(),
    );
  }
}

/**
 * Retrieves a custom Github profile of the account
 * @param id - Username of the account
 */
export async function GetDevProfile(id: string) {
  const headers = {
    Authorization: `Bearer ${process.env.GH_API_KEY}`,
  };

  const [userResponse, mdUserInfo] = await Promise.all([
    fetch(`https://api.github.com/users/${id}`, { headers }),
    GetUserFromMD(id),
  ]);

  const ghUserInfo = (await userResponse.json()) as GhUserInfo;

  const firstYearOnGh = new Date(ghUserInfo.created_at).getFullYear();

  const currentYear = new Date().getFullYear();

  return {
    ghUserInfo,
    mdUserInfo,
    yearsOnGithub: new Array<number>(currentYear - firstYearOnGh + 1) // Include first year in count
      .fill(firstYearOnGh - 1) // Start all indexes with one year before the first year
      .map((year, index) => year + index + 1) // Account for 0 index
      .reverse(),
  };
}
