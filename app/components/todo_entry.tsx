import {Task} from '../task'

type Params = {
  task: Task
}

export function TodoEntry({task}: Params) {
  return(
    <li className="task">
      <span>{task.name}</span>
      <span>{task.count}/{task.needs}</span>
    </li>
  )
}
