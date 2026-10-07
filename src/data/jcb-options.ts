export const jcbMachineTypeOptions = [
  "JCB Backhoe Loader",
  "Excavator",
  "Loader",
  "Other",
] as const;

export const jcbWorkTypeOptions = [
  "Excavation",
  "Digging",
  "Road Work",
  "Land Leveling",
  "Foundation Work",
  "Drain / Nala Work",
  "Snow / Debris Removal",
  "Other",
] as const;

export const jcbWorkingHoursOptions = [
  "2 Hours",
  "4 Hours",
  "6 Hours",
  "8 Hours",
  "Full Day",
  "Multiple Days",
] as const;

export const jcbSiteAccessOptions = [
  "Normal Road",
  "Narrow Road",
  "Difficult Mountain Road",
  "Off Road",
] as const;

export type JcbMachineType = (typeof jcbMachineTypeOptions)[number];
export type JcbWorkType = (typeof jcbWorkTypeOptions)[number];
export type JcbWorkingHours = (typeof jcbWorkingHoursOptions)[number];
export type JcbSiteAccess = (typeof jcbSiteAccessOptions)[number];
