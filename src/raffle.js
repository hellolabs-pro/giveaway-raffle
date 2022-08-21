import * as fs from "fs";
import _ from "underscore";

const collabData = fs.readFileSync("./data/collab_winners.json");
const collabAddresses = JSON.parse(collabData).addresses;
const collabSet = new Set(collabAddresses.map((addr) => addr.toLowerCase()));

const tweetsData = fs.readFileSync("./data/tweets.json");
const tweets = JSON.parse(tweetsData).tweets;
const raffleData = tweets.filter(
  (t) => !collabSet.has(t.address.toLowerCase())
);

const winners = _.shuffle(raffleData).slice(0, 100);
fs.writeFileSync("./data/raffle_winners.json", JSON.stringify({ winners }));
