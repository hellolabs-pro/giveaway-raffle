import * as fs from "fs";

const rawdata = fs.readFileSync("./data/source.json");
const rawTweets = JSON.parse(rawdata).tweets;

const tweetsWithDuplicates = rawTweets.filter((t) =>
  t.c.toLowerCase().includes("0x")
);

const tweets = tweetsWithDuplicates.reduce((prev, current) => {
  const el = prev.find((t) => t.u === current.u);
  if (!el) {
    return prev.concat([current]);
  }
  return prev;
}, []);

const extractAddress = (text) => {
  const match = text.match(/0x[a-f0-9]{40}/i);
  return match[0];
};

const data = tweets.map((t) => ({
  user: t.u,
  status_url: t.s,
  content: t.c,
  address: extractAddress(t.c),
}));

fs.writeFileSync("./data/tweets.json", JSON.stringify({ tweets: data }));
