import React from 'react';
import { List, Tasks, AddList } from './components';
import axios from 'axios';

function App() {
  const [items, setItems] = React.useState(null);
  const [colors, setColors] = React.useState(null);
  const [activeItem, setActiveItem] = React.useState(null);

  React.useEffect(() => {
    axios
      .get('http://localhost:3001/items?_expand=color&_embed=tasks')
      .then(({ data }) => {
        setItems(data);
      });
    axios
      .get('http://localhost:3001/colors')
      .then(({ data }) => {
        setColors(data);
      });

  }, []);

  const onAddItems = obj => {
    const newItem = [...items, obj];
    setItems(newItem);
  }

  return (
    <div className="todo">
      <div className="todo-sidebar">
        <List items={[
          {
            icon: (<svg width="2.5vw" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="list-ul" className="svg-inline--fa fa-list-ul fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M48 48a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm448 16H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path></svg>),
            name: "Все задачи",
            active: true
          }]
        } />
        {items ?
          (<List
            items={items}
            isRemovable
            onDelete={id => {
              const newItems = items.filter(item => item.id !== id);
              setItems(newItems);
            }}
            onClickItem={(item) => {
              setActiveItem(item);
            }}
            activeItem={activeItem}
            />
          ) : (
            'Загрузка...'
          )}
        <AddList onAdd={onAddItems} colors={colors} />
      </div>
      <div className="todo-tasks">{items && activeItem && <Tasks item={activeItem} />}</div>
    </div>
  );
}

export default App