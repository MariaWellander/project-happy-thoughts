import React, { useState, useEffect } from 'react';

import TaskList from 'components/TaskList';
import TaskForm from 'components/TaskForm';

export const App = () => {
  const [taskList, setTaskList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    // eslint-disable-next-line no-use-before-define
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    setLoading(true);
    fetch('https://happy-thoughts-technigo.herokuapp.com/thoughts')
      .then((res) => res.json())
      .then((data) => setTaskList(data))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  const handleNewTodoChange = (event) => {
    setNewTodo(event.target.value)
  }

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: newTodo
      })
    }

    fetch('https://happy-thoughts-technigo.herokuapp.com/thoughts', options)
      .then((res) => res.json())
      .then(() => fetchTasks())
      .finally(() => setNewTodo(''));
  }

  return (
    <div>
      <TaskForm
        newTodo={newTodo}
        onNewTodoChange={handleNewTodoChange}
        onFormSubmit={onFormSubmit} />
      <TaskList
        loading={loading}
        taskList={taskList}
        setTaskList={setTaskList} />
    </div>
  );
}
