// @flow

import type { HeuristicHandler } from "../types";
import type { Account } from "../../../../types";

/**
 * Heuristic that checks if at least one tx has rounded fees
 *
 * Example: using Samurai wallet whirlpools
 *
 */
export const roundFee: HeuristicHandler = (account: Account) => {
  return account.operations.reduce(
    (report, op) => {
      if (op.fee.precision(false) < 3) {
        report.operations.push(op);
        report.penalty += 1; // The penalty costs 1 unit.
      }

      return report;
    },
    {
      heuristicId: "round-fees",
      operations: [],
      penalty: 0,
    }
  );
};
