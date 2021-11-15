export enum Stop {
  Stop1 = "Stop1",
  Stop2 = "Stop2",
  Stop3 = "Stop3",
}

export const getStopDisplayName = (stop: Stop) => {
  if (stop === Stop.Stop1) return "Stop 1";
  if (stop === Stop.Stop2) return "Stop 2";
  return "Stop 3";
};
