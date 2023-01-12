const { GoogleSpreadsheet } = require("google-spreadsheet");

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

const addProtocol = (url) => (url.startsWith("http") ? url : `https://${url}`);

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
      telegram: telegram
        ? telegram.startsWith("@")
          ? telegram
          : `@${telegram}`
        : null,
      itch: itch ? addProtocol(itch) : null,
      blog: blog ? addProtocol(blog) : null,
      other: other ? addProtocol(other) : null,
    };
  });
};

module.exports = {
  getPeople,
};
