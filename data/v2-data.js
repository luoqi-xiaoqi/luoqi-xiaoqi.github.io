// ============================================
// 靖铭学习工作台 v2.0 - 数据文件
// ============================================

// 导航菜单
const NAV_ITEMS = [
    {id:'home', name:'花园', icon:'🌻', color:'#42A5F5'},
    {id:'english', name:'英语', icon:'🗽', color:'#42A5F5'},
    {id:'thinking', name:'思维', icon:'🧠', color:'#42A5F5'},
    {id:'hanzi', name:'识字', icon:'📚', color:'#42A5F5'},
    {id:'habit', name:'习惯', icon:'⭐', color:'#AB47BC'},
    {id:'picturebook', name:'绘本', icon:'📖', color:'#42A5F5'},
    {id:'science', name:'科普', icon:'🔬', color:'#66BB6A'},
    {id:'pet', name:'宠物', icon:'🐱', color:'#42A5F5'},
    {id:'wrong', name:'错题', icon:'📝', color:'#42A5F5'},
];

// 每日科普
const SCIENCE_DATA = [
    {
        icon:'🌈',
        title:'彩虹怎么来的',
        content:'彩虹是阳光穿过雨滴后折射出来的七种颜色，通常在雨后天晴时出现。',
        question:'彩虹是在什么时候出现的？',
        options:['雨后天晴','下雪天','晚上'],
        answer:0,
        tip:'雨后空气中有小水滴，阳光照射后就会形成彩虹。'
    },
    {
        icon:'🌙',
        title:'月亮为什么会发光',
        content:'月亮本身不会发光，它是反射太阳的光，所以我们才能在夜晚看到明亮的月亮。',
        question:'月亮的光是从哪里来的？',
        options:['太阳','月亮自己','星星'],
        answer:0,
        tip:'月亮就像一面大镜子，把太阳的光反射到地球上。'
    },
    {
        icon:'🐝',
        title:'蜜蜂为什么要采蜜',
        content:'蜜蜂采蜜是为了制作蜂蜜，同时也是为了帮助花朵传播花粉，让植物结出果实。',
        question:'蜜蜂采蜜可以帮助什么？',
        options:['花朵传播花粉','让天空变蓝','让小草长大'],
        answer:0,
        tip:'蜜蜂在花朵间飞来飞去，身上会沾上花粉，帮助植物结出果实。'
    },
    {
        icon:'🦒',
        title:'长颈鹿的脖子为什么这么长',
        content:'长颈鹿的长脖子是为了吃到高高的树叶，这样它们就能获得其他动物吃不到的食物。',
        question:'长颈鹿的长脖子用来做什么？',
        options:['吃高处的树叶','游泳','唱歌'],
        answer:0,
        tip:'长颈鹿生活在草原上，长脖子能让它吃到树顶最嫩的叶子。'
    },
    {
        icon:'🍎',
        title:'苹果为什么会从树上掉下来',
        content:'这是因为地球有引力，引力会把所有东西往地面拉，所以成熟的苹果会掉下来。',
        question:'苹果从树上掉下来是因为什么？',
        options:['地球引力','风吹的','苹果太重了'],
        answer:0,
        tip:'地球的引力把我们和东西都拉向地面，所以我们才能站在地上。'
    },
    {
        icon:'🐟',
        title:'鱼为什么能在水里呼吸',
        content:'鱼有鳃，鳃可以从水中吸取氧气。水从鱼嘴里进入，鳃把水过滤后就能吸收氧气了。',
        question:'鱼用什么呼吸？',
        options:['鳃','肺','鼻子'],
        answer:0,
        tip:'鳃就像鱼的呼吸器官，可以让鱼从水中获得氧气。'
    },
    {
        icon:'🌵',
        title:'仙人掌的刺是什么',
        content:'仙人掌的刺其实是它的叶子。仙人掌生活在干旱的沙漠，叶子变成刺可以减少水分蒸发。',
        question:'仙人掌的刺其实是它的什么？',
        options:['叶子','果实','根'],
        answer:0,
        tip:'沙漠里水很少，仙人掌把叶子变成刺，就能减少水分流失。'
    },
    {
        icon:'🐧',
        title:'企鹅为什么不会飞',
        content:'企鹅的翅膀已经进化成适合游泳的鳍状，它们虽然不会飞，但是游泳非常厉害。',
        question:'企鹅擅长做什么？',
        options:['游泳','飞翔','爬树'],
        answer:0,
        tip:'企鹅生活在南极，游泳能帮助它们捕捉鱼虾。'
    },
    {
        icon:'🌋',
        title:'火山为什么会喷发',
        content:'地球内部很热，岩浆在地下不断运动。当压力太大时，岩浆就会从地壳薄弱的地方喷出来。',
        question:'火山喷发时喷出来的是什么？',
        options:['岩浆','水','空气'],
        answer:0,
        tip:'岩浆是高温熔化的岩石，喷出地面后慢慢冷却会形成新的岩石。'
    },
    {
        icon:'🦋',
        title:'蝴蝶是怎么变来的',
        content:'蝴蝶小时候是毛毛虫，毛毛虫会结茧变成蛹，蛹再破壳而出变成美丽的蝴蝶。',
        question:'蝴蝶小时候是什么？',
        options:['毛毛虫','小鸟','小鱼'],
        answer:0,
        tip:'这种变化叫做"变态"，是蝴蝶生长的一个重要过程。'
    },
];

// 好习惯打卡
const HABIT_DATA = [
    {
        id:'brush-teeth',
        icon:'🪥',
        title:'早晚刷牙',
        desc:'每天早晚刷牙，保护牙齿健康',
        subdesc:'每次刷满2分钟，牙齿白白净净',
        items:[
            {id:'morning-brush', icon:'☀️', name:'早上刷牙'},
            {id:'night-brush', icon:'🌙', name:'晚上刷牙'}
        ]
    },
    {
        id:'tidy-toys',
        icon:'🧸',
        title:'整理玩具',
        desc:'玩完玩具要送它们回家',
        subdesc:'分类放好，房间才会整整齐齐',
        items:[
            {id:'tidy-today', icon:'📦', name:'今天整理玩具了吗？'}
        ]
    },
    {
        id:'polite',
        icon:'🙏',
        title:'礼貌用语',
        desc:'今天用礼貌话了吗？',
        subdesc:'早上问好、请、谢谢、对不起、再见',
        items:[
            {id:'polite-today', icon:'🙏', name:'今天用了礼貌话吗？'}
        ]
    },
    {
        id:'drink-water',
        icon:'💧',
        title:'多喝水',
        desc:'每天喝水，身体更健康',
        subdesc:'每天要喝6-8杯水哦',
        items:[
            {id:'water-morning', icon:'🌅', name:'早上喝水'},
            {id:'water-noon', icon:'☀️', name:'中午喝水'},
            {id:'water-night', icon:'🌙', name:'晚上喝水'}
        ]
    },
    {
        id:'read-book',
        icon:'📖',
        title:'阅读打卡',
        desc:'每天阅读20分钟',
        subdesc:'读书让我们变得更聪明',
        items:[
            {id:'read-today', icon:'📚', name:'今天阅读了吗？'}
        ]
    },
    {
        id:'exercise',
        icon:'🏃',
        title:'运动打卡',
        desc:'每天运动1小时',
        subdesc:'跳绳、跑步、拍球都可以',
        items:[
            {id:'exercise-today', icon:'🤸', name:'今天运动了吗？'}
        ]
    },
];

// 绘本故事
const PICTURE_BOOKS = [
    {
        title:'小蝌蚪找妈妈',
        icon:'🐸',
        pages:[
            '池塘里有一群小蝌蚪，大大的脑袋，黑灰色的身子，甩着长长的尾巴，快活地游来游去。',
            '小蝌蚪看见鲤鱼妈妈在教小鲤鱼捕食，就迎上去问："鲤鱼阿姨，我们的妈妈在哪里？"',
            '鲤鱼妈妈说："你们的妈妈四条腿，宽嘴巴。你们到那边去找吧！"',
            '小蝌蚪游啊游，看见一只乌龟摆动着四条腿在水里游，连忙追上去叫："妈妈！妈妈！"',
            '乌龟笑着说："我不是你们的妈妈，你们的妈妈头顶上有两只大眼睛，披着绿衣裳。"',
            '小蝌蚪游过去，看见一只青蛙蹲在荷叶上，披着碧绿的衣裳，露着雪白的肚皮，鼓着一对大眼睛。',
            '小蝌蚪高兴地叫起来："妈妈，妈妈！"青蛙妈妈笑着说："好孩子，你们已经长成青蛙了，快跳上来吧！"'
        ]
    },
    {
        title:'拔萝卜',
        icon:'🥕',
        pages:[
            '老公公种了一个大萝卜。萝卜长大了，老公公去拔萝卜。',
            '老公公拉着萝卜叶子，"嗨哟嗨哟"拔呀拔，拔不动。',
            '老公公叫来了老婆婆。老婆婆拉着老公公，老公公拉着萝卜叶子，"嗨哟嗨哟"拔呀拔，拔不动。',
            '老婆婆叫来了小姑娘。小姑娘拉着老婆婆，老婆婆拉着老公公，老公公拉着萝卜叶子，"嗨哟嗨哟"拔呀拔，拔不动。',
            '小姑娘叫来了小花猫。小花猫拉着小姑娘，小姑娘拉着老婆婆，老婆婆拉着老公公，老公公拉着萝卜叶子，"嗨哟嗨哟"拔呀拔，拔不动。',
            '小花猫叫来了小老鼠。小老鼠拉着小花猫，小花猫拉着小姑娘，小姑娘拉着老婆婆，老婆婆拉着老公公，老公公拉着萝卜叶子。',
            '"嗨哟嗨哟"拔呀拔，大萝卜终于拔出来啦！大家开心地笑了。'
        ]
    },
    {
        title:'三只小猪',
        icon:'🐷',
        pages:[
            '猪妈妈有三只可爱的小猪。有一天，猪妈妈对它们说："你们长大了，自己去盖房子住吧。"',
            '第一只小猪很懒，用稻草很快盖了一间草屋。',
            '第二只小猪也不勤快，用木头搭了一间木屋。',
            '第三只小猪很勤劳，一块砖一块砖地盖了一座结实的砖房。',
            '大野狼来了，它吹了一口气，第一只小猪的草屋就被吹倒了。',
            '大野狼又吹了一口气，第二只小猪的木屋也被吹倒了。',
            '两只小猪赶紧跑到第三只小猪的砖房里。大野狼吹啊吹，砖房一动不动。最后大野狼只好灰溜溜地走了。'
        ]
    },
    {
        title:'乌鸦喝水',
        icon:'🐦',
        pages:[
            '一只乌鸦口渴了，到处找水喝。',
            '乌鸦看见一个瓶子里有水，但是瓶口太小，水又太少，它的嘴伸不进去。',
            '乌鸦想了想，看见旁边有许多小石子。',
            '乌鸦把小石子一颗一颗地放进瓶子里。',
            '瓶子里的水慢慢升高了。',
            '乌鸦高兴地喝到了水。这个故事告诉我们：遇到困难要动脑筋。'
        ]
    },
    {
        title:'龟兔赛跑',
        icon:'🐢',
        pages:[
            '兔子和乌龟比赛跑步。兔子跑得很快，乌龟爬得很慢。',
            '兔子跑了一会儿，回头看见乌龟还在很远的地方，就想："我先睡一会儿再跑也来得及。"',
            '兔子躺在树下睡着了。乌龟一步一步不停地往前爬。',
            '乌龟爬过兔子身边，继续向前爬。',
            '兔子醒来时，发现乌龟已经快爬到终点了。',
            '兔子赶紧跑，可是已经来不及了。乌龟赢得了比赛。'
        ]
    },
    {
        title:'小马过河',
        icon:'🐴',
        pages:[
            '马棚里住着一匹老马和一匹小马。',
            '有一天，老马对小马说："你已经长大了，能帮妈妈做点儿事吗？"小马说："怎么不能？我很愿意帮您。"',
            '老马说："那好啊，你把这半口袋麦子驮到磨坊去吧。"',
            '小马驮起口袋，飞快地往磨坊跑去。跑着跑着，一条小河挡住了去路。',
            '小马看见老牛在河边吃草，问道："牛伯伯，这条河我能蹚过去吗？"老牛说："水很浅哪，刚没小腿，能蹚过去。"',
            '小马听了老牛的话，立刻跑到河边，准备蹚过去。突然，从树上跳下一只松鼠，拦住他大叫："小马！别过河，别过河，河水会淹死你的！"',
            '小马不知道怎么办才好，只好跑回家问妈妈。妈妈说："孩子，光听别人说，自己不动脑筋，不去试试，是不行的。河水是深是浅，你去试一试就会明白了。"',
            '小马跑到河边，小心地蹚了过去。原来河水既不像老牛说的那样浅，也不像松鼠说的那样深。'
        ]
    }
];

// 英语主题数据（一年级）
const ENGLISH_THEMES = [
    {
        id:'seasons',
        title:'四季 Seasons',
        icon:'🌸',
        color:'#81C784',
        words:[
            {word:'spring', cn:'春天', icon:'🌸', sentence:'I like spring. The flowers bloom.'},
            {word:'summer', cn:'夏天', icon:'☀️', sentence:'I like summer. It\'s hot.'},
            {word:'fall', cn:'秋天', icon:'🍁', sentence:'I like fall. The leaves change color.'},
            {word:'winter', cn:'冬天', icon:'❄️', sentence:'I like winter. It\'s cold.'},
        ]
    },
    {
        id:'animals',
        title:'动物 Animals',
        icon:'🦁',
        color:'#FFB74D',
        words:[
            {word:'cat', cn:'猫', icon:'🐱', sentence:'It\'s a cat.'},
            {word:'dog', cn:'狗', icon:'🐶', sentence:'It\'s a dog.'},
            {word:'butterfly', cn:'蝴蝶', icon:'🦋', sentence:'It\'s a butterfly.'},
            {word:'crab', cn:'螃蟹', icon:'🦀', sentence:'It\'s a crab.'},
            {word:'snail', cn:'蜗牛', icon:'🐌', sentence:'It\'s a snail.'},
            {word:'lion', cn:'狮子', icon:'🦁', sentence:'It\'s a lion.'},
            {word:'bird', cn:'鸟', icon:'🐦', sentence:'It\'s a bird.'},
            {word:'fish', cn:'鱼', icon:'🐟', sentence:'It\'s a fish.'},
        ]
    },
    {
        id:'colors',
        title:'颜色 Colors',
        icon:'🎨',
        color:'#F06292',
        words:[
            {word:'red', cn:'红色', icon:'🔴', sentence:'I like red.'},
            {word:'yellow', cn:'黄色', icon:'🟡', sentence:'I like yellow.'},
            {word:'blue', cn:'蓝色', icon:'🔵', sentence:'I like blue.'},
            {word:'green', cn:'绿色', icon:'🟢', sentence:'I like green.'},
            {word:'black', cn:'黑色', icon:'⚫', sentence:'It\'s black.'},
            {word:'white', cn:'白色', icon:'⚪', sentence:'It\'s white.'},
        ]
    },
    {
        id:'body',
        title:'身体 Body',
        icon:'👦',
        color:'#4FC3F7',
        words:[
            {word:'head', cn:'头', icon:'👤', sentence:'This is my head.'},
            {word:'eye', cn:'眼睛', icon:'👁️', sentence:'I have two eyes.'},
            {word:'ear', cn:'耳朵', icon:'👂', sentence:'I have two ears.'},
            {word:'nose', cn:'鼻子', icon:'👃', sentence:'This is my nose.'},
            {word:'mouth', cn:'嘴巴', icon:'👄', sentence:'This is my mouth.'},
            {word:'hand', cn:'手', icon:'✋', sentence:'I have two hands.'},
            {word:'foot', cn:'脚', icon:'🦶', sentence:'I have two feet.'},
        ]
    },
    {
        id:'food',
        title:'食物 Food',
        icon:'🍎',
        color:'#FF8A65',
        words:[
            {word:'apple', cn:'苹果', icon:'🍎', sentence:'I like apples.'},
            {word:'banana', cn:'香蕉', icon:'🍌', sentence:'I like bananas.'},
            {word:'watermelon', cn:'西瓜', icon:'🍉', sentence:'I like watermelons.'},
            {word:'ice cream', cn:'冰淇淋', icon:'🍦', sentence:'I like ice cream.'},
            {word:'bread', cn:'面包', icon:'🍞', sentence:'I like bread.'},
            {word:'milk', cn:'牛奶', icon:'🥛', sentence:'I like milk.'},
        ]
    },
    {
        id:'family',
        title:'家人 Family',
        icon:'👨‍👩‍👧',
        color:'#BA68C8',
        words:[
            {word:'father', cn:'爸爸', icon:'👨', sentence:'He is my father.'},
            {word:'mother', cn:'妈妈', icon:'👩', sentence:'She is my mother.'},
            {word:'brother', cn:'哥哥/弟弟', icon:'👦', sentence:'He is my brother.'},
            {word:'sister', cn:'姐姐/妹妹', icon:'👧', sentence:'She is my sister.'},
            {word:'grandpa', cn:'爷爷', icon:'👴', sentence:'He is my grandpa.'},
            {word:'grandma', cn:'奶奶', icon:'👵', sentence:'She is my grandma.'},
        ]
    },
    {
        id:'numbers',
        title:'数字 Numbers',
        icon:'🔢',
        color:'#4DD0E1',
        words:[
            {word:'one', cn:'一', icon:'1️⃣', sentence:'I am one.'},
            {word:'two', cn:'二', icon:'2️⃣', sentence:'I have two hands.'},
            {word:'three', cn:'三', icon:'3️⃣', sentence:'I see three birds.'},
            {word:'four', cn:'四', icon:'4️⃣', sentence:'I have four books.'},
            {word:'five', cn:'五', icon:'5️⃣', sentence:'I have five fingers.'},
            {word:'ten', cn:'十', icon:'🔟', sentence:'I have ten fingers.'},
        ]
    },
    {
        id:'greetings',
        title:'问候 Greetings',
        icon:'👋',
        color:'#90A4AE',
        words:[
            {word:'hello', cn:'你好', icon:'👋', sentence:'Hello, friend.'},
            {word:'good morning', cn:'早上好', icon:'🌅', sentence:'Good morning!'},
            {word:'goodbye', cn:'再见', icon:'👋', sentence:'Goodbye, mom.'},
            {word:'thank you', cn:'谢谢', icon:'🙏', sentence:'Thank you!'},
            {word:'sorry', cn:'对不起', icon:'😔', sentence:'I am sorry.'},
            {word:'please', cn:'请', icon:'🤲', sentence:'Please help me.'},
        ]
    },
    {
        id:'games',
        title:'游戏 Games',
        icon:'✊',
        color:'#FFD54F',
        words:[
            {word:'rock', cn:'石头', icon:'✊', sentence:'Rock, scissors, paper!'},
            {word:'scissors', cn:'剪刀', icon:'✌️', sentence:'Rock, scissors, paper!'},
            {word:'paper', cn:'布', icon:'✋', sentence:'Rock, scissors, paper!'},
        ]
    },
    {
        id:'actions',
        title:'动作 Actions',
        icon:'🏃',
        color:'#A1887F',
        words:[
            {word:'run', cn:'跑', icon:'🏃', sentence:'I can run.'},
            {word:'jump', cn:'跳', icon:'🦘', sentence:'I can jump.'},
            {word:'swim', cn:'游泳', icon:'🏊', sentence:'I can swim.'},
            {word:'fly a kite', cn:'放风筝', icon:'🪁', sentence:'I like to fly a kite.'},
            {word:'make a snowman', cn:'堆雪人', icon:'⛄', sentence:'I like to make a snowman.'},
        ]
    },
];

// 电子宠物数据
const PET_DATA = {
    name:'咪咪',
    emoji:'🐱',
    level:1,
    hunger:80,
    happiness:80,
    energy:80,
    cleanliness:80,
    growth:0,
};

// 电子宠物动作/食物
const PET_ACTIONS = [
    {id:'feed', name:'喂食', icon:'🍖', effect:{hunger:20, happiness:5, energy:5}},
    {id:'play', name:'玩耍', icon:'🎾', effect:{happiness:20, hunger:-10, energy:-10}},
    {id:'sleep', name:'睡觉', icon:'🛏️', effect:{energy:30, hunger:-5, happiness:5}},
    {id:'bath', name:'洗澡', icon:'🛁', effect:{cleanliness:30, happiness:5}},
    {id:'pet', name:'抚摸', icon:'👋', effect:{happiness:15, energy:5}},
];

// 汉字学习（保留原有）
const HANZI_LIST = [
    {char:'天',pinyin:'tiān',meaning:'天空',day:1},{char:'地',pinyin:'dì',meaning:'大地',day:1},{char:'人',pinyin:'rén',meaning:'人类',day:1},{char:'口',pinyin:'kǒu',meaning:'嘴巴',day:1},{char:'手',pinyin:'shǒu',meaning:'手掌',day:1},
    {char:'目',pinyin:'mù',meaning:'眼睛',day:1},{char:'日',pinyin:'rì',meaning:'太阳',day:1},{char:'月',pinyin:'yuè',meaning:'月亮',day:1},{char:'水',pinyin:'shuǐ',meaning:'清水',day:1},{char:'火',pinyin:'huǒ',meaning:'火焰',day:1},
    {char:'山',pinyin:'shān',meaning:'高山',day:1},{char:'石',pinyin:'shí',meaning:'石头',day:1},{char:'田',pinyin:'tián',meaning:'田地',day:1},{char:'木',pinyin:'mù',meaning:'树木',day:1},{char:'禾',pinyin:'hé',meaning:'禾苗',day:1},
    {char:'上',pinyin:'shàng',meaning:'上方',day:1},{char:'下',pinyin:'xià',meaning:'下方',day:1},{char:'大',pinyin:'dà',meaning:'大小',day:1},{char:'小',pinyin:'xiǎo',meaning:'小大',day:1},{char:'多',pinyin:'duō',meaning:'多少',day:1},
    {char:'少',pinyin:'shǎo',meaning:'少量',day:1},{char:'中',pinyin:'zhōng',meaning:'中间',day:1},{char:'左',pinyin:'zuǒ',meaning:'左边',day:1},{char:'右',pinyin:'yòu',meaning:'右边',day:1},{char:'土',pinyin:'tǔ',meaning:'泥土',day:1},
    {char:'一',pinyin:'yī',meaning:'数字一',day:2},{char:'二',pinyin:'èr',meaning:'数字二',day:2},{char:'三',pinyin:'sān',meaning:'数字三',day:2},{char:'四',pinyin:'sì',meaning:'数字四',day:2},{char:'五',pinyin:'wǔ',meaning:'数字五',day:2},
    {char:'六',pinyin:'liù',meaning:'数字六',day:2},{char:'七',pinyin:'qī',meaning:'数字七',day:2},{char:'八',pinyin:'bā',meaning:'数字八',day:2},{char:'九',pinyin:'jiǔ',meaning:'数字九',day:2},{char:'十',pinyin:'shí',meaning:'数字十',day:2},
    {char:'百',pinyin:'bǎi',meaning:'百数',day:2},{char:'千',pinyin:'qiān',meaning:'千数',day:2},{char:'万',pinyin:'wàn',meaning:'万数',day:2},{char:'个',pinyin:'gè',meaning:'个体',day:2},{char:'只',pinyin:'zhī',meaning:'量词',day:2},
    {char:'条',pinyin:'tiáo',meaning:'量词',day:2},{char:'本',pinyin:'běn',meaning:'书本',day:2},{char:'头',pinyin:'tóu',meaning:'头部',day:2},{char:'长',pinyin:'cháng',meaning:'长短',day:2},{char:'白',pinyin:'bái',meaning:'白色',day:2},
    {char:'黑',pinyin:'hēi',meaning:'黑色',day:2},{char:'红',pinyin:'hóng',meaning:'红色',day:2},{char:'绿',pinyin:'lǜ',meaning:'绿色',day:2},{char:'黄',pinyin:'huáng',meaning:'黄色',day:2},{char:'蓝',pinyin:'lán',meaning:'蓝色',day:2},
    {char:'你',pinyin:'nǐ',meaning:'你们',day:3},{char:'我',pinyin:'wǒ',meaning:'我们',day:3},{char:'他',pinyin:'tā',meaning:'他们',day:3},{char:'她',pinyin:'tā',meaning:'她们',day:3},{char:'它',pinyin:'tā',meaning:'它们',day:3},
    {char:'们',pinyin:'men',meaning:'复数',day:3},{char:'好',pinyin:'hǎo',meaning:'好坏',day:3},{char:'不',pinyin:'bù',meaning:'不是',day:3},{char:'了',pinyin:'le',meaning:'助词',day:3},{char:'的',pinyin:'de',meaning:'助词',day:3},
    {char:'在',pinyin:'zài',meaning:'存在',day:3},{char:'有',pinyin:'yǒu',meaning:'拥有',day:3},{char:'是',pinyin:'shì',meaning:'是的',day:3},{char:'说',pinyin:'shuō',meaning:'说话',day:3},{char:'看',pinyin:'kàn',meaning:'看见',day:3},
    {char:'听',pinyin:'tīng',meaning:'听见',day:3},{char:'去',pinyin:'qù',meaning:'去了',day:3},{char:'来',pinyin:'lái',meaning:'来了',day:3},{char:'走',pinyin:'zǒu',meaning:'走路',day:3},{char:'跑',pinyin:'pǎo',meaning:'跑步',day:3},
    {char:'吃',pinyin:'chī',meaning:'吃饭',day:3},{char:'喝',pinyin:'hē',meaning:'喝水',day:3},{char:'做',pinyin:'zuò',meaning:'做事',day:3},{char:'写',pinyin:'xiě',meaning:'写字',day:3},{char:'读',pinyin:'dú',meaning:'读书',day:3},
];

// 数学练习（保留原有）
const MATH_TYPES = {
    addition:'10以内加法',
    subtraction:'10以内减法',
    add100:'100以内加法',
    sub100:'100以内减法',
    mul99:'99乘法表',
    div99:'简单除法',
    mul2:'两位数乘一位数',
};

// 拼音（保留原有，复韵母重点）
const PINYIN_DATA = {
    声母: ['b','p','m','f','d','t','n','l','g','k','h','j','q','x','zh','ch','sh','r','z','c','s','y','w'],
    单韵母: ['a','o','e','i','u','ü'],
    复韵母: [
        {pinyin:'ai',example:'白 bái',tip:'a+i'},{pinyin:'ei',example:'飞 fēi',tip:'e+i'},
        {pinyin:'ui',example:'水 shuǐ',tip:'u+ei'},{pinyin:'ao',example:'猫 māo',tip:'a+o'},
        {pinyin:'ou',example:'狗 gǒu',tip:'o+u'},{pinyin:'iu',example:'牛 niú',tip:'i+ou'},
        {pinyin:'ie',example:'月 yuè',tip:'i+e'},{pinyin:'üe',example:'雪 xuě',tip:'ü+e'},
        {pinyin:'er',example:'耳 ěr',tip:'特殊韵母'},
    ],
    鼻韵母: [
        {pinyin:'an',example:'山 shān',tip:'前鼻音'},{pinyin:'en',example:'门 mén',tip:'前鼻音'},
        {pinyin:'in',example:'金 jīn',tip:'前鼻音'},{pinyin:'un',example:'春 chūn',tip:'前鼻音'},
        {pinyin:'ün',example:'云 yún',tip:'前鼻音'},{pinyin:'ang',example:'羊 yáng',tip:'后鼻音'},
        {pinyin:'eng',example:'风 fēng',tip:'后鼻音'},{pinyin:'ing',example:'星 xīng',tip:'后鼻音'},
        {pinyin:'ong',example:'虫 chóng',tip:'后鼻音'},
    ],
};

// 思维题（保留并扩展）
const PUZZLE_DATA = [
    {title:'找不同',content:'🍎 香蕉 🍎 苹果 🍎 橘子 🍎 白菜',options:['香蕉','苹果','橘子','白菜'],answer:3,explanation:'白菜是蔬菜，其他都是水果！'},
    {title:'找规律',content:'找规律填数字：1, 3, 5, 7, ?',options:['8','9','10','11'],answer:1,explanation:'每次加2，所以是7+2=9！'},
    {title:'逻辑推理',content:'小明比小红高，小红比小丽高，谁最高？',options:['小明','小红','小丽','一样高'],answer:0,explanation:'小明 > 小红 > 小丽，小明最高！'},
    {title:'图形数数',content:'一个正方形有几条边？',options:['3条','4条','5条','6条'],answer:1,explanation:'正方形有4条相等的边！'},
    {title:'生活常识',content:'下面哪个是早上的问候语？',options:['晚安','早上好','再见','你好吗'],answer:1,explanation:'"早上好"是早晨的问候语！'},
    {title:'分类思考',content:'哪个不是交通工具？',options:['汽车','飞机','轮船','冰箱'],answer:3,explanation:'冰箱是家用电器，不是交通工具！'},
    {title:'简单计算',content:'小明有5个苹果，吃了2个，还剩几个？',options:['2','3','4','5'],answer:1,explanation:'5-2=3，还剩3个！'},
    {title:'找规律',content:'2, 4, 6, 8, ?',options:['9','10','11','12'],answer:1,explanation:'每次加2，8+2=10！'},
    {title:'时间认知',content:'一天有多少小时？',options:['12','24','36','48'],answer:1,explanation:'一天有24小时！'},
    {title:'反义词',content:'"大"的反义词是什么？',options:['高','小','长','多'],answer:1,explanation:'大的反义词是小！'},
];

// 奖励清单
const REWARD_LIST = [
    {id:1,name:'吃冰淇淋',cost:30,icon:'🍦',desc:'清凉一夏'},
    {id:2,name:'看电视半小时',cost:50,icon:'📺',desc:'精彩动画时间'},
    {id:3,name:'买个小玩具',cost:150,icon:'🧸',desc:'挑选喜欢的玩具'},
    {id:4,name:'去游乐场玩',cost:300,icon:'🎢',desc:'开心游乐场'},
];

// 健身饮食
const FOOD_LIST = [
    {name:'牛奶',icon:'🥛',desc:'每天一杯，补钙长高'},
    {name:'鸡蛋',icon:'🥚',desc:'优质蛋白，营养全面'},
    {name:'鱼肉',icon:'🐟',desc:'DHA丰富，聪明长高'},
    {name:'豆腐',icon:'🧈',desc:'植物蛋白，易消化'},
    {name:'胡萝卜',icon:'🥕',desc:'维生素A，护眼长高'},
    {name:'菠菜',icon:'🥬',desc:'铁元素丰富，补血长高'},
    {name:'香蕉',icon:'🍌',desc:'钾元素多，骨骼健康'},
    {name:'虾皮',icon:'🦐',desc:'含钙量高，补钙佳品'},
];

const EXERCISE_LIST = [
    {name:'跳绳',icon:'🤸',detail:'每天跳200-300下',duration:'15分钟',desc:'促进骨骼生长'},
    {name:'摸高跳',icon:'⬆️',detail:'每天50次摸高',duration:'10分钟',desc:'拉伸脊柱'},
    {name:'游泳',icon:'🏊',detail:'每周2-3次',duration:'30分钟',desc:'全身运动'},
    {name:'打篮球',icon:'🏀',detail:'每周2-3次',duration:'30分钟',desc:'跳跃助长'},
    {name:'伸展运动',icon:'🧘',detail:'早晚各做一次',duration:'10分钟',desc:'舒展筋骨'},
    {name:'骑自行车',icon:'🚴',detail:'户外骑行',duration:'20分钟',desc:'锻炼腿部'},
];

// 备忘录
const TODO_PRESETS = [
    {text:'准备书包',category:'supplies',done:false},
    {text:'准备文具盒和铅笔',category:'supplies',done:false},
    {text:'准备水杯',category:'supplies',done:false},
    {text:'准备校服和运动鞋',category:'supplies',done:false},
    {text:'学习拼音复韵母',category:'study',done:false},
    {text:'每天读一本绘本',category:'study',done:false},
    {text:'练习10以内加减法',category:'study',done:false},
    {text:'练习99乘法表',category:'study',done:false},
    {text:'每天阅读20分钟',category:'study',done:false},
    {text:'练习写字',category:'study',done:false},
    {text:'调整作息时间',category:'life',done:false},
    {text:'准备红领巾',category:'supplies',done:false},
];
