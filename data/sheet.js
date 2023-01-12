const { GoogleSpreadsheet } = require("google-spreadsheet");
const { getBrush } = require("../utils");

const SHEETS = {
  PEOPLE: 0,
};

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID_FROM_URL);

const getSheet = async (index) => {
  await doc.useApiKey(process.env.GOOGLE_SPREADSHEET_API_KEY);
  await doc.loadInfo(); // loads document properties and worksheets. required.
  const sheet = doc.sheetsByIndex[index];

  return sheet;
};

const readSheet = async (index) => {
  try {
    const sheet = await getSheet(index);
    const rows = await sheet.getRows();

    return rows.map((row) => serializeRow(sheet, row));
  } catch (error) {
    return { error: error.toString() };
  }
};

const serializeRow = (sheet, row) => {
  return sheet.headerValues.reduce((aggregated, header) => {
    aggregated[header] = row[header];
    return aggregated;
  }, {});
};

const addProtocol = (url) => {
  if (!url) return url;
  return url.includes("http") ? url : `https://${url}`;
};

const fixTelegram = (username) => {
  if (!username) return username;
  return username.startsWith("@") ? username : `@${username}`;
};

const getPeople = async () => {
  const people = await readSheet(SHEETS.PEOPLE);

  if (people.error) {
    return { error: people.error };
  }

  return people.map((object) => {
    const [
      _,
      name = null,
      telegram = null,
      social = null,
      blog = null,
      itch = null,
      other = null,
    ] = Object.values(object);

    return {
      name,
      telegram: fixTelegram(telegram),
      itch: addProtocol(itch),
      blog: addProtocol(blog),
      other: addProtocol(other),
      social,
      brush: getBrush(),
    };
  });
};

module.exports = {
  getPeople,
};
