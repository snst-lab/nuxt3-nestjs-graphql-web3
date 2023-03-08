export * from './test.task';
import { JiraImportTask } from './jiraImport.task';
export * from './jiraImport.task';
import { TestTask } from './test.task';
export * from './projectSummary.task';
import { ProjectSummaryTask } from './projectSummary.task';

export const Tasks = [TestTask, JiraImportTask, ProjectSummaryTask];
