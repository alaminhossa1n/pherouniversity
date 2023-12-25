const weeksCount = (startDate: string, endDate: string) => {
  const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

  const parsedStartDate = new Date(startDate);
  const parsedEndDate = new Date(endDate);

  const daysDifference = Math.ceil(
    (parsedEndDate.getTime() - parsedStartDate.getTime()) / ONE_DAY_IN_MS
  );

  const adjustedWeeks = Math.ceil(daysDifference / 7);
  return adjustedWeeks;
};

export default weeksCount;
