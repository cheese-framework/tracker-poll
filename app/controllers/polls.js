const fs = require("fs");
const path = require("path");
const https = require("https");
const _ = require("lodash");
const download = require("download");

function csvToArray(str, delimiter = ",") {
  const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

  const rows = str.slice(str.indexOf("\n") + 1).split("\n");

  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  return arr;
}

exports.getRegions = async (req, res) => {
  const file = process.env.URL;
  const filePath = `${path.join(__dirname, "../data")}`;
  try {
    fs.unlinkSync(filePath);
    await download(file, filePath);
  } catch (err) {
    console.error(err);
  }

  fs.readFile(
    `${path.join(__dirname, "../data/data - data.csv")}`,
    "utf-8",
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Could not read pollData" });
      } else {
        const pollData = csvToArray(data.trimEnd());
        const { format } = req.query;
        const regions = {};

        !format
          ? pollData.forEach((reg) => {
              regions[reg.Region] = {
                UDP: regions[reg.Region]
                  ? regions[reg.Region].UDP === undefined
                    ? Number(reg.UDP)
                    : Number(reg.UDP) + Number(regions[reg.Region].UDP)
                  : Number(reg.UDP),
                NPP: regions[reg.Region]
                  ? regions[reg.Region].NPP === undefined
                    ? Number(reg.NPP)
                    : Number(reg.NPP) + Number(regions[reg.Region].NPP)
                  : Number(reg.NPP),
                PDOIS: regions[reg.Region]
                  ? regions[reg.Region].PDOIS === undefined
                    ? Number(reg.PDOIS)
                    : Number(reg.PDOIS) + Number(regions[reg.Region].PDOIS)
                  : Number(reg.PDOIS),
                GDC: regions[reg.Region]
                  ? regions[reg.Region].GDC === undefined
                    ? Number(reg.GDC)
                    : Number(reg.GDC) + Number(regions[reg.Region].GDC)
                  : Number(reg.GDC),
                NUP: regions[reg.Region]
                  ? regions[reg.Region].NUP === undefined
                    ? Number(reg.NUP)
                    : Number(reg.NUP) + Number(regions[reg.Region].NUP)
                  : Number(reg.NUP),
                INDP: regions[reg.Region]
                  ? regions[reg.Region].INDP === undefined
                    ? Number(reg.INDP)
                    : Number(reg.INDP) + Number(regions[reg.Region].INDP)
                  : Number(reg.INDP),
                REG: regions[reg.Region]
                  ? regions[reg.Region].REG === undefined
                    ? Number(reg.Registered)
                    : Number(reg.Registered) === NaN ||
                      Number(regions[reg.Region].REG) === NaN
                    ? 0
                    : Number(reg.Registered) + Number(regions[reg.Region].REG)
                  : Number(reg.Registered),
              };
            })
          : pollData.forEach((reg) => {
              regions[reg.Region] = {
                UDP: regions[reg.Region]
                  ? regions[reg.Region].UDP === undefined
                    ? Number(reg.UDP)
                    : Number(reg.UDP) + Number(regions[reg.Region].UDP)
                  : Number(reg.UDP),
                NPP: regions[reg.Region]
                  ? regions[reg.Region].NPP === undefined
                    ? Number(reg.NPP)
                    : Number(reg.NPP) + Number(regions[reg.Region].NPP)
                  : Number(reg.NPP),
                PDOIS: regions[reg.Region]
                  ? regions[reg.Region].PDOIS === undefined
                    ? Number(reg.PDOIS)
                    : Number(reg.PDOIS) + Number(regions[reg.Region].PDOIS)
                  : Number(reg.PDOIS),
                GDC: regions[reg.Region]
                  ? regions[reg.Region].GDC === undefined
                    ? Number(reg.GDC)
                    : Number(reg.GDC) + Number(regions[reg.Region].GDC)
                  : Number(reg.GDC),
                NUP: regions[reg.Region]
                  ? regions[reg.Region].NUP === undefined
                    ? Number(reg.NUP)
                    : Number(reg.NUP) + Number(regions[reg.Region].NUP)
                  : Number(reg.NUP),
                INDP: regions[reg.Region]
                  ? regions[reg.Region].INDP === undefined
                    ? Number(reg.INDP)
                    : Number(reg.INDP) + Number(regions[reg.Region].INDP)
                  : Number(reg.INDP),
                LAST: 0,
              };
            });

        if (!format) {
          res.status(200).json(_.toPairs(regions));
        } else {
          res.status(200).json(regions);
        }
      }
    }
  );
};

exports.getConstituencies = (req, res) => {
  fs.readFile(
    `${path.join(__dirname, "../data/data - data.csv")}`,
    "utf-8",
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Could not read pollData" });
      } else {
        const pollData = csvToArray(data.trimEnd());
        const { region } = req.params;
        const constituencies = {};

        const filteredConstituencies = pollData.filter((curr) => {
          return curr.Region === region;
        });

        filteredConstituencies.forEach((reg) => {
          constituencies[reg.Constituency] = {
            UDP: constituencies[reg.Constituency]
              ? constituencies[reg.Constituency].UDP === undefined
                ? Number(reg.UDP)
                : Number(reg.UDP) + Number(constituencies[reg.Constituency].UDP)
              : Number(reg.UDP),
            NPP: constituencies[reg.Constituency]
              ? constituencies[reg.Constituency].NPP === undefined
                ? Number(reg.NPP)
                : Number(reg.NPP) + Number(constituencies[reg.Constituency].NPP)
              : Number(reg.NPP),
            PDOIS: constituencies[reg.Constituency]
              ? constituencies[reg.Constituency].PDOIS === undefined
                ? Number(reg.PDOIS)
                : Number(reg.PDOIS) +
                  Number(constituencies[reg.Constituency].PDOIS)
              : Number(reg.PDOIS),
            GDC: constituencies[reg.Constituency]
              ? constituencies[reg.Constituency].GDC === undefined
                ? Number(reg.GDC)
                : Number(reg.GDC) + Number(constituencies[reg.Constituency].GDC)
              : Number(reg.GDC),
            NUP: constituencies[reg.Constituency]
              ? constituencies[reg.Constituency].NUP === undefined
                ? Number(reg.NUP)
                : Number(reg.NUP) + Number(constituencies[reg.Constituency].NUP)
              : Number(reg.NUP),
            INDP: constituencies[reg.Constituency]
              ? constituencies[reg.Constituency].INDP === undefined
                ? Number(reg.INDP)
                : Number(reg.INDP) +
                  Number(constituencies[reg.Constituency].INDP)
              : Number(reg.INDP),
            REG: constituencies[reg.Constituency]
              ? constituencies[reg.Constituency].REG === undefined
                ? Number(reg.Registered)
                : Number(reg.Registered) === NaN ||
                  Number(constituencies[reg.Constituency].REG) === NaN
                ? 0
                : Number(reg.Registered) +
                  Number(constituencies[reg.Constituency].REG)
              : Number(reg.Registered),
          };
        });

        res.status(200).json(_.toPairs(constituencies));
      }
    }
  );
};

exports.getStations = (req, res) => {
  fs.readFile(
    `${path.join(__dirname, "../data/data - data.csv")}`,
    "utf-8",
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Could not read pollData" });
      } else {
        const pollData = csvToArray(data.trimEnd());
        const { constituency } = req.params;
        const constituencies = {};

        const filteredConstituencies = pollData.filter((curr) => {
          return curr.Constituency === constituency;
        });

        filteredConstituencies.forEach((reg) => {
          constituencies[reg.Station] = {
            UDP: constituencies[reg.Station]
              ? constituencies[reg.Station].UDP === undefined
                ? Number(reg.UDP)
                : Number(reg.UDP) + Number(constituencies[reg.Station].UDP)
              : Number(reg.UDP),
            NPP: constituencies[reg.Station]
              ? constituencies[reg.Station].NPP === undefined
                ? Number(reg.NPP)
                : Number(reg.NPP) + Number(constituencies[reg.Station].NPP)
              : Number(reg.NPP),
            PDOIS: constituencies[reg.Station]
              ? constituencies[reg.Station].PDOIS === undefined
                ? Number(reg.PDOIS)
                : Number(reg.PDOIS) + Number(constituencies[reg.Station].PDOIS)
              : Number(reg.PDOIS),
            GDC: constituencies[reg.Station]
              ? constituencies[reg.Station].GDC === undefined
                ? Number(reg.GDC)
                : Number(reg.GDC) + Number(constituencies[reg.Station].GDC)
              : Number(reg.GDC),
            NUP: constituencies[reg.Station]
              ? constituencies[reg.Station].NUP === undefined
                ? Number(reg.NUP)
                : Number(reg.NUP) + Number(constituencies[reg.Station].NUP)
              : Number(reg.NUP),
            INDP: constituencies[reg.Station]
              ? constituencies[reg.Station].INDP === undefined
                ? Number(reg.INDP)
                : Number(reg.INDP) + Number(constituencies[reg.Station].INDP)
              : Number(reg.INDP),
            REG: constituencies[reg.Station]
              ? constituencies[reg.Station].REG === undefined
                ? Number(reg.Registered)
                : Number(reg.Registered) === NaN ||
                  Number(constituencies[reg.Station].REG) === NaN
                ? 0
                : Number(reg.Registered) +
                  Number(constituencies[reg.Station].REG)
              : Number(reg.Registered),
          };
        });

        res.status(200).json(_.toPairs(constituencies));
      }
    }
  );
};

exports.getCountingCenters = async (req, res) => {
  const file = process.env.URL_STATION;
  const filePath = `${path.join(__dirname, "../data")}`;
  try {
    await download(file, filePath);
  } catch (err) {
    console.error(err);
  }

  fs.readFile(
    `${path.join(__dirname, "../data/data - stations.csv")}`,
    "utf-8",
    (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).json({ message: "Could not read pollData" });
      } else {
        const pollData = csvToArray(data.trimEnd());
        const { constituency } = req.params;
        const constituencies = {};

        const filteredConstituencies = pollData.filter((curr) => {
          return curr.Stations === constituency;
        });

        filteredConstituencies.forEach((reg) => {
          constituencies[reg.Centers] = {
            UDP: constituencies[reg.Centers]
              ? constituencies[reg.Centers].UDP === undefined
                ? Number(reg.UDP)
                : Number(reg.UDP) + Number(constituencies[reg.Centers].UDP)
              : Number(reg.UDP),
            NPP: constituencies[reg.Centers]
              ? constituencies[reg.Centers].NPP === undefined
                ? Number(reg.NPP)
                : Number(reg.NPP) + Number(constituencies[reg.Centers].NPP)
              : Number(reg.NPP),
            PDOIS: constituencies[reg.Centers]
              ? constituencies[reg.Centers].PDOIS === undefined
                ? Number(reg.PDOIS)
                : Number(reg.PDOIS) + Number(constituencies[reg.Centers].PDOIS)
              : Number(reg.PDOIS),
            GDC: constituencies[reg.Centers]
              ? constituencies[reg.Centers].GDC === undefined
                ? Number(reg.GDC)
                : Number(reg.GDC) + Number(constituencies[reg.Centers].GDC)
              : Number(reg.GDC),
            NUP: constituencies[reg.Centers]
              ? constituencies[reg.Centers].NUP === undefined
                ? Number(reg.NUP)
                : Number(reg.NUP) + Number(constituencies[reg.Centers].NUP)
              : Number(reg.NUP),
            INDP: constituencies[reg.Centers]
              ? constituencies[reg.Centers].INDP === undefined
                ? Number(reg.INDP)
                : Number(reg.INDP) + Number(constituencies[reg.Centers].INDP)
              : Number(reg.INDP),
            // REG: constituencies[reg.Centers]
            //   ? constituencies[reg.Centers].REG === undefined
            //     ? Number(reg.Registered)
            //     : Number(reg.Registered) === NaN ||
            //       Number(constituencies[reg.Centers].REG) === NaN
            //     ? 0
            //     : Number(reg.Registered) +
            //       Number(constituencies[reg.Centers].REG)
            //   : Number(reg.Registered),
          };
        });

        res.status(200).json(_.toPairs(constituencies));
      }
    }
  );
};

exports.uploadPollData = (req, res) => {
  if (!req.files) {
    res.status(500).json({ message: "No files specified" });
  } else {
    const { data } = req.files;
    const extension = path.extname(data.name).toLowerCase();
    if (extension !== ".csv") {
      res.status(400).json({ message: "Please provide a csv file" });
    } else {
      fs.existsSync(`${path.join(__dirname, "../data/data.csv")}`) &&
        fs.unlinkSync(`${path.join(__dirname, "../data/data.csv")}`);
      data.mv(`${path.join(__dirname, "../data/data.csv")}`);
      res.json({ message: "File uploaded successfully" });
    }
  }
};
