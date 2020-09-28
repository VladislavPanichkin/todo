import React from 'react';
import Axios from 'axios';
import List from '../List/List';
import Badge from '../Badge/Badge';

import './AddList.scss';
import closeSvg from '../../assets/close.svg';

const AddList = ({ colors, onAdd }) => {
    
    const [visibleWindow, setVisibleWindow] = React.useState(false);
    const [selectedColor, selectColor] = React.useState(1);
    const [inputValue, setInputValue] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        if (Array.isArray(colors)) {
            selectColor(colors[0].id)
        }
    }, [colors]);

    const onCLose = () => {
        setVisibleWindow(false);
        setInputValue('');
        selectColor(colors[0].id);
    }

    const addItem = () => {
        if (!inputValue) {
            alert('Введите название');
            return;
        }
        setIsLoading(true);
        Axios
            .post('http://localhost:3001/items', { name: inputValue, colorId: selectedColor })
            .then(({ data }) => {
                const color = colors.find(c => c.id === selectedColor).name;
                const listObj = { ...data, color: { name: color } };
                onAdd(listObj);
                onCLose();
            })
            .catch(() => alert('Ошибка!'))
            .finally(() => {
                setIsLoading(false);
            }
            );
    }

    return (
        <div className="add-list">
            <List onClick={() => { setVisibleWindow(true); }}
                items={[
                    {
                        className: "list__add-button",
                        icon: <svg width="2.5vw" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" className="svg-inline--fa fa-plus fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>,
                        name: "Ещё список",
                    }
                ]} />
            {visibleWindow && (
                <div className="add-list-window">
                    <img
                        onClick={onCLose}
                        src={closeSvg}
                        alt="close button"
                        className="add-list-window__close-btn"
                    />
                    <input type="text"
                        placeholder="Название"
                        className="field" value={inputValue}
                        onChange={e => setInputValue(e.target.value)}></input>
                    <div className="add-list-window-colors">
                        {
                            colors.map(color => (
                                <Badge onClick={() => { selectColor(color.id); }}
                                    key={color.id}
                                    color={color.name}
                                    className={selectedColor === color.id && 'active'} />
                            ))}
                    </div>
                            <button onClick={addItem} className="button">
                                {isLoading ? 'Загрузка...' : 'Добавить'}
                            </button>
                </div>)}
        </div>
    );
}

export default AddList;