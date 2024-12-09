import React from 'react';
import { AutomationTask } from '../types/automation';
import { CheckCircle, XCircle, Clock, Play } from 'lucide-react';

interface TaskListProps {
  tasks: AutomationTask[];
}

export function TaskList({ tasks }: TaskListProps) {
  const getStatusIcon = (status: AutomationTask['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'running':
        return <Play className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="p-4 bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center gap-3">
            {getStatusIcon(task.status)}
            <div className="flex-1">
              <p className="text-sm text-gray-600">{task.instruction}</p>
              {task.error && (
                <p className="text-sm text-red-500 mt-1">{task.error}</p>
              )}
            </div>
            <span className="text-xs text-gray-500">
              {new Date(task.createdAt).toLocaleTimeString()}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}