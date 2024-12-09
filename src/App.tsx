import React, { useState } from 'react';
import { Bot } from 'lucide-react';
import { TaskInput } from './components/TaskInput';
import { TaskList } from './components/TaskList';
import { AutomationTask } from './types/automation';
import { AutomationService } from './services/automation';

const automationService = new AutomationService();

function App() {
  const [tasks, setTasks] = useState<AutomationTask[]>([]);

  const handleNewTask = async (instruction: string) => {
    const task = await automationService.createTask(instruction);
    setTasks((prev) => [task, ...prev]);
    
    // Execute task
    await automationService.executeTask(task.id);
    
    // Update task in state
    setTasks((prev) =>
      prev.map((t) => (t.id === task.id ? automationService.getTaskStatus(task.id)! : t))
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex items-center gap-3 mb-8">
          <Bot className="w-8 h-8 text-blue-500" />
          <h1 className="text-2xl font-semibold text-gray-900">
            Web Automation Assistant
          </h1>
        </div>

        <div className="space-y-6">
          <TaskInput onSubmit={handleNewTask} />
          <TaskList tasks={tasks} />
        </div>
      </div>
    </div>
  );
}

export default App;