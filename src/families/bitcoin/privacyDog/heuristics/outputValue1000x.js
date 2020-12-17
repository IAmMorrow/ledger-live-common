// @flow

import type { HeuristicHandler } from "../types";
import type { Account } from "../../../../types";

export const outputValue1000x: HeuristicHandler = (account: Account) => {
  return account.operations.reduce(
    (report, op) => {
      const { outputs } = op.extra;
      if (outputs.length !== 2) {
        return report;
      }

      const [out1, out2] = op.extra.outputs;

      if (
        out1.value.div(out2.value) > 1000 ||
        out2.value.div(out1.value) > 1000
      ) {
        report.operations.push(op);
        report.penalty += 1;
      } else if (
        out1.value.div(out2.value) > 500 ||
        out2.value.div(out1.value) > 500
      ) {
        report.operations.push(op);
        report.penalty += 0.8;
      } else if (
        out1.value.div(out2.value) > 100 ||
        out2.value.div(out1.value) > 100
      ) {
        report.operations.push(op);
        report.penalty += 0.6;
      } else if (
        out1.value.div(out2.value) > 25 ||
        out2.value.div(out1.value) > 25
      ) {
        report.operations.push(op);
        report.penalty += 0.3;
      }
      return report;
    },
    {
      heuristicId: "output-value-1000x",
      operations: [],
      penalty: 0,
    }
  );
};
