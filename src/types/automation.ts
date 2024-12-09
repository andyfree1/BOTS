export interface AutomationTask {
  id: string;
  instruction: string;
  status: 'pending' | 'running' | 'completed' | 'failed';
  result?: any;
  error?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TaskStep {
  id: string;
  taskId: string;
  action: string;
  status: 'pending' | 'completed' | 'failed';
  result?: any;
  error?: string;
}

export interface AutomationConfig {
  maxConcurrentTasks: number;
  defaultDelay: number;
  respectRobotsTxt: boolean;
  userAgent: string;
}