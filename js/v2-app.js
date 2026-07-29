// 靖铭学习工作台 v2.0 - 主逻辑
const App = {
    state: {
        sun: 0,
        star: 0,
        currentNav: 'home',
        currentDay: 1,
        learnedHanzi: [],
        wrongQuestions: [],
        checkinDates: {},
        rewardsClaimed: [],
        habits: {},
        scienceIndex: 0,
        scienceAnswered: false,
        bookIndex: -1,
        bookPage: 0,
        pet: { ...PET_DATA },
        tasksCompleted: { hanzi:false, math:false, english:false, science:false, habit:false, picturebook:false },
    },

    init() {
        this.loadData();
        this.renderNav();
        this.renderHome();
        this.renderHanzi();
        this.renderMath();
        this.renderPinyin();
        this.renderEnglish();
        this.renderHabits();
        this.renderPictureBooks();
        this.renderScience();
        this.renderFitness();
        this.renderMemo();
        this.renderPet();
        this.renderWrong();
        this.updateSun();
        this.startPetLoop();
    },

    loadData() {
        const saved = localStorage.getItem('jingmingStudyV2');
        if (saved) Object.assign(this.state, JSON.parse(saved));
    },

    saveData() {
        localStorage.setItem('jingmingStudyV2', JSON.stringify(this.state));
    },

    updateSun() {
        document.getElementById('sunCount').textContent = this.state.sun;
        const homeSun = document.getElementById('homeSun');
        if (homeSun) homeSun.textContent = this.state.sun;
        const homeStar = document.getElementById('homeStar');
        if (homeStar) homeStar.textContent = this.state.star;
        const homeDay = document.getElementById('homeDay');
        if (homeDay) homeDay.textContent = Object.keys(this.state.checkinDates).length + 1;
    },

    addSun(amount, reason='') {
        this.state.sun += amount;
        this.state.star += 1;
        this.updateSun();
        this.saveData();
        if (reason) this.toast(`+${amount}阳光！${reason}`);
    },

    toast(msg) {
        const t = document.getElementById('toast');
        t.textContent = msg;
        t.classList.add('show');
        setTimeout(() => t.classList.remove('show'), 2500);
    },

    goto(id) {
        document.querySelectorAll('.nav-item').forEach(n => n.classList.toggle('active', n.dataset.id === id));
        document.querySelectorAll('.content-section').forEach(s => s.classList.toggle('active', s.id === 'section-' + id));
        this.state.currentNav = id;
        if (id === 'home') this.renderHome();
    },

    renderNav() {
        const sb = document.getElementById('sidebar');
        sb.innerHTML = NAV_ITEMS.map(item => {
            const active = item.id === this.state.currentNav ? 'active' : '';
            return `<div class="nav-item ${active}" data-id="${item.id}" onclick="App.goto('${item.id}')">
                <span class="nav-icon">${item.icon}</span><span>${item.name}</span>
                ${item.id === 'wrong' && this.state.wrongQuestions.length ? `<span class="nav-badge">${this.state.wrongQuestions.length}</span>` : ''}
            </div>`;
        }).join('');
    },

    renderHome() {
        this.updateSun();
        // 排课表：每天=拼音/英语/数学；一三五=识字/科普/健身；二四六=绘本/习惯/思维
        const dayOfWeek = new Date().getDay(); // 0=周日 1=周一 ... 6=周六
        const everyday = [
            {id:'pinyin', icon:'🔤', name:'拼音', label:'每日'},
            {id:'english', icon:'🗽', name:'英语', label:'每日'},
            {id:'math', icon:'🧮', name:'数学', label:'每日'},
        ];
        const monWedFri = [
            {id:'hanzi', icon:'📚', name:'识字', label:'一三五'},
            {id:'science', icon:'🔬', name:'科普', label:'一三五'},
            {id:'fitness', icon:'💪', name:'健身', label:'一三五'},
        ];
        const tueThuSat = [
            {id:'picturebook', icon:'📖', name:'绘本', label:'二四六'},
            {id:'habit', icon:'⭐', name:'习惯', label:'二四六'},
            {id:'thinking', icon:'🧠', name:'思维', label:'二四六'},
        ];
        // 周日全部可选，显示一三五组
        let rotation;
        if (dayOfWeek === 1 || dayOfWeek === 3 || dayOfWeek === 5 || dayOfWeek === 0) {
            rotation = monWedFri;
        } else {
            rotation = tueThuSat;
        }
        const tasks = [...everyday, ...rotation];

        document.getElementById('dailyTasks').innerHTML = tasks.map(t => {
            const done = this.state.tasksCompleted[t.id];
            const gotoId = t.id === 'math' ? 'thinking' : t.id;
            return `<div class="task-chip ${done ? 'done' : ''}" onclick="App.goto('${gotoId}')">
                <div class="task-icon">${done ? '✅' : t.icon}</div>
                <div class="task-name">${t.name}</div>
                <div class="task-schedule">${t.label}</div>
            </div>`;
        }).join('');

        // 显示今天星期几 + 课表说明
        const weekNames = ['日','一','二','三','四','五','六'];
        const todayLabel = `星期${weekNames[dayOfWeek]}`;
        const scheduleNote = document.getElementById('scheduleNote');
        if (scheduleNote) scheduleNote.innerHTML = `📅 今天${todayLabel} · 每日必做：拼音/英语/数学 · 今日轮换：${rotation.map(t=>t.name).join('、')}`;

        document.getElementById('homeRewards').innerHTML = REWARD_LIST.slice(0,2).map(r => {
            const can = this.state.sun >= r.cost;
            return `<div style="display:flex;align-items:center;justify-content:space-between;background:#FFF8E1;border-radius:12px;padding:10px 14px;margin-bottom:8px;">
                <span>🎁 ${r.name} <small style="color:#90A4AE">(${r.cost}阳光)</small></span>
                <button class="btn ${can?'btn-yellow':'btn-coral'}" style="padding:6px 14px;font-size:13px;" onclick="App.claimReward(${r.id})" ${!can?'disabled':''}>${can?'领取':'不够'}</button>
            </div>`;
        }).join('');
    },

    claimReward(id) {
        const r = REWARD_LIST.find(x => x.id === id);
        if (!r || this.state.sun < r.cost) return;
        this.state.sun -= r.cost;
        this.state.rewardsClaimed.push(id);
        this.saveData();
        this.updateSun();
        this.renderHome();
        document.getElementById('rewardModalIcon').textContent = r.icon;
        document.getElementById('rewardModalMsg').innerHTML = `获得：<b>${r.name}</b><br>${r.desc}`;
        document.getElementById('rewardModal').classList.add('show');
    },

    closeRewardModal() {
        document.getElementById('rewardModal').classList.remove('show');
    },

    // 识字
    renderHanzi() {
        const day = this.state.currentDay;
        const dayHanzi = HANZI_LIST.filter(h => h.day === day);
        const totalLearned = this.state.learnedHanzi.length;
        const percent = Math.min(100, (totalLearned / 300 * 100).toFixed(1));
        document.getElementById('hanziProgress').style.width = percent + '%';
        document.getElementById('hanziProgressText').textContent = `${totalLearned} / 300 字`;

        const ds = document.getElementById('daySelector');
        ds.innerHTML = [1,2,3].map(d => `<button class="btn ${d===day?'btn-green':'btn-blue'}" style="padding:4px 10px;font-size:12px;" onclick="App.changeDay(${d})">第${d}天</button>`).join('');

        document.getElementById('hanziGrid').innerHTML = dayHanzi.map(h => {
            const learned = this.state.learnedHanzi.includes(h.char);
            return `<div class="hanzi-card ${learned ? 'learned' : ''}">
                <div class="hanzi-char">${h.char}</div>
                <div class="hanzi-pinyin">${h.pinyin}</div>
                <div class="hanzi-meaning">${h.meaning}</div>
                <div class="hanzi-read-btn" onclick="App.speakHanzi('${h.char}', this)">🔊 跟读</div>
            </div>`;
        }).join('');
    },

    changeDay(d) { this.state.currentDay = d; this.saveData(); this.renderHanzi(); },

    speakHanzi(char, el) {
        const h = HANZI_LIST.find(x => x.char === char);
        const text = h ? `${char}，${h.meaning}的${char}` : char;
        this.speak(text, 'zh-CN');
        if (!this.state.learnedHanzi.includes(char)) {
            this.state.learnedHanzi.push(char);
            this.saveData();
            this.addSun(1, `学会"${char}"`);
            this.renderHanzi();
            this.completeTask('hanzi');
        }
        if (el) {
            el.style.background = '#FFD54F';
            el.style.color = 'white';
            setTimeout(() => { el.style.background = ''; el.style.color = ''; }, 400);
        }
    },

    // 数学
    renderMath() {
        this.renderMathQuestions('mathAddition', 6, (q, i) => {
            const isAdd = Math.random() > 0.5;
            let a, b, ans;
            if (i < 3) {
                if (isAdd) { a = Math.floor(Math.random() * 5) + 1; b = Math.floor(Math.random() * 5) + 1; ans = a + b; }
                else { a = Math.floor(Math.random() * 8) + 2; b = Math.floor(Math.random() * a) + 1; ans = a - b; }
            } else {
                if (isAdd) { a = Math.floor(Math.random() * 50) + 10; b = Math.floor(Math.random() * 40) + 10; ans = a + b; }
                else { a = Math.floor(Math.random() * 80) + 20; b = Math.floor(Math.random() * a) + 1; ans = a - b; }
            }
            return {q: `${a} ${isAdd ? '+' : '-'} ${b} = `, ans};
        });
        this.renderMathQuestions('mathMul99', 6, () => {
            const a = Math.floor(Math.random() * 9) + 1, b = Math.floor(Math.random() * 9) + 1;
            return {q: `${a} × ${b} = `, ans: a * b};
        });
        this.renderPuzzles();
    },

    renderMathQuestions(id, count, gen) {
        const container = document.getElementById(id);
        if (!container) return;
        let html = '';
        for (let i = 0; i < count; i++) {
            const {q, ans} = gen(i);
            html += `<div class="math-question"><div class="math-expression">${q}</div><input type="number" class="math-input" onkeyup="App.checkMath(this, ${ans})"></div>`;
        }
        container.innerHTML = html;
    },

    renderPuzzles() {
        const container = document.getElementById('puzzleList');
        if (!container) return;
        container.innerHTML = PUZZLE_DATA.map((p, i) => `<div class="card">
            <div class="card-title" style="margin-bottom:8px;">🧩 ${p.title}</div>
            <div style="font-size:14px;color:var(--text-medium);margin-bottom:10px;">${p.content}</div>
            <div class="science-options" id="puzzleOptions${i}">${p.options.map((opt, j) => `<div class="science-option" onclick="App.answerPuzzle(${i}, ${j}, this)">${opt}</div>`).join('')}</div>
            <div id="puzzleExplain${i}" style="display:none;margin-top:10px;padding:10px;background:white;border-radius:8px;color:var(--plant-green);font-weight:bold;"></div>
        </div>`).join('');
    },

    checkMath(input, ans) {
        const v = parseInt(input.value);
        if (isNaN(v)) return;
        if (v === ans) {
            input.classList.add('correct');
            if (!input.dataset.scored) { input.dataset.scored = '1'; this.addSun(2, '答对了！'); this.completeTask('math'); }
        } else {
            input.classList.remove('correct');
        }
    },

    answerPuzzle(i, j, el) {
        const p = PUZZLE_DATA[i];
        const opts = document.getElementById('puzzleOptions' + i).children;
        for (let o of opts) o.style.pointerEvents = 'none';
        if (j === p.answer) {
            el.classList.add('correct');
            this.addSun(3, '思维题答对');
            this.completeTask('math');
        } else {
            el.classList.add('wrong');
            opts[p.answer].classList.add('correct');
            this.addWrong('思维', p.content, p.options[p.answer]);
        }
        document.getElementById('puzzleExplain' + i).textContent = '✅ ' + p.explanation;
        document.getElementById('puzzleExplain' + i).style.display = 'block';
    },

    refreshMath() { this.renderMath(); this.toast('🔄 已更换新题目'); },

    // 拼音
    renderPinyin() {
        document.getElementById('pinyinShengmu').innerHTML = PINYIN_DATA.声母.map(p => `<div class="pinyin-card" onclick="App.speakPinyin('${p.sound}','${p.word}','${p.pinyin}', this)">
            <div class="pinyin-letter">${p.pinyin}</div>
            <div class="pinyin-word">${p.word}</div>
            <div class="pinyin-read-hint">👆点击跟读</div>
        </div>`).join('');
        document.getElementById('pinyinDanmu').innerHTML = PINYIN_DATA.单韵母.map(p => `<div class="pinyin-card" onclick="App.speakPinyin('${p.sound}','${p.word}','${p.pinyin}', this)">
            <div class="pinyin-letter">${p.pinyin}</div>
            <div class="pinyin-word">${p.word}</div>
            <div class="pinyin-read-hint">👆点击跟读</div>
        </div>`).join('');
        document.getElementById('pinyinFu').innerHTML = PINYIN_DATA.复韵母.map(p => `<div class="pinyin-card focus" onclick="App.speakPinyin('${p.sound}','${p.word}','${p.pinyin}', this)">
            <div class="pinyin-letter">${p.pinyin}</div>
            <div class="pinyin-word">${p.word}</div>
            <div style="font-size:11px;color:#B71C1C">${p.example}</div>
            <div class="pinyin-read-hint">👆点击跟读</div>
        </div>`).join('');
        document.getElementById('pinyinBi').innerHTML = PINYIN_DATA.鼻韵母.map(p => `<div class="pinyin-card" onclick="App.speakPinyin('${p.sound}','${p.word}','${p.pinyin}', this)">
            <div class="pinyin-letter">${p.pinyin}</div>
            <div class="pinyin-word">${p.word}</div>
            <div style="font-size:11px">${p.example}</div>
            <div class="pinyin-read-hint">👆点击跟读</div>
        </div>`).join('');
    },

    speakPinyin(sound, word, pinyin, el) {
        this.speak(sound + '，' + sound, 'zh-CN');
        el.style.transform = 'scale(1.1)';
        el.style.background = '#FFF8E1';
        setTimeout(() => { el.style.transform = ''; el.style.background = ''; }, 400);
    },

    // 英语
    renderEnglish() {
        const themes = document.getElementById('englishThemes');
        const activeTheme = this.state.activeTheme || 'seasons';
        themes.innerHTML = ENGLISH_THEMES.map(t => `<button class="english-theme-btn ${t.id===activeTheme?'active':''}" onclick="App.selectTheme('${t.id}')">${t.icon} ${t.title}</button>`).join('');
        const theme = ENGLISH_THEMES.find(t => t.id === activeTheme);
        document.getElementById('englishWords').innerHTML = theme.words.map(w => `<div class="english-word-card">
            <div class="word-icon">${w.icon}</div>
            <div class="word-en">${w.word}</div>
            <div class="word-cn">${w.cn}</div>
            <div class="word-sentence">${w.sentence}</div>
            <div class="english-read-btns">
                <button class="read-btn read-word" onclick="App.speakEnglish('${w.word}', 'word', this)">🔊 读单词</button>
                <button class="read-btn read-sentence" onclick="App.speakEnglish('${w.sentence}', 'sentence', this)">🔊 读句子</button>
            </div>
        </div>`).join('');
    },

    selectTheme(id) { this.state.activeTheme = id; this.saveData(); this.renderEnglish(); },

    speakEnglish(text, type, el) {
        this.speak(text, 'en-US');
        if (type === 'word') {
            this.addSun(1, `跟读单词`);
        } else {
            this.addSun(2, `跟读句子`);
        }
        this.completeTask('english');
        if (el) {
            el.style.background = '#42A5F5';
            el.style.color = 'white';
            setTimeout(() => { el.style.background = ''; el.style.color = ''; }, 400);
        }
    },

    // 习惯
    renderHabits() {
        const container = document.getElementById('habitList');
        container.innerHTML = HABIT_DATA.map(habit => {
            const allDone = habit.items.every(item => this.state.habits[item.id]);
            return `<div class="habit-card">
                <div class="habit-header">
                    <div class="habit-title-row"><span class="habit-icon">${habit.icon}</span><span class="habit-title">${habit.title}</span></div>
                    <span class="tag ${allDone?'tag-mint':'tag-pink'}">${allDone?'已完成':'打卡'}</span>
                </div>
                <div class="habit-desc">${habit.desc}</div>
                <div class="habit-subdesc">${habit.subdesc}</div>
                ${habit.items.map(item => `<div class="habit-item">
                    <div class="habit-item-name"><span>${item.icon}</span>${item.name}</div>
                    <div class="habit-check">
                        <button class="habit-btn ${this.state.habits[item.id]?'done':''}" onclick="App.checkHabit('${item.id}', this)">${this.state.habits[item.id]?'已打卡':'打卡'}</button>
                    </div>
                </div>`).join('')}
            </div>`;
        }).join('');
    },

    checkHabit(id, btn) {
        if (this.state.habits[id]) return;
        this.state.habits[id] = true;
        this.saveData();
        this.addSun(5, '好习惯打卡');
        this.completeTask('habit');
        this.renderHabits();
    },

    // 绘本
    renderPictureBooks() {
        document.getElementById('picturebookList').innerHTML = PICTURE_BOOKS.map((b, i) => `<div class="book-card" onclick="App.openBook(${i})">
            <div class="book-icon">${b.icon}</div><div class="book-title">${b.title}</div>
        </div>`).join('');
    },

    openBook(i) {
        this.state.bookIndex = i;
        this.state.bookPage = 0;
        document.getElementById('picturebookList').parentElement.style.display = 'none';
        document.getElementById('bookReader').style.display = 'block';
        this.renderBookPage();
        this.completeTask('picturebook');
    },

    closeBook() {
        document.getElementById('picturebookList').parentElement.style.display = 'block';
        document.getElementById('bookReader').style.display = 'none';
        this.state.bookIndex = -1;
    },

    renderBookPage() {
        const b = PICTURE_BOOKS[this.state.bookIndex];
        document.getElementById('readerTitle').textContent = b.title;
        document.getElementById('readerPage').textContent = b.pages[this.state.bookPage];
    },

    nextPage() {
        const b = PICTURE_BOOKS[this.state.bookIndex];
        if (this.state.bookPage < b.pages.length - 1) { this.state.bookPage++; this.renderBookPage(); }
    },

    prevPage() {
        if (this.state.bookPage > 0) { this.state.bookPage--; this.renderBookPage(); }
    },

    speakBook() {
        const b = PICTURE_BOOKS[this.state.bookIndex];
        this.speak(b.title + '。' + b.pages.join('。'), 'zh-CN');
    },

    // 科普
    renderScience() {
        const s = SCIENCE_DATA[this.state.scienceIndex];
        this.state.scienceAnswered = false;
        document.getElementById('scienceCard').innerHTML = `
            <div class="science-icon">${s.icon}</div>
            <div class="tag tag-mint" style="margin-bottom:10px;">🔬 今天的小知识</div>
            <div class="science-title">${s.title}</div>
            <div class="science-content">${s.content}</div>
            <div class="science-question">${s.question}</div>
            <div class="science-options" id="scienceOptions">${s.options.map((opt, i) => `<div class="science-option" onclick="App.answerScience(${i}, this)">${opt}</div>`).join('')}</div>
            <div id="scienceTip" style="display:none;margin-top:12px;padding:12px;background:white;border-radius:10px;color:var(--plant-green);font-weight:bold;"></div>
        `;
    },

    answerScience(i, el) {
        if (this.state.scienceAnswered) return;
        const s = SCIENCE_DATA[this.state.scienceIndex];
        const opts = document.getElementById('scienceOptions').children;
        for (let o of opts) o.style.pointerEvents = 'none';
        if (i === s.answer) {
            el.classList.add('correct');
            this.addSun(5, '科普答对');
        } else {
            el.classList.add('wrong');
            opts[s.answer].classList.add('correct');
        }
        this.state.scienceAnswered = true;
        document.getElementById('scienceTip').textContent = '💡 ' + s.tip;
        document.getElementById('scienceTip').style.display = 'block';
    },

    speakScience() {
        const s = SCIENCE_DATA[this.state.scienceIndex];
        this.speak(s.title + '。' + s.content + s.question, 'zh-CN');
    },

    nextScience() {
        this.state.scienceIndex = (this.state.scienceIndex + 1) % SCIENCE_DATA.length;
        this.renderScience();
    },

    completeScience() {
        this.addSun(10, '完成科普学习');
        this.completeTask('science');
    },

    // 健身饮食
    renderFitness() {
        const exList = document.getElementById('exerciseList');
        if (exList) {
            exList.innerHTML = EXERCISE_LIST.map(e => `<div class="fitness-card">
                <div class="fitness-icon" style="background:#E8F5E9;">${e.icon}</div>
                <div class="fitness-info">
                    <div class="fitness-name">${e.name}</div>
                    <div class="fitness-detail">${e.detail} · ${e.duration} · ${e.desc}</div>
                </div>
            </div>`).join('');
        }
        const foodEl = document.getElementById('foodList');
        if (foodEl) {
            foodEl.innerHTML = FOOD_LIST.map(f => `<div class="food-card">
                <div class="food-icon">${f.icon}</div>
                <div class="food-info">
                    <div class="food-name">${f.name}</div>
                    <div class="food-desc">${f.desc}</div>
                </div>
            </div>`).join('');
        }
    },

    // 备忘录
    renderMemo() {
        const container = document.getElementById('memoList');
        if (!container) return;
        if (!this.state.memoChecks) this.state.memoChecks = {};
        let totalDone = 0, totalItems = 0;
        let html = '';
        for (let cat in TODO_PRESETS) {
            const catData = TODO_PRESETS[cat];
            const catDone = catData.items.filter((_, i) => this.state.memoChecks[cat + '_' + i]).length;
            totalDone += catDone;
            totalItems += catData.items.length;
            const allCatDone = catDone === catData.items.length;
            html += `<div class="card" style="margin-bottom:12px;">
                <div class="card-header">
                    <div class="card-icon" style="background:${catData.color};">${catData.icon}</div>
                    <div>
                        <div class="card-title">${catData.title}</div>
                        <div class="card-subtitle">${catDone} / ${catData.items.length} 已完成 ${allCatDone ? '✅' : ''}</div>
                    </div>
                </div>
                <div class="memo-progress-bar"><div class="memo-progress-fill" style="width:${catDone/catData.items.length*100}%"></div></div>
                ${catData.items.map((item, i) => {
                    const checked = this.state.memoChecks[cat + '_' + i];
                    return `<div class="memo-item ${checked?'done':''}" onclick="App.toggleMemo('${cat}', ${i})">
                        <div class="memo-check">${checked ? '✅' : '⬜'}</div>
                        <div class="memo-text ${checked?'memo-text-done':''}">${item.text}</div>
                    </div>`;
                }).join('')}
            </div>`;
        }
        container.innerHTML = html;
        const progEl = document.getElementById('memoProgress');
        if (progEl) progEl.textContent = totalDone;
    },

    toggleMemo(cat, i) {
        if (!this.state.memoChecks) this.state.memoChecks = {};
        const key = cat + '_' + i;
        this.state.memoChecks[key] = !this.state.memoChecks[key];
        if (this.state.memoChecks[key]) {
            this.addSun(2, '备忘清单完成一项');
        }
        this.saveData();
        this.renderMemo();
    },

    // 电子宠物
    renderCatImage(mood) {
        return `<img class="cat-img" src="images/cat-mimi.jpg" alt="咪咪" draggable="false">`;
    },

    renderPetEffects(mood) {
        if (mood === 'feed') {
            const foods = ['🍖','🐟','🥛','🍪','🍗'];
            return `<div class="pet-effect-layer"><span class="effect-food">${foods[Math.floor(Math.random()*foods.length)]}</span></div>`;
        }
        if (mood === 'play') {
            return `<div class="pet-effect-layer"><span class="effect-ball">🎾</span></div>`;
        }
        if (mood === 'sleep') {
            return `<div class="pet-effect-layer">
                <span class="effect-zzz" style="left:55%;top:8%;">💤</span>
                <span class="effect-zzz" style="left:60%;top:15%;animation-delay:0.7s;">💤</span>
                <span class="effect-zzz" style="left:52%;top:12%;animation-delay:1.4s;">💤</span>
            </div>`;
        }
        if (mood === 'bath') {
            let bubbles = '';
            for (let i = 0; i < 6; i++) {
                const size = 8 + Math.floor(Math.random() * 16);
                const left = 20 + Math.floor(Math.random() * 60);
                const delay = (i * 0.25).toFixed(2);
                bubbles += `<div class="effect-bubble" style="left:${left}%;width:${size}px;height:${size}px;animation-delay:${delay}s;"></div>`;
            }
            return `<div class="pet-effect-layer">${bubbles}</div>`;
        }
        if (mood === 'pet') {
            return `<div class="pet-effect-layer">
                <span class="effect-hand">🤚</span>
                <span class="effect-heart" style="left:48%;top:18%;">💕</span>
                <span class="effect-heart" style="left:55%;top:12%;animation-delay:0.5s;">💗</span>
            </div>`;
        }
        return '';
    },

    renderPet() {
        const p = this.state.pet;
        const mood = p.mood || 'idle';
        document.getElementById('petContainer').innerHTML = `
            <div class="pet-stage">
                <div class="pet-avatar pet-state--${mood}">
                    ${this.renderCatImage(mood)}
                    ${this.renderPetEffects(mood)}
                </div>
                <div class="pet-name">${p.name}</div>
                <div class="pet-level">等级 ${p.level} · 成长值 ${p.growth}</div>
                <div class="pet-stats">
                    ${this.renderPetStat('饱食度', p.hunger, '#FF8A65')}
                    ${this.renderPetStat('开心值', p.happiness, '#FFD54F')}
                    ${this.renderPetStat('精力值', p.energy, '#64B5F6')}
                    ${this.renderPetStat('清洁度', p.cleanliness, '#81C784')}
                </div>
                <div class="pet-actions">${PET_ACTIONS.map(a => `<div class="pet-action" onclick="App.petAction('${a.id}')">
                    <div class="action-icon">${a.icon}</div><div class="action-name">${a.name}</div>
                </div>`).join('')}</div>
            </div>
        `;
    },

    renderPetStat(name, val, color) {
        return `<div class="pet-stat"><div class="pet-stat-name">${name}</div><div class="pet-stat-value">${val}%</div>
            <div class="pet-stat-bar"><div class="pet-stat-fill" style="width:${val}%;background:${color}"></div></div></div>`;
    },

    petAction(id) {
        const action = PET_ACTIONS.find(a => a.id === id);
        const p = this.state.pet;
        for (let k in action.effect) {
            p[k] = Math.min(100, Math.max(0, p[k] + action.effect[k]));
        }
        p.growth += 5;
        if (p.growth >= p.level * 100) { p.level++; p.growth = 0; this.toast(`🎉 宠物升级到 ${p.level} 级！`); }
        p.mood = action.state;
        if (action.voice) this.speak(action.voice, 'zh-CN', {pitch: 1.4, rate: 0.8});
        this.addSun(3, `照顾宠物${action.name}`);
        this.saveData();
        this.renderPet();
        if (this._petMoodTimer) clearTimeout(this._petMoodTimer);
        this._petMoodTimer = setTimeout(() => {
            p.mood = 'idle';
            this.saveData();
            this.renderPet();
        }, 2000);
    },

    startPetLoop() {
        setInterval(() => {
            const p = this.state.pet;
            p.hunger = Math.max(0, p.hunger - 2);
            p.happiness = Math.max(0, p.happiness - 1);
            p.energy = Math.min(100, p.energy + 1);
            p.cleanliness = Math.max(0, p.cleanliness - 1);
            this.saveData();
            if (this.state.currentNav === 'pet') this.renderPet();
        }, 60000);
    },

    // 错题
    renderWrong() {
        const list = document.getElementById('wrongList');
        if (!this.state.wrongQuestions.length) {
            list.innerHTML = '<div class="card" style="text-align:center;padding:40px;color:var(--text-light);"><div style="font-size:48px;">🎉</div><div>太棒了！还没有错题</div></div>';
            return;
        }
        list.innerHTML = this.state.wrongQuestions.map(q => `<div class="wrong-card">
            <span class="tag tag-pink">${q.subject}</span>
            <div style="font-size:15px;margin:8px 0;">${q.question}</div>
            <div style="color:var(--plant-green);font-weight:bold;">✓ ${q.correctAnswer}</div>
            <div style="font-size:12px;color:var(--text-light);margin-top:4px;">${q.date}</div>
            <button class="btn btn-green" style="margin-top:8px;padding:4px 12px;font-size:12px;" onclick="App.removeWrong(${q.id})">已掌握</button>
        </div>`).join('');
    },

    addWrong(subject, question, correctAnswer) {
        this.state.wrongQuestions.unshift({id: Date.now(), subject, question, correctAnswer, date: new Date().toLocaleDateString('zh-CN')});
        if (this.state.wrongQuestions.length > 30) this.state.wrongQuestions.pop();
        this.saveData();
        this.renderNav();
    },

    removeWrong(id) {
        this.state.wrongQuestions = this.state.wrongQuestions.filter(q => q.id !== id);
        this.saveData();
        this.renderWrong();
        this.renderNav();
    },

    // 通用
    completeTask(taskId) {
        if (!this.state.tasksCompleted[taskId]) {
            this.state.tasksCompleted[taskId] = true;
            this.saveData();
            this.toast(`✅ 完成${taskId === 'hanzi'?'识字':taskId === 'math'?'数学思维':taskId === 'english'?'英语':taskId === 'science'?'科普':taskId === 'habit'?'好习惯':taskId === 'picturebook'?'绘本':'学习'}任务！`);
        }
    },

    speak(text, lang, options = {}) {
        if ('speechSynthesis' in window) {
            const u = new SpeechSynthesisUtterance(text);
            u.lang = lang;
            u.rate = options.rate ?? 0.85;
            u.pitch = options.pitch ?? 1;
            if (options.voice) u.voice = options.voice;
            speechSynthesis.speak(u);
        }
    },
};

document.addEventListener('DOMContentLoaded', () => App.init());
