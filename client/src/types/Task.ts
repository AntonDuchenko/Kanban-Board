type Task = {
  id: number,
  name: string,
  description: string,
  dueDate: string | Date,
  priority: string,
  status: Status,
  statusId: number,
  boardId?: number,
}
