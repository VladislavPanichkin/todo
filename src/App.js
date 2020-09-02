import React from 'react';
import List from './components/List/List';
import AddList from './components/List/AddList/AddList';

import DB from './assets/db.json';

function App() {
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List items={[
          {
            icon: (<svg width="2.5vw" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="list-ul" className="svg-inline--fa fa-list-ul fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M48 48a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm448 16H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path></svg>),
            name: "Все задачи",
            active: true
          }]
        } />
        <List items={[
          {
            color: "green",
            name: "Купить"
          },
          {
            color: "blue",
            name: "Выучить"
          },
          {
            color: "red",
            name: "Кино"
          }
        ]
        }
          isRemovable />
        <AddList colors={DB.colors}/>
      </div>
    </div>
  );
}

export default App