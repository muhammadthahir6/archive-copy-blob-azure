require("dotenv").config();
const CryptoJS = require("crypto-js");
const account = process.env.ACCOUNT;
const containerName = process.env.CONTAINER_NAME;
const blobName = "Logo.png";
const blobUrl = `https://${account}.blob.core.windows.net/${containerName}/${blobName}`;
const targetBlobName = "Logocopy.png";


const key = process.env.ACCESS_KEY;
const strTime = new Date().toUTCString();
const strToSign = `PUT\n\n\n\n\n\n\n\n\n\n\n\nx-ms-access-tier:Cool\nx-ms-copy-source:${blobUrl}\nx-ms-date:${strTime}\nx-ms-rehydrate-priority:High\nx-ms-requires-sync:true\nx-ms-version:2020-10-02\n/${account}/${containerName}/${targetBlobName}\ntimeout:30`;

const secret = CryptoJS.enc.Base64.parse(key);
const hash = CryptoJS.HmacSHA256(strToSign, secret);
const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
const auth = `SharedKey ${account}:${hashInBase64}`;

// ORDERED alphabetically
const putConfig = {
  method: "PUT",
  headers: {
    Authorization: auth,
    "x-ms-access-tier": "Cool",
    "x-ms-copy-source": blobUrl,
    "x-ms-date": strTime,
    "x-ms-rehydrate-priority": "High",
    "x-ms-requires-sync": "true",
    "x-ms-version": "2020-10-02",
  },
};

const controller = async (req, res) => {
  try {
    if (req.method === "POST") {
      const results = await fetch(
        `https://${account}.blob.core.windows.net/${containerName}/${targetBlobName}?timeout=30`,
        putConfig
      );
      if (results.status === 200) {
        console.log("api works");
      } else {
        console.log(results,results.headers);
      }
    }
  } finally {
    res.end();
  }
};

export default controller;