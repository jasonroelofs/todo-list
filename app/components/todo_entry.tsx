import {Todo} from '../todo'

type Params = {
  todo: Todo
}

export function TodoEntry({todo}: Params) {
  if(todo.complete) {
    return(
      <li className="todo">
        <span>{todo.name}</span>
        <span>✔</span>
      </li>
    )
  } else {
    return(
      <li className="todo">
        <span>{todo.name}</span>
        <span>{todo.count}/{todo.needs}</span>
      </li>
    )
  }
}
