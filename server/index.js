const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// 中间件
app.use(cors());
app.use(express.json());

// 模拟数据库
const db = {
  users: [],
  checkIns: [],
  journeys: [],
  emotions: []
};

// AI 叙事引擎 API
app.post('/api/ai/generate-route', (req, res) => {
  const { emotionType, answers } = req.body;
  
  // 根据情绪类型生成个性化路线
  const routes = {
    anxious: {
      name: '宁静心灵之路',
      description: '专为缓解焦虑设计，通过古建筑的静谧和自然的疗愈，帮助您找回内心的平静',
      color: 'from-emerald-500 to-teal-500',
      stops: [
        {
          id: 1,
          name: '福安古井',
          type: 'landmark',
          duration: '15 分钟',
          description: '在百年古井旁聆听水的故事，感受时间的静谧流淌',
          activity: '静坐冥想，聆听井水声',
          emotion: '平静'
        },
        {
          id: 2,
          name: '瓦猫工坊',
          type: 'craft',
          duration: '40 分钟',
          description: '亲手绘制瓦猫，在专注中释放焦虑，感受守护的力量',
          activity: '绘制心理一颗印瓦猫',
          emotion: '专注'
        },
        {
          id: 3,
          name: '心灵庭院',
          type: 'nature',
          duration: '30 分钟',
          description: '在古朴庭院中品茶闻香，与自然对话',
          activity: '茶道体验，心灵日记',
          emotion: '安宁'
        }
      ]
    },
    tired: {
      name: '活力焕发之路',
      description: '为疲惫的身心注入活力，通过互动体验和创造性活动重获能量',
      color: 'from-amber-500 to-orange-500',
      stops: [
        {
          id: 1,
          name: '刺绣坊',
          type: 'craft',
          duration: '45 分钟',
          description: '学习传统刺绣技艺，在针线间找到专注与成就',
          activity: '制作个性化刺绣小品',
          emotion: '成就'
        },
        {
          id: 2,
          name: '古村落广场',
          type: 'social',
          duration: '30 分钟',
          description: '与当地手艺人交流，感受人情温暖',
          activity: '互动问答，故事分享',
          emotion: '连接'
        },
        {
          id: 3,
          name: '阳光露台',
          type: 'nature',
          duration: '25 分钟',
          description: '在露台上俯瞰全村，感受开阔与自由',
          activity: '自由创作，摄影记录',
          emotion: '自由'
        }
      ]
    },
    balanced: {
      name: '文化探索之路',
      description: '深度体验村落文化底蕴，在历史与艺术的熏陶中获得心灵满足',
      color: 'from-purple-500 to-indigo-500',
      stops: [
        {
          id: 1,
          name: '百年祠堂',
          type: 'landmark',
          duration: '35 分钟',
          description: '了解家族历史，感受文化传承的力量',
          activity: '聆听祠堂故事，拓印家训',
          emotion: '敬畏'
        },
        {
          id: 2,
          name: '非遗展示馆',
          type: 'culture',
          duration: '50 分钟',
          description: '沉浸式体验多项非遗技艺',
          activity: '选择一项技艺深度学习',
          emotion: '好奇'
        },
        {
          id: 3,
          name: '古戏台',
          type: 'performance',
          duration: '40 分钟',
          description: '欣赏传统戏曲表演，感受艺术魅力',
          activity: '观看表演，学习基础唱腔',
          emotion: '愉悦'
        }
      ]
    }
  };

  const route = routes[emotionType] || routes.balanced;
  
  // 保存旅程记录
  const journey = {
    id: Date.now(),
    emotionType,
    answers,
    route,
    createdAt: new Date().toISOString()
  };
  db.journeys.push(journey);

  res.json({
    success: true,
    data: route,
    journeyId: journey.id
  });
});

// AI 情感分析 API
app.post('/api/ai/analyze-emotion', (req, res) => {
  const { text, voiceNote } = req.body;
  
  // 模拟情感分析
  const emotions = ['peaceful', 'joyful', 'touched', 'inspired', 'nostalgic', 'focused'];
  const analysis = {
    primaryEmotion: emotions[Math.floor(Math.random() * emotions.length)],
    confidence: 0.85 + Math.random() * 0.15,
    keywords: ['平静', '专注', '感动'],
    sentiment: 'positive'
  };

  db.emotions.push({
    id: Date.now(),
    text,
    analysis,
    createdAt: new Date().toISOString()
  });

  res.json({
    success: true,
    data: analysis
  });
});

// AI 生成诗歌 API
app.post('/api/ai/generate-poem', (req, res) => {
  const { checkIns, journeyData } = req.body;
  
  const poems = [
    `古井旁的沉思
瓦猫守护着心灵的印迹
一针一线，绣出内心的宁静
时光在此刻，凝固成诗

庭院深深，茶香袅袅
百年的故事在耳边低语
我听见了自己的心跳
与这片土地，产生了共鸣`,

    `阳光穿过屋檐的缝隙
照亮了尘封的记忆
指尖触碰古老的砖瓦
仿佛穿越了时空的隧道

刺绣坊里的专注
古戏台上的欢歌
每一个瞬间都是疗愈
每一次感动都是成长`,

    `从焦虑到平静
从迷茫到清晰
这条路上，有瓦猫的守护
有古井的智慧，有刺绣的细腻

心，在这里找到了归宿
灵魂，在这里得到了安放
乡叙心域，不仅是一次旅行
更是一场与自己的对话`
  ];

  const poem = poems[Math.floor(Math.random() * poems.length)];

  res.json({
    success: true,
    data: {
      poem,
      title: '心路影像诗',
      generatedAt: new Date().toISOString()
    }
  });
});

// AI 数字人对话 API
app.post('/api/ai/chat', (req, res) => {
  const { message, emotion, context } = req.body;
  
  const responses = [
    {
      keywords: ['紧张', '焦虑', '压力'],
      responses: [
        '我能感受到您的紧张。来，深呼吸~ 看着眼前的古建筑，它们已经静静伫立了数百年，见证了多少故事。让我们放慢脚步，一起感受这份宁静好吗？',
        '焦虑的时候，不妨试试专注于当下。您看那边的瓦猫，它守护了这个家几百年，总是那么从容。我们也可以像它一样，找到内心的安定。'
      ],
      emotion: 'calm'
    },
    {
      keywords: ['美丽', '好看', '喜欢'],
      responses: [
        '是呀！福安村的每一处风景都蕴含着故事。您知道吗？这些建筑不仅仅是砖瓦，更是先辈们智慧的结晶。我很开心您能感受到这份美~',
        '您的欣赏让这片土地更有意义了呢！美，需要被发现，更需要被感受。您有一双善于发现美的眼睛哦~'
      ],
      emotion: 'happy'
    },
    {
      keywords: ['历史', '故事', '文化'],
      responses: [
        '说到历史，福安村已经有 600 多年了呢！每一块青石板都记录着岁月的痕迹。您现在站的地方，曾经有多少先人走过，想过多少故事...',
        '文化就像一条河流，从过去流向现在。您此刻的体验，也是在续写这条河的故事呢。想知道更多福安村的故事吗？'
      ],
      emotion: 'thoughtful'
    }
  ];

  let bestResponse = {
    content: '我在听，您继续说~ 这里的每一处风景都值得细细品味，每一段感受都值得被珍藏。',
    emotion: 'attentive'
  };

  for (const item of responses) {
    if (item.keywords.some(keyword => message.includes(keyword))) {
      bestResponse = {
        content: item.responses[Math.floor(Math.random() * item.responses.length)],
        emotion: item.emotion
      };
      break;
    }
  }

  res.json({
    success: true,
    data: {
      response: bestResponse.content,
      emotion: bestResponse.emotion,
      timestamp: new Date().toISOString()
    }
  });
});

// 保存打卡记录 API
app.post('/api/checkin', (req, res) => {
  const { stopId, stopName, photo, voiceNote, textNote, emotion } = req.body;
  
  const checkIn = {
    id: Date.now(),
    stopId,
    stopName,
    photo,
    voiceNote,
    textNote,
    emotion,
    timestamp: new Date().toISOString()
  };
  
  db.checkIns.push(checkIn);
  
  res.json({
    success: true,
    data: checkIn
  });
});

// 获取打卡记录 API
app.get('/api/checkins', (req, res) => {
  res.json({
    success: true,
    data: db.checkIns
  });
});

// 获取所有旅程记录 API
app.get('/api/journeys', (req, res) => {
  res.json({
    success: true,
    data: db.journeys
  });
});

// 获取所有情感分析记录 API
app.get('/api/emotions', (req, res) => {
  res.json({
    success: true,
    data: db.emotions
  });
});

// 获取仪表盘统计数据 API
app.get('/api/stats', (req, res) => {
  const totalJourneys = db.journeys.length;
  const totalCheckIns = db.checkIns.length;
  const totalEmotions = db.emotions.length;
  
  // 简单统计情绪分布
  const emotionCounts = {};
  db.emotions.forEach(e => {
    const primary = e.analysis.primaryEmotion;
    emotionCounts[primary] = (emotionCounts[primary] || 0) + 1;
  });

  res.json({
    success: true,
    data: {
      totalJourneys,
      totalCheckIns,
      totalEmotions,
      emotionCounts
    }
  });
});

// 健康检查
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: '乡叙心域 API 服务运行正常',
    timestamp: new Date().toISOString()
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 乡叙心域 API 服务器运行在 http://localhost:${PORT}`);
  console.log(`📍 健康检查：http://localhost:${PORT}/api/health`);
});
