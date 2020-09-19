import React from 'react';

import addSvg from '../../assets/plus-solid.svg';

const AddTaskBlock = () => {
    return (
        <div className="tasks-form">
            <div className="tasks-form-new">
                <img src={addSvg} alt="Add icon" />
                <span>Добавить задачу</span>
                <button className="button">Добавить задачу</button>
            </div>
        </div>
    )
}

export default AddTaskBlock;