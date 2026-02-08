import type { Scenario, GameRole } from '@/types/game';
import teacherScenarios from './teacherScenarios';
import parentScenarios from './parentScenarios';
import coachScenarios from './coachScenarios';

const allScenarios: Scenario[] = [
  ...teacherScenarios,
  ...parentScenarios,
  ...coachScenarios,
];

export function getScenariosByRole(role: GameRole): Scenario[] {
  return allScenarios.filter((s) => s.role === role);
}

export default allScenarios;
