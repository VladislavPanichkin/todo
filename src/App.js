import React from 'react';
import { List, Tasks, AddList } from './components';
import axios from 'axios';
import { Route } from 'react-router-dom';
import classNames from 'classnames';

function App() {
  const [items, setItems] = React.useState(null);
  const [colors, setColors] = React.useState(null);
  const [activeItem, setActiveItem] = React.useState(null);
  const [activeSidebar, setActiveSidebar] = React.useState(false);

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

  const onAddTask = (itemId, obj) => {
    const newItem = items.map(item => {
      if (item.id === itemId) {
        item.tasks = [...item.tasks, obj]
      }
      return item
    })
    setItems(newItem)
  }

  const onDeleteTask = (itemId, taskId) => {
    if (window.confirm('Вы действительно хотите удалить задачу?')) {
      console.log(itemId, taskId)
      const newItem = items.map(item => {
        if (item.id === itemId) {
          item.tasks = item.tasks.filter(task => task.id !== taskId);
        }
        return item;
      });
      setItems(newItem);
      axios.delete('http://localhost:3001/tasks/' + taskId)
    }
  }

  const toggleCheckbox = (itemId, taskId, completed) => {
    const newItem = items.map(item => {
      if (item.id === itemId) {
        item.tasks = item.tasks.map(task => {
          if (task.id === taskId) {
            task.completed = completed;
          }
          return task;
        });
      }
      return item;
    });
    setItems(newItem);
    axios
      .patch('http://localhost:3001/tasks/' + taskId, { completed });
  }

  const toggleActiveSidebar = () => {  
    setActiveSidebar(!activeSidebar);
  }

  const activateSidebar = () => {
    if (activeSidebar) {
      return;
    }
      setActiveSidebar(true);
  }

  return (
    <div className="todo">
      <div 
        className={classNames("todo-sidebar", window.innerWidth < 400 && !!activeSidebar && "todo-sidebar_active")}
        onClick={activateSidebar}
        >
        <List
          items={[
            {
              icon: (<svg width="2.5vw" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="list-ul" className="svg-inline--fa fa-list-ul fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M48 48a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm0 160a48 48 0 1 0 48 48 48 48 0 0 0-48-48zm448 16H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path></svg>),
              name: "Все задачи",
              firstElement: true
            }]
          }
          onClickItem={(item) => {
              setActiveItem(item);
              toggleActiveSidebar()
          }
          }
          activeItem={activeItem} />
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
              toggleActiveSidebar();
            }}
            activeItem={activeItem}
          />
          ) : (
            'Загрузка...'
          )}
        <AddList onAdd={onAddItems} colors={colors} />
      </div>
        <div className="todo-tasks">
          <Route exact path="/">
            {items && items.map(item => (
              <Tasks
                key={item.id}
                item={item}
                onAddTask={onAddTask}
                onDeleteTask={onDeleteTask}
                isEmpty
              />
            ))}
          </Route>
          <Route path="/lists/:id">
            {items && activeItem &&
              <Tasks
                item={activeItem}
                onAddTask={onAddTask}
                onDeleteTask={onDeleteTask}
                toggleCheckbox={toggleCheckbox}
              />}
          </Route>
        </div>
    </div>
  );
}

export default App