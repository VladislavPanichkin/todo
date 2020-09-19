import React from 'react'
import AddTaskBlock from './AddTaskBlock';

import './Tasks.scss';

const Tasks = ({ item }) => {

    return (
        <div className="tasks">
            <h2 className="tasks__title">{item.name}</h2>
            <div className="tasks-items">
                {!item.tasks.length && <h3>Задач нет</h3>}
                {item.tasks.map(task => (
                    <div key={task.id} className="tasks-items-row">
                        <div className="checkbox">
                            <input id={`task-${task.id}`} type="checkbox" />
                            <label htmlFor={`task-${task.id}`}>
                                <svg width="2vw"
                                    aria-hidden="true"
                                    fill="none"
                                    focusable="false" data-prefix="fas" data-icon="check" className="svg-inline--fa fa-check fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path fill="none" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path>
                                </svg>
                            </label>
                        </div>
                        <input readOnly value={task.text} />
                    </div>
                ))}
            </div>
            <AddTaskBlock />
        </div>
    )
}

export default Tasks

