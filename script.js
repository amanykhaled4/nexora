/* =========================================
   NEXORA — SCRIPT
========================================= */

const $ = (id) => document.getElementById(id);
const pad = (n) => String(n).padStart(2, "0");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;


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


/* =========================================
   DATES
========================================= */

// Local "YYYY-MM-DD" (toISOString would use UTC and can shift the day)
function dayKey(date = new Date()) {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function parseDay(key) {
    const [year, month, day] = key.split("-").map(Number);
    return new Date(year, month - 1, day);
}

function daysFromToday(key) {
    return Math.round((parseDay(key) - parseDay(dayKey())) / 86400000);
}


/* =========================================
   ACTIVITY LOG (for insights)
========================================= */

let activity = load("nexoraActivity", null);

if (!activity || typeof activity !== "object") {
    activity = { completed: {}, focus: {}, sessions: {} };

    // First run: build activity from tasks that were already completed
    tasks
        .filter((task) => task.done && task.completedAt)
        .forEach((task) => bump(activity.completed, dayKey(new Date(task.completedAt)), 1));

    saveActivity();
}

function bump(log, key, amount) {
    log[key] = Math.max(0, (log[key] || 0) + amount);
}

function saveActivity() {
    save("nexoraActivity", activity);
}


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
        insights: "Insights",
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
        dueDate: "Due date (optional)",
        search: "⌕ Search tasks...",
        allTasks: "All tasks",
        active: "Active",
        completed: "Completed",
        allPriorities: "All priorities",
        high: "High",
        medium: "Medium",
        low: "Low",
        changePriority: "Click to change priority",
        dragTask: "Drag to reorder",
        dueToday: "Today",
        dueTomorrow: "Tomorrow",
        overdue: "Overdue",
        deleteCompleted: "Delete completed",
        noTasks: "No tasks found",
        noTasksSmall: "Add a task to get started",
        taskAdded: "Task added successfully",
        taskUpdated: "Task updated",
        taskDeleted: "Task deleted",
        taskRestored: "Restored",
        undo: "Undo",
        taskCompleted: "🎉 Great job! Task completed",
        allDoneCelebrate: "🎉 All tasks completed! Amazing work",
        completedDeleted: "Completed tasks deleted",
        enterTask: "Please enter a task",
        editTask: "Edit task",
        deleteTask: "Delete task",
        allCompleted: "All tasks completed!",
        remaining: (count) => `${count} ${count === 1 ? "task" : "tasks"} remaining`,
        overdueCount: (count) => `${count} overdue`,
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
        sessionsToday: (count) => count === 1 ? "1 focus session today" : `${count} focus sessions today`,
        insightsEyebrow: "YOUR WEEK",
        insightsTitle: "Insights",
        completedToday: "Completed today",
        dayStreak: "Day streak",
        focusMinutes: "Focus minutes today",
        completionRate: "Completion rate",
        last7Days: "Last 7 days",
        weekTotal: (count) => `${count} completed`,
        pendingByPriority: "Pending by priority",
        noPending: "Nothing pending, nice work!",
        nothingDelete: "Nothing to delete",
        noCompleted: "You have no completed tasks yet.",
        gotIt: "Got it",
        shortcuts: "Keyboard shortcuts",
        scNew: "New task",
        scSearch: "Search tasks",
        scTools: "Switch tools",
        scTimer: "Start / pause timer",
        scTheme: "Toggle theme",
        scLanguage: "Switch language",
        scHelp: "Show shortcuts",
        scClose: "Close / cancel"
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
        insights: "الإحصائيات",
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
        dueDate: "تاريخ التسليم (اختياري)",
        search: "⌕ البحث عن المهام...",
        allTasks: "كل المهام",
        active: "غير مكتملة",
        completed: "مكتملة",
        allPriorities: "كل الأولويات",
        high: "أولوية عالية",
        medium: "أولوية متوسطة",
        low: "أولوية منخفضة",
        changePriority: "اضغط لتغيير الأولوية",
        dragTask: "اسحب لإعادة الترتيب",
        dueToday: "اليوم",
        dueTomorrow: "غدًا",
        overdue: "متأخرة",
        deleteCompleted: "حذف المهام المكتملة",
        noTasks: "لا توجد مهام",
        noTasksSmall: "ابدأ بإضافة مهمة",
        taskAdded: "تمت إضافة المهمة بنجاح",
        taskUpdated: "تم تعديل المهمة",
        taskDeleted: "تم حذف المهمة",
        taskRestored: "تمت الاستعادة",
        undo: "تراجع",
        taskCompleted: "🎉 عمل رائع! تم إنجاز المهمة",
        allDoneCelebrate: "🎉 تم إنجاز كل المهام! عمل مذهل",
        completedDeleted: "تم حذف المهام المكتملة",
        enterTask: "يرجى إدخال مهمة",
        editTask: "تعديل المهمة",
        deleteTask: "حذف المهمة",
        allCompleted: "تم إنجاز جميع المهام!",
        remaining: (count) => `${count} ${count === 1 ? "مهمة متبقية" : "مهام متبقية"}`,
        overdueCount: (count) => `${count} متأخرة`,
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
        sessionsToday: (count) => `${count} جلسة تركيز اليوم`,
        insightsEyebrow: "أسبوعك",
        insightsTitle: "الإحصائيات",
        completedToday: "أُنجزت اليوم",
        dayStreak: "أيام متتالية",
        focusMinutes: "دقائق التركيز اليوم",
        completionRate: "نسبة الإنجاز",
        last7Days: "آخر 7 أيام",
        weekTotal: (count) => `${count} مهمة منجزة`,
        pendingByPriority: "المتبقي حسب الأولوية",
        noPending: "لا توجد مهام متبقية، عمل رائع!",
        nothingDelete: "لا يوجد ما يمكن حذفه",
        noCompleted: "لا توجد مهام مكتملة حتى الآن.",
        gotIt: "حسنًا",
        shortcuts: "اختصارات لوحة المفاتيح",
        scNew: "مهمة جديدة",
        scSearch: "البحث في المهام",
        scTools: "التنقل بين الأدوات",
        scTimer: "تشغيل / إيقاف المؤقت",
        scTheme: "تغيير المظهر",
        scLanguage: "تغيير اللغة",
        scHelp: "عرض الاختصارات",
        scClose: "إغلاق / إلغاء"
    }
};

function t() {
    return translations[currentLanguage] || translations.en;
}

function locale() {
    return currentLanguage === "ar" ? "ar-EG" : "en-US";
}


/* =========================================
   TOAST (with optional Undo button)
========================================= */

const toast = $("toast");
const toastText = $("toastText");
const toastAction = $("toastAction");
let toastTimer;
let toastCallback = null;

function showToast(message, action) {
    toastText.textContent = message;
    toastCallback = action ? action.onClick : null;
    toastAction.hidden = !action;
    if (action) toastAction.textContent = action.label;

    toast.classList.toggle("has-action", Boolean(action));
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(hideToast, action ? 5000 : 2200);
}

function hideToast() {
    toast.classList.remove("show", "has-action");
    toastCallback = null;
}

toastAction.addEventListener("click", () => {
    const callback = toastCallback;
    hideToast();
    if (callback) callback();
});


/* =========================================
   TASKS
========================================= */

const taskList = $("taskList");
const taskInput = $("taskInput");
const taskDue = $("taskDue");
const priority = $("priority");
const addRow = $("addRow");
const search = $("search");
const statusFilter = $("statusFilter");
const priorityFilter = $("priorityFilter");
const PRIORITIES = ["low", "medium", "high"];

let editingId = null;
let animateId = null;     // task that should play the "added" animation
let poppedId = null;      // task whose checkbox should "pop"

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

function filtersActive() {
    return search.value.trim() !== "" || statusFilter.value !== "all" || priorityFilter.value !== "all";
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

function dueChip(task) {
    if (!task.due) return "";

    const lang = t();
    const days = daysFromToday(task.due);
    const date = parseDay(task.due).toLocaleDateString(locale(), { month: "short", day: "numeric" });

    let label = date;
    let type = "";

    if (!task.done && days < 0) {
        label = `${lang.overdue} · ${date}`;
        type = "overdue";
    } else if (days === 0) {
        label = lang.dueToday;
        type = "today";
    } else if (days === 1) {
        label = lang.dueTomorrow;
    }

    return `<span class="due ${type}">◷ ${label}</span>`;
}

function taskTemplate(task) {
    const lang = t();
    const editing = String(task.id) === String(editingId);
    const classes = [
        "task",
        task.done ? "done" : "",
        editing ? "editing" : "",
        String(task.id) === String(animateId) ? "task-enter" : "",
        String(task.id) === String(poppedId) ? "pop" : ""
    ].join(" ");

    const body = editing
        ? `<div class="task-edit-row">
               <input class="task-edit" maxlength="120" value="${escapeHTML(task.text)}">
               <input class="task-edit-due" type="date" value="${task.due || ""}" title="${lang.dueDate}">
           </div>`
        : `<div class="task-name">${escapeHTML(task.text)}</div>`;

    return `
        <div class="${classes}" data-id="${task.id}">
            <button type="button" class="drag-handle" title="${lang.dragTask}" aria-label="${lang.dragTask}">⋮⋮</button>
            <button type="button" class="check" aria-label="${escapeHTML(task.text)}">${task.done ? "✓" : ""}</button>
            <div class="task-body">
                ${body}
                <div class="task-meta">
                    <button type="button" class="badge ${task.priority}" title="${lang.changePriority}">${lang[task.priority]}</button>
                    ${dueChip(task)}
                </div>
            </div>
            <div class="task-actions">
                <button type="button" class="edit-task" title="${lang.editTask}" aria-label="${lang.editTask}">✎</button>
                <button type="button" class="delete-task" title="${lang.deleteTask}" aria-label="${lang.deleteTask}">🗑</button>
            </div>
        </div>`;
}

function renderTasks() {
    const lang = t();
    const filtered = getFilteredTasks();

    taskList.classList.toggle("no-drag", filtersActive());

    taskList.innerHTML = filtered.length === 0
        ? `<div class="empty">
               <div class="empty-icon">✦</div>
               ${lang.noTasks}
               <small>${lang.noTasksSmall}</small>
           </div>`
        : filtered.map(taskTemplate).join("");

    animateId = null;
    poppedId = null;

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

    const task = {
        id: Date.now(),
        text,
        priority: priority.value,
        due: taskDue.value || null,
        done: false,
        createdAt: new Date().toISOString(),
        completedAt: null
    };

    tasks.push(task);
    saveTasks();

    taskInput.value = "";
    taskDue.value = "";
    addRow.classList.remove("open");
    animateId = task.id;
    renderTasks();
    taskList.lastElementChild?.scrollIntoView({ block: "nearest", behavior: "smooth" });
    showToast(t().taskAdded);
}

function toggleTask(id) {
    const task = findTask(id);
    if (!task) return;

    if (task.done) {
        // Undo the activity entry for the day it was completed
        if (task.completedAt) bump(activity.completed, dayKey(new Date(task.completedAt)), -1);
        task.done = false;
        task.completedAt = null;
    } else {
        task.done = true;
        task.completedAt = new Date().toISOString();
        bump(activity.completed, dayKey(), 1);
        poppedId = task.id;
    }

    saveTasks();
    saveActivity();
    renderTasks();

    if (!task.done) return;

    if (tasks.every((item) => item.done)) {
        showToast(t().allDoneCelebrate);
        launchConfetti();
    } else {
        showToast(t().taskCompleted);
    }
}

function cyclePriority(id) {
    const task = findTask(id);
    if (!task) return;

    task.priority = PRIORITIES[(PRIORITIES.indexOf(task.priority) + 1) % PRIORITIES.length];
    saveTasks();
    renderTasks();
}

// Removes tasks with an Undo option that puts them back in the same place
function removeTasks(shouldRemove, message) {
    const removed = [];

    tasks = tasks.filter((task, index) => {
        if (!shouldRemove(task)) return true;
        removed.push({ task, index });
        return false;
    });

    saveTasks();
    renderTasks();

    showToast(message, {
        label: t().undo,
        onClick: () => {
            removed.forEach(({ task, index }) => tasks.splice(index, 0, task));
            saveTasks();
            renderTasks();
            showToast(t().taskRestored);
        }
    });
}

function deleteTask(id) {
    const element = taskList.querySelector(`.task[data-id="${id}"]`);
    const remove = () => removeTasks((task) => String(task.id) === String(id), t().taskDeleted);

    if (!element || prefersReducedMotion) return remove();
    if (element.classList.contains("task-leave")) return;   // already being deleted

    element.classList.add("task-leave");
    element.addEventListener("animationend", (event) => {
        if (event.target === element) remove();
    });
}

function clearCompleted() {
    if (!tasks.some((task) => task.done)) {
        openModal("deleteModal");
        return;
    }

    removeTasks((task) => task.done, t().completedDeleted);
}

function startEditing(id) {
    editingId = id;
    renderTasks();
}

function finishEditing(keepChanges) {
    if (editingId === null) return;

    const element = taskList.querySelector(".task.editing");
    const task = findTask(editingId);
    editingId = null;

    if (keepChanges && task && element) {
        const text = element.querySelector(".task-edit").value.trim();
        const due = element.querySelector(".task-edit-due").value || null;

        if (text && (text !== task.text || due !== (task.due || null))) {
            task.text = text;
            task.due = due;
            saveTasks();
            showToast(t().taskUpdated);
        }
    }

    renderTasks();
}

function updateStats() {
    const lang = t();
    const total = tasks.length;
    const done = tasks.filter((task) => task.done).length;
    const pending = total - done;
    const overdue = tasks.filter((task) => !task.done && task.due && daysFromToday(task.due) < 0).length;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);

    $("totalCount").textContent = total;
    $("doneCount").textContent = done;
    $("pendingCount").textContent = pending;
    $("progressPercent").textContent = `${percent}%`;
    $("progressText").textContent = lang.progressText(done, total);
    $("ring").style.setProperty("--p", `${percent}%`);

    let subtitle =
        total === 0 ? lang.taskFirst :
        pending === 0 ? lang.allCompleted :
        lang.remaining(pending);

    if (overdue > 0) subtitle += ` · ${lang.overdueCount(overdue)}`;
    $("taskSubtitle").textContent = subtitle;

    renderInsights();
}

// One listener for every task (event delegation)
taskList.addEventListener("click", (event) => {
    const taskElement = event.target.closest(".task");
    if (!taskElement || taskElement.classList.contains("editing") && !event.target.closest(".task-actions")) return;
    const id = taskElement.dataset.id;

    if (event.target.closest(".check")) toggleTask(id);
    else if (event.target.closest(".badge")) cyclePriority(id);
    else if (event.target.closest(".edit-task")) startEditing(id);
    else if (event.target.closest(".delete-task")) deleteTask(id);
});

taskList.addEventListener("dblclick", (event) => {
    const name = event.target.closest(".task-name");
    if (name) startEditing(name.closest(".task").dataset.id);
});

taskList.addEventListener("keydown", (event) => {
    if (!event.target.closest(".task-edit-row")) return;
    if (event.key === "Enter") finishEditing(true);
    if (event.key === "Escape") {
        event.stopPropagation();
        finishEditing(false);
    }
});

// Save when focus leaves the edit row (but not when moving between its two inputs)
taskList.addEventListener("focusout", (event) => {
    const row = event.target.closest(".task-edit-row");
    if (row && !row.contains(event.relatedTarget)) finishEditing(true);
});

$("addBtn").addEventListener("click", () => {
    addRow.classList.toggle("open");
    if (addRow.classList.contains("open")) taskInput.focus();
});

$("saveTask").addEventListener("click", addTask);

[taskInput, taskDue].forEach((input) => {
    input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") addTask();
    });
});

search.addEventListener("input", renderTasks);
statusFilter.addEventListener("change", renderTasks);
priorityFilter.addEventListener("change", renderTasks);

$("clearDone").addEventListener("click", clearCompleted);


/* =========================================
   DRAG & DROP (mouse, touch and keyboard)
========================================= */

let drag = null;

function saveOrderFromDOM() {
    const ids = [...taskList.querySelectorAll(".task")].map((element) => element.dataset.id);
    tasks = ids.map(findTask).filter(Boolean);
    saveTasks();
}

taskList.addEventListener("pointerdown", (event) => {
    const handle = event.target.closest(".drag-handle");
    if (!handle || filtersActive() || editingId !== null) return;

    event.preventDefault();
    drag = { item: handle.closest(".task"), moved: false };
    drag.item.classList.add("dragging");
    taskList.classList.add("is-dragging");
});

// Listen on the document so the drag keeps working when the pointer leaves the list
document.addEventListener("pointermove", (event) => {
    if (!drag) return;

    const y = event.clientY;
    const others = [...taskList.querySelectorAll(".task:not(.dragging)")];
    const next = others.find((element) => {
        const box = element.getBoundingClientRect();
        return y < box.top + box.height / 2;
    });

    if (next !== drag.item.nextElementSibling) {
        taskList.insertBefore(drag.item, next || null);
        drag.moved = true;
    }

    // Auto-scroll when dragging near the edges of the list
    const box = taskList.getBoundingClientRect();
    if (y < box.top + 30) taskList.scrollTop -= 8;
    if (y > box.bottom - 30) taskList.scrollTop += 8;
});

function endDrag() {
    if (!drag) return;

    drag.item.classList.remove("dragging");
    taskList.classList.remove("is-dragging");
    if (drag.moved) saveOrderFromDOM();
    drag = null;
}

document.addEventListener("pointerup", endDrag);
document.addEventListener("pointercancel", endDrag);

// Keyboard: focus the handle and use the arrow keys
taskList.addEventListener("keydown", (event) => {
    const handle = event.target.closest(".drag-handle");
    if (!handle || filtersActive() || !["ArrowUp", "ArrowDown"].includes(event.key)) return;

    event.preventDefault();
    const index = tasks.findIndex((task) => String(task.id) === handle.closest(".task").dataset.id);
    const target = index + (event.key === "ArrowUp" ? -1 : 1);
    if (target < 0 || target >= tasks.length) return;

    [tasks[index], tasks[target]] = [tasks[target], tasks[index]];
    saveTasks();
    renderTasks();
    taskList.querySelectorAll(".drag-handle")[target].focus();
});


/* =========================================
   MODALS
========================================= */

function openModal(id) {
    $(id).classList.add("show");
    $(id).querySelector(".modal-close-btn").focus();
}

function closeModals() {
    document.querySelectorAll(".delete-modal.show").forEach((modal) => modal.classList.remove("show"));
}

document.querySelectorAll(".delete-modal").forEach((modal) => {
    modal.addEventListener("click", (event) => {
        if (event.target === modal || event.target.closest(".modal-close-btn")) closeModals();
    });
});

$("shortcutsBtn").addEventListener("click", () => openModal("shortcutsModal"));

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModals();
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

function toggleTheme() {
    const theme = document.body.classList.contains("light") ? "dark" : "light";
    applyTheme(theme);
    save("nexoraTheme", theme);
}

themeBtn.addEventListener("click", toggleTheme);

// First visit: follow the system setting
applyTheme(load("nexoraTheme", window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark"));


/* =========================================
   NAVIGATION
========================================= */

const tools = [...document.querySelectorAll(".tool")];
const views = document.querySelectorAll(".view");

function showTool(name) {
    tools.forEach((tool) => tool.classList.toggle("active", tool.dataset.tool === name));
    views.forEach((view) => view.classList.toggle("hidden", view.id !== `${name}View`));
    if (name === "insights") renderInsights();
}

function isVisible(view) {
    return !$(view).classList.contains("hidden");
}

tools.forEach((tool) => {
    tool.addEventListener("click", () => showTool(tool.dataset.tool));
});


/* =========================================
   CALCULATOR
========================================= */

const calcDisplay = $("calcDisplay");
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
    if (!isVisible("calculatorView") || document.querySelector(".delete-modal.show")) return;
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
const timerProgress = $("timerProgress");
const startTimer = $("startTimer");
const RING_LENGTH = 2 * Math.PI * 54;

let timerInterval = null;
let timerEndsAt = 0;
let timerDuration = 25 * 60;   // the last time the user picked
let timerSeconds = timerDuration;

timerProgress.style.strokeDasharray = RING_LENGTH;

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return hours > 0
        ? `${hours}:${pad(minutes)}:${pad(seconds)}`
        : `${pad(minutes)}:${pad(seconds)}`;
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timerSeconds);
    timerProgress.style.strokeDashoffset = RING_LENGTH * (1 - timerSeconds / timerDuration);
    timerDisplay.closest(".timer-ring").classList.toggle("running", Boolean(timerInterval));

    document.title = timerInterval
        ? `${formatTime(timerSeconds)} · Nexora`
        : "Nexora | Smart Productivity";
}

function updateSessionCount() {
    const sessions = activity.sessions[dayKey()] || 0;
    $("sessionCount").textContent = sessions > 0 ? t().sessionsToday(sessions) : "";
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

function finishSession() {
    stopTimer();

    bump(activity.focus, dayKey(), Math.round(timerDuration / 60));
    bump(activity.sessions, dayKey(), 1);
    saveActivity();
    updateSessionCount();
    renderInsights();

    playTimerSound();
    timerDisplay.classList.add("timer-finished");
    setTimeout(() => timerDisplay.classList.remove("timer-finished"), 2500);
    showToast(t().focusComplete);
}

function tick() {
    // Based on the real clock, so the timer stays accurate even in a background tab
    timerSeconds = Math.max(0, Math.round((timerEndsAt - Date.now()) / 1000));
    updateTimerDisplay();
    if (timerSeconds === 0) finishSession();
}

function toggleTimer() {
    if (timerInterval) return stopTimer();   // pause

    if (timerSeconds <= 0) timerSeconds = timerDuration;

    timerEndsAt = Date.now() + timerSeconds * 1000;
    timerInterval = setInterval(tick, 250);
    startTimer.textContent = t().pause;
    updateTimerDisplay();
}

startTimer.addEventListener("click", toggleTimer);

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
   INSIGHTS
========================================= */

function currentStreak() {
    const day = new Date();
    // Today still counts as "in progress", so start from yesterday if nothing is done yet
    if (!activity.completed[dayKey(day)]) day.setDate(day.getDate() - 1);

    let streak = 0;
    while (activity.completed[dayKey(day)]) {
        streak++;
        day.setDate(day.getDate() - 1);
    }
    return streak;
}

function renderInsights() {
    if (!isVisible("insightsView")) return;

    const lang = t();
    const today = dayKey();
    const total = tasks.length;
    const done = tasks.filter((task) => task.done).length;

    $("statToday").textContent = activity.completed[today] || 0;
    $("statStreak").textContent = currentStreak();
    $("statFocus").textContent = activity.focus[today] || 0;
    $("statRate").textContent = `${total ? Math.round((done / total) * 100) : 0}%`;

    // Last 7 days bar chart
    const days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return { key: dayKey(date), date, count: activity.completed[dayKey(date)] || 0 };
    });
    const max = Math.max(1, ...days.map((day) => day.count));
    const weekTotal = days.reduce((sum, day) => sum + day.count, 0);

    $("weekTotal").textContent = lang.weekTotal(weekTotal);
    $("weekChart").innerHTML = days.map((day) => `
        <div class="bar-col ${day.key === today ? "today" : ""}">
            <span class="bar-value">${day.count}</span>
            <div class="bar-track"><div class="bar" data-height="${(day.count / max) * 100}"></div></div>
            <span class="bar-day">${day.date.toLocaleDateString(locale(), { weekday: "short" })}</span>
        </div>`).join("");

    // Pending tasks per priority
    const pending = tasks.filter((task) => !task.done);
    $("priorityBars").innerHTML = pending.length === 0
        ? `<p class="insights-empty">${lang.noPending}</p>`
        : ["high", "medium", "low"].map((level) => {
            const count = pending.filter((task) => task.priority === level).length;
            return `
                <div class="priority-row">
                    <div class="row-head"><span>${lang[level]}</span><b>${count}</b></div>
                    <div class="priority-track"><div class="priority-fill ${level}" data-width="${(count / pending.length) * 100}"></div></div>
                </div>`;
        }).join("");

    // Grow the bars on the next frame so the CSS transition plays
    requestAnimationFrame(() => {
        document.querySelectorAll(".bar").forEach((bar) => { bar.style.height = `${bar.dataset.height}%`; });
        document.querySelectorAll(".priority-fill").forEach((fill) => { fill.style.width = `${fill.dataset.width}%`; });
    });
}


/* =========================================
   CONFETTI
========================================= */

function launchConfetti() {
    if (prefersReducedMotion) return;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const colors = ["#22d3ee", "#818cf8", "#34d399", "#fbbf24", "#fb7185"];

    canvas.className = "confetti";
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    document.body.appendChild(canvas);

    const pieces = Array.from({ length: 150 }, () => ({
        x: innerWidth / 2 + (Math.random() - 0.5) * 200,
        y: innerHeight * 0.35,
        vx: (Math.random() - 0.5) * 16,
        vy: Math.random() * -14 - 4,
        size: Math.random() * 7 + 4,
        rotation: Math.random() * Math.PI,
        spin: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)]
    }));

    const startTime = performance.now();

    (function frame(now) {
        const elapsed = now - startTime;
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.globalAlpha = Math.max(0, 1 - elapsed / 2800);

        pieces.forEach((piece) => {
            piece.vy += 0.35;          // gravity
            piece.vx *= 0.99;          // air resistance
            piece.x += piece.vx;
            piece.y += piece.vy;
            piece.rotation += piece.spin;

            context.save();
            context.translate(piece.x, piece.y);
            context.rotate(piece.rotation);
            context.fillStyle = piece.color;
            context.fillRect(-piece.size / 2, -piece.size / 4, piece.size, piece.size / 2);
            context.restore();
        });

        if (elapsed < 2800) requestAnimationFrame(frame);
        else canvas.remove();
    })(startTime);
}


/* =========================================
   KEYBOARD SHORTCUTS
========================================= */

document.addEventListener("keydown", (event) => {
    const typing = event.target.closest("input, textarea, select, [contenteditable]");
    if (typing || event.ctrlKey || event.metaKey || event.altKey) return;
    if (document.querySelector(".delete-modal.show")) return;

    // In the calculator, keys are used for typing numbers
    if (isVisible("calculatorView") && event.key !== "?") return;

    // event.code is the physical key, so shortcuts also work with an Arabic keyboard layout
    const code = event.code;

    if (event.key === "?" || (code === "Slash" && event.shiftKey)) {
        openModal("shortcutsModal");
    } else if (code === "KeyN") {
        event.preventDefault();
        showTool("tasks");
        addRow.classList.add("open");
        taskInput.focus();
    } else if (code === "Slash") {
        event.preventDefault();
        showTool("tasks");
        search.focus();
    } else if (/^Digit[1-4]$/.test(code)) {
        showTool(tools[Number(code.slice(-1)) - 1].dataset.tool);
    } else if (code === "Space" && isVisible("timerView") && !event.target.closest("button")) {
        event.preventDefault();
        toggleTimer();
    } else if (code === "KeyT") {
        toggleTheme();
    } else if (code === "KeyL") {
        $("languageBtn").click();
    }
});


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
    updateSessionCount();
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
