export class TodoSeedData {

    createDb() {
        let todos = [
            { id: 1, title: "Иванов 555-035", done: false },
            { id: 2, title: "Петров 444-666", done: false },
            { id: 3, title: "Сидоров 444-999", done: false }
        ];

        return { todos };
    }
}