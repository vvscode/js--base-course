let list = [];

export function addTask(task) {
  let newTask = {
    id: Date.now(),
    done: false,
    taskByDate: true,
    search: false,
    ...task
  };

  list.push(newTask);

  let promise = new Promise(resolve => {
    resolve(localStorage.setItem(`tasks`, JSON.stringify([...list])));
  });

  return promise.then(_ => Promise.resolve(newTask));
}

export function getTasks() {
  list = JSON.parse(localStorage.getItem('tasks')) || [];
  return Promise.resolve([...list]);
}
