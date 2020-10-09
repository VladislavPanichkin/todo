import React from 'react';
import AddTaskBlock from './AddTaskBlock';
import Task from './Task';
import { Droppable } from 'react-beautiful-dnd';

import './Tasks.scss';

const Tasks = ({ item, onAddTask, onDeleteTask, isEmpty, toggleCheckbox }) => {

    return (
        <div className="tasks">
            <h2 className="tasks__title" style={{ color: item.color.hex }}>{item.name}</h2>

            <Droppable droppableId={`${item.id}`}>
                {provided => (
                    <div className="tasks-items"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    >
                        {!isEmpty && item.tasks && !item.tasks.length && (
                            <h3>Задач нет</h3>
                        )}
                        {item.tasks && item.tasks.map(task => (
                            <Task
                                key={task.id}
                                task={task}
                                item={item}
                                onDeleteTask={onDeleteTask}
                                toggleCheckbox={toggleCheckbox}
                                {...task}
                            />
                        ))}
                        {provided.placeholder} 
                    </div>
                )}
            </Droppable>
            <AddTaskBlock item={item} onAddTask={onAddTask} />
        </div>
    )
}

export default Tasks

