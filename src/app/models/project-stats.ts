import { Project } from './project'
export class ProjectStats {
  public newest: Project
  public oldest: Project
  public highest: Project
  public lowest: Project
  public mostActive: { name: string; projects: Project[] }
  public averageBudget: number
}
