export const CATEGORIES = [
  { id: 'career', icon: 'Briefcase', color: 'navy', label: { en: 'Career', ar: 'المهنة' } },
  { id: 'relationships', icon: 'Heart', color: 'coral', label: { en: 'Relationships', ar: 'العلاقات' } },
  { id: 'education', icon: 'GraduationCap', color: 'violet', label: { en: 'Education', ar: 'التعليم' } },
  { id: 'moving', icon: 'Compass', color: 'teal', label: { en: 'Moving / Relocation', ar: 'الانتقال / السكن' } },
  { id: 'money', icon: 'PiggyBank', color: 'amber', label: { en: 'Money', ar: 'المال' } },
  { id: 'business', icon: 'Rocket', color: 'navy', label: { en: 'Business', ar: 'الأعمال' } },
  { id: 'health', icon: 'Leaf', color: 'teal', label: { en: 'Health & Lifestyle', ar: 'الصحة ونمط الحياة' } },
  { id: 'growth', icon: 'Sprout', color: 'violet', label: { en: 'Personal Growth', ar: 'النمو الشخصي' } },
  { id: 'other', icon: 'Sparkles', color: 'amber', label: { en: 'Other', ar: 'أخرى' } },
]

export function getCategories(lang = 'en') {
  return CATEGORIES.map((c) => ({ ...c, label: c.label[lang] || c.label.en }))
}

export const EXAMPLE_DECISIONS = [
  { en: 'Should I quit my job?', ar: 'هل أترك وظيفتي؟' },
  { en: 'Should I move to another country?', ar: 'هل أنتقل إلى بلد آخر؟' },
  { en: 'Should I start my own business?', ar: 'هل أبدأ مشروعي الخاص؟' },
  { en: 'Should I change my major?', ar: 'هل أغيّر تخصصي؟' },
  { en: 'Should I accept this job offer?', ar: 'هل أقبل عرض العمل هذا؟' },
  { en: 'Should I move in with my partner?', ar: 'هل أنتقل للعيش مع شريكي؟' },
]

export function getExampleDecisions(lang = 'en') {
  return EXAMPLE_DECISIONS.map((e) => e[lang] || e.en)
}

export const PRIORITY_BANK = [
  { en: 'Financial stability', ar: 'الاستقرار المالي' },
  { en: 'Career growth', ar: 'النمو المهني' },
  { en: 'Freedom', ar: 'الحرية' },
  { en: 'Family', ar: 'العائلة' },
  { en: 'Happiness', ar: 'السعادة' },
  { en: 'Security', ar: 'الأمان' },
  { en: 'Time', ar: 'الوقت' },
  { en: 'Learning', ar: 'التعلّم' },
  { en: 'Relationships', ar: 'العلاقات' },
  { en: 'Location', ar: 'الموقع' },
  { en: 'Health', ar: 'الصحة' },
  { en: 'Meaning', ar: 'المعنى' },
]

export function getPriorityBank(lang = 'en') {
  return PRIORITY_BANK.map((p) => p[lang] || p.en)
}

// Heuristic "missing information" question bank, keyed by category, plus generic fallbacks.
export const MISSING_INFO_BANK = {
  career: [
    { q: { en: 'What is the job market like for your role right now?', ar: 'كيف هو سوق العمل لمجالك الآن؟' }, why: { en: 'Your options look different if roles like yours are scarce or abundant.', ar: 'خياراتك تختلف إذا كانت الوظائف المشابهة لوظيفتك نادرة أو وفيرة.' }, next: { en: 'Spend 20 minutes browsing current listings and note how many feel realistic.', ar: 'اقضِ ٢٠ دقيقة في تصفح الإعلانات الحالية ولاحظ عدد ما يبدو واقعيًا منها.' } },
    { q: { en: 'What would your finances look like in a worst-case timeline?', ar: 'كيف ستبدو أموالك في أسوأ سيناريو زمني؟' }, why: { en: 'Runway changes how much risk you can safely take on.', ar: 'مدى استمراريتك المالية يغيّر مقدار المخاطرة التي يمكنك تحمّلها بأمان.' }, next: { en: 'Write down your monthly expenses and how many months you could cover them.', ar: 'اكتب مصاريفك الشهرية وعدد الأشهر التي يمكنك تغطيتها.' } },
    { q: { en: 'Have you talked to someone who has made a similar move?', ar: 'هل تحدثت مع شخص قام بخطوة مشابهة؟' }, why: { en: "Secondhand experience can surface risks you haven't considered.", ar: 'تجربة شخص آخر قد تكشف مخاطر لم تفكر بها.' }, next: { en: 'Message one person who has done something similar and ask what surprised them.', ar: 'راسل شخصًا فعل شيئًا مشابهًا واسأله عمّا فاجأه.' } },
  ],
  relationships: [
    { q: { en: 'Have you both said, plainly, what you each expect?', ar: 'هل قال كلاكما بوضوح ما يتوقعه؟' }, why: { en: 'Assumptions about a relationship are the easiest ones to get wrong.', ar: 'الافتراضات حول العلاقة هي الأسهل في أن تكون خاطئة.' }, next: { en: 'Have one direct conversation about expectations before deciding.', ar: 'أجرِ محادثة مباشرة واحدة حول التوقعات قبل أن تقرر.' } },
    { q: { en: 'What happens to your independence in each scenario?', ar: 'ماذا يحدث لاستقلاليتك في كل سيناريو؟' }, why: { en: 'This decision reshapes daily life, not just a feeling.', ar: 'هذا القرار يعيد تشكيل حياتك اليومية، وليس مجرد شعور.' }, next: { en: 'List what stays yours alone in each option.', ar: 'اكتب ما سيبقى خاصًا بك وحدك في كل خيار.' } },
  ],
  education: [
    { q: { en: 'What does the job or path actually look like after this program?', ar: 'كيف تبدو الوظيفة أو المسار فعليًا بعد هذا البرنامج؟' }, why: { en: 'The value of education is mostly in what it opens up next.', ar: 'قيمة التعليم تكمن غالبًا فيما يفتحه لاحقًا.' }, next: { en: 'Find two people who finished this path and see where they landed.', ar: 'ابحث عن شخصين أنهيا هذا المسار وانظر أين وصلا.' } },
    { q: { en: 'What would this cost you — in money and time?', ar: 'كم سيكلفك هذا — من المال والوقت؟' }, why: { en: "Costs compound quietly if they're not written down early.", ar: 'التكاليف تتراكم بصمت إن لم تُكتب مبكرًا.' }, next: { en: 'Add up tuition, lost income, and time realistically.', ar: 'اجمع الرسوم الدراسية، والدخل المفقود، والوقت بواقعية.' } },
  ],
  moving: [
    { q: { en: 'How much would your monthly cost of living change?', ar: 'كم سيتغير تكلفة معيشتك الشهرية؟' }, why: { en: 'Moving decisions often hinge on numbers people never actually calculate.', ar: 'قرارات الانتقال غالبًا ما تعتمد على أرقام لا يحسبها الناس فعليًا.' }, next: { en: 'Compare rent, transport, and essentials between both places.', ar: 'قارن الإيجار والمواصلات والضروريات بين المكانين.' } },
    { q: { en: 'Have you spent real time there, not just visited?', ar: 'هل قضيت وقتًا حقيقيًا هناك، لا مجرد زيارة؟' }, why: { en: 'A short visit and a lived week can feel very different.', ar: 'الزيارة القصيرة وأسبوع معايشة فعلي قد يشعران بشكل مختلف تمامًا.' }, next: { en: 'If possible, plan a longer trial stay before committing.', ar: 'إن أمكن، خطط لإقامة تجريبية أطول قبل الالتزام.' } },
  ],
  money: [
    { q: { en: "What is your realistic downside if this doesn't work out?", ar: 'ما هو الجانب السلبي الواقعي إن لم ينجح هذا؟' }, why: { en: 'Money decisions are easier once the floor is visible.', ar: 'قرارات المال تصبح أسهل بمجرد أن يتضح الحد الأدنى.' }, next: { en: 'Write the worst realistic number down and sit with it for a day.', ar: 'اكتب أسوأ رقم واقعي واجلس معه ليوم كامل.' } },
    { q: { en: 'Have you modeled this with real numbers, not estimates?', ar: 'هل نمذجت هذا بأرقام حقيقية لا تقديرات؟' }, why: { en: 'Vague numbers hide both risk and opportunity.', ar: 'الأرقام الغامضة تُخفي المخاطر والفرص معًا.' }, next: { en: 'Build a simple spreadsheet with your actual figures.', ar: 'أنشئ جدول بيانات بسيطًا بأرقامك الفعلية.' } },
  ],
  business: [
    { q: { en: 'Who have you validated this idea with outside your own head?', ar: 'مع من تحققت من هذه الفكرة خارج رأسك؟' }, why: { en: 'Ideas feel different once someone outside your circle reacts to them.', ar: 'الأفكار تبدو مختلفة بمجرد أن يتفاعل معها شخص خارج دائرتك.' }, next: { en: 'Talk to five potential customers this week.', ar: 'تحدث مع خمسة عملاء محتملين هذا الأسبوع.' } },
    { q: { en: 'What happens to your income while you build this?', ar: 'ماذا يحدث لدخلك أثناء بنائك لهذا؟' }, why: { en: 'Most business decisions are really runway decisions.', ar: 'معظم قرارات الأعمال هي في الحقيقة قرارات مدى مالي.' }, next: { en: 'Calculate how long you can sustain zero or low income.', ar: 'احسب كم يمكنك الاستمرار بدخل منخفض أو معدوم.' } },
  ],
  health: [
    { q: { en: 'What does a professional say, if this involves your body or mind?', ar: 'ماذا يقول مختص، إن كان هذا يتعلق بجسدك أو عقلك؟' }, why: { en: "Personal research is useful, but it isn't a substitute for expertise.", ar: 'البحث الشخصي مفيد، لكنه ليس بديلاً عن الخبرة المتخصصة.' }, next: { en: 'Book one appointment with someone qualified before deciding.', ar: 'احجز موعدًا واحدًا مع مختص مؤهل قبل أن تقرر.' } },
    { q: { en: 'What would this look like if you tried it for 30 days first?', ar: 'كيف سيبدو الأمر لو جربته لمدة ٣٠ يومًا أولاً؟' }, why: { en: 'Lifestyle decisions are easier to judge once tested briefly.', ar: 'قرارات نمط الحياة يسهل الحكم عليها بعد تجربة قصيرة.' }, next: { en: 'Set a 30-day trial version of this change.', ar: 'ضع نسخة تجريبية من هذا التغيير لمدة ٣٠ يومًا.' } },
  ],
  growth: [
    { q: { en: 'What does "success" actually look like here, specifically?', ar: 'كيف يبدو "النجاح" هنا فعليًا وبالتحديد؟' }, why: { en: 'Growth decisions stall when the goal stays abstract.', ar: 'قرارات النمو تتوقف عندما يبقى الهدف مجردًا.' }, next: { en: 'Write one concrete sentence describing what success looks like.', ar: 'اكتب جملة واحدة محددة تصف كيف يبدو النجاح.' } },
    { q: { en: 'What have you tried before, and why did it stop?', ar: 'ماذا جربت من قبل، ولماذا توقفت؟' }, why: { en: 'Your own history is data you already have.', ar: 'تاريخك الشخصي هو بيانات تملكها بالفعل.' }, next: { en: 'List two past attempts and what interrupted them.', ar: 'اذكر محاولتين سابقتين وما الذي قاطعهما.' } },
  ],
  other: [
    { q: { en: 'What happens if you simply wait three more months?', ar: 'ماذا يحدث إن انتظرت ثلاثة أشهر إضافية فقط؟' }, why: { en: 'Urgency is sometimes assumed rather than real.', ar: 'الإلحاح أحيانًا يكون مفترضًا لا حقيقيًا.' }, next: { en: 'Write down the actual cost of waiting.', ar: 'اكتب التكلفة الفعلية للانتظار.' } },
  ],
}

export const GENERIC_MISSING_INFO = [
  { q: { en: 'What happens if you change your mind later?', ar: 'ماذا يحدث إن غيّرت رأيك لاحقًا؟' }, why: { en: 'Reversibility changes how much a decision should weigh on you.', ar: 'إمكانية التراجع تغيّر مقدار الثقل الذي يجب أن يحمله القرار.' }, next: { en: 'Note whether this choice can be undone, and how easily.', ar: 'حدد إن كان يمكن التراجع عن هذا الخيار، ومدى سهولة ذلك.' } },
  { q: { en: "Who do you trust that you haven't asked yet?", ar: 'من الذي تثق به ولم تسأله بعد؟' }, why: { en: 'An outside perspective often reveals a blind spot.', ar: 'وجهة نظر خارجية غالبًا ما تكشف نقطة عمياء.' }, next: { en: 'Ask one trusted person what they notice that you might be missing.', ar: 'اسأل شخصًا موثوقًا عمّا يلاحظه وقد يكون غائبًا عنك.' } },
  { q: { en: 'What would you tell a friend in your exact position?', ar: 'ماذا كنت ستقول لصديق في موقفك بالضبط؟' }, why: { en: "We're often clearer about other people's decisions than our own.", ar: 'غالبًا ما نكون أكثر وضوحًا بشأن قرارات الآخرين من قراراتنا.' }, next: { en: "Write two sentences of advice as if this were someone else's decision.", ar: 'اكتب جملتي نصيحة وكأن هذا قرار شخص آخر.' } },
]
