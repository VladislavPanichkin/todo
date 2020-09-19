import React from 'react';
import Axios from 'axios';
import classNames from 'classnames';
import Badge from '../Badge/Badge';

import deleteSvg from '../../assets/close.svg';

import './List.scss';

const List = ({ items, isRemovable, onClick, onDelete, onClickItem, activeItem }) => {

    const deleteList = (item) => {
        if (window.confirm('Вы действительно хотите удалить список?')) {
            Axios
                .delete('http://localhost:3001/items/' + item.id)
                .then(() => {
                    onDelete(item.id)
                })
        }
    }

    return (
        <ul onClick={onClick} className="list">
            {items.map((item, index) => (
                <li
                    key={index}
                    className={classNames(/*`list__item`*/item.className, {
                        active: activeItem && activeItem.id === item.id})}
                    onClick={onClickItem? () => onClickItem(item) : null}
                >
                    <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
                    <span>{item.name}</span>
            <span className="tasks__count">{item.tasks && item.tasks.length > 0 && `(${item.tasks.length})`}</span>
                    {isRemovable && (
                        <img
                            src={deleteSvg}
                            alt="delete icon"
                            className="list__delete-icon"
                            onClick={() => deleteList(item)}
                        />
                    )}
                </li>
            ))}
        </ul>
    );
};

export default List