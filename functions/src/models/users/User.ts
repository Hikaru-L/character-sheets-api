export interface User {
  username: string;
  password: string;
  COCInvestigatorIds: { id: string; name: string }[];
  secretToken: string;
}
