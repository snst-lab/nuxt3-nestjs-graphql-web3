type ProjectTask = {
  name: string;
  state: string;
};

type Project = {
  name: string;
  projectTask: ProjectTask;
};

export type Task = {
  project: Project;
};
