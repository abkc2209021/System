function calculateAttendance() {
    const attendedDays = parseFloat(document.getElementById('attended-days').value) || 0;
    const absentDays = parseFloat(document.getElementById('absent-days').value) || 0;
    const totalDays = attendedDays + absentDays;
    let attendanceRate = 0;
    if (totalDays > 0) {
        attendanceRate = (attendedDays / totalDays) * 100;
    }

    document.getElementById('result').innerText = `出席率: ${attendanceRate.toFixed(2)}%`;

    const alert = document.getElementById('alert');
    if (attendanceRate < 90) {
        alert.innerText = '警告: 出席率が低いです！ 95%を維持してください！';
    } else {
        alert.innerText = 'よい調子です！ 95%維持を目指してください！';
    } 
}

function displayCalendar() {
    const holidays2024 = {
        "4月": [8, 29],
        "5月": [3, 4, 5, 6],
        "6月": [],
        "7月": [1, 4, 8, 15, 19, 23],
        "8月": [11, 12],
        "9月": [16, 23],
        "10月": [14],
        "11月": [3, 4, 23],
        "12月": [23],
        "1月" : [1, 13],
        "2月" : [11, 23, 24],
        "3月" : [20]
    };

    const weekdays2024 = {
        "4月": 20,
        "5月": 21,
        "6月": 20,
        "7月": 17,
        "8月": 21,
        "9月": 19,
        "10月": 22,
        "11月": 20,
        "12月": 22,
        "1月" : 21,
        "2月" : 18,
        "3月" : 20
    };

    const calendarContent = document.getElementById('calendar-content');
    calendarContent.innerHTML = '';

    for (const [month, holidays] of Object.entries(holidays2024)) {
        const weekdays = weekdays2024[month];
        const holidaysList = holidays.length > 0 ? holidays.join(", ") : "なし";
        const monthElement = document.createElement('div');
        monthElement.innerHTML = `
            <h3>${month}</h3>
            <ul>
                <li>平日: ${weekdays}日</li>
                <li>祝日: ${holidaysList}</li>
            </ul>
        `;
        calendarContent.appendChild(monthElement);
    }
}

document.addEventListener('DOMContentLoaded', displayCalendar);

const weekdays2024 = {
    "4月": 20,
    "5月": 21,
    "6月": 20,
    "7月": 17,
    "8月": 21,
    "9月": 19,
    "10月": 22,
    "11月": 20,
    "12月": 22,
    "1月": 21,
    "2月": 18,
    "3月": 20
};

document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let currentInput = '0';
    let operator = null;
    let previousInput = null;

    const updateDisplay = () => {
        display.textContent = currentInput;
    };

    const handleNumber = (number) => {
        if (currentInput === '0') {
            currentInput = number;
        } else {
            currentInput += number;
        }
        updateDisplay();
    };

    const handleOperator = (op) => {
        if (previousInput === null) {
            previousInput = currentInput;
        } else if (operator) {
            previousInput = String(eval(`${previousInput} ${operator} ${currentInput}`));
        }
        currentInput = '0';
        operator = op;
        updateDisplay();
    };

    const calculate = () => {
        if (operator && previousInput !== null) {
            currentInput = String(eval(`${previousInput} ${operator} ${currentInput}`));
            previousInput = null;
            operator = null;
            updateDisplay();
        }
    };

    document.querySelectorAll('.num-btn').forEach(button => {
        button.addEventListener('click', () => handleNumber(button.textContent));
    });

    document.querySelectorAll('.operator-btn').forEach(button => {
        button.addEventListener('click', () => handleOperator(button.textContent));
    });

    document.getElementById('equals-btn').addEventListener('click', calculate);

    document.getElementById('clear-btn').addEventListener('click', () => {
        currentInput = '0';
        previousInput = null;
        operator = null;
        updateDisplay();
    });

    document.querySelectorAll('.month-btn').forEach(button => {
        button.addEventListener('click', () => {
            const month = button.getAttribute('data-month');
            if (weekdays2024[month] !== undefined) {
                handleNumber(String(weekdays2024[month]));
            }
        });
    });

    updateDisplay();
});