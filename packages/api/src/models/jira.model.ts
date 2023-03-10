export type FetchBoadsResponse = {
  values: Boad[];
};

export type Boad = {
  id: number;
  location: {
    projectId: number;
    displayName: string;
    name: string;
    avatarURI: string;
  };
};

export type FetchSprintsResponse = {
  values: Sprint[];
};

export type Sprint = {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
};

export type FetchIssuesResponse = {
  issues: Issue[];
};

export type Issue = {
  id: string;
  fields: IssueFields;
};

export type IssueFields = {
  sprint: Sprint;
  assignee: Assignee;
  status: {
    statusCategory: StatusCategory;
  };
  summary: string;
  project: { id: number };
};

export type StatusCategory = {
  id: number;
};

export type Assignee = {
  accountId: string;
  displayName: string;
};
