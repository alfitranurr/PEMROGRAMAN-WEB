document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (storedTasks) {
    storedTasks.forEach((task) => tasks.push(task));
    updateTasksList();
    updateStats();
  }
});

let tasks = [];

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Fungsi untuk menambah tugas
const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    taskInput.value = ""; // Kosongkan input setelah menambah tugas
    updateTasksList();
    updateStats();
    saveTasks();
  }
};

// Fungsi untuk menandai tugas selesai
const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTasksList();
  updateStats();
  saveTasks();
};

const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTasks();
};

const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = tasks[index].text;

  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTasks();
};

// Fungsi untuk memperbarui statistik
const updateStats = () => {
  const completeTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks > 0 ? (completeTasks / totalTasks) * 100 : 0;
  const progressBar = document.getElementById("progress");
  progressBar.style.width = `${progress}%`;

  document.getElementById(
    "numbers"
  ).innerText = `${completeTasks} / ${totalTasks}`;

  if (tasks.length && completeTasks === totalTasks) {
    blaskConfetti();
  }
};

// Fungsi untuk memperbarui daftar tugas
const updateTasksList = () => {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <div class="taskItem">
        <div class="task ${task.completed ? "completed" : ""}">
          <input type="checkbox" class="checkbox" ${
            task.completed ? "checked" : ""
          } />
          <p>${task.text}</p>
        </div>
        <div class="icons">
          <img src="/MODUL 2/DEMO/img/edit.png" onClick="editTask(${index})" />
          <img src="/MODUL 2/DEMO/img/delete.png" onClick="deleteTask(${index})" />
        </div>
      </div>
    `;

    const checkbox = listItem.querySelector(".checkbox");
    checkbox.addEventListener("change", () => toggleTaskComplete(index));

    taskList.append(listItem);
  });
};

// Event listener untuk tombol tambah tugas
document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault();
  addTask();
});

const blaskConfetti = () => {
  const defaults = {
    spread: 360,
    ticks: 100,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    shapes: ["heart"],
    colors: ["FFC0CB", "FF69B4", "FF1493", "C71585"],
  };

  confetti({
    ...defaults,
    particleCount: 50,
    scalar: 2,
  });

  confetti({
    ...defaults,
    particleCount: 25,
    scalar: 3,
  });

  confetti({
    ...defaults,
    particleCount: 10,
    scalar: 4,
  });
};
