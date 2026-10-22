/* =========================================
   NEXORA — SCRIPT
========================================= */


/* =========================================
   DATA
========================================= */

let tasks =
    JSON.parse(
        localStorage.getItem("nexoraTasks")
    ) || [];

let timerInterval = null;
let timerSeconds = 25 * 60;


/* =========================================
   ELEMENTS
========================================= */

const taskList =
    document.getElementById("taskList");

const taskInput =
    document.getElementById("taskInput");

const priority =
    document.getElementById("priority");

const addBtn =
    document.getElementById("addBtn");

const addRow =
    document.getElementById("addRow");

const saveTask =
    document.getElementById("saveTask");

const search =
    document.getElementById("search");

const statusFilter =
    document.getElementById("statusFilter");

const priorityFilter =
    document.getElementById("priorityFilter");

const totalCount =
    document.getElementById("totalCount");

const doneCount =
    document.getElementById("doneCount");

const pendingCount =
    document.getElementById("pendingCount");

const progressPercent =
    document.getElementById("progressPercent");

const progressText =
    document.getElementById("progressText");

const ring =
    document.getElementById("ring");

const taskSubtitle =
    document.getElementById("taskSubtitle");

const toast =
    document.getElementById("toast");

const clearDone =
    document.getElementById("clearDone");

const deleteModal =
    document.getElementById("deleteModal");

const closeDeleteModal =
    document.getElementById("closeDeleteModal");

const themeBtn =
    document.getElementById("themeBtn");

const languageBtn =
    document.getElementById("languageBtn");

const clock =
    document.getElementById("clock");

const greeting =
    document.getElementById("greeting");

const date =
    document.getElementById("date");


/* =========================================
   LANGUAGE
========================================= */

let currentLanguage =
    localStorage.getItem("nexoraLanguage") || "en";


const translations = {

    /* =====================================
       ENGLISH
    ===================================== */

    en: {

        langButton: "ع",

        welcome: "WELCOME",

        welcomeTitle1:
            "Stay focused",

        welcomeTitle2:
            "Get things done",

        welcomeText:
            "Simple tools for a productive day",

        progressComplete:
            "complete",

        progressTitle:
            "Today's progress",

        total:
            "Total",

        done:
            "Done",

        pending:
            "Pending",

        myTasks:
            "My Tasks",

        calculator:
            "Calculator",

        focusTimer:
            "Focus Timer",

        workspace:
            "YOUR WORKSPACE",

        heroText:
            "Plan your tasks and Stay focused",

        quickTool:
            "QUICK TOOL",

        focusMode:
            "FOCUS MODE",

        taskTitle:
            "My Tasks",

        taskFirst:
            "Add your first task",

        addTask:
            "+ Add Task",

        saveTask:
            "Add",

        taskPlaceholder:
            "What needs to be done?",

        search:
            "⌕ Search tasks...",

        allTasks:
            "All tasks",

        active:
            "Active",

        completed:
            "Completed",

        allPriorities:
            "All priorities",

        high:
            "High",

        medium:
            "Medium",

        low:
            "Low",

        deleteCompleted:
            "Delete completed",

        noTasks:
            "No tasks found",

        noTasksSmall:
            "Add a task to get started",

        taskAdded:
            "Task added successfully",

        taskDeleted:
            "Task deleted",

        completedDeleted:
            "Completed tasks deleted",

        enterTask:
            "Please enter a task",

        allCompleted:
            "All tasks completed!",

        remainingOne:
            "task remaining",

        remainingMany:
            "tasks remaining",

        calculatorTitle:
            "Calculator",

        timerTitle:
            "Focus Timer",

        startFocus:
            "Start focus",

        pause:
            "Pause",

        reset:
            "Reset",

        minutes5:
            "5 min",

        minutes15:
            "15 min",

        minutes25:
            "25 min",

        minutes45:
            "45 min",

        focusComplete:
            "Focus session complete!",

        nothingDelete:
            "Nothing to delete",

        noCompleted:
            "You have no completed tasks yet.",

        gotIt:
            "Got it"

    },


    /* =====================================
       ARABIC
    ===================================== */

    ar: {

        langButton:
            "EN",

        welcome:
            "مرحبًا",

        welcomeTitle1:
            "حافظ على تركيزك",

        welcomeTitle2:
            "أنجز المهام",

        welcomeText:
            "أدوات بسيطة ليوم أكثر إنتاجية",

        progressComplete:
            "مكتمل",

        progressTitle:
            "تقدم اليوم",

        total:
            "الإجمالي",

        done:
            "تم الإنجاز",

        pending:
            "متبقي",

        myTasks:
            "المهام",

        calculator:
            "الحاسبة",

        focusTimer:
            "مؤقت التركيز",

        workspace:
            "مساحة العمل",

        heroText:
            "خطط للمهام وحافظ على التركيز",

        quickTool:
            "أداة سريعة",

        focusMode:
            "وضع التركيز",

        taskTitle:
            "المهام",

        taskFirst:
            "ابدأ بإضافة أول مهمة",

        addTask:
            "+ إضافة مهمة",

        saveTask:
            "إضافة",

        taskPlaceholder:
            "ما الذي يجب إنجازه؟",

        search:
            "⌕ البحث عن المهام...",

        allTasks:
            "كل المهام",

        active:
            "غير مكتملة",

        completed:
            "مكتملة",

        allPriorities:
            "كل الأولويات",

        high:
            "أولوية عالية",

        medium:
            "أولوية متوسطة",

        low:
            "أولوية منخفضة",

        deleteCompleted:
            "حذف المهام المكتملة",

        noTasks:
            "لا توجد مهام",

        noTasksSmall:
            "ابدأ بإضافة مهمة",

        taskAdded:
            "تمت إضافة المهمة بنجاح",

        taskDeleted:
            "تم حذف المهمة",

        completedDeleted:
            "تم حذف المهام المكتملة",

        enterTask:
            "يرجى إدخال مهمة",

        allCompleted:
            "تم إنجاز جميع المهام!",

        remainingOne:
            "مهمة متبقية",

        remainingMany:
            "مهام متبقية",

        calculatorTitle:
            "الحاسبة",

        timerTitle:
            "مؤقت التركيز",

        startFocus:
            "بدء التركيز",

        pause:
            "إيقاف",

        reset:
            "إعادة ضبط",

        minutes5:
            "5 دقائق",

        minutes15:
            "15 دقيقة",

        minutes25:
            "25 دقيقة",

        minutes45:
            "45 دقيقة",

        focusComplete:
            "انتهت جلسة التركيز!",

        nothingDelete:
            "لا يوجد ما يمكن حذفه",

        noCompleted:
            "لا توجد مهام مكتملة حتى الآن.",

        gotIt:
            "حسنًا"

    }

};


/* =========================================
   GET CURRENT TRANSLATION
========================================= */

function t() {

    return translations[currentLanguage];

}


/* =========================================
   SAVE DATA
========================================= */

function saveData() {

    localStorage.setItem(
        "nexoraTasks",
        JSON.stringify(tasks)
    );

}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =========================================
   PRIORITY TRANSLATION
========================================= */

function translatePriority(value) {

    if (currentLanguage === "ar") {

        if (value === "high")
            return t().high;

        if (value === "medium")
            return t().medium;

        if (value === "low")
            return t().low;

    }

    return value.charAt(0).toUpperCase() +
           value.slice(1);

}


/* =========================================
   RENDER TASKS
========================================= */

function renderTasks() {

    taskList.innerHTML = "";

    let filtered = [...tasks];


    /* Search */

    const searchValue =
        search.value
            .toLowerCase()
            .trim();


    if (searchValue) {

        filtered =
            filtered.filter(task =>
                task.text
                    .toLowerCase()
                    .includes(searchValue)
            );

    }


    /* Status */

    const status =
        statusFilter.value;


    if (status === "active") {

        filtered =
            filtered.filter(task =>
                !task.done
            );

    }


    if (status === "completed") {

        filtered =
            filtered.filter(task =>
                task.done
            );

    }


    /* Priority */

    const priorityValue =
        priorityFilter.value;


    if (priorityValue !== "all") {

        filtered =
            filtered.filter(task =>
                task.priority === priorityValue
            );

    }


    /* Empty */

    if (filtered.length === 0) {

        taskList.innerHTML = `

            <div class="empty">

                ${t().noTasks}

                <small>
                    ${t().noTasksSmall}
                </small>

            </div>

        `;

        updateStats();

        return;

    }


    /* Create Tasks */

    filtered.forEach(task => {

        const div =
            document.createElement("div");


        div.className =
            `task ${task.done ? "done" : ""}`;


        div.innerHTML = `

            <button
                class="check"
                data-id="${task.id}">

                ${task.done ? "✓" : ""}

            </button>


            <div>

                <div class="task-name">

                    ${escapeHTML(task.text)}

                </div>


                <div class="task-meta">

                    <span
                        class="badge ${task.priority}">

                        ${translatePriority(
                            task.priority
                        )}

                    </span>

                </div>

            </div>


            <div class="task-actions">

                <button
                    class="delete-task"
                    data-id="${task.id}"
                    title="Delete task">

                    🗑

                </button>

            </div>

        `;


        taskList.appendChild(div);

    });


    updateStats();

}


/* =========================================
   ADD TASK
========================================= */

function addTask() {

    const text =
        taskInput.value.trim();


    if (!text) {

        showToast(
            t().enterTask
        );

        taskInput.focus();

        return;

    }


    tasks.push({

        id:
            Date.now(),

        text:
            text,

        priority:
            priority.value,

        done:
            false,

        createdAt:
            new Date().toISOString(),

        completedAt:
            null

    });


    saveData();

    taskInput.value = "";

    addRow.classList.remove("open");

    renderTasks();

    showToast(
        t().taskAdded
    );

}


/* =========================================
   TOGGLE TASK
========================================= */

function toggleTask(id) {

    let newDoneState = false;


    tasks =
        tasks.map(task => {

            if (task.id === id) {

                newDoneState =
                    !task.done;


                return {

                    ...task,

                    done:
                        newDoneState,

                    completedAt:
                        newDoneState
                            ? new Date().toISOString()
                            : null

                };

            }


            return task;

        });


    saveData();

    renderTasks();


    if (newDoneState) {

        const message =
            currentLanguage === "ar"
                ? "🎉 أحسنتِ! تم إنجاز المهمة"
                : "🎉 Great job! Task completed";

        showToast(message);

    }

}


/* =========================================
   DELETE SINGLE TASK
========================================= */

function deleteTask(id) {

    tasks =
        tasks.filter(
            task => task.id !== id
        );


    saveData();

    renderTasks();

    showToast(
        t().taskDeleted
    );

}


/* =========================================
   DELETE COMPLETED
========================================= */

clearDone.addEventListener(
    "click",
    function () {

        const completed =
            tasks.filter(
                task => task.done
            );


        if (completed.length === 0) {

            deleteModal.classList.add(
                "show"
            );

            return;

        }


        tasks =
            tasks.filter(
                task => !task.done
            );


        saveData();

        renderTasks();

        showToast(
            t().completedDeleted
        );

    }
);


/* =========================================
   CLOSE DELETE MODAL
========================================= */

closeDeleteModal.addEventListener(
    "click",
    function () {

        deleteModal.classList.remove(
            "show"
        );

    }
);


/* =========================================
   CLICK OUTSIDE MODAL
========================================= */

deleteModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target === deleteModal
        ) {

            deleteModal.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================
   ESCAPE MODAL
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            deleteModal.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================
   TASK EVENTS
========================================= */

taskList.addEventListener(
    "click",
    function (event) {

        const check =
            event.target.closest(".check");


        const deleteButton =
            event.target.closest(
                ".delete-task"
            );


        if (check) {

            const id =
                Number(
                    check.dataset.id
                );

            toggleTask(id);

        }


        if (deleteButton) {

            const id =
                Number(
                    deleteButton.dataset.id
                );

            deleteTask(id);

        }

    }
);


/* =========================================
   ADD BUTTON
========================================= */

addBtn.addEventListener(
    "click",
    function () {

        addRow.classList.toggle(
            "open"
        );


        if (
            addRow.classList.contains("open")
        ) {

            taskInput.focus();

        }

    }
);


/* =========================================
   SAVE BUTTON
========================================= */

saveTask.addEventListener(
    "click",
    addTask
);


/* =========================================
   ENTER TO ADD
========================================= */

taskInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            addTask();

        }

    }
);


/* =========================================
   FILTERS
========================================= */

search.addEventListener(
    "input",
    renderTasks
);

statusFilter.addEventListener(
    "change",
    renderTasks
);

priorityFilter.addEventListener(
    "change",
    renderTasks
);


/* =========================================
   STATISTICS
========================================= */

function updateStats() {

    const total =
        tasks.length;


    const done =
        tasks.filter(
            task => task.done
        ).length;


    const pending =
        total - done;


    totalCount.textContent =
        total;

    doneCount.textContent =
        done;

    pendingCount.textContent =
        pending;


    const percent =
        total === 0
            ? 0
            : Math.round(
                (done / total) * 100
            );


    progressPercent.textContent =
        `${percent}%`;


    if (currentLanguage === "ar") {

        progressText.textContent =
            `${done} من ${total} مهام`;

    }

    else {

        progressText.textContent =
            `${done} of ${total} tasks`;

    }


    ring.style.setProperty(
        "--p",
        `${percent}%`
    );


    if (total === 0) {

        taskSubtitle.textContent =
            t().taskFirst;

    }

    else if (pending === 0) {

        taskSubtitle.textContent =
            t().allCompleted;

    }

    else {

        taskSubtitle.textContent =
            `${pending} ${
                pending === 1
                    ? t().remainingOne
                    : t().remainingMany
            }`;

    }

}


/* =========================================
   TOAST
========================================= */

let toastTimer;


function showToast(message) {

    toast.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            function () {

                toast.classList.remove(
                    "show"
                );

            },
            2200
        );

}


/* =========================================
   CLOCK
========================================= */

function updateClock() {

    const now =
        new Date();


    clock.textContent =
        now.toLocaleTimeString(
            currentLanguage === "ar"
                ? "ar-EG"
                : "en-US",
            {
                hour: "numeric",
                minute: "2-digit",
                second: "2-digit",
                hour12: true
            }
        );

}


setInterval(
    updateClock,
    1000
);


/* =========================================
   GREETING
========================================= */

function updateGreeting() {

    const hour =
        new Date().getHours();


    if (currentLanguage === "ar") {

        if (hour < 12) {

            greeting.innerHTML =
                'صباح الخير <span class="greeting-star">✦</span>';

        }

        else {

            greeting.innerHTML =
                'مساء الخير <span class="greeting-star">✦</span>';

        }

        return;

    }


    if (hour < 12) {

        greeting.innerHTML =
            'Good morning <span class="greeting-star">✦</span>';

    }

    else if (hour < 18) {

        greeting.innerHTML =
            'Good afternoon <span class="greeting-star">✦</span>';

    }

    else {

        greeting.innerHTML =
            'Good evening <span class="greeting-star">✦</span>';

    }

}


/* =========================================
   DATE
========================================= */

function updateDate() {

    const now =
        new Date();


    date.textContent =
        now.toLocaleDateString(
            currentLanguage === "ar"
                ? "ar-EG"
                : "en-US",
            {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric"
            }
        );

}


/* =========================================
   THEME
========================================= */

themeBtn.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "light"
        );


        const light =
            document.body.classList.contains(
                "light"
            );


        themeBtn.textContent =
            light
                ? "☀"
                : "☾";


        localStorage.setItem(
            "nexoraTheme",
            light
                ? "light"
                : "dark"
        );

    }
);


/* =========================================
   LOAD SAVED THEME
========================================= */

if (
    localStorage.getItem(
        "nexoraTheme"
    ) === "light"
) {

    document.body.classList.add(
        "light"
    );

    themeBtn.textContent =
        "☀";

}


/* =========================================
   NAVIGATION
========================================= */

const tools =
    document.querySelectorAll(".tool");


const views = {

    tasks:
        document.getElementById(
            "tasksView"
        ),

    calculator:
        document.getElementById(
            "calculatorView"
        ),

    timer:
        document.getElementById(
            "timerView"
        )

};


tools.forEach(tool => {

    tool.addEventListener(
        "click",
        function () {

            tools.forEach(item =>
                item.classList.remove(
                    "active"
                )
            );


            tool.classList.add(
                "active"
            );


            Object.values(views)
                .forEach(view =>
                    view.classList.add(
                        "hidden"
                    )
                );


            views[
                tool.dataset.tool
            ].classList.remove(
                "hidden"
            );

        }
    );

});


/* =========================================
   CALCULATOR
========================================= */

const calcDisplay =
    document.getElementById(
        "calcDisplay"
    );


let calcExpression = "";


document
    .querySelectorAll("[data-calc]")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                const value =
                    button.dataset.calc;


                /* Clear */

                if (value === "C") {

                    calcExpression = "";

                    calcDisplay.value =
                        "0";

                    return;

                }


                /* Backspace */

                if (value === "⌫") {

                    calcExpression =
                        calcExpression.slice(
                            0,
                            -1
                        );


                    calcDisplay.value =
                        calcExpression || "0";

                    return;

                }


                /* Equals */

                if (value === "=") {

                    try {

                        if (!calcExpression) {
                            return;
                        }


                        const result =
                            Function(
                                `"use strict"; return (${calcExpression})`
                            )();


                        calcExpression =
                            String(result);


                        calcDisplay.value =
                            calcExpression;

                    }

                    catch {

                        calcDisplay.value =
                            "Error";

                        calcExpression =
                            "";

                    }

                    return;

                }


                /* Percentage */

                if (value === "%") {

                    if (calcExpression) {

                        try {

                            calcExpression =
                                String(
                                    Number(
                                        calcExpression
                                    ) / 100
                                );


                            calcDisplay.value =
                                calcExpression;

                        }

                        catch {

                            calcDisplay.value =
                                "Error";

                            calcExpression =
                                "";

                        }

                    }

                    return;

                }


                /* Add */

                calcExpression +=
                    value;

                calcDisplay.value =
                    calcExpression;

            }
        );

    });


/* =========================================
   TIMER
========================================= */

const timerDisplay =
    document.getElementById(
        "timerDisplay"
    );


const startTimer =
    document.getElementById(
        "startTimer"
    );


const resetTimer =
    document.getElementById(
        "resetTimer"
    );


/* =========================================
   TIMER SOUND
========================================= */

function playTimerSound() {

    const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;


    if (!AudioContext)
        return;


    const audioContext =
        new AudioContext();


    function playBell(delay) {

        const oscillator =
            audioContext.createOscillator();


        const gainNode =
            audioContext.createGain();


        oscillator.type =
            "sine";


        oscillator.frequency.setValueAtTime(
            880,
            audioContext.currentTime + delay
        );


        gainNode.gain.setValueAtTime(
            0.0001,
            audioContext.currentTime + delay
        );


        gainNode.gain.exponentialRampToValueAtTime(
            0.35,
            audioContext.currentTime + delay + 0.05
        );


        gainNode.gain.exponentialRampToValueAtTime(
            0.0001,
            audioContext.currentTime + delay + 0.8
        );


        oscillator.connect(
            gainNode
        );


        gainNode.connect(
            audioContext.destination
        );


        oscillator.start(
            audioContext.currentTime + delay
        );


        oscillator.stop(
            audioContext.currentTime + delay + 0.8
        );

    }


    playBell(0);

    playBell(0.9);

    playBell(1.8);

}


/* =========================================
   TIMER FINISHED EFFECT
========================================= */

function timerFinishedEffect() {

    timerDisplay.classList.add(
        "timer-finished"
    );


    setTimeout(
        function () {

            timerDisplay.classList.remove(
                "timer-finished"
            );

        },
        2500
    );

}


/* =========================================
   TIMER DISPLAY
========================================= */

function updateTimerDisplay() {

    const minutes =
        Math.floor(
            timerSeconds / 60
        );


    const seconds =
        timerSeconds % 60;


    timerDisplay.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

}


/* =========================================
   START / PAUSE TIMER
========================================= */

startTimer.addEventListener(
    "click",
    function () {

        /* Pause */

        if (timerInterval) {

            clearInterval(
                timerInterval
            );


            timerInterval = null;


            startTimer.textContent =
                t().startFocus;


            return;

        }


        /* Restart after finishing */

        if (timerSeconds <= 0) {

            timerSeconds =
                25 * 60;


            updateTimerDisplay();

        }


        startTimer.textContent =
            t().pause;


        timerInterval =
            setInterval(
                function () {

                    timerSeconds--;

                    updateTimerDisplay();


                    /* Finished */

                    if (timerSeconds <= 0) {

                        clearInterval(
                            timerInterval
                        );


                        timerInterval = null;


                        timerSeconds = 0;


                        updateTimerDisplay();


                        startTimer.textContent =
                            t().startFocus;


                        playTimerSound();

                        timerFinishedEffect();


                        showToast(
                            t().focusComplete
                        );

                    }

                },
                1000
            );

    }
);


/* =========================================
   RESET TIMER
========================================= */

resetTimer.addEventListener(
    "click",
    function () {

        clearInterval(
            timerInterval
        );


        timerInterval = null;


        timerSeconds =
            25 * 60;


        updateTimerDisplay();


        startTimer.textContent =
            t().startFocus;


        timerDisplay.classList.remove(
            "timer-finished"
        );

    }
);


/* =========================================
   TIMER PRESETS
========================================= */

document
    .querySelectorAll("[data-min]")
    .forEach(button => {

        button.addEventListener(
            "click",
            function () {

                clearInterval(
                    timerInterval
                );


                timerInterval = null;


                timerSeconds =
                    Number(
                        button.dataset.min
                    ) * 60;


                updateTimerDisplay();


                startTimer.textContent =
                    t().startFocus;


                timerDisplay.classList.remove(
                    "timer-finished"
                );

            }
        );

    });


/* =========================================
   CUSTOM TIMER
========================================= */

const customHours =
    document.getElementById(
        "customHours"
    );


const customMinutes =
    document.getElementById(
        "customMinutes"
    );


const customSeconds =
    document.getElementById(
        "customSeconds"
    );


const setCustomTimer =
    document.getElementById(
        "setCustomTimer"
    );


if (setCustomTimer) {

    setCustomTimer.addEventListener(
        "click",
        function () {

            clearInterval(
                timerInterval
            );


            timerInterval = null;


            const hours =
                Number(
                    customHours.value
                ) || 0;


            const minutes =
                Number(
                    customMinutes.value
                ) || 0;


            const seconds =
                Number(
                    customSeconds.value
                ) || 0;


            timerSeconds =
                (hours * 60 * 60) +
                (minutes * 60) +
                seconds;


            if (timerSeconds <= 0) {

                showToast(
                    currentLanguage === "ar"
                        ? "اختاري وقتًا أولًا"
                        : "Please set a time first"
                );

                return;

            }


            updateTimerDisplay();


            startTimer.textContent =
                t().startFocus;


            timerDisplay.classList.remove(
                "timer-finished"
            );

        }
    );

}


/* =========================================
   MOUSE GLOW
========================================= */

const mouseGlow =
    document.querySelector(
        ".mouse-glow"
    );


document.addEventListener(
    "mousemove",
    function (event) {

        if (!mouseGlow)
            return;


        mouseGlow.style.left =
            `${event.clientX}px`;


        mouseGlow.style.top =
            `${event.clientY}px`;

    }
);


/* =========================================
   APPLY LANGUAGE
========================================= */

function applyLanguage() {

    const lang =
        t();


    /* Direction */

    if (currentLanguage === "ar") {

        document.body.classList.add(
            "rtl"
        );


        document.documentElement.dir =
            "rtl";


        document.documentElement.lang =
            "ar";

    }

    else {

        document.body.classList.remove(
            "rtl"
        );


        document.documentElement.dir =
            "ltr";


        document.documentElement.lang =
            "en";

    }


    /* Language button */

    languageBtn.textContent =
        lang.langButton;


    /* =====================================
       WELCOME
    ===================================== */

    const eyebrow =
        document.querySelector(
            ".welcome .eyebrow"
        );


    if (eyebrow)
        eyebrow.textContent =
            lang.welcome;


    const welcomeTitle =
        document.querySelector(
            ".welcome h1"
        );


    if (welcomeTitle) {

        welcomeTitle.innerHTML = `

            ${lang.welcomeTitle1}

            <br>

            <span>
                ${lang.welcomeTitle2}
            </span>

        `;

    }


    const welcomeText =
        document.querySelector(
            ".welcome p"
        );


    if (welcomeText)
        welcomeText.textContent =
            lang.welcomeText;


    /* =====================================
       PROGRESS
    ===================================== */

    const completeText =
        document.querySelector(
            ".ring small"
        );


    if (completeText)
        completeText.textContent =
            lang.progressComplete;


    const progressTitle =
        document.querySelector(
            ".progress-copy strong"
        );


    if (progressTitle)
        progressTitle.textContent =
            lang.progressTitle;


    /* =====================================
       STATISTICS
    ===================================== */

    const statLabels =
        document.querySelectorAll(
            ".stat span"
        );


    if (statLabels.length >= 3) {

        statLabels[0].textContent =
            lang.total;


        statLabels[1].textContent =
            lang.done;


        statLabels[2].textContent =
            lang.pending;

    }


    /* =====================================
       TOOLS
    ===================================== */

    const toolSpans =
        document.querySelectorAll(
            ".tool span"
        );


    if (toolSpans.length >= 3) {

        toolSpans[0].textContent =
            lang.myTasks;


        toolSpans[1].textContent =
            lang.calculator;


        toolSpans[2].textContent =
            lang.focusTimer;

    }


    /* =====================================
       HERO
    ===================================== */

    const heroEyebrow =
        document.querySelector(
            ".hero-content .eyebrow"
        );


    if (heroEyebrow)
        heroEyebrow.textContent =
            lang.workspace;


    const heroText =
        document.querySelector(
            ".hero-content p"
        );


    if (heroText)
        heroText.textContent =
            lang.heroText;


    /* =====================================
       TASKS
    ===================================== */

    const taskTitle =
        document.querySelector(
            ".panel-head h3"
        );


    if (taskTitle)
        taskTitle.textContent =
            lang.taskTitle;


    addBtn.textContent =
        lang.addTask;


    saveTask.textContent =
        lang.saveTask;


    taskInput.placeholder =
        lang.taskPlaceholder;


    search.placeholder =
        lang.search;


    /* Delete completed */

    const clearText =
        clearDone.querySelector(
            "span:last-child"
        );


    if (clearText)
        clearText.textContent =
            lang.deleteCompleted;


    /* Status filter */

    statusFilter.options[0].text =
        lang.allTasks;


    statusFilter.options[1].text =
        lang.active;


    statusFilter.options[2].text =
        lang.completed;


    /* Priority filter */

    priorityFilter.options[0].text =
        lang.allPriorities;


    priorityFilter.options[1].text =
        lang.high;


    priorityFilter.options[2].text =
        lang.medium;


    priorityFilter.options[3].text =
        lang.low;


    /* Add task priority */

    priority.options[0].text =
        lang.low;


    priority.options[1].text =
        lang.medium;


    priority.options[2].text =
        lang.high;


    /* =====================================
       CALCULATOR
    ===================================== */

    const calculatorEyebrow =
        document.querySelector(
            "#calculatorView .eyebrow"
        );


    if (calculatorEyebrow)
        calculatorEyebrow.textContent =
            lang.quickTool;


    const calculatorTitle =
        document.querySelector(
            "#calculatorView h3"
        );


    if (calculatorTitle)
        calculatorTitle.textContent =
            lang.calculatorTitle;


    /* =====================================
       TIMER
    ===================================== */

    const timerEyebrow =
        document.querySelector(
            "#timerView .eyebrow"
        );


    if (timerEyebrow)
        timerEyebrow.textContent =
            lang.focusMode;


    const timerTitleElement =
        document.querySelector(
            "#timerView h3"
        );


    if (timerTitleElement)
        timerTitleElement.textContent =
            lang.timerTitle;


    startTimer.textContent =
        timerInterval
            ? lang.pause
            : lang.startFocus;


    resetTimer.textContent =
        lang.reset;


    /* Timer presets */

    const presets =
        document.querySelectorAll(
            ".presets button"
        );


    if (presets.length >= 4) {

        presets[0].textContent =
            lang.minutes5;


        presets[1].textContent =
            lang.minutes15;


        presets[2].textContent =
            lang.minutes25;


        presets[3].textContent =
            lang.minutes45;

    }


    /* =====================================
       MODAL
    ===================================== */

    const modalTitle =
        document.querySelector(
            ".delete-modal-box h3"
        );


    if (modalTitle)
        modalTitle.textContent =
            lang.nothingDelete;


    const modalText =
        document.querySelector(
            ".delete-modal-box p"
        );


    if (modalText)
        modalText.textContent =
            lang.noCompleted;


    closeDeleteModal.textContent =
        lang.gotIt;


    /* =====================================
       UPDATE
    ===================================== */

    updateGreeting();

    updateDate();

    updateClock();

    updateStats();

    renderTasks();


    /* Save language */

    localStorage.setItem(
        "nexoraLanguage",
        currentLanguage
    );

}


/* =========================================
   LANGUAGE BUTTON
========================================= */

languageBtn.addEventListener(
    "click",
    function () {

        currentLanguage =
            currentLanguage === "en"
                ? "ar"
                : "en";


        applyLanguage();

    }
);


/* =========================================
   INITIAL
========================================= */

applyLanguage();

updateTimerDisplay();