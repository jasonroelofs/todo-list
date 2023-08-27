import {Task} from './task'

export class GameState {
  tasks: Array<Task>;

  constructor() {
    this.tasks = [
      {name: "Complete all tasks and go home"},
      {name: "Perform 10 Tasks", count: 0, needs: 10},
      {name: "Perform 100 Tasks", count: 0, needs: 100},
      {name: "Perform 1,000 Tasks", count: 0, needs: 1000},
      {name: "Allocate 10 Workers", count: 0, needs: 10},
      {name: "Add some color", count: 0, needs: "Color"},
      {name: "Hire a designer", count: 0, needs: "Design?"},
    ]
  }
}
