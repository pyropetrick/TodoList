export enum STATUS {
  TODO = "todo",
  COMPLETED = "completed",
}

export enum QUERY_KEY {
  TASKS = "tasks",
}

export enum MUTATION_KEY {
  CREATE_TASK = "create task",
  DELETE_TASK = "delete task",
  UPDATE_TASK = "update task",
  CREATE_SUBTASK = "create subtask",
  DELETE_SUBTASK = "delete subtask",
  UPDATE_SUBTASK = "update subtask",
}

export enum TargetPortal {
  MODAL = "modal",
  TOAST = "toastify",
}
