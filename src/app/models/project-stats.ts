import { Project } from './project';
export class ProjectStats {
    newest: Project;
    oldest: Project;
    highest: Project;
    lowest: Project;
    mostActive: { name: string, projects: Project[] };
    averageBudget: number;
}
