Информацию о REST API Firebase можно найти здесь https://firebase.google.com/docs/database/rest/start

Для базы нужно отключить проверку прав доступа (`Project -> Database -> Rules`)

```javascript
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

Добавление записи в Firebase

```javascript
fetch(config.databaseURL + '/messages.json', {
  method: 'PUT',
  body: JSON.stringify([
    {
      user: from,
      message: text,
      date: date,
      title: counter++ + 'message',
    },
  ]),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
  .then(function(response) {
    return response.json();
  })
  .then(console.log);
```

Добавление записи в список Firebase

```javascript
fetch(config.databaseURL + '/messages.json', {
  method: 'POST',
  body: JSON.stringify([
    {
      user: from,
      message: text,
      date: date,
      title: counter++ + 'message',
    },
  ]),
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
  .then(function(response) {
    return response.json();
  })
  .then(console.log);
```

Чтение записи / списка

```javascript
fetch(config.databaseURL + '/messages.json', {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
  .then(function(response) {
    return response.json();
  })
  .then(console.log);
```

Чтение всей структуры базы

```javascript
fetch(config.databaseURL + '/.json', {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
  .then(function(response) {
    return response.json();
  })
  .then(console.log);
```
