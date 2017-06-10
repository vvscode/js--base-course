

// Route: {
//    name /* string */,
//    match /* string|RegExp|function */
//    onBeforeEnter /* function, может возвращать promise, если так - onEnter срабатывает только по его резолву */
//    onEnter
//    onLeave /* может возвращать promise, если так - onBeforeEnter срабатывает только по его резолву */
// }
// Причем все хуки-функции опциональны (не являются обязательными)
