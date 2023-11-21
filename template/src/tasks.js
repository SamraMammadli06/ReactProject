import localforage from "localforage";
import { matchSorter } from "match-sorter";
export async function getTasks(query) {
    await fakeNetwork(`getTasks:${query}`);
    let tasks = await localforage.getItem("tasks");
    if (!tasks) tasks = [];
    if (query) {
        tasks = matchSorter(tasks, query, { keys: ["tittle", "description"] });
    }
    return tasks;
}

export async function createTask() {
    await fakeNetwork();
    const newTask = {
        id: Math.random().toString(36).substring(2, 9),
        title: "No Title",
        description: "No Description",
        completed: false,
    };
    let tasks = await getTasks();
    tasks.unshift(newTask);
    await setTasks(tasks);
    return newTask;
}

export async function getTask(id) {
    await fakeNetwork(`task:${id}`);
    let tasks = await localforage.getItem("tasks");
    let task = tasks.find((task) => task.id === id);
    return task ?? null;
}

export async function getLastTask(id) {
    await fakeNetwork(`task:${id}`);
    let tasks = await localforage.getItem("tasks");
    let last = tasks[tasks.length - 1]
    return last ?? null;
}

export async function updateTask(id, updates) {
    await fakeNetwork();
    let tasks = await localforage.getItem("tasks");
    let task = tasks.find((task) => task.id === id);
    if (!task) throw new Error("No task found for", id);
    Object.assign(task, updates);
    await setTasks(tasks);
    return task;
}

export async function deleteTask(id) {
    let tasks = await localforage.getItem("tasks");
    let index = tasks.findIndex((task) => task.id === id);
    if (index > -1) {
        tasks.splice(index, 1);
        await setTasks(tasks);
        return true;
    }
    return false;
}

function setTasks(tasks) {
    return localStorage.setItem("tasks", JSON.stringify(tasks))
}

let fakeCache = {};

async function fakeNetwork(key) {
    if (!key) {
        fakeCache = {};
    }

    if (fakeCache[key]) {
        return;
    }

    fakeCache[key] = true;
    return new Promise((res) => {
        setTimeout(res, Math.random() * 1000);
    });
}
