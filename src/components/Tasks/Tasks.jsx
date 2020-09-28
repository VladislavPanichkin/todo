import React from 'react'
import AddTaskBlock from './AddTaskBlock';
import Task from './Task';

import './Tasks.scss';

const Tasks = ({ item, onAddTask, isEmpty }) => {

    return (
        <div className="tasks">
            <h2 className="tasks__title">{item.name}</h2>
            <div className="tasks-items">
                {!isEmpty && item.tasks && !item.tasks.length && (
                    <h3>Задач нет</h3>
                )}
                {item.tasks && item.tasks.map(task => (
                    <Task 
                        key={task.id}
                        task={task}
                    />
                ))}
            </div>
            <AddTaskBlock item={item} onAddTask={onAddTask}/>
        </div>
    )
}

export default Tasks

