const errorReports = [];

export const addErrorReport = (report: Record<string, unknown>) => {
  errorReports.push(report);
};
