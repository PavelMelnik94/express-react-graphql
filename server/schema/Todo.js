import { Todo, TodoTC } from '../models/Todo';

const TodoQuery = {
    todoById: TodoTC.getResolver('findById'),
    todoByIds: TodoTC.getResolver('findByIds'),
    todoOne: TodoTC.getResolver('findOne'),
    todoMany: TodoTC.getResolver('findMany'),
    todoCount: TodoTC.getResolver('count'),
    todoConnection: TodoTC.getResolver('connection'),
    todoPagination: TodoTC.getResolver('pagination'),
};

const TodoMutation = {
    todoCreateOne: TodoTC.getResolver('createOne'),
    todoCreateMany: TodoTC.getResolver('createMany'),
    todoUpdateById: TodoTC.getResolver('updateById'),
    todoUpdateOne: TodoTC.getResolver('updateOne'),
    todoUpdateMany: TodoTC.getResolver('updateMany'),
    todoRemoveById: TodoTC.getResolver('removeById'),
    todoRemoveOne: TodoTC.getResolver('removeOne'),
    todoRemoveMany: TodoTC.getResolver('removeMany'),
};

export { TodoQuery, TodoMutation };
