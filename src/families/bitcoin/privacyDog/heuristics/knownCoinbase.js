// @flow

import type { HeuristicHandler } from "../types";
import type { Account } from "../../../../types";
import type { BitcoinInput } from "../../types";

const knownCoinbases = [
  {
    name: "HaoBTC",
    url: "https://haobtc.com/",
    searchStrings: ["HaoBTC"],
  },
  {
    name: "Bitfury",
    url: "http://bitfury.com/",
    searchStrings: ["Bitfury"],
  },
  {
    name: "GBMiners",
    url: "https://gbminers.com/",
    searchStrings: ["mined by gbminers"],
  },
  {
    name: "ViaBTC",
    url: "https://www.viabtc.com/",
    searchStrings: ["ViaBTC"],
  },
  {
    name: "AntPool",
    url: "https://www.antpool.com/",
    searchStrings: ["Mined by AntPool"],
  },
  {
    name: "1Hash",
    url: "https://www.1hash.com/",
    searchStrings: ["Mined by 1hash.com"],
  },
  {
    name: "F2Pool",
    url: "https://www.f2pool.com/",
    searchStrings: ["🐟", "七彩神仙鱼"],
  },
  {
    name: "BitClub Network",
    url: "https://bitclubnetwork.com/",
    searchStrings: ["BitClub Network"],
  },
  {
    name: "BTC.com",
    url: "https://btc.com/",
    searchStrings: ["BTC.COM"],
  },
  {
    name: "BTC.TOP",
    url: "https://btc.top/",
    searchStrings: ["BTC.TOP"],
  },
  {
    name: "BW.COM",
    url: "https://bw.com/",
    searchStrings: ["BW Pool"],
  },
  {
    name: "BTCC",
    url: "http://www.btcc.net/",
    searchStrings: ["BTCC"],
  },
  {
    name: "Bitcoin.com",
    url: "http://www.bitcoin.com/",
    searchStrings: ["pool.bitcoin.com"],
  },
  {
    name: "GoGreenLight",
    url: "http://www.gogreenhost.se/",
    searchStrings: ["GBSB3P1"],
  },
  {
    name: "Kano CK",
    url: "https://kano.is/",
    searchStrings: ["/Kano"],
  },
  {
    name: "EXX&BW.COM",
    url: "https://xbtc.exx.com/",
    searchStrings: ["xbtc.exx.com&bw.com"],
  },
  {
    name: "BATPOOL",
    url: "https://www.batpool.com/",
    searchStrings: ["BATPOOL"],
  },
  {
    name: "ConnectBTC",
    url: "https://www.connectbtc.com",
    searchStrings: ["ConnectBTC - Home for Miners"],
  },
  {
    name: "Solo CK",
    url: "http://solo.ckpool.org/",
    searchStrings: ["solo.ckpool.org"],
  },
  {
    name: "SlushPool",
    url: "https://slushpool.com/",
    searchStrings: ["slush"],
  },
  {
    name: "Phash",
    url: "http://phash.io/",
    searchStrings: ["phash.io"],
  },
  {
    name: "BitMinter",
    url: "https://bitminter.com/",
    searchStrings: ["BitMinter"],
  },
  {
    name: "Canoe",
    url: "https://www.canoepool.com/",
    searchStrings: ["CANOE"],
  },
];

export const knownCoinbase: HeuristicHandler = (account: Account) => {
  return account.operations.reduce(
    (report, op) => {
      const { inputs } = op.extra;
      let hasNoKnownCoinbase = inputs.filter(
        (input: BitcoinInput) =>
          !!input &&
          !!input.coinbase &&
          knownCoinbases
            .filter((coinbase) =>
              coinbase.searchStrings.filter((str) =>
                input.coinbase.includes(str)
              )
            )
            .empty()
      );

      if (!hasNoKnownCoinbase) {
        report.operations.push(op);
        report.penalty += 1; // The penalty costs 1 unit.
      }

      return report;
    },
    {
      heuristicId: "known-coinbase",
      operations: [],
      penalty: 0,
    }
  );
};
