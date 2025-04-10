const boardSize = 26;
const board1 = document.getElementById("board1");
const board2 = document.getElementById("board2");
const log = document.getElementById("log");

let position = 0;
let onSecondBoard = false;
let diceSequence = [];
let moveLog = [];
let totalRewards = {}; // пример: { "монеты": 300, "энергия": 20 }

const rewardsBoard1 = {
  1:  "2 серых кубика",
  2:  "10 энергии",
  4:  "300 пыли",
  5:  "20 кристаллов",
  6:  "50 монет",
  7:  "золото",       // добавлено
  8:  "золотой кубик",
  9:  "ключ",
  10: "50 монет",
  11: "золото",        // добавлено
  12: "20 кристаллов",
  13: "20 жетонов",
  14: "200 опыта",
  15: "300 пыли",
  16: "200 монет",
  17: "2 серых кубика",
  18: "200 опыта",
  19: "20 жетонов",
  20: "ключ",
  21: "10 энергии",
  22: "100 монет",
  23: "2 серых кубика",
  24: "золото",       // добавлено
  25: "60 кристаллов"
};

const rewardsBoard2 = {
  1:  "2 серых кубика",
  2:  "10 энергии",
  4:  "200 опыта",
  5:  "300 пыли",
  6:  "100 монет",
  7:  "2 серых кубика",
  8:  "золотой кубик",
  9:  "ключ",
  10: "50 монет",
  11: "золото",        // добавлено
  12: "20 кристаллов",
  13: "20 жетонов",
  14: "200 опыта",
  15: "300 пыли",
  16: "200 монет",
  17: "2 серых кубика",
  18: "200 опыта",
  19: "20 жетонов",
  20: "ключ",
  21: "10 энергии",
  22: "100 монет",
  23: "2 серых кубика",
  24: "золото",      // добавлено
  25: "60 кристаллов"
};

function getRewardEmoji(rewardText) {
  const map = [
    { keyword: "серых кубика", emoji: "🎲" },
    { keyword: "энергии", emoji: "⚡️" },
    { keyword: "пыли", emoji: "🧪" },
    { keyword: "монет", emoji: "🪙" },
    { keyword: "золотой кубик", emoji: "🟨" },
    { keyword: "ключ", emoji: "🗝️" },
    { keyword: "кристалл", emoji: "💎" },
    { keyword: "жетон", emoji: "🎟️" },
    { keyword: "опыта", emoji: "🔵" },
    { keyword: "золото", emoji: "💰" },
  ];
  const entry = map.find(item => rewardText.includes(item.keyword));
  return entry ? entry.emoji : "❓";
}

function getRewardLabel(rewardText) {
  const match = rewardText.match(/^(\d+)/);
  return match ? match[1] : ""; // Только число (или пусто, если уникально)
}

function getRewardFullLabel(rewardText) {
  return `${rewardText} ${getRewardEmoji(rewardText)}`;
}

const cellColors = {
  board1: {
    blue:    [1,4,5,9,12,15,17,20,23,25],
    green:   [2,7,11,14,18,21,24],
    yellow:  [6,10,16,22],
    purple:  [8,13,19],
    gray:    [0]
  },
  board2: {
    blue:    [1,5,7,9,12,15,17,20,23,25],
    green:   [2,4,11,14,18,21,24],
    yellow:  [6,10,16,22],
    purple:  [8,13,19],
    gray:    [0]
  }
};

const colorMap = {
  blue: "#cce4ff",     // светло-синий
  green: "#ccffcc",    // светло-зелёный
  yellow: "#fff8b3",   // светло-жёлтый
  purple: "#e6ccff",   // светло-фиолетовый
  gray: "#e0e0e0"      // серый
};

function createBoard(board) {
  board.innerHTML = "";
  const cellSize = 60;
  const positions = [];

  if (board.id === "board2") {
    // Поле 2
    positions[0]  = { top: 7 * cellSize, left: 6 * cellSize };
    positions[1]  = { top: 7 * cellSize, left: 5 * cellSize };
    positions[2]  = { top: 7 * cellSize, left: 4 * cellSize };
    positions[3]  = { top: 7 * cellSize, left: 3 * cellSize };
    positions[4]  = { top: 6 * cellSize, left: 3 * cellSize };
    positions[5]  = { top: 5 * cellSize, left: 3 * cellSize };
    positions[6]  = { top: 5 * cellSize, left: 2 * cellSize };
    positions[7]  = { top: 5 * cellSize, left: 1 * cellSize };
    positions[8]  = { top: 5 * cellSize, left: 0 * cellSize };
    positions[9]  = { top: 4 * cellSize, left: 0 * cellSize };
    positions[10] = { top: 3 * cellSize, left: 0 * cellSize };
    positions[11] = { top: 2 * cellSize, left: 0 * cellSize };
    positions[12] = { top: 1 * cellSize, left: 0 * cellSize };
    positions[13] = { top: 0 * cellSize, left: 0 * cellSize };
    positions[14] = { top: 0 * cellSize, left: 1 * cellSize };
    positions[15] = { top: 0 * cellSize, left: 2 * cellSize };
    positions[16] = { top: 0 * cellSize, left: 3 * cellSize };
    positions[17] = { top: 0 * cellSize, left: 4 * cellSize };
    positions[18] = { top: 0 * cellSize, left: 5 * cellSize };
    positions[19] = { top: 0 * cellSize, left: 6 * cellSize };
    positions[20] = { top: 1 * cellSize, left: 6 * cellSize };
    positions[21] = { top: 2 * cellSize, left: 6 * cellSize };
    positions[22] = { top: 3 * cellSize, left: 6 * cellSize };
    positions[23] = { top: 4 * cellSize, left: 6 * cellSize };
    positions[24] = { top: 5 * cellSize, left: 6 * cellSize };
    positions[25] = { top: 6 * cellSize, left: 6 * cellSize };
  } else {
    // Поле 1
    for (let i = 6; i >= 0; i--) positions.push({ top: 7 * cellSize, left: i * cellSize });
    for (let i = 6; i >= 1; i--) positions.push({ top: i * cellSize, left: 0 });
    for (let i = 0; i < 7; i++)  positions.push({ top: 0, left: i * cellSize });
    for (let i = 1; i <= 6; i++) positions.push({ top: i * cellSize, left: 6 * cellSize });
  }

  for (let i = 0; i < positions.length; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.style.position = "absolute";
    cell.style.top = positions[i].top + "px";
    cell.style.left = positions[i].left + "px";
    cell.dataset.index = i;

    // Цвет
    const colorScheme = board.id === "board2" ? cellColors.board2 : cellColors.board1;
    for (const [colorName, indices] of Object.entries(colorScheme)) {
      if (indices.includes(i)) {
        cell.style.backgroundColor = colorMap[colorName];
        break;
      }
    }

    // Контент
    if (i === 0) {
      cell.textContent = "";
    } else if (i === 3) {
      cell.innerHTML = `<div style="font-size: 28px;">${board.id === "board2" ? "⬆️" : "⬅️"}</div>`;
    } else {
      const rewards = board.id === "board2" ? rewardsBoard2 : rewardsBoard1;
      const reward = rewards[i];
      if (reward) {
        const emoji = getRewardEmoji(reward);
        const label = getRewardLabel(reward);
        cell.innerHTML = `<div style="font-size: 28px;">${emoji}</div><div style="font-size: 12px;">${label}</div>`;
        cell.title = reward; // всплывающая подсказка
      } else {
        cell.textContent = "";
      }
    }
    // После основного цикла — отрисуем фантомные клетки
    if (board.id === "board1") {
      drawPhantomCells(board, [4, 5, 6, 7], "board2", rewardsBoard2);
    }
    if (board.id === "board2") {
      drawPhantomCells(board, [4, 5, 6, 7], "board1", rewardsBoard1);
    }

    board.appendChild(cell);
  }
}

function createIndexHintBoard(boardId, isSecondBoard) {
  const board = document.getElementById(boardId);
  board.innerHTML = "";
  const cellSize = 60;
  const positions = [];

  // Координаты клеток
  if (isSecondBoard) {
    positions[0]  = { top: 7 * cellSize, left: 6 * cellSize };
    positions[1]  = { top: 7 * cellSize, left: 5 * cellSize };
    positions[2]  = { top: 7 * cellSize, left: 4 * cellSize };
    positions[3]  = { top: 7 * cellSize, left: 3 * cellSize };
    positions[4]  = { top: 6 * cellSize, left: 3 * cellSize };
    positions[5]  = { top: 5 * cellSize, left: 3 * cellSize };
    positions[6]  = { top: 5 * cellSize, left: 2 * cellSize };
    positions[7]  = { top: 5 * cellSize, left: 1 * cellSize };
    positions[8]  = { top: 5 * cellSize, left: 0 * cellSize };
    positions[9]  = { top: 4 * cellSize, left: 0 * cellSize };
    positions[10] = { top: 3 * cellSize, left: 0 * cellSize };
    positions[11] = { top: 2 * cellSize, left: 0 * cellSize };
    positions[12] = { top: 1 * cellSize, left: 0 * cellSize };
    positions[13] = { top: 0 * cellSize, left: 0 * cellSize };
    positions[14] = { top: 0 * cellSize, left: 1 * cellSize };
    positions[15] = { top: 0 * cellSize, left: 2 * cellSize };
    positions[16] = { top: 0 * cellSize, left: 3 * cellSize };
    positions[17] = { top: 0 * cellSize, left: 4 * cellSize };
    positions[18] = { top: 0 * cellSize, left: 5 * cellSize };
    positions[19] = { top: 0 * cellSize, left: 6 * cellSize };
    positions[20] = { top: 1 * cellSize, left: 6 * cellSize };
    positions[21] = { top: 2 * cellSize, left: 6 * cellSize };
    positions[22] = { top: 3 * cellSize, left: 6 * cellSize };
    positions[23] = { top: 4 * cellSize, left: 6 * cellSize };
    positions[24] = { top: 5 * cellSize, left: 6 * cellSize };
    positions[25] = { top: 6 * cellSize, left: 6 * cellSize };
  } else {
    for (let i = 6; i >= 0; i--) positions.push({ top: 7 * cellSize, left: i * cellSize });
    for (let i = 6; i >= 1; i--) positions.push({ top: i * cellSize, left: 0 });
    for (let i = 0; i < 7; i++)  positions.push({ top: 0, left: i * cellSize });
    for (let i = 1; i <= 6; i++) positions.push({ top: i * cellSize, left: 6 * cellSize });
  }

  // Отрисовка обычных клеток
  for (let i = 0; i < 26; i++) {
    if (!positions[i]) continue; // ❗️Пропускаем клетки без координат
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.style.top = positions[i].top + "px";
    cell.style.left = positions[i].left + "px";
    cell.style.backgroundColor = "#ffffff";
    cell.style.border = "1px solid #ccc";
    cell.style.opacity = "1";
    cell.style.pointerEvents = "none";
    cell.innerHTML = `<div style="font-size: 28px; font-weight: bold;">${i}</div>`;
    board.appendChild(cell);
  }

  // Фантомные клетки 4–7 из board2 на indexBoard1
  if (!isSecondBoard) {
    const phantomIndices = [4, 5, 6, 7];
    const phantomPositions = {
      4: { top: 6 * cellSize, left: 3 * cellSize },
      5: { top: 5 * cellSize, left: 3 * cellSize },
      6: { top: 5 * cellSize, left: 2 * cellSize },
      7: { top: 5 * cellSize, left: 1 * cellSize }
    };

    phantomIndices.forEach(i => {
      const pos = phantomPositions[i];
      if (!pos) return;
      const cell = document.createElement("div");
      cell.className = "cell";
      cell.style.top = pos.top + "px";
      cell.style.left = pos.left + "px";
      cell.style.backgroundColor = "#ffffff";
      cell.style.border = "1px solid #ccc";
      cell.style.opacity = "1";
      cell.style.pointerEvents = "none";
      cell.innerHTML = `<div style="font-size: 28px; font-weight: bold;">${i}</div>`;
      board.appendChild(cell);
    });
  }
}

function drawPhantomCells(targetBoard, indices, sourceBoardId, rewardsSource) {
  const phantomSize = 60;

  // Получаем цветовую схему и позиции фантомов
  const colorScheme = sourceBoardId === "board2" ? cellColors.board2 : cellColors.board1;
  const positions = [];

  if (sourceBoardId === "board2") {
    positions[0]  = { top: 7 * phantomSize, left: 6 * phantomSize };
    positions[1]  = { top: 7 * phantomSize, left: 5 * phantomSize };
    positions[2]  = { top: 7 * phantomSize, left: 4 * phantomSize };
    positions[3]  = { top: 7 * phantomSize, left: 3 * phantomSize };
    positions[4]  = { top: 6 * phantomSize, left: 3 * phantomSize };
    positions[5]  = { top: 5 * phantomSize, left: 3 * phantomSize };
    positions[6]  = { top: 5 * phantomSize, left: 2 * phantomSize };
    positions[7]  = { top: 5 * phantomSize, left: 1 * phantomSize };
    positions[8]  = { top: 5 * phantomSize, left: 0 * phantomSize };
    positions[9]  = { top: 4 * phantomSize, left: 0 * phantomSize };
    positions[10] = { top: 3 * phantomSize, left: 0 * phantomSize };
    positions[11] = { top: 2 * phantomSize, left: 0 * phantomSize };
    positions[12] = { top: 1 * phantomSize, left: 0 * phantomSize };
    positions[13] = { top: 0 * phantomSize, left: 0 * phantomSize };
    positions[14] = { top: 0 * phantomSize, left: 1 * phantomSize };
    positions[15] = { top: 0 * phantomSize, left: 2 * phantomSize };
    positions[16] = { top: 0 * phantomSize, left: 3 * phantomSize };
    positions[17] = { top: 0 * phantomSize, left: 4 * phantomSize };
    positions[18] = { top: 0 * phantomSize, left: 5 * phantomSize };
    positions[19] = { top: 0 * phantomSize, left: 6 * phantomSize };
    positions[20] = { top: 1 * phantomSize, left: 6 * phantomSize };
    positions[21] = { top: 2 * phantomSize, left: 6 * phantomSize };
    positions[22] = { top: 3 * phantomSize, left: 6 * phantomSize };
    positions[23] = { top: 4 * phantomSize, left: 6 * phantomSize };
    positions[24] = { top: 5 * phantomSize, left: 6 * phantomSize };
    positions[25] = { top: 6 * phantomSize, left: 6 * phantomSize };
  } else {
    for (let j = 6; j >= 0; j--) positions.push({ top: 7 * phantomSize, left: j * phantomSize });
    for (let j = 6; j >= 1; j--) positions.push({ top: j * phantomSize, left: 0 });
    for (let j = 0; j < 7; j++)  positions.push({ top: 0, left: j * phantomSize });
    for (let j = 1; j <= 6; j++) positions.push({ top: j * phantomSize, left: 6 * phantomSize });
  }

  indices.forEach(i => {
    const reward = rewardsSource[i];
    if (!positions[i] || !reward) return;

    // определим цвет из схемы
    let bgColor = "#ffffff";
    for (const [colorName, idxs] of Object.entries(colorScheme)) {
      if (idxs.includes(i)) {
        bgColor = colorMap[colorName];
        break;
      }
    }

    const emoji = getRewardEmoji(reward);
    const label = getRewardLabel(reward);

    const cell = document.createElement("div");
    cell.className = "cell";
    cell.style.top = positions[i].top + "px";
    cell.style.left = positions[i].left + "px";
    cell.style.backgroundColor = bgColor;
    cell.style.border = "1px dashed #999";
    cell.style.opacity = "0.4";
    cell.style.pointerEvents = "none";
    cell.title = reward;
    cell.innerHTML = `<div style="font-size: 28px;">${emoji}</div><div style="font-size: 12px;">${label}</div>`;

    targetBoard.appendChild(cell);
  });
}

function placePlayer(index, board) {
  removePlayer();
  const cell = board.querySelector('[data-index="' + index + '"]');
  if (cell) {
    cell.classList.add("active-cell");
  }
}

function toggleBoards(isOnSecondBoard) {
  board1.style.display = isOnSecondBoard ? "none" : "block";
  board2.style.display = isOnSecondBoard ? "block" : "none";
}

function removePlayer() {
  document.querySelectorAll(".active-cell").forEach(c => c.classList.remove("active-cell"));
}

function renderLog() {
  const logContainer = document.getElementById("move-log");
  logContainer.innerHTML = "<strong>Лог ходов:</strong><br>";

  let step = 1;
  moveLog.forEach((entry, index) => {
    if (entry.type === "lap") {
      logContainer.innerHTML += `🔁 Завершён круг на поле ${entry.board}<br>`;
    } else {
      const rewardText = entry.reward ? ` — <em>${getRewardFullLabel(entry.reward)}</em>` : "";
      logContainer.innerHTML += `
        Ход ${step++}: выпало ${entry.roll} → клетка ${entry.position} (поле ${entry.board})${rewardText}
        <button onclick="insertGoldenDie(${index})" title="Бросить золотой кубик">➕</button><br>`;
    }
  });
}

function movePlayer(steps) {
  let currentBoard = onSecondBoard ? board2 : board1;
  let newPos = position + steps;

  if (!onSecondBoard && newPos >= boardSize) {
    moveLog.push({ type: "lap", board: 1 }); // завершён круг на поле 1

    const stepsToEnd = boardSize - 1 - position;
    const overflow = steps - stepsToEnd - 1;
    position = boardSize - 1;
    placePlayer(position, currentBoard);
    toggleBoards(onSecondBoard); // показать поле 1 перед прыжком

    onSecondBoard = true;
    currentBoard = board2;
    position = overflow;
    placePlayer(position, currentBoard);
    toggleBoards(onSecondBoard); // показать поле 2 после перехода
  } else if (onSecondBoard && newPos >= boardSize) {
    moveLog.push({ type: "lap", board: 2 }); // завершён круг на поле 2

    const stepsToEnd = boardSize - 1 - position;
    const overflow = steps - stepsToEnd - 1;
    position = boardSize - 1;
    placePlayer(position, currentBoard);
    toggleBoards(onSecondBoard); // показать поле 2 перед прыжком

    onSecondBoard = false;
    currentBoard = board1;
    position = overflow;
    placePlayer(position, currentBoard);
    toggleBoards(onSecondBoard); // показать поле 1 после перехода
  } else {
    if (newPos >= boardSize) newPos = boardSize - 1;
    position = newPos;
    placePlayer(position, currentBoard);
    toggleBoards(onSecondBoard); // просто обновляем поле при обычном перемещении
  }

  if (position === 3) {
    onSecondBoard = !onSecondBoard;
    currentBoard = onSecondBoard ? board2 : board1;
    placePlayer(3, currentBoard);
    toggleBoards(onSecondBoard); // переключение при попадании на клетку 3
  }

  const reward = onSecondBoard ? rewardsBoard2[position] : rewardsBoard1[position];
  if (reward) {
    addRewardToTotal(reward);
  }

  moveLog.push({
    roll: steps,
    position: position,
    board: onSecondBoard ? 2 : 1,
    reward: reward || null
  });
}

function renderTotalRewards() {
  const summary = document.getElementById("reward-summary");
  summary.innerHTML = "<strong>Суммарные награды:</strong><br>";
  if (Object.keys(totalRewards).length === 0) {
    summary.innerHTML += "Нет наград.";
    return;
  }

  for (const [name, count] of Object.entries(totalRewards)) {
    summary.innerHTML += `${count} × ${getRewardFullLabel(name)}<br>`;
  }
}

function addRewardToTotal(rewardText) {
  if (!rewardText) return;

  // Пример: "200 монет", "2 серых кубика", "ключ"
  const match = rewardText.match(/^(\d+)\s+(.+)$/);
  if (match) {
    const count = parseInt(match[1]);
    const name = match[2].trim();
    totalRewards[name] = (totalRewards[name] || 0) + count;
  } else {
    // Для уникальных наград без количества — считаем как 1
    const name = rewardText.trim();
    totalRewards[name] = (totalRewards[name] || 0) + 1;
  }
}

function startGame() {
  let input = document.getElementById("dice-sequence").value.trim();
  if (input.includes(",")) {
    diceSequence = input.split(",").map(s => parseInt(s.trim()));
  } else {
    diceSequence = input.split("").map(ch => parseInt(ch));
  }
  diceSequence = diceSequence.filter(n => !isNaN(n) && n > 0);

  position = parseInt(document.getElementById("start-index").value);
  onSecondBoard = document.getElementById("start-board").value === "2";
  moveLog = [];
  totalRewards = {};
  createBoard(board1);
  createBoard(board2);
  placePlayer(position, onSecondBoard ? board2 : board1);

    for (let i = 0; i < diceSequence.length; i++) {
    movePlayer(diceSequence[i]);
  }
  toggleBoards(onSecondBoard);
  renderLog();
  renderTotalRewards();
  createIndexHintBoard("indexBoard1", false);
 }

function insertGoldenDie(afterIndex) {
  const value = parseInt(prompt("Введите значение золотого кубика (1–6):"));
  if (isNaN(value) || value < 1 || value > 6) {
    alert("Неверное значение. Введите число от 1 до 6.");
    return;
  }

  // Вставка в массив кубиков
  diceSequence.splice(afterIndex + 1, 0, value);

  // Перезапуск игры с обновлённой последовательностью
  position = parseInt(document.getElementById("start-index").value);
  onSecondBoard = document.getElementById("start-board").value === "2";
  moveLog = [];

  createBoard(board1);
  createBoard(board2);
  placePlayer(position, onSecondBoard ? board2 : board1);

   for (let i = 0; i < diceSequence.length; i++) {
    movePlayer(diceSequence[i]);
  }
  renderLog();
  renderTotalRewards();
}
document.getElementById("start-game").addEventListener("click", startGame);