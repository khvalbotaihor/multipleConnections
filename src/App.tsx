import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let todoListId1 = v1()
    let todoListId2 = v1()

    type todoListsType = {
        id: string
        title: string
        filter: FilterValuesType
    }

    let [todoLists, setTodoLists] = useState<Array<todoListsType>>([
        {id: todoListId1, title: "What to learn", filter: "all"},
        {id: todoListId2, title: "What to buy", filter: "active"},
    ])


    let [tasksObj, setTasksObj] = useState({
        [todoListId1]: [{id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}],
        [todoListId2]: [{id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false}],

    })


    function removeTask(id: string, todoListId: string) {
        let task = tasksObj[todoListId]
        let filteredTasks = task.filter(t => t.id != id);
        tasksObj[todoListId] = filteredTasks
        setTasksObj({...tasksObj});
    }

    function addTask(title: string, todoListId: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        let task = tasksObj[todoListId]

        let newTasks = [newTask, ...task];
        tasksObj[todoListId] = newTasks
        setTasksObj({...tasksObj})
       // setTasksObj(newTasks);
    }

    function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
        let taskO = tasksObj[todoListId]

        let task = taskO.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasksObj({...tasksObj});
        }

    }

    function changeFilter(value: FilterValuesType, todoListId: string) {
        let todoList = todoLists.find(tl => tl.id === todoListId)
        if (todoList) {
            todoList.filter = value
            setTodoLists([...todoLists])
        }

    }


    return (
        <div className="App">

            {todoLists.map(tl => {
                let tasksForTodolist = tasksObj[tl.id];

                if (tl.filter === "active") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false);
                }
                if (tl.filter === "completed") {
                    tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true);
                }


                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeTaskStatus={changeStatus}
                        filter={tl.filter}
                    />
                )
            })}
        </div>
    );
}

export default App;
