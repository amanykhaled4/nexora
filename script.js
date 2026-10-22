/* =========================================
   NEXORA — SCRIPT
========================================= */

const $ = (id) => document.getElementById(id);


/* =========================================
   STORAGE
========================================= */

function load(key, fallback) {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;

    try {
        return JSON.parse(raw);
    } catch {
        return raw;   // older versions saved plain strings like "light"
    }
}

function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

let tasks = load("nexoraTasks", []);
if (!Array.isArray(tasks)) tasks = [];
let currentLanguage = load("nexoraLanguage", "en");
let editingId = null;


/* =========================================
   TRANSLATIONS
========================================= */

const translations = {
    en: {
        langButton: "ع",
        switchLanguage: "التبديل إلى العربية",
        toggleTheme: "Toggle theme",
        welcome: "WELCOME",
        welcomeTitle1: "Stay focused",
        welcomeTitle2: "Get things done",
        welcomeText: "Simple tools for a productive day",
        progressComplete: "complete",
        progressTitle: "Today's progress",
        progressText: (done, total) => `${done} of ${total} tasks`,
        total: "Total",
        done: "Done",
        pending: "Pending",
        myTasks: "My Tasks",
        calculator: "Calculator",
        focusTimer: "Focus Timer",
        workspace: "YOUR WORKSPACE",
        heroText: "Plan your tasks and stay focused",
        morning: "Good morning",
        afternoon: "Good afternoon",
        evening: "Good evening",
        quickTool: "QUICK TOOL",
        focusMode: "FOCUS MODE",
        taskTitle: "My Tasks",
        taskFirst: "Add your first task",
        addTask: "+ Add Task",
        saveTask: "Add",
        taskPlaceholder: "What needs to be done?",
        search: "⌕ Search tasks...",
        allTasks: "All tasks",
        active: "Active",
        completed: "Completed",
        allPriorities: "All priorities",
        high: "High",
        medium: "Medium",
        low: "Low",
        deleteCompleted: "Delete completed",
        noTasks: "No tasks found",
        noTasksSmall: "Add a task to get started",
        taskAdded: "Task added successfully",
        taskUpdated: "Task updated",
        taskDeleted: "Task deleted",
        taskCompleted: "🎉 Great job! Task completed",
        completedDeleted: "Completed tasks deleted",
        enterTask: "Please enter a task",
        editTask: "Edit task",
        deleteTask: "Delete task",
        allCompleted: "All tasks completed!",
        remaining: (count) => `${count} ${count === 1 ? "task" : "tasks"} remaining`,
        calculatorTitle: "Calculator",
        timerTitle: "Focus Timer",
        startFocus: "Start focus",
        pause: "Pause",
        reset: "Reset",
        minutes5: "5 min",
        minutes15: "15 min",
        minutes25: "25 min",
        minutes45: "45 min",
        customTime: "Custom Time",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds",
        setTime: "Set Time",
        setTimeFirst: "Please set a time first",
        focusComplete: "Focus session complete!",
        nothingDelete: "Nothing to delete",
        noCompleted: "You have no completed tasks yet.",
        gotIt: "Got it"
    },

    ar: {
        langButton: "EN",
        switchLanguage: "Switch to English",
        toggleTheme: "تغيير المظهر",
        welcome: "مرحبًا",
        welcomeTitle1: "حافظ على تركيزك",
        welcomeTitle2: "أنجز مهامك",
        welcomeText: "أدوات بسيطة ليوم أكثر إنتاجية",
        progressComplete: "مكتمل",
        progressTitle: "تقدم اليوم",
        progressText: (done, total) => `${done} من ${total} مهام`,
        total: "الإجمالي",
        done: "تم الإنجاز",
        pending: "متبقي",
        myTasks: "المهام",
        calculator: "الحاسبة",
        focusTimer: "مؤقت التركيز",
        workspace: "مساحة العمل",
        heroText: "خطط لمهامك وحافظ على تركيزك",
        morning: "صباح الخير",
        afternoon: "مساء الخير",
        evening: "مساء الخير",
        quickTool: "أداة سريعة",
        focusMode: "وضع التركيز",
        taskTitle: "المهام",
        taskFirst: "ابدأ بإضافة أول مهمة",
        addTask: "+ إضافة مهمة",
        saveTask: "إضافة",
        taskPlaceholder: "ما الذي يجب إنجازه؟",
        search: "⌕ البحث عن المهام...",
        allTasks: "كل المهام",
        active: "غير مكتملة",
        completed: "مكتملة",
        allPriorities: "كل الأولويات",
        high: "أولوية عالية",
        medium: "أولوية متوسطة",
        low: "أولوية منخفضة",
        deleteCompleted: "حذف المهام المكتملة",
        noTasks: "لا توجد مهام",
        noTasksSmall: "ابدأ بإضافة مهمة",
        taskAdded: "تمت إضافة المهمة بنجاح",
        taskUpdated: "تم تعديل المهمة",
        taskDeleted: "تم حذف المهمة",
        taskCompleted: "🎉 عمل رائع! تم إنجاز المهمة",
        completedDeleted: "تم حذف المهام المكتملة",
        enterTask: "يرجى إدخال مهمة",
        editTask: "تعديل المهمة",
        deleteTask: "حذف المهمة",
        allCompleted: "تم إنجاز جميع المهام!",
        remaining: (count) => `${count} ${count === 1 ? "مهمة متبقية" : "مهام متبقية"}`,
        calculatorTitle: "الحاسبة",
        timerTitle: "مؤقت التركيز",
        startFocus: "بدء التركيز",
        pause: "إيقاف مؤقت",
        reset: "إعادة ضبط",
        minutes5: "5 دقائق",
        minutes15: "15 دقيقة",
        minutes25: "25 دقيقة",
        minutes45: "45 دقيقة",
        customTime: "وقت مخصص",
        hours: "ساعات",
        minutes: "دقائق",
        seconds: "ثوانٍ",
        setTime: "ضبط الوقت",
        setTimeFirst: "يرجى تحديد الوقت أولًا",
        focusComplete: "انتهت جلسة التركيز!",
        nothingDelete: "لا يوجد ما يمكن حذفه",
        noCompleted: "لا توجد مهام مكتملة حتى الآن.",
        gotIt: "حسنًا"
    }
};

function t() {
    return translations[currentLanguage] || translations.en;
}

function locale() {
    return currentLanguage === "ar" ? "ar-EG" : "en-US";
}


/* =========================================
   TOAST
========================================= */

const toast = $("toast");
let toastTimer;

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
}


/* =========================================
   TASKS
========================================= */

const taskList = $("taskList");
const taskInput = $("taskInput");
const priority = $("priority");
const addRow = $("addRow");
const search = $("search");
const statusFilter = $("statusFilter");
const priorityFilter = $("priorityFilter");
const deleteModal = $("deleteModal");

function escapeHTML(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
}

function saveTasks() {
    save("nexoraTasks", tasks);
}

function findTask(id) {
    return tasks.find((task) => String(task.id) === String(id));
}

function getFilteredTasks() {
    const query = search.value.toLowerCase().trim();
    const status = statusFilter.value;
    const level = priorityFilter.value;

    return tasks.filter((task) =>
        (!query || task.text.toLowerCase().includes(query)) &&
        (status === "all" || (status === "completed") === task.done) &&
        (level === "all" || task.priority === level)
    );
}

function renderTasks() {
    const lang = t();
    const filtered = getFilteredTasks();

    if (filtered.length === 0) {
        taskList.innerHTML = `
            <div class="empty">
                ${lang.noTasks}
                <small>${lang.noTasksSmall}</small>
            </div>`;
    } else {
        taskList.innerHTML = filtered.map((task) => `
            <div class="task ${task.done ? "done" : ""}" data-id="${task.id}">
                <button type="button" class="check" aria-label="${escapeHTML(task.text)}">
                    ${task.done ? "✓" : ""}
                </button>
                <div>
                    ${String(task.id) === String(editingId)
                        ? `<input class="task-edit" maxlength="120" value="${escapeHTML(task.text)}">`
                        : `<div class="task-name">${escapeHTML(task.text)}</div>`}
                    <div class="task-meta">
                        <span class="badge ${task.priority}">${lang[task.priority]}</span>
                    </div>
                </div>
                <div class="task-actions">
                    <button type="button" class="edit-task" title="${lang.editTask}" aria-label="${lang.editTask}">✎</button>
                    <button type="button" class="delete-task" title="${lang.deleteTask}" aria-label="${lang.deleteTask}">🗑</button>
                </div>
            </div>`).join("");
    }

    const editInput = taskList.querySelector(".task-edit");
    if (editInput) {
        editInput.focus();
        editInput.setSelectionRange(editInput.value.length, editInput.value.length);
    }

    updateStats();
}

function addTask() {
    const text = taskInput.value.trim();

    if (!text) {
        showToast(t().enterTask);
        taskInput.focus();
        return;
    }

    tasks.push({
        id: Date.now(),
        text,
        priority: priority.value,
        done: false,
        createdAt: new Date().toISOString(),
        completedAt: null
    });

    saveTasks();
    taskInput.value = "";
    addRow.classList.remove("open");
    renderTasks();
    showToast(t().taskAdded);
}

function toggleTask(id) {
    const task = findTask(id);
    if (!task) return;

    task.done = !task.done;
    task.completedAt = task.done ? new Date().toISOString() : null;

    saveTasks();
    renderTasks();

    if (task.done) showToast(t().taskCompleted);
}

function deleteTask(id) {
    tasks = tasks.filter((task) => String(task.id) !== String(id));
    saveTasks();
    renderTasks();
    showToast(t().taskDeleted);
}

function startEditing(id) {
    editingId = id;
    renderTasks();
}

function finishEditing(input, keepChanges) {
    if (editingId === null) return;

    const task = findTask(editingId);
    const text = input.value.trim();
    editingId = null;

    if (keepChanges && task && text && text !== task.text) {
        task.text = text;
        saveTasks();
        showToast(t().taskUpdated);
    }

    renderTasks();
}

function clearCompleted() {
    if (!tasks.some((task) => task.done)) {
        deleteModal.classList.add("show");
        return;
    }

    tasks = tasks.filter((task) => !task.done);
    saveTasks();
    renderTasks();
    showToast(t().completedDeleted);
}

function updateStats() {
    const lang = t();
    const total = tasks.length;
    const done = tasks.filter((task) => task.done).length;
    const pending = total - done;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);

    $("totalCount").textContent = total;
    $("doneCount").textContent = done;
    $("pendingCount").textContent = pending;
    $("progressPercent").textContent = `${percent}%`;
    $("progressText").textContent = lang.progressText(done, total);
    $("ring").style.setProperty("--p", `${percent}%`);

    $("taskSubtitle").textContent =
        total === 0 ? lang.taskFirst :
        pending === 0 ? lang.allCompleted :
        lang.remaining(pending);
}

// Task list events (one listener for all tasks)
taskList.addEventListener("click", (event) => {
    const taskElement = event.target.closest(".task");
    if (!taskElement) return;
    const id = taskElement.dataset.id;

    if (event.target.closest(".check")) toggleTask(id);
    else if (event.target.closest(".edit-task")) startEditing(id);
    else if (event.target.closest(".delete-task")) deleteTask(id);
});

taskList.addEventListener("dblclick", (event) => {
    const name = event.target.closest(".task-name");
    if (name) startEditing(name.closest(".task").dataset.id);
});

taskList.addEventListener("keydown", (event) => {
    if (!event.target.classList.contains("task-edit")) return;
    if (event.key === "Enter") finishEditing(event.target, true);
    if (event.key === "Escape") finishEditing(event.target, false);
});

taskList.addEventListener("focusout", (event) => {
    if (event.target.classList.contains("task-edit")) finishEditing(event.target, true);
});

$("addBtn").addEventListener("click", () => {
    addRow.classList.toggle("open");
    if (addRow.classList.contains("open")) taskInput.focus();
});

$("saveTask").addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") addTask();
});

search.addEventListener("input", renderTasks);
statusFilter.addEventListener("change", renderTasks);
priorityFilter.addEventListener("change", renderTasks);

$("clearDone").addEventListener("click", clearCompleted);


/* =========================================
   MODAL
========================================= */

function closeModal() {
    deleteModal.classList.remove("show");
}

$("closeDeleteModal").addEventListener("click", closeModal);

deleteModal.addEventListener("click", (event) => {
    if (event.target === deleteModal) closeModal();
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
});


/* =========================================
   CLOCK, GREETING & DATE
========================================= */

function updateClock() {
    $("clock").textContent = new Date().toLocaleTimeString(locale(), {
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });
}

function updateGreeting() {
    const lang = t();
    const hour = new Date().getHours();
    const text = hour < 12 ? lang.morning : hour < 18 ? lang.afternoon : lang.evening;

    $("greeting").innerHTML = `${text} <span class="greeting-star">✦</span>`;
}

function updateDate() {
    $("date").textContent = new Date().toLocaleDateString(locale(), {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric"
    });
}

setInterval(updateClock, 1000);


/* =========================================
   THEME
========================================= */

const themeBtn = $("themeBtn");

function applyTheme(theme) {
    const light = theme === "light";
    document.body.classList.toggle("light", light);
    themeBtn.textContent = light ? "☀" : "☾";
}

themeBtn.addEventListener("click", () => {
    const theme = document.body.classList.contains("light") ? "dark" : "light";
    applyTheme(theme);
    save("nexoraTheme", theme);
});

applyTheme(load("nexoraTheme", "dark"));


/* =========================================
   NAVIGATION
========================================= */

const tools = document.querySelectorAll(".tool");
const views = document.querySelectorAll(".view");

tools.forEach((tool) => {
    tool.addEventListener("click", () => {
        tools.forEach((item) => item.classList.toggle("active", item === tool));
        views.forEach((view) =>
            view.classList.toggle("hidden", view.id !== `${tool.dataset.tool}View`)
        );
    });
});


/* =========================================
   CALCULATOR
========================================= */

const calcDisplay = $("calcDisplay");
const calculatorView = $("calculatorView");
const OPERATORS = "+-*/";
let calcExpression = "";
let showingResult = false;

// Evaluates "+ - * /" with correct precedence, without eval()
function calculate(expression) {
    const tokens = expression.match(/\d*\.?\d+|[+\-*/]/g) || [];
    const numbers = [];
    const ops = [];
    let expectNumber = true;
    let sign = 1;

    const precedence = (op) => (op === "+" || op === "-" ? 1 : 2);

    const applyTop = () => {
        const b = numbers.pop();
        const a = numbers.pop();
        const op = ops.pop();
        if (op === "/" && b === 0) throw new Error("Division by zero");
        numbers.push(op === "+" ? a + b : op === "-" ? a - b : op === "*" ? a * b : a / b);
    };

    for (const token of tokens) {
        if (OPERATORS.includes(token)) {
            if (expectNumber) {
                if (token === "-") sign = -sign;   // unary minus, e.g. "-5" or "3*-2"
                continue;
            }
            while (ops.length && precedence(ops.at(-1)) >= precedence(token)) applyTop();
            ops.push(token);
            expectNumber = true;
        } else {
            numbers.push(sign * Number(token));
            sign = 1;
            expectNumber = false;
        }
    }

    if (expectNumber && ops.length) ops.pop();   // ignore a trailing operator: "5+"
    while (ops.length) applyTop();

    const result = numbers[0] ?? 0;
    if (!Number.isFinite(result)) throw new Error("Invalid result");

    // Hide floating point noise: 0.1 + 0.2 → 0.3
    return parseFloat(result.toPrecision(12));
}

function setCalc(expression) {
    calcExpression = expression;
    calcDisplay.value = expression || "0";
}

function pressCalc(value) {
    const last = calcExpression.slice(-1);
    const isOperator = OPERATORS.includes(value);

    if (value === "C") return setCalc("");

    if (value === "⌫") {
        showingResult = false;
        return setCalc(calcExpression.slice(0, -1));
    }

    if (value === "=") {
        if (!calcExpression) return;
        try {
            setCalc(String(calculate(calcExpression)));
            showingResult = true;
        } catch {
            calcExpression = "";
            calcDisplay.value = "Error";
        }
        return;
    }

    if (value === "%") {
        // Turn the last number into a percentage: 50+10% → 50+0.1
        const match = calcExpression.match(/(\d*\.?\d+)$/);
        if (match) {
            const percent = parseFloat((Number(match[1]) / 100).toPrecision(12));
            setCalc(calcExpression.slice(0, -match[1].length) + percent);
        }
        return;
    }

    // Typing a digit right after "=" starts a new calculation
    if (showingResult && !isOperator) calcExpression = "";
    showingResult = false;

    if (isOperator) {
        if (!calcExpression && value !== "-") return;
        // Replace the previous operator instead of stacking them: "5+*" → "5*"
        if (OPERATORS.includes(last) && !(value === "-" && last !== "-")) {
            return setCalc(calcExpression.slice(0, -1) + value);
        }
    }

    if (value === ".") {
        const currentNumber = calcExpression.split(/[+\-*/]/).pop();
        if (currentNumber.includes(".")) return;
        if (!currentNumber) value = "0.";
    }

    setCalc(calcExpression + value);
}

document.querySelectorAll("[data-calc]").forEach((button) => {
    button.addEventListener("click", () => pressCalc(button.dataset.calc));
});

// Keyboard support while the calculator is open
const calcKeys = { Enter: "=", "=": "=", Backspace: "⌫", Escape: "C", Delete: "C", x: "*", X: "*" };

document.addEventListener("keydown", (event) => {
    if (calculatorView.classList.contains("hidden")) return;
    if (event.ctrlKey || event.metaKey || event.altKey) return;

    const key = calcKeys[event.key] || event.key;
    if (/^[0-9.%+\-*/=C⌫]$/.test(key)) {
        event.preventDefault();
        pressCalc(key);
    }
});


/* =========================================
   FOCUS TIMER
========================================= */

const timerDisplay = $("timerDisplay");
const startTimer = $("startTimer");
let timerInterval = null;
let timerEndsAt = 0;
let timerDuration = 25 * 60;   // the last time the user picked
let timerSeconds = timerDuration;

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (n) => String(n).padStart(2, "0");

    return hours > 0
        ? `${hours}:${pad(minutes)}:${pad(seconds)}`
        : `${pad(minutes)}:${pad(seconds)}`;
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timerSeconds);
    document.title = timerInterval
        ? `${formatTime(timerSeconds)} · Nexora`
        : "Nexora | Smart Productivity";
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    startTimer.textContent = t().startFocus;
    updateTimerDisplay();
}

function setTimer(seconds) {
    stopTimer();
    timerDuration = seconds;
    timerSeconds = seconds;
    timerDisplay.classList.remove("timer-finished");
    updateTimerDisplay();
}

function tick() {
    // Based on the real clock, so the timer stays accurate even in a background tab
    timerSeconds = Math.max(0, Math.round((timerEndsAt - Date.now()) / 1000));
    updateTimerDisplay();

    if (timerSeconds === 0) {
        stopTimer();
        playTimerSound();
        timerDisplay.classList.add("timer-finished");
        setTimeout(() => timerDisplay.classList.remove("timer-finished"), 2500);
        showToast(t().focusComplete);
    }
}

startTimer.addEventListener("click", () => {
    if (timerInterval) return stopTimer();   // pause

    if (timerSeconds <= 0) timerSeconds = timerDuration;

    timerEndsAt = Date.now() + timerSeconds * 1000;
    timerInterval = setInterval(tick, 250);
    startTimer.textContent = t().pause;
    updateTimerDisplay();
});

$("resetTimer").addEventListener("click", () => setTimer(timerDuration));

document.querySelectorAll("[data-min]").forEach((button) => {
    button.addEventListener("click", () => setTimer(Number(button.dataset.min) * 60));
});

$("setCustomTimer").addEventListener("click", () => {
    const value = (id, max) => Math.min(max, Math.max(0, Math.floor(Number($(id).value) || 0)));
    const seconds = value("customHours", 23) * 3600 + value("customMinutes", 59) * 60 + value("customSeconds", 59);

    if (seconds <= 0) {
        showToast(t().setTimeFirst);
        return;
    }

    setTimer(seconds);
});

function playTimerSound() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const audio = new AudioContext();

    [0, 0.9, 1.8].forEach((delay) => {
        const start = audio.currentTime + delay;
        const oscillator = audio.createOscillator();
        const gain = audio.createGain();

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(880, start);
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(0.35, start + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.8);

        oscillator.connect(gain);
        gain.connect(audio.destination);
        oscillator.start(start);
        oscillator.stop(start + 0.8);
    });
}


/* =========================================
   MOUSE GLOW
========================================= */

const mouseGlow = document.querySelector(".mouse-glow");

document.addEventListener("mousemove", (event) => {
    mouseGlow.style.left = `${event.clientX}px`;
    mouseGlow.style.top = `${event.clientY}px`;
});


/* =========================================
   LANGUAGE
========================================= */

function applyLanguage() {
    const lang = t();
    const isArabic = currentLanguage === "ar";

    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.body.classList.toggle("rtl", isArabic);

    // Every element with data-i18n gets its text from the translations
    document.querySelectorAll("[data-i18n]").forEach((element) => {
        element.textContent = lang[element.dataset.i18n];
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
        element.placeholder = lang[element.dataset.i18nPlaceholder];
    });
    document.querySelectorAll("[data-i18n-title]").forEach((element) => {
        element.title = lang[element.dataset.i18nTitle];
        element.setAttribute("aria-label", element.title);
    });

    $("languageBtn").textContent = lang.langButton;
    startTimer.textContent = timerInterval ? lang.pause : lang.startFocus;

    updateGreeting();
    updateDate();
    updateClock();
    renderTasks();

    save("nexoraLanguage", currentLanguage);
}

$("languageBtn").addEventListener("click", () => {
    currentLanguage = currentLanguage === "en" ? "ar" : "en";
    applyLanguage();
});


/* =========================================
   START
========================================= */

applyLanguage();
updateTimerDisplay();
