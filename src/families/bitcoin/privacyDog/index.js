// @flow

import type { Account } from "../../../types";
import { heuristics } from "./heuristics";
import type { GlobalHeuristicReport } from "./types";
import { HeuristicReport } from "./types";

export function generateSecurityAudit(account: Account) {
  const totalWeight = heuristics.reduce(
    (total, h) => total + h.penaltyFactor,
    0
  );
  const globalReport: GlobalHeuristicReport = heuristics.reduce(
    (globalReport, heuristic) => {
      let report: HeuristicReport = heuristic.handler(account);
      globalReport.reports.push(report);
      globalReport.score +=
        ((report.penalty / account.operations.length) * heuristic.penaltyFactor) / totalWeight;
      return globalReport;
    },
    {
      score: 0,
      reports: [],
      level: "best",
    }
  );

  if (globalReport.score > 0.6) {
    globalReport.level = "good";
  } else if (globalReport.score > 0.3) {
    globalReport.level = "better";
  }
  console.log("REPORT: ", globalReport);
  return globalReport;
}
