export interface Task {
  name: string;
  count: number | string;
  needs: number | string;
}
