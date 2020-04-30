import { ProjectStatus } from './../enums/project-status.enum'

export interface Project {
  id: number
  title: string
  division: string
  owner: string
  budget: number
  status: ProjectStatus
  created: Date
  modified: Date
}
