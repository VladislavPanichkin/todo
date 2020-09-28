import React from 'react';
import Axios from 'axios';

import addSvg from '../../assets/plus-solid.svg';
import closeSvg from '../../assets/close.svg';

const AddTaskBlock = ({ item, onAddTask }) => {

    const [isFormVisible, setFormVisible] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [isPending, setIsPending] = React.useState(false);

    const toggleFormVisibility = () => {
        setFormVisible(!isFormVisible);
        setInputValue('');
    }

    const addTask = () => {

        if (!inputValue) {
            alert('Введите название');
            return;
        }

        setIsPending(true);

        const obj = {
            itemId: item.id,
            text: inputValue,
            completed: false
        };

        Axios
            .post('http://localhost:3001/tasks', obj)
            .then(({ data }) => {
                onAddTask(item.id, data);
                toggleFormVisibility();
            })
            .catch(() => alert('Ошибка!'))
            .finally(() => setIsPending(false));
    }

    return (
        <div className="tasks-form">
            {!isFormVisible ? <div className="tasks-form-new" onClick={() => toggleFormVisibility()}>
                <img src={addSvg} alt="Add icon" />
                <span>Добавить задачу</span>
                </div> : <div className="tasks-form-block">
                    <input
                        value={inputValue}
                        onChange={e => setInputValue(e.target.value)}
                        className="field"
                        type="text"
                        placeholder="задача"
                    />
                    <button
                        disabled={isPending}
                        className="button"
                        onClick={addTask}>
                        {isPending ? 'Загрузка...' : 'Добавить задачу'}
                    </button>
                    <img
                        src={closeSvg}
                        alt="close button"
                        className="tasks-form__close-btn"
                        onClick={() => toggleFormVisibility()}
                    />
                </div>
            }
        </div>
    )
}

export default AddTaskBlock;