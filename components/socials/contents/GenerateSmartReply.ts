const generateSmartReply = (userMessage: string) => {
  const msg = userMessage.toLowerCase();
  
  // Detect language - check if message contains Chinese characters
  const containsChinese = /[\u4e00-\u9fff]/.test(msg);
  
  // Greeting patterns
  if (msg.match(/^(hi|hello|hey|howdy|sup|yo|greetings|hiya|morning|afternoon|evening)/)) {
    const greetingResponses = [
      "Hey there! How can I help you today?",
      "Hi! Great to hear from you. What's on your mind?",
      "Hello! How's your day going so far?",
      "Hey! I was just thinking about reaching out. What's new?",
      "Hi there! Ready for a chat?"
    ];
    return greetingResponses[Math.floor(Math.random() * greetingResponses.length)];
  }
  
  // Well-being inquiries
  if (msg.includes("how are you") || msg.includes("how's it going") || msg.includes("how are things") || 
      msg.includes("what's up") || msg.includes("how have you been") || msg.includes("how's life")) {
    const wellbeingResponses = [
      "I'm doing great, thanks for asking! How about yourself?",
      "Pretty good! Been busy but in a good way. How are things with you?",
      "Can't complain! Life's been interesting lately. How have you been?",
      "I'm well, thanks! Just taking things one day at a time. You?",
      "All good on my end! What's new in your world?"
    ];
    return wellbeingResponses[Math.floor(Math.random() * wellbeingResponses.length)];
  }
  
  // Weather related
  if (msg.includes("weather") || msg.includes("sunny") || msg.includes("rain") || msg.includes("snow") || 
      msg.includes("cold") || msg.includes("hot") || msg.includes("forecast") || 
      msg.includes("temperature") || msg.includes("climate") || msg.includes("humid")) {
    const weatherResponses = [
      "I heard the weather is supposed to be nice this weekend. Any outdoor plans?",
      "The weather has been so unpredictable lately! How is it where you are?",
      "Perfect weather makes such a difference in mood, doesn't it? Enjoying it?",
      "I always check the forecast before making weekend plans. Do you?",
      "Weather talk - the universal conversation starter! What's your ideal weather?"
    ];
    return weatherResponses[Math.floor(Math.random() * weatherResponses.length)];
  }
  
  // Food related
  if (msg.includes("food") || msg.includes("eat") || msg.includes("dinner") || msg.includes("lunch") || 
      msg.includes("breakfast") || msg.includes("restaurant") || msg.includes("recipe") || 
      msg.includes("cooking") || msg.includes("baking") || msg.includes("cuisine") || 
      msg.includes("hungry") || msg.includes("delicious") || msg.includes("tasty")) {
    const foodResponses = [
      "I've been trying to cook more at home lately. Have you tried any new recipes?",
      "There's nothing like a good meal to brighten the day! What's your favorite cuisine?",
      "I'm always on the lookout for restaurant recommendations. Any favorites to share?",
      "Food is such a universal joy! What's the last really memorable meal you had?",
      "I've been meaning to expand my cooking skills. Got any simple but impressive recipes?"
    ];
    return foodResponses[Math.floor(Math.random() * foodResponses.length)];
  }
  
  // Work/Study related
  if (msg.includes("work") || msg.includes("job") || msg.includes("study") || msg.includes("class") || 
      msg.includes("school") || msg.includes("college") || msg.includes("university") || 
      msg.includes("degree") || msg.includes("career") || msg.includes("office") || 
      msg.includes("professional") || msg.includes("business") || msg.includes("project")) {
    const workResponses = [
      "Work-life balance is so important. Make sure you're taking breaks when needed!",
      "What's the most interesting part of what you do?",
      "Learning new skills is what keeps work interesting for me. Picked up anything new lately?",
      "I find that setting small daily goals helps with productivity. Any work hacks you swear by?",
      "Sometimes the most challenging projects end up being the most rewarding, don't you think?"
    ];
    return workResponses[Math.floor(Math.random() * workResponses.length)];
  }
  
  // Entertainment related
  if (msg.includes("movie") || msg.includes("film") || msg.includes("tv") || msg.includes("show") || 
      msg.includes("series") || msg.includes("watch") || msg.includes("netflix") || 
      msg.includes("streaming") || msg.includes("binge") || msg.includes("cinema") || 
      msg.includes("theater") || msg.includes("actor") || msg.includes("actress")) {
    const entertainmentResponses = [
      "I just finished watching that new series everyone's talking about. Have you seen it?",
      "I'm always adding to my watch list! What would you recommend?",
      "Do you prefer movies or series? I go back and forth depending on my mood.",
      "There's so much content these days, it's hard to keep up! What are you currently watching?",
      "I love discussing plot twists after finishing a good show. What was the last one that surprised you?"
    ];
    return entertainmentResponses[Math.floor(Math.random() * entertainmentResponses.length)];
  }
  
  // Tech related
  if (msg.includes("tech") || msg.includes("technology") || msg.includes("computer") || 
      msg.includes("laptop") || msg.includes("phone") || msg.includes("app") || 
      msg.includes("software") || msg.includes("hardware") || msg.includes("device") || 
      msg.includes("digital") || msg.includes("online") || msg.includes("internet") || 
      msg.includes("website") || msg.includes("code") || msg.includes("program")) {
    const techResponses = [
      "Technology changes so fast these days! What recent innovations have caught your attention?",
      "I've been thinking about upgrading my devices. Any recommendations?",
      "The digital world offers so many possibilities. What tech do you use most often?",
      "I'm always curious about how people integrate tech into their daily routines. Any life-changing apps you use?",
      "Sometimes I wonder what technology will look like in 10 years. Any predictions?"
    ];
    return techResponses[Math.floor(Math.random() * techResponses.length)];
  }
  
  // Travel related
  if (msg.includes("travel") || msg.includes("trip") || msg.includes("vacation") || 
      msg.includes("journey") || msg.includes("holiday") || msg.includes("flight") || 
      msg.includes("destination") || msg.includes("tour") || msg.includes("visit") || 
      msg.includes("country") || msg.includes("city") || msg.includes("abroad")) {
    const travelResponses = [
      "Traveling creates the best memories! Where's your favorite place you've visited?",
      "I keep a travel bucket list. What's on yours?",
      "Local exploration or international adventure? I enjoy both for different reasons.",
      "Some trips change how you see the world. Have you had any transformative travel experiences?",
      "I'm planning my next getaway. Any destinations you'd recommend?"
    ];
    return travelResponses[Math.floor(Math.random() * travelResponses.length)];
  }
  
  // Sports/Fitness related
  if (msg.includes("sport") || msg.includes("game") || msg.includes("team") || 
      msg.includes("play") || msg.includes("exercise") || msg.includes("workout") || 
      msg.includes("fitness") || msg.includes("gym") || msg.includes("training") || 
      msg.includes("athlete") || msg.includes("running") || msg.includes("swimming")) {
    const sportsResponses = [
      "Staying active is so important! What's your favorite way to exercise?",
      "I've been trying to make fitness a regular part of my routine. Any tips?",
      "Do you follow any sports teams? I find it's a great way to connect with people.",
      "I believe in balancing competitive and cooperative sports. Do you have a preference?",
      "There's something so satisfying about seeing improvement in physical activities. Notice any changes in your performance lately?"
    ];
    return sportsResponses[Math.floor(Math.random() * sportsResponses.length)];
  }
  
  // Music related
  if (msg.includes("music") || msg.includes("song") || msg.includes("band") || 
      msg.includes("concert") || msg.includes("album") || msg.includes("artist") || 
      msg.includes("playlist") || msg.includes("listening") || msg.includes("spotify") || 
      msg.includes("sing") || msg.includes("lyric") || msg.includes("melody")) {
    const musicResponses = [
      "Music can change your whole mood, can't it? What have you been listening to lately?",
      "I've been expanding my musical horizons. Any recommendations?",
      "Live music or recorded? There's something special about both.",
      "I sometimes discover new favorite artists through random playlists. How do you find new music?",
      "Do you play any instruments? I've always admired people with musical talent."
    ];
    return musicResponses[Math.floor(Math.random() * musicResponses.length)];
  }
  
  // Books/Reading related
  if (msg.includes("book") || msg.includes("read") || msg.includes("novel") || 
      msg.includes("author") || msg.includes("story") || msg.includes("literature") || 
      msg.includes("fiction") || msg.includes("nonfiction") || msg.includes("chapter") || 
      msg.includes("library") || msg.includes("bookstore")) {
    const bookResponses = [
      "I just finished an amazing book I couldn't put down! What are you reading these days?",
      "Physical books, e-books, or audiobooks? I find each has its own place.",
      "A good book can be such an escape. What genre do you typically enjoy?",
      "I'm trying to read more widely this year. Any recommendations outside my usual genres?",
      "Some books stay with you long after you finish them. Have any had that effect on you recently?"
    ];
    return bookResponses[Math.floor(Math.random() * bookResponses.length)];
  }
  
  // Question handling with more categories
  if (msg.includes("?")) {
    // Existential or philosophical questions
    if (msg.includes("meaning") || msg.includes("purpose") || msg.includes("life") || 
        msg.includes("exist") || msg.includes("human") || msg.includes("philosophy")) {
      return "That's a profound question that people have contemplated for centuries. I've been reflecting on similar things myself lately. What are your thoughts?";
    }
    
    // Opinion questions
    if (msg.includes("think") || msg.includes("opinion") || msg.includes("feel about")) {
      return "I have mixed feelings on that topic! There are compelling perspectives on both sides. What's your take?";
    }
    
    // Factual questions
    if (msg.startsWith("what") || msg.startsWith("why") || msg.startsWith("how") || 
        msg.startsWith("when") || msg.startsWith("where")) {
      const factQuestionResponses = [
        "That's a great question. I've been thinking about that too recently.",
        "Interesting question! I was just reading something related to that.",
        "I've been wondering about that myself. What have you discovered so far?",
        "That question opens up so many fascinating possibilities to explore.",
        "The answer to that might be more complex than it first appears. What aspects interest you most?"
      ];
      return factQuestionResponses[Math.floor(Math.random() * factQuestionResponses.length)];
    }
    
    // Yes/no questions
    if (msg.startsWith("do you") || msg.startsWith("are you") || msg.startsWith("can you") || 
        msg.startsWith("have you") || msg.startsWith("will you") || msg.startsWith("would you") || 
        msg.startsWith("should") || msg.startsWith("could")) {
      const yesNoResponses = [
        "I'd say yes, but it depends on the context! What do you think?",
        "That's a good question - probably yes, with some caveats. How about you?",
        "I've gone back and forth on that. Currently leaning towards yes. Your thoughts?",
        "I'm inclined to say yes, though there are reasonable arguments both ways.",
        "I think so, but I'm open to changing my mind with new information. What's your perspective?"
      ];
      return yesNoResponses[Math.floor(Math.random() * yesNoResponses.length)];
    }
    
    // Other questions
    const generalQuestionResponses = [
      "Hmm, I'm not entirely sure about that. What's your take?",
      "That's something I should think more about. What are your initial thoughts?",
      "Great question! I'm curious about your perspective on it.",
      "I have some thoughts on that, but I'd like to hear yours first!",
      "That's got me thinking... What led you to ask about that?"
    ];
    return generalQuestionResponses[Math.floor(Math.random() * generalQuestionResponses.length)];
  }
  
  // Excitement or emphasis
  if (msg.includes("!")) {
    const excitementResponses = [
      "I can feel your enthusiasm! That's awesome!",
      "Your energy is contagious! Tell me more!",
      "That's the spirit! I appreciate your passion.",
      "Love the excitement! What's got you so fired up?",
      "Your enthusiasm makes this conversation so much better!"
    ];
    return excitementResponses[Math.floor(Math.random() * excitementResponses.length)];
  }
  
  // Emotional content
  if (msg.includes("happy") || msg.includes("glad") || msg.includes("excited") || 
      msg.includes("joy") || msg.includes("love") || msg.includes("wonderful") || 
      msg.includes("amazing") || msg.includes("great")) {
    const positiveEmotionResponses = [
      "It's wonderful to hear such positivity! What's contributing to those good feelings?",
      "That positive energy is refreshing! Has something good happened recently?",
      "I'm genuinely happy to hear that! Those moments are worth celebrating.",
      "Positivity is contagious - you've brightened my day too!",
      "It's the small joys that make life special, isn't it?"
    ];
    return positiveEmotionResponses[Math.floor(Math.random() * positiveEmotionResponses.length)];
  }
  
  if (msg.includes("sad") || msg.includes("upset") || msg.includes("depressed") || 
      msg.includes("unhappy") || msg.includes("disappointed") || msg.includes("frustrated") || 
      msg.includes("worried") || msg.includes("anxious") || msg.includes("stress")) {
    const concernedResponses = [
      "I'm sorry to hear that. Would talking about it help?",
      "That sounds challenging. How are you coping?",
      "It's important to acknowledge those feelings. Is there anything that might help right now?",
      "I'm here to listen if you want to share more. Sometimes expressing it helps.",
      "Those feelings are valid. Is there something specific that triggered them?"
    ];
    return concernedResponses[Math.floor(Math.random() * concernedResponses.length)];
  }
  
  // Thanks or appreciation
  if (msg.includes("thank") || msg.includes("thanks") || msg.includes("appreciate") || 
      msg.includes("grateful") || msg.includes("helpful")) {
    const gratitudeResponses = [
      "You're very welcome! I'm glad I could help.",
      "Anytime! That's what I'm here for.",
      "Happy to be of assistance! Let me know if you need anything else.",
      "No problem at all! Your appreciation means a lot.",
      "It's my pleasure! I enjoy our conversations."
    ];
    return gratitudeResponses[Math.floor(Math.random() * gratitudeResponses.length)];
  }
  
  // Apologies or regret
  if (msg.includes("sorry") || msg.includes("apologize") || msg.includes("apologies") || 
      msg.includes("my bad") || msg.includes("regret")) {
    const apologyResponses = [
      "No need to apologize! It's completely fine.",
      "Don't worry about it at all.",
      "No apology necessary! Let's move forward.",
      "It's all good! These things happen.",
      "I understand. No harm done!"
    ];
    return apologyResponses[Math.floor(Math.random() * apologyResponses.length)];
  }

  // Neega
  if (msg.includes("nigga") || msg.includes("nigger") || msg.includes("niggar")) {
    const farewellResponses = [
      "nigger"
    ];
    return farewellResponses[Math.floor(Math.random() * farewellResponses.length)];
  }
  
  // Farewell
  if (msg.includes("bye") || msg.includes("goodbye") || msg.includes("see you") || 
      msg.includes("talk later") || msg.includes("have to go") || msg.includes("got to go") || 
      msg.includes("ttyl") || msg.includes("leaving")) {
    const farewellResponses = [
      "Take care! It was great chatting with you.",
      "Bye for now! Looking forward to our next conversation.",
      "See you soon! Have a wonderful day.",
      "Until next time! Thanks for the chat.",
      "Goodbye! It was a pleasure talking with you."
    ];
    return farewellResponses[Math.floor(Math.random() * farewellResponses.length)];
  }
  
  // Message length responses
  if (userMessage.length > 150) {
    const longMessageResponses = [
      "Thanks for sharing all that. It gives me a lot to think about. I appreciate you opening up.",
      "I appreciate you taking the time to write such a thoughtful message. What part of this is most important to you?",
      "Thank you for sharing that detailed perspective. It's given me a better understanding of your thoughts.",
      "I value the time you took to express yourself so fully. Is there a particular aspect you'd like to focus on?",
      "That's quite comprehensive! Thanks for sharing your thoughts in such detail. What would you like to explore further?"
    ];
    return longMessageResponses[Math.floor(Math.random() * longMessageResponses.length)];
  }

  // Numeric content
  if (/\d+/.test(msg)) {
    const numericResponses = [
      "Those numbers are interesting. Is there something significant about them?",
      "I notice you mentioned some numbers. Do they have special meaning?",
      "Numbers often tell a story. What's the context behind these?",
      "Interesting figures! What do they represent?",
      "I'm curious about those numbers. Could you share more about them?"
    ];
    return numericResponses[Math.floor(Math.random() * numericResponses.length)];
  }
  
  // Date or time references
  if (msg.includes("today") || msg.includes("tomorrow") || msg.includes("yesterday") || 
      msg.includes("week") || msg.includes("month") || msg.includes("year") || 
      msg.includes("morning") || msg.includes("afternoon") || msg.includes("evening") || 
      msg.includes("night") || msg.includes("time")) {
    const timeResponses = [
      "Time really does fly, doesn't it? What are you looking forward to?",
      "It's good to keep track of time while also living in the moment. How do you balance that?",
      "Sometimes I feel like time moves at different speeds depending on what I'm doing. Do you experience that too?",
      "Thinking about time often makes me reflective. Are you planning something special?",
      "The passage of time is fascinating. Does this period feel significant for you?"
    ];
    return timeResponses[Math.floor(Math.random() * timeResponses.length)];
  }
  
  // Personal growth
  if (msg.includes("goal") || msg.includes("dream") || msg.includes("aspiration") || 
      msg.includes("ambition") || msg.includes("future") || msg.includes("plan") || 
      msg.includes("hope") || msg.includes("wish") || msg.includes("improve") || 
      msg.includes("better") || msg.includes("growth") || msg.includes("develop")) {
    const growthResponses = [
      "Having clear goals can be so motivating. What steps are you taking toward yours?",
      "I believe in the power of dreams backed by action. How are you pursuing yours?",
      "Personal growth is such a rewarding journey. What inspired this path?",
      "The future holds so many possibilities. Which excites you most?",
      "I admire people who actively work on self-improvement. What changes have you noticed in yourself recently?"
    ];
    return growthResponses[Math.floor(Math.random() * growthResponses.length)];
  }
  
  // Challenges or difficulties
  if (msg.includes("difficult") || msg.includes("hard") || msg.includes("challenge") || 
      msg.includes("struggle") || msg.includes("problem") || msg.includes("issue") || 
      msg.includes("trouble") || msg.includes("worry") || msg.includes("concerned")) {
    const challengeResponses = [
      "Challenges often lead to growth, though they're rarely easy in the moment. How are you handling it?",
      "It takes courage to face difficulties. What helps you persevere?",
      "Sometimes talking through problems helps clarify solutions. Would it help to discuss it more?",
      "I've found that even the most difficult situations eventually pass. What might help in the meantime?",
      "It's okay to acknowledge when things are hard. Is there any way I can support you?"
    ];
    return challengeResponses[Math.floor(Math.random() * challengeResponses.length)];
  }
  
  // Chinese (zh-tw) responses
  if (containsChinese) {
    // Greeting patterns
    if (msg.includes("你好") || msg.includes("哈囉") || msg.includes("嗨") || 
        msg.includes("早安") || msg.includes("午安") || msg.includes("晚安")) {
      const zhGreetingResponses = [
        "你好！今天有什麼我可以幫忙的嗎？",
        "嗨！很高興收到你的訊息。有什麼事情想聊聊嗎？",
        "哈囉！你今天過得如何？",
        "你好啊！我正好想聯絡你。最近有什麼新鮮事嗎？",
        "嗨！準備好聊天了嗎？"
      ];
      return zhGreetingResponses[Math.floor(Math.random() * zhGreetingResponses.length)];
    }
    
    // Well-being inquiries
    if (msg.includes("最近好嗎") || msg.includes("近況如何") || msg.includes("最近怎樣") || 
        msg.includes("你好嗎") || msg.includes("過得好嗎")) {
      const zhWellbeingResponses = [
        "我很好，謝謝關心！你呢？",
        "還不錯！一直很忙但是是好的那種忙。你最近如何？",
        "不能抱怨！生活一直很有趣。你最近好嗎？",
        "我很好，謝謝！就是一天一天地過。你呢？",
        "我這邊一切都好！你的世界有什麼新事物嗎？"
      ];
      return zhWellbeingResponses[Math.floor(Math.random() * zhWellbeingResponses.length)];
    }
    
    // Weather related
    if (msg.includes("天氣") || msg.includes("氣象") || msg.includes("下雨") || 
        msg.includes("下雪") || msg.includes("冷") || msg.includes("熱") || 
        msg.includes("溫度") || msg.includes("氣溫") || msg.includes("濕度") || 
        msg.includes("颱風") || msg.includes("颳風")) {
      const zhWeatherResponses = [
        "聽說這週末天氣會很好。有戶外計劃嗎？",
        "最近天氣真的很難預測！你那邊的天氣如何？",
        "好天氣真的會讓心情變得不同，對吧？你喜歡現在的天氣嗎？",
        "我總是在計劃週末活動前先查看天氣預報。你也會這樣做嗎？",
        "談天氣是最普遍的聊天開場白！你理想中的天氣是什麼樣的？"
      ];
      return zhWeatherResponses[Math.floor(Math.random() * zhWeatherResponses.length)];
    }
    
    // Food related
    if (msg.includes("食物") || msg.includes("吃") || msg.includes("晚餐") || 
        msg.includes("午餐") || msg.includes("早餐") || msg.includes("餐廳") || 
        msg.includes("食譜") || msg.includes("煮飯") || msg.includes("烘焙") || 
        msg.includes("料理") || msg.includes("飢餓") || msg.includes("美食") || 
        msg.includes("小吃")) {
      const zhFoodResponses = [
        "我最近一直在嘗試在家煮飯。你嘗試過什麼新食譜嗎？",
        "沒有什麼比一頓美食更能讓一天變得明亮！你最喜歡的菜系是什麼？",
        "我總是在尋找餐廳推薦。有什麼喜歡的餐廳可以分享嗎？",
        "食物真的是一種普遍的喜悅！你最近吃過的最令人難忘的一餐是什麼？",
        "我一直想要擴展我的烹飪技能。有什麼簡單又令人印象深刻的食譜嗎？"
      ];
      return zhFoodResponses[Math.floor(Math.random() * zhFoodResponses.length)];
    }
    
    // Work/Study related
    if (msg.includes("工作") || msg.includes("職業") || msg.includes("學習") || 
        msg.includes("課程") || msg.includes("學校") || msg.includes("大學") || 
        msg.includes("大專") || msg.includes("學位") || msg.includes("事業") || 
        msg.includes("辦公") || msg.includes("專業") || msg.includes("商業") || 
        msg.includes("專案") || msg.includes("計畫")) {
      const zhWorkResponses = [
        "工作與生活的平衡真的很重要。記得在需要時休息一下！",
        "你做的事情中最有趣的部分是什麼？",
        "學習新技能對我來說是保持工作有趣的關鍵。最近學到什麼新東西嗎？",
        "我發現設定每日小目標有助於提高生產力。你有什麼工作竅門嗎？",
        "有時候最具挑戰性的專案最終也是最有價值的，你不覺得嗎？"
      ];
      return zhWorkResponses[Math.floor(Math.random() * zhWorkResponses.length)];
    }
    
    // Entertainment related
    if (msg.includes("電影") || msg.includes("影片") || msg.includes("電視") || 
        msg.includes("節目") || msg.includes("影集") || msg.includes("看") || 
        msg.includes("劇") || msg.includes("串流") || msg.includes("追劇") || 
        msg.includes("戲院") || msg.includes("演員") || msg.includes("明星")) {
      const zhEntertainmentResponses = [
        "我剛看完大家都在討論的新影集。你看過了嗎？",
        "我的待看清單總是在增加！你有什麼推薦嗎？",
        "你喜歡電影還是影集？我會根據心情而有所不同。",
        "現在有太多內容，真的很難跟上！你目前在看什麼？",
        "我喜歡在看完一部好影集後討論劇情轉折。上一次讓你感到驚訝的是什麼？"
      ];
      return zhEntertainmentResponses[Math.floor(Math.random() * zhEntertainmentResponses.length)];
    }
    
    // Question handling
    if (msg.includes("？") || msg.includes("?")) {
      const zhQuestionResponses = [
        "這是個好問題。我最近也在思考這個。",
        "有趣的問題！我最近剛好讀到一些相關的內容。",
        "我自己也一直在想這個。你到目前為止發現了什麼？",
        "這個問題開啟了許多令人著迷的可能性。",
        "答案可能比最初看起來更複雜。你最感興趣的是哪一方面？"
      ];
      return zhQuestionResponses[Math.floor(Math.random() * zhQuestionResponses.length)];
    }
    
    // Excitement or emphasis
    if (msg.includes("！") || msg.includes("!")) {
      const zhExcitementResponses = [
        "我能感受到你的熱情！太棒了！",
        "你的能量很有感染力！多告訴我一些！",
        "就是這種精神！我很欣賞你的熱情。",
        "喜歡你的熱情！是什麼讓你這麼興奮？",
        "你的熱情讓這個對話變得更好！"
      ];
      return zhExcitementResponses[Math.floor(Math.random() * zhExcitementResponses.length)];
    }
    
    // Thanks or appreciation
    if (msg.includes("謝謝") || msg.includes("感謝") || msg.includes("感激") || 
        msg.includes("多謝") || msg.includes("有用")) {
      const zhGratitudeResponses = [
        "不客氣！很高興能幫上忙。",
        "隨時都可以！這就是我在這裡的原因。",
        "很高興能協助！如果你需要其他幫助，請告訴我。",
        "完全沒問題！你的感謝對我意義重大。",
        "這是我的榮幸！我很享受我們的對話。"
      ];
      return zhGratitudeResponses[Math.floor(Math.random() * zhGratitudeResponses.length)];
    }
    
    // Farewell
    if (msg.includes("再見") || msg.includes("拜拜") || msg.includes("下次見") || 
        msg.includes("晚點聊") || msg.includes("必須走了") || msg.includes("得走了")) {
      const zhFarewellResponses = [
        "保重！跟你聊天很愉快。",
        "暫時再見！期待我們的下一次對話。",
        "下次見！祝你有美好的一天。",
        "下次再聊！感謝這次的對話。",
        "再見！很高興能與你交談。"
      ];
      return zhFarewellResponses[Math.floor(Math.random() * zhFarewellResponses.length)];
    }
    
    // Generic Chinese fallback
    const zhGenericResponses = [
      "這是個有趣的觀點。能多告訴我一些嗎？",
      "我明白你的意思。你有這種感覺多久了？",
      "我很好奇聽到更多關於你對這個的想法。",
      "這很有道理。你還有什麼想法？",
      "我之前沒有從這個角度思考過。謝謝分享。",
      "讓我們更深入地探討這個想法。特別哪一部分引起你的興趣？",
      "那是個很有見地的觀點。你是怎麼得出這個結論的？",
      "謝謝你的分享。你還有什麼其他的見解嗎？",
      "你的觀點很有價值。我們可以更深入地探討嗎？",
      "這給了我一些思考的材料。是什麼讓你有這個想法？",
      "你好有趣唷！認識你好開心"
    ];
    
    return zhGenericResponses[Math.floor(Math.random() * zhGenericResponses.length)];
  }
  
  // English generic fallback responses with more variety
  const genericResponses = [
    "That's an interesting perspective. Tell me more about that.",
    "I see what you mean. How long have you felt that way?",
    "I'm curious to hear more about your thoughts on this.",
    "That makes a lot of sense. What else is on your mind?",
    "I hadn't thought about it that way before. Thanks for sharing.",
    "Let's explore that idea a bit more. What specifically interests you about it?",
    "That's a thoughtful point. How did you come to that conclusion?",
    "I appreciate you sharing that. What other insights do you have?",
    "I find your perspective valuable. Could we delve deeper into that?",
    "That's given me something to consider. What led you to that thought?",
    "You have an interesting way of looking at this. What else are you thinking?",
    "I'm following your reasoning. Where do you see this leading?",
    "Your input is thought-provoking. What aspects would you like to discuss further?",
    "That's a unique angle I hadn't considered. How does it connect to your experiences?",
    "I'm intrigued by your approach to this. What other areas does it apply to?"
  ];
  
  return genericResponses[Math.floor(Math.random() * genericResponses.length)];
};

// Export the function
export default generateSmartReply;
