// ============================================
// 靖铭学习工作台 - 主逻辑
// ============================================

// ========== 全局状态管理 ==========
const App = {
    state: {
        sun: 0,              // 阳光数量
        currentDay: 1,       // 当前学习天数
        currentNav: 'hanzi', // 当前导航
        learnedHanzi: [],    // 已学汉字
        learnedPoems: [],    // 已学古诗
        wrongQuestions: [],  // 错题本
        checkinDates: {},   // 打卡记录 {date: true}
        rewardsClaimed: [],  // 已领取奖励
        todos: [],           // 待办事项
        baseHealth: 100,     // 基地血量
        tasksCompleted: {    // 每日任务完成情况
            hanzi: false,
            poem: false,
            math: false,
            english: false,
            pinyin: false,
        },
    },

    init() {
        this.loadData();
        this.renderNav();
        this.renderHanzi();
        this.renderPoems();
        this.renderMath();
        this.renderPinyin();
        this.renderWrongQuestions();
        this.renderBaseDefense();
        this.renderRewards();
        this.renderCalendar();
        this.renderHealth();
        this.renderEnglish();
        this.renderPuzzles();
        this.renderTodos();
        this.updateSunDisplay();
        this.updateDate();
        this.bindEvents();
        this.startFloatingLeaves();
    },

    // ========== 数据持久化 ==========
    loadData() {
        const saved = localStorage.getItem('jingmingStudyData');
        if (saved) {
            const data = JSON.parse(saved);
            Object.assign(this.state, data);
        }
        // 初始化待办列表
        if (!this.state.todos || this.state.todos.length === 0) {
            this.state.todos = TODO_PRESETS.map((t, i) => ({...t, id: i + 1}));
        }
    },

    saveData() {
        localStorage.setItem('jingmingStudyData', JSON.stringify(this.state));
    },

    // ========== 阳光管理 ==========
    addSun(amount, reason = '') {
        this.state.sun += amount;
        this.updateSunDisplay();
        this.showSunAnimation(amount);
        this.saveData();
        if (reason) {
            this.showToast(`+${amount} 阳光！${reason}`, 'success');
        }
    },

    spendSun(amount) {
        if (this.state.sun < amount) return false;
        this.state.sun -= amount;
        this.updateSunDisplay();
        this.saveData();
        return true;
    },

    updateSunDisplay() {
        document.getElementById('sunCount').textContent = this.state.sun;
    },

    showSunAnimation(amount) {
        const sun = document.createElement('div');
        sun.className = 'sun-collected';
        sun.style.position = 'fixed';
        sun.style.left = (Math.random() * (window.innerWidth - 100) + 50) + 'px';
        sun.style.top = '100px';
        sun.style.zIndex = '9999';
        sun.innerHTML = `<span style="position:absolute;top:-20px;left:50%;transform:translateX(-50%);color:#FF8F00;font-weight:bold;font-size:14px;white-space:nowrap;">+${amount} ☀️</span>`;
        document.body.appendChild(sun);
        setTimeout(() => sun.remove(), 2000);
    },

    // ========== 日期更新 ==========
    updateDate() {
        const now = new Date();
        const days = ['日', '一', '二', '三', '四', '五', '六'];
        const dateStr = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 星期${days[now.getDay()]}`;
        document.getElementById('dateDisplay').textContent = dateStr;
    },

    // ========== 导航切换 ==========
    renderNav() {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const section = item.dataset.section;
                navItems.forEach(n => n.classList.remove('active'));
                item.classList.add('active');
                document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
                document.getElementById('section-' + section).classList.add('active');
                this.state.currentNav = section;
            });
        });
    },

    // ========== 汉字学习 ==========
    renderHanzi() {
        const container = document.getElementById('hanziGrid');
        const day = this.state.currentDay;
        const dayHanzi = HANZI_LIST.filter(h => h.day === day);
        const allHanzi = HANZI_LIST.filter(h => h.day <= day);
        
        // 更新进度
        const totalLearned = this.state.learnedHanzi.length;
        const totalGoal = 500;
        const percent = Math.min(100, (totalLearned / totalGoal * 100).toFixed(1));
        document.getElementById('hanziProgress').style.width = percent + '%';
        document.getElementById('hanziProgressText').textContent = `${totalLearned} / ${totalGoal} 字`;
        
        // 今日学习
        document.getElementById('hanziDayTitle').textContent = `第 ${day} 天 - 今日学习 ${dayHanzi.length} 个字`;
        
        container.innerHTML = dayHanzi.map(h => {
            const learned = this.state.learnedHanzi.includes(h.char);
            return `
                <div class="hanzi-card ${learned ? 'learned' : ''}" onclick="App.speakHanzi('${h.char}', '${h.pinyin}', this)">
                    <div class="hanzi-char">${h.char}</div>
                    <div class="hanzi-pinyin">${h.pinyin}</div>
                    <div class="hanzi-meaning">${h.meaning}</div>
                    <span class="sound-icon">🔊</span>
                </div>
            `;
        }).join('');

        // 统计
        document.getElementById('hanziTodayCount').textContent = dayHanzi.filter(h => this.state.learnedHanzi.includes(h.char)).length;
        document.getElementById('hanziTotalCount').textContent = totalLearned;

        // 天数选择器
        this.renderDaySelector();
    },

    renderDaySelector() {
        const container = document.getElementById('daySelector');
        if (!container) return;
        const maxDay = Math.max(...HANZI_LIST.map(h => h.day));
        let html = '';
        for (let i = 1; i <= maxDay; i++) {
            const active = i === this.state.currentDay ? 'active' : '';
            const learned = HANZI_LIST.filter(h => h.day === i).every(h => this.state.learnedHanzi.includes(h.char));
            html += `<button class="btn ${active} ${learned ? 'btn-success' : 'btn-primary'}" style="padding:6px 12px;font-size:13px;margin:2px;" onclick="App.changeDay(${i})">第${i}天</button>`;
        }
        container.innerHTML = html;
    },

    changeDay(day) {
        this.state.currentDay = day;
        this.saveData();
        this.renderHanzi();
    },

    speakHanzi(char, pinyin, element) {
        // 使用 Web Speech API 朗读
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(char);
            utterance.lang = 'zh-CN';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }

        // 标记为已学
        if (!this.state.learnedHanzi.includes(char)) {
            this.state.learnedHanzi.push(char);
            this.saveData();
            element.classList.add('learned');
            this.addSun(1, `学会"${char}"`);
            this.renderHanzi();

            // 完成汉字任务 (学完当天全部字)
            const todayHanzi = HANZI_LIST.filter(h => h.day === this.state.currentDay);
            const todayLearned = todayHanzi.filter(h => this.state.learnedHanzi.includes(h.char)).length;
            if (todayLearned === todayHanzi.length && !this.state.tasksCompleted.hanzi) {
                this.state.tasksCompleted.hanzi = true;
                this.saveData();
                this.completeTask('汉字');
                this.renderBaseDefense();
            }
        }

        // 动画效果
        element.style.animation = 'bounce 0.5s ease';
        setTimeout(() => element.style.animation = '', 500);
    },

    // ========== 古诗学习 ==========
    renderPoems() {
        const container = document.getElementById('poemList');
        const total = POEM_LIST.length;
        const learned = this.state.learnedPoems.length;
        const percent = (learned / total * 100).toFixed(1);
        
        document.getElementById('poemProgress').style.width = percent + '%';
        document.getElementById('poemProgressText').textContent = `${learned} / ${total} 首`;

        container.innerHTML = POEM_LIST.map((p, i) => {
            const isLearned = this.state.learnedPoems.includes(i);
            return `
                <div class="poem-card ${isLearned ? 'learned' : ''}" onclick="App.recitePoem(${i}, this)">
                    <div class="poem-title">${i + 1}. ${p.title}</div>
                    <div class="poem-author">【${p.author}】</div>
                    <div class="poem-content">${p.content.replace(/\n/g, '<br>')}</div>
                </div>
            `;
        }).join('');

        document.getElementById('poemLearnedCount').textContent = learned;
    },

    recitePoem(index, element) {
        const poem = POEM_LIST[index];
        if ('speechSynthesis' in window) {
            const text = `${poem.title}，${poem.author}。${poem.content.replace(/\n/g, '，')}`;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'zh-CN';
            utterance.rate = 0.7;
            speechSynthesis.speak(utterance);
        }

        if (!this.state.learnedPoems.includes(index)) {
            this.state.learnedPoems.push(index);
            this.saveData();
            this.addSun(5, `背诵《${poem.title}》`);
            this.renderPoems();

            // 完成古诗任务 (背诵3首)
            if (this.state.learnedPoems.length >= 3 && !this.state.tasksCompleted.poem) {
                this.state.tasksCompleted.poem = true;
                this.saveData();
                this.completeTask('古诗');
                this.renderBaseDefense();
            }
        }
    },

    // ========== 数学练习 ==========
    renderMath() {
        this.renderMathAddition();
        this.renderMathMultiplication();
        this.renderMathDivision();
        this.renderMathMultiply2();
        this.renderMathThinking();
    },

    renderMathAddition() {
        const container = document.getElementById('mathAddition');
        if (!container) return;
        // 10以内加减法 (也包含10-100)
        const questions = [];
        for (let i = 0; i < 6; i++) {
            const isAdd = Math.random() > 0.5;
            let a, b, answer;
            if (i < 3) {
                // 10以内
                if (isAdd) {
                    a = Math.floor(Math.random() * 10) + 1;
                    b = Math.floor(Math.random() * (10 - a)) + 1;
                    answer = a + b;
                } else {
                    a = Math.floor(Math.random() * 9) + 2;
                    b = Math.floor(Math.random() * a) + 1;
                    answer = a - b;
                }
            } else {
                // 100以内
                if (isAdd) {
                    a = Math.floor(Math.random() * 50) + 10;
                    b = Math.floor(Math.random() * (99 - a)) + 1;
                    answer = a + b;
                } else {
                    a = Math.floor(Math.random() * 80) + 20;
                    b = Math.floor(Math.random() * a) + 1;
                    answer = a - b;
                }
            }
            questions.push({a, b, op: isAdd ? '+' : '-', answer, userAnswer: ''});
        }
        this._mathAdditionQuestions = questions;
        container.innerHTML = questions.map((q, i) => `
            <div class="math-question">
                <div class="math-expression">${q.a} ${q.op} ${q.b} = </div>
                <input type="number" class="math-input" id="addInput${i}" onkeyup="App.checkMathAnswer('addition', ${i}, ${q.answer}, this)">
            </div>
        `).join('');
    },

    renderMathMultiplication() {
        const container = document.getElementById('mathMul99');
        if (!container) return;
        // 99乘法表
        const questions = [];
        for (let i = 0; i < 6; i++) {
            const a = Math.floor(Math.random() * 9) + 1;
            const b = Math.floor(Math.random() * 9) + 1;
            questions.push({a, b, answer: a * b});
        }
        this._mathMulQuestions = questions;
        container.innerHTML = questions.map((q, i) => `
            <div class="math-question">
                <div class="math-expression">${q.a} × ${q.b} = </div>
                <input type="number" class="math-input" id="mulInput${i}" onkeyup="App.checkMathAnswer('mul', ${i}, ${q.answer}, this)">
            </div>
        `).join('');
    },

    renderMathDivision() {
        const container = document.getElementById('mathDiv99');
        if (!container) return;
        // 简单除法
        const questions = [];
        for (let i = 0; i < 4; i++) {
            const b = Math.floor(Math.random() * 9) + 1;
            const answer = Math.floor(Math.random() * 9) + 1;
            const a = b * answer;
            questions.push({a, b, answer});
        }
        this._mathDivQuestions = questions;
        container.innerHTML = questions.map((q, i) => `
            <div class="math-question">
                <div class="math-expression">${q.a} ÷ ${q.b} = </div>
                <input type="number" class="math-input" id="divInput${i}" onkeyup="App.checkMathAnswer('div', ${i}, ${q.answer}, this)">
            </div>
        `).join('');
    },

    renderMathMultiply2() {
        const container = document.getElementById('mathMul2');
        if (!container) return;
        // 两位数乘一位数
        const questions = [];
        for (let i = 0; i < 4; i++) {
            const a = Math.floor(Math.random() * 80) + 12;
            const b = Math.floor(Math.random() * 8) + 2;
            questions.push({a, b, answer: a * b});
        }
        this._mathMul2Questions = questions;
        container.innerHTML = questions.map((q, i) => `
            <div class="math-question">
                <div class="math-expression">${q.a} × ${q.b} = </div>
                <input type="number" class="math-input" id="mul2Input${i}" onkeyup="App.checkMathAnswer('mul2', ${i}, ${q.answer}, this)">
            </div>
        `).join('');
    },

    renderMathThinking() {
        const container = document.getElementById('mathThinking');
        if (!container) return;
        // 思维练习题
        const types = [
            () => {
                const a = Math.floor(Math.random() * 20) + 10;
                const b = Math.floor(Math.random() * 10) + 5;
                return {q: `小明有${a}个糖果，分给${b}个小朋友，每人几个？还剩几个？`, answer: [Math.floor(a / b), a % b], type: 'division'};
            },
            () => {
                const start = Math.floor(Math.random() * 10) + 1;
                const step = Math.floor(Math.random() * 3) + 2;
                return {q: `找规律：${start}, ${start + step}, ${start + step * 2}, ${start + step * 3}, ?`, answer: start + step * 4, type: 'pattern'};
            },
            () => {
                const total = Math.floor(Math.random() * 20) + 20;
                const part = Math.floor(Math.random() * 10) + 5;
                return {q: `树上原来有${total}只鸟，飞走了${part}只，又飞来了${Math.floor(Math.random() * 10) + 3}只，现在有多少只？`, answer: total - part + Math.floor(Math.random() * 10) + 3, type: 'word'};
            },
        ];
        const questions = types.map(t => t());
        this._mathThinkingQuestions = questions;
        container.innerHTML = questions.map((q, i) => `
            <div class="math-question" style="flex-direction:column;align-items:flex-start;gap:8px;">
                <div style="font-size:16px;color:var(--text-dark);">💡 ${q.q}</div>
                <input type="number" class="math-input" id="thinkInput${i}" placeholder="请输入答案" onkeyup="App.checkMathAnswer('think', ${i}, ${typeof q.answer === 'number' ? q.answer : q.answer[0]}, this)">
            </div>
        `).join('');
    },

    checkMathAnswer(type, index, answer, input) {
        const userAnswer = parseInt(input.value);
        if (isNaN(userAnswer)) return;

        if (userAnswer === answer) {
            input.classList.remove('wrong');
            input.classList.add('correct');
            if (!input.dataset.scored) {
                input.dataset.scored = 'true';
                this.addSun(2, '答对了！');
            }
            // 任何题目答对即视为完成数学任务
            if (!this.state.tasksCompleted.math) {
                this.state.tasksCompleted.math = true;
                this.saveData();
                this.completeTask('数学');
                this.renderBaseDefense();
            }
        } else {
            input.classList.remove('correct');
            input.classList.add('wrong');
            // 记录错题
            let expression = '';
            try {
                expression = input.parentElement.querySelector('.math-expression').textContent.trim();
            } catch(e) {
                expression = type + '题';
            }
            this.addWrongQuestion('数学', expression, `正确答案: ${answer}`);
        }
    },

    // ========== 拼音学习 ==========
    renderPinyin() {
        // 声母
        document.getElementById('pinyinShengmu').innerHTML = PINYIN_DATA.声母.map(p => 
            `<div class="pinyin-card" onclick="App.speakPinyin('${p}', this)"><div class="pinyin-char">${p}</div><div class="pinyin-type">声母</div></div>`
        ).join('');

        // 单韵母
        document.getElementById('pinyinDanmu').innerHTML = PINYIN_DATA.单韵母.map(p => 
            `<div class="pinyin-card" onclick="App.speakPinyin('${p}', this)"><div class="pinyin-char">${p}</div><div class="pinyin-type">单韵母</div></div>`
        ).join('');

        // 复韵母 (重点)
        document.getElementById('pinyinFu').innerHTML = PINYIN_DATA.复韵母.map(p => 
            `<div class="pinyin-card" onclick="App.speakPinyin('${p.pinyin}', this)" style="background:linear-gradient(135deg,#FFCDD2 0%,#EF9A9A 100%);border-color:#E57373;">
                <div class="pinyin-char" style="color:#B71C1C;">${p.pinyin}</div>
                <div class="pinyin-type">复韵母</div>
                <div style="font-size:13px;margin-top:4px;color:#B71C1C;font-weight:bold;">${p.example}</div>
                <div style="font-size:11px;color:var(--text-light);">${p.tip}</div>
            </div>`
        ).join('');

        // 鼻韵母
        document.getElementById('pinyinBi').innerHTML = PINYIN_DATA.鼻韵母.map(p => 
            `<div class="pinyin-card" onclick="App.speakPinyin('${p.pinyin}', this)"><div class="pinyin-char">${p.pinyin}</div><div class="pinyin-type">鼻韵母</div><div style="font-size:12px;margin-top:4px;color:var(--text-medium);">${p.example}</div></div>`
        ).join('');
    },

    speakPinyin(pinyin, element) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(pinyin);
            utterance.lang = 'zh-CN';
            utterance.rate = 0.6;
            speechSynthesis.speak(utterance);
        }
        element.style.animation = 'bounce 0.5s ease';
        setTimeout(() => element.style.animation = '', 500);
        this.addSun(1, `跟读"${pinyin}"`);

        // 完成拼音任务 (读一遍复韵母即视为完成)
        if (!this.state.tasksCompleted.pinyin) {
            this.state.tasksCompleted.pinyin = true;
            this.saveData();
            this.completeTask('拼音');
            this.renderBaseDefense();
        }
    },

    // ========== 错题本 ==========
    addWrongQuestion(subject, question, correctAnswer) {
        const date = new Date().toLocaleDateString('zh-CN');
        this.state.wrongQuestions.unshift({
            id: Date.now(),
            subject,
            question,
            correctAnswer,
            date,
            practiced: false,
        });
        // 限制最多50条
        if (this.state.wrongQuestions.length > 50) {
            this.state.wrongQuestions = this.state.wrongQuestions.slice(0, 50);
        }
        this.saveData();
        this.renderWrongQuestions();
    },

    renderWrongQuestions() {
        const container = document.getElementById('wrongQuestionList');
        const list = this.state.wrongQuestions;
        
        // 更新错题数量
        const badge = document.getElementById('wrongCountBadge');
        if (badge) badge.textContent = list.length;

        if (list.length === 0) {
            container.innerHTML = `
                <div style="text-align:center;padding:40px 20px;color:var(--text-light);">
                    <div style="font-size:48px;margin-bottom:12px;">🎉</div>
                    <div>太棒了！还没有错题记录！</div>
                    <div style="font-size:13px;margin-top:8px;">继续加油，保持全对！</div>
                </div>
            `;
            return;
        }

        // 统计
        document.getElementById('wrongTotalCount').textContent = list.length;
        document.getElementById('wrongSubjectCount').textContent = new Set(list.map(q => q.subject)).size;

        container.innerHTML = list.map(q => `
            <div class="wrong-question">
                <span class="wrong-subject">${q.subject}</span>
                <div class="wrong-content">${q.question}</div>
                <div class="wrong-answer">✓ ${q.correctAnswer}</div>
                <div class="wrong-date">📅 ${q.date}</div>
                <button class="btn btn-success" style="margin-top:8px;padding:4px 12px;font-size:13px;" onclick="App.practiceWrongQuestion(${q.id})">已练习</button>
                <button class="btn btn-primary" style="margin-top:8px;margin-left:8px;padding:4px 12px;font-size:13px;" onclick="App.deleteWrongQuestion(${q.id})">删除</button>
            </div>
        `).join('');
    },

    practiceWrongQuestion(id) {
        const q = this.state.wrongQuestions.find(x => x.id === id);
        if (q) {
            q.practiced = true;
            this.saveData();
            this.addSun(3, '错题已练习');
            this.renderWrongQuestions();
        }
    },

    deleteWrongQuestion(id) {
        this.state.wrongQuestions = this.state.wrongQuestions.filter(q => q.id !== id);
        this.saveData();
        this.renderWrongQuestions();
        this.showToast('已删除错题', 'success');
    },

    // ========== 保卫基地 ==========
    renderBaseDefense() {
        const container = document.getElementById('baseDefense');
        if (!container) return;

        const tasks = this.state.tasksCompleted;
        const total = Object.keys(tasks).length;
        const done = Object.values(tasks).filter(v => v).length;
        const health = Math.max(0, 100 - (total - done) * 20);

        // 更新基地血量
        this.state.baseHealth = health;
        this.saveData();

        const plants = ['🌱', '🌿', '🌻', '🍄', '🌷'];
        const zombies = ['🧟', '💀', '🧟‍♂️'];

        let plantsHtml = '';
        let zombiesHtml = '';
        for (let i = 0; i < 5; i++) {
            if (i < done) {
                plantsHtml += `<div class="lawn-cell"><span style="font-size:36px;">${plants[i]}</span></div>`;
            } else {
                plantsHtml += `<div class="lawn-cell" style="opacity:0.3;"><span style="font-size:36px;">${plants[i]}</span></div>`;
            }
            if (i >= done) {
                zombiesHtml += `<div class="lawn-cell"><div class="zombie-character">${zombies[i % zombies.length]}</div></div>`;
            } else {
                zombiesHtml += `<div class="lawn-cell"></div>`;
            }
        }

        container.innerHTML = `
            <div class="battlefield">
                <div class="lawn-row">
                    <div style="display:flex;gap:4px;">${plantsHtml}</div>
                    <div style="display:flex;gap:4px;">${zombiesHtml}</div>
                    <div class="base-shield">🏰
                        <div class="base-health-bar"><div class="base-health-fill" style="width:${health}%;"></div></div>
                    </div>
                </div>
                <div style="text-align:center;margin-top:20px;position:relative;z-index:5;">
                    <div style="color:white;font-size:18px;font-weight:bold;text-shadow:2px 2px 4px rgba(0,0,0,0.3);margin-bottom:8px;">
                        🌻 植物基地保卫战 🌻
                    </div>
                    <div style="color:white;font-size:14px;text-shadow:1px 1px 2px rgba(0,0,0,0.3);">
                        完成 ${done}/${total} 项任务 | 基地血量：${health}%
                    </div>
                    ${done === total ? 
                        '<div style="margin-top:12px;font-size:24px;">🎉 基地保卫成功！所有僵尸被消灭！</div>' : 
                        '<div style="margin-top:12px;font-size:14px;color:white;">⚠️ 还有僵尸在靠近，快完成任务保护基地！</div>'
                    }
                </div>
            </div>
            <div class="stats-grid" style="margin-top:16px;">
                <div class="stat-card">
                    <div class="stat-icon">✅</div>
                    <div class="stat-value">${done}</div>
                    <div class="stat-label">完成任务</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">📊</div>
                    <div class="stat-value">${total}</div>
                    <div class="stat-label">总任务数</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">🏰</div>
                    <div class="stat-value">${health}%</div>
                    <div class="stat-label">基地血量</div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon">☀️</div>
                    <div class="stat-value">${this.state.sun}</div>
                    <div class="stat-label">累计阳光</div>
                </div>
            </div>
        `;
    },

    completeTask(taskName) {
        this.addSun(10, `完成${taskName}任务`);
        this.renderBaseDefense();
        this.showToast(`✅ ${taskName}任务完成！+10阳光`, 'success');
    },

    // ========== 奖励中心 ==========
    renderRewards() {
        const container = document.getElementById('rewardList');
        if (!container) return;
        
        container.innerHTML = REWARD_LIST.map(r => {
            const canClaim = this.state.sun >= r.cost;
            const claimed = this.state.rewardsClaimed.includes(r.id);
            return `
                <div class="reward-card ${canClaim ? '' : 'locked'} ${claimed ? 'unlocked' : ''}">
                    <div class="reward-icon">${r.icon}</div>
                    <div class="reward-name">${r.name}</div>
                    <div style="font-size:13px;color:var(--text-light);margin-bottom:8px;">${r.desc}</div>
                    <div class="reward-cost">☀️ ${r.cost} 阳光</div>
                    ${claimed ? 
                        '<div style="color:var(--success-green);font-weight:bold;">✅ 已领取</div>' :
                        canClaim ?
                        `<button class="btn btn-sun" onclick="App.claimReward(${r.id})">🎉 领取奖励</button>` :
                        `<div style="color:var(--text-light);font-size:13px;">还需 ${r.cost - this.state.sun} 阳光</div>`
                    }
                </div>
            `;
        }).join('');
    },

    claimReward(id) {
        const reward = REWARD_LIST.find(r => r.id === id);
        if (!reward) return;
        
        if (this.spendSun(reward.cost)) {
            this.state.rewardsClaimed.push(id);
            this.saveData();
            this.renderRewards();
            this.showRewardModal(reward);
        } else {
            this.showToast('阳光不够哦！继续努力学习获取更多阳光！', 'warning');
        }
    },

    showRewardModal(reward) {
        const modal = document.getElementById('rewardModal');
        document.getElementById('rewardModalIcon').textContent = reward.icon;
        document.getElementById('rewardModalTitle').textContent = '恭喜获得奖励！';
        document.getElementById('rewardModalMessage').innerHTML = `靖铭获得了：<br><strong style="font-size:22px;color:var(--deep-blue);">${reward.icon} ${reward.name}</strong><br><span style="font-size:14px;color:var(--text-light);">${reward.desc}</span>`;
        modal.classList.add('show');
    },

    // ========== 打卡日历 ==========
    renderCalendar() {
        const container = document.getElementById('calendarGrid');
        if (!container) return;

        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth();
        const today = now.getDate();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();

        const headers = ['日', '一', '二', '三', '四', '五', '六'];
        let html = headers.map(h => `<div class="calendar-header">${h}</div>`).join('');

        // 空白格
        for (let i = 0; i < firstDay; i++) {
            html += '<div class="calendar-day empty"></div>';
        }

        // 日期格
        let checkedCount = 0;
        let missedCount = 0;
        for (let d = 1; d <= daysInMonth; d++) {
            const dateKey = `${year}-${month + 1}-${d}`;
            const isChecked = this.state.checkinDates[dateKey];
            const isToday = d === today;
            const isPast = d < today;
            
            let cls = 'calendar-day';
            if (isChecked) { cls += ' checked'; checkedCount++; }
            else if (isPast && !isChecked) { cls += ' missed'; missedCount++; }
            if (isToday) cls += ' today';
            
            html += `<div class="${cls}" onclick="App.checkin('${dateKey}', ${isPast && !isChecked})">${d}</div>`;
        }

        container.innerHTML = html;

        // 更新月度信息
        document.getElementById('calendarMonth').textContent = `${year}年${month + 1}月`;
        document.getElementById('checkinTotalDays').textContent = checkedCount;
        document.getElementById('checkinMissedDays').textContent = missedCount;
        
        // 全勤计算
        const totalDaysSoFar = today;
        const isFullAttendance = checkedCount === totalDaysSoFar;
        document.getElementById('checkinFullDays').textContent = isFullAttendance ? '✅ 全勤' : `${checkedCount}/${totalDaysSoFar}`;

        // 总结
        const summary = document.getElementById('checkinSummary');
        if (isFullAttendance && checkedCount > 0) {
            summary.innerHTML = '🌟 太棒了！本月保持全勤！靖铭是学习小标兵！';
            summary.style.color = 'var(--success-green)';
        } else if (missedCount > 0) {
            summary.innerHTML = `📅 本月已打卡 ${checkedCount} 天，漏打卡 ${missedCount} 天。继续加油，不要漏打卡哦！`;
            summary.style.color = 'var(--warning-orange)';
        } else {
            summary.innerHTML = '🌱 今天是打卡的第一天，加油！';
            summary.style.color = 'var(--deep-blue)';
        }
    },

    checkin(dateKey, isMissed) {
        if (this.state.checkinDates[dateKey]) {
            this.showToast('今天已经打卡了！', 'warning');
            return;
        }
        this.state.checkinDates[dateKey] = true;
        this.saveData();
        this.addSun(5, '每日打卡');
        this.renderCalendar();
        this.showToast('✅ 打卡成功！+5阳光', 'success');
    },

    // ========== 健身饮食 ==========
    renderHealth() {
        // 食物推荐
        const foodContainer = document.getElementById('foodList');
        if (foodContainer) {
            foodContainer.innerHTML = FOOD_LIST.map(f => `
                <div class="food-card">
                    <div class="food-icon">${f.icon}</div>
                    <div class="food-name">${f.name}</div>
                    <div class="food-desc">${f.desc}</div>
                </div>
            `).join('');
        }

        // 运动推荐
        const exerciseContainer = document.getElementById('exerciseList');
        if (exerciseContainer) {
            exerciseContainer.innerHTML = EXERCISE_LIST.map(e => `
                <div class="exercise-card">
                    <div class="exercise-icon">${e.icon}</div>
                    <div class="exercise-info">
                        <div class="exercise-name">${e.name}</div>
                        <div class="exercise-detail">${e.detail} · ${e.desc}</div>
                    </div>
                    <div class="exercise-duration">${e.duration}</div>
                </div>
            `).join('');
        }
    },

    // ========== 每日英语 ==========
    renderEnglish() {
        const container = document.getElementById('englishList');
        if (!container) return;
        
        container.innerHTML = ENGLISH_DATA.map((e, i) => `
            <div class="english-card" onclick="App.speakEnglish('${e.word}', this)">
                <div class="english-word">${e.word}</div>
                <div class="english-phonetic">${e.phonetic}</div>
                <div class="english-meaning">${e.meaning}</div>
            </div>
        `).join('');
    },

    speakEnglish(word, element) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(word);
            utterance.lang = 'en-US';
            utterance.rate = 0.8;
            speechSynthesis.speak(utterance);
        }
        element.style.animation = 'bounce 0.5s ease';
        setTimeout(() => element.style.animation = '', 500);
        this.addSun(1, `跟读"${word}"`);
        if (!this.state.tasksCompleted.english) {
            this.state.tasksCompleted.english = true;
            this.completeTask('英语');
        }
    },

    // ========== 思维拓展 ==========
    renderPuzzles() {
        const container = document.getElementById('puzzleList');
        if (!container) return;

        container.innerHTML = PUZZLE_DATA.map((p, i) => `
            <div class="puzzle-card">
                <div class="puzzle-title">🧩 第${i + 1}题：${p.title}</div>
                <div class="puzzle-content">${p.content.replace(/\n/g, '<br>')}</div>
                <div class="puzzle-options" id="puzzleOptions${i}">
                    ${p.options.map((opt, j) => 
                        `<div class="puzzle-option" onclick="App.answerPuzzle(${i}, ${j}, this)">${opt}</div>`
                    ).join('')}
                </div>
                <div id="puzzleExplain${i}" style="display:none;margin-top:12px;padding:12px;background:white;border-radius:8px;color:var(--success-green);font-weight:600;"></div>
            </div>
        `).join('');
    },

    answerPuzzle(puzzleIndex, optionIndex, element) {
        const puzzle = PUZZLE_DATA[puzzleIndex];
        const options = document.getElementById(`puzzleOptions${puzzleIndex}`).children;
        const explain = document.getElementById(`puzzleExplain${puzzleIndex}`);

        // 禁用所有选项
        for (let opt of options) {
            opt.style.pointerEvents = 'none';
        }

        if (optionIndex === puzzle.answer) {
            element.classList.add('correct');
            explain.textContent = '✅ ' + puzzle.explanation;
            explain.style.display = 'block';
            this.addSun(3, '思维题答对了！');
        } else {
            element.classList.add('wrong');
            options[puzzle.answer].classList.add('correct');
            explain.textContent = '❌ ' + puzzle.explanation;
            explain.style.display = 'block';
            // 记录错题
            this.addWrongQuestion('思维拓展', `${puzzle.title}: ${puzzle.content.replace(/\n/g, ' ')}`, puzzle.options[puzzle.answer]);
        }
    },

    // ========== 备忘录 ==========
    renderTodos() {
        const container = document.getElementById('todoList');
        if (!container) return;

        const todos = this.state.todos;
        const doneCount = todos.filter(t => t.done).length;
        
        document.getElementById('todoTotal').textContent = todos.length;
        document.getElementById('todoDone').textContent = doneCount;
        document.getElementById('todoPending').textContent = todos.length - doneCount;

        // 进度条
        const progress = todos.length > 0 ? (doneCount / todos.length * 100).toFixed(1) : 0;
        document.getElementById('todoProgress').style.width = progress + '%';

        container.innerHTML = todos.map(t => `
            <div class="todo-item ${t.done ? 'done' : ''}">
                <div class="todo-checkbox ${t.done ? 'checked' : ''}" onclick="App.toggleTodo(${t.id})">
                    ${t.done ? '✓' : ''}
                </div>
                <div class="todo-text">${t.text}</div>
                <span class="todo-category ${t.category}">${
                    t.category === 'supplies' ? '🎒物品' :
                    t.category === 'study' ? '📚学习' : '🌟生活'
                }</span>
                <button class="btn btn-primary" style="padding:4px 8px;font-size:12px;margin-left:8px;" onclick="App.deleteTodo(${t.id})">🗑️</button>
            </div>
        `).join('');
    },

    toggleTodo(id) {
        const todo = this.state.todos.find(t => t.id === id);
        if (todo) {
            todo.done = !todo.done;
            if (todo.done) {
                this.addSun(2, '完成待办事项');
            }
            this.saveData();
            this.renderTodos();
        }
    },

    addTodo() {
        const input = document.getElementById('newTodoInput');
        const categorySelect = document.getElementById('newTodoCategory');
        const text = input.value.trim();
        if (!text) {
            this.showToast('请输入待办内容', 'warning');
            return;
        }
        const newId = Math.max(0, ...this.state.todos.map(t => t.id)) + 1;
        this.state.todos.push({
            id: newId,
            text: text,
            category: categorySelect.value,
            done: false,
        });
        input.value = '';
        this.saveData();
        this.renderTodos();
        this.showToast('已添加待办事项', 'success');
    },

    deleteTodo(id) {
        this.state.todos = this.state.todos.filter(t => t.id !== id);
        this.saveData();
        this.renderTodos();
        this.showToast('已删除', 'success');
    },

    // ========== 工具方法 ==========
    showToast(message, type = '') {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.className = 'toast show ' + type;
        setTimeout(() => {
            toast.className = 'toast ' + type;
        }, 3000);
    },

    closeRewardModal() {
        document.getElementById('rewardModal').classList.remove('show');
    },

    // 飘落叶子动画
    startFloatingLeaves() {
        setInterval(() => {
            const leaf = document.createElement('div');
            leaf.className = 'floating-leaf';
            leaf.textContent = ['🍃', '🌿', '🍂'][Math.floor(Math.random() * 3)];
            leaf.style.left = Math.random() * 100 + '%';
            leaf.style.animationDuration = (6 + Math.random() * 4) + 's';
            document.body.appendChild(leaf);
            setTimeout(() => leaf.remove(), 10000);
        }, 3000);
    },

    // 事件绑定
    bindEvents() {
        // 点击阳光图标收集
        document.getElementById('sunIcon').addEventListener('click', () => {
            this.addSun(1, '收集阳光');
        });

        // 横屏切换按钮
        document.getElementById('landscapeToggle').addEventListener('click', () => {
            this.toggleLandscape();
        });

        // 监听屏幕方向变化
        window.addEventListener('orientationchange', () => {
            setTimeout(() => this.handleOrientation(), 300);
        });
        window.addEventListener('resize', () => {
            this.handleOrientation();
        });

        // 首次加载检查方向
        this.handleOrientation();
    },

    // 横屏切换
    toggleLandscape() {
        // 尝试使用 Fullscreen API + screen orientation API
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        if (isMobile) {
            // 手机端: 尝试触发屏幕方向锁定
            if (screen.orientation && screen.orientation.lock) {
                screen.orientation.lock('landscape').catch(() => {
                    // 如果无法锁定方向，提示用户手动旋转
                    this.showToast('请手动将手机横放 📱↻', 'warning');
                    this.showRotateHint();
                });
            } else {
                this.showToast('请手动将手机横放 📱↻', 'warning');
                this.showRotateHint();
            }
        } else {
            // 电脑端: 切换全屏模式
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {
                    this.showToast('全屏模式被浏览器拒绝', 'warning');
                });
            } else {
                document.exitFullscreen();
            }
        }
    },

    // 处理屏幕方向
    handleOrientation() {
        const isPortrait = window.innerHeight > window.innerWidth;
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        if (isMobile && isPortrait && window.innerWidth < 768) {
            // 竖屏手机，显示旋转提示（首次5秒后消失）
            this.showRotateHint(true);
        } else {
            this.hideRotateHint();
        }
    },

    showRotateHint(autoHide = false) {
        const hint = document.getElementById('rotateHint');
        if (hint) {
            hint.classList.add('show-hint');
            if (autoHide) {
                setTimeout(() => this.hideRotateHint(), 4000);
            }
        }
    },

    hideRotateHint() {
        const hint = document.getElementById('rotateHint');
        if (hint) hint.classList.remove('show-hint');
    },
};

// ========== 启动 ==========
document.addEventListener('DOMContentLoaded', () => {
    App.init();
    
    // 自动打卡今天
    const now = new Date();
    const todayKey = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    if (!App.state.checkinDates[todayKey]) {
        // 提示打卡
        setTimeout(() => {
            App.showToast('记得每天打卡哦！👆', 'warning');
        }, 2000);
    }
});
