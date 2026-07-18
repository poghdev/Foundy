export type Locale = 'en' | 'hy' | 'ru'

interface CardCopy {
  title: string
  text: string
}

interface LocaleContent {
  skip: string
  menu: { open: string; close: string }
  nav: { problem: string; how: string; audience: string; safety: string; join: string }
  headerCta: string
  hero: {
    badge: string
    title: string
    subtitle: string
    primary: string
    secondary: string
    origin: string
    trust: string[]
    profile: string
    developer: string
    activeProjects: string
    completedTasks: string
    mentorReviews: string
    verifiedSkills: string
    latest: string
    contribution: string
    passport: string
    profileComplete: string
  }
  problem: { eyebrow: string; title: string; text: string; cards: CardCopy[]; summary: string }
  ecosystem: { eyebrow: string; title: string; text: string; groups: CardCopy[]; node: string }
  how: { eyebrow: string; title: string; text: string; steps: CardCopy[] }
  experience: {
    eyebrow: string
    title: string
    text: string
    passport: string
    holder: string
    role: string
    verified: string
    metrics: Array<{ label: string; value: string }>
    features: string[]
    evidence: string
    evidenceText: string
  }
  ai: { eyebrow: string; title: string; text: string; helps: string; develops: string; helpItems: string[]; realItems: string[] }
  safety: { eyebrow: string; title: string; text: string; principles: CardCopy[]; note: string; noteLabel: string }
  armenia: { eyebrow: string; title: string; text: string; directions: string[]; statement: string }
  pilot: { eyebrow: string; title: string; text: string; target: string; metrics: Array<{ value: string; label: string }> }
  waitlist: {
    eyebrow: string
    title: string
    text: string
    name: string
    email: string
    age: string
    role: string
    message: string
    optional: string
    choose: string
    ageOptions: string[]
    roleOptions: string[]
    consent: string
    submit: string
    demo: string
    success: string
    duplicate: string
    storageError: string
  }
  faq: { eyebrow: string; title: string; items: CardCopy[] }
  final: { title: string; primary: string; secondary: string }
  footer: { tagline: string; privacy: string; terms: string; copyright: string; origin: string }
}

export const localeLabels: Record<Locale, string> = {
  en: 'EN',
  hy: 'ՀԱՅ',
  ru: 'RU',
}

export const localeNames: Record<Locale, string> = {
  en: 'English',
  hy: 'Հայերեն',
  ru: 'Русский',
}

export const content: Record<Locale, LocaleContent> = {
  en: {
    skip: 'Skip to main content',
    menu: { open: 'Open navigation menu', close: 'Close navigation menu' },
    nav: { problem: 'Problem', how: 'How it works', audience: 'For whom', safety: 'Safety', join: 'Join' },
    headerCta: 'Join Foundy',
    hero: {
      badge: 'A new path into real work',
      title: 'կատարելագործիր և կատարելագործվիր',
      subtitle: 'Foundy connects young talent, founders and mentors to build real products, work in teams and turn contribution into verified experience.',
      primary: 'Join the early community',
      secondary: 'Explore how it works',
      origin: 'Starting in Armenia. Built for the world.',
      trust: ['Real projects', 'Verified contribution', 'Mentor support'],
      profile: 'Aram M.',
      developer: 'Backend Developer',
      activeProjects: 'active projects',
      completedTasks: 'completed tasks',
      mentorReviews: 'mentor reviews',
      verifiedSkills: 'Verified skills',
      latest: 'Latest contribution',
      contribution: 'Built the authentication flow for EduBridge',
      passport: 'Experience Passport',
      profileComplete: 'Profile strength',
    },
    problem: {
      eyebrow: 'The gap',
      title: 'Talent exists. The first opportunity often does not.',
      text: 'Young people can learn fast and build impressive skills, yet employers still need proof that they can work with real requirements, deadlines and teams.',
      cards: [
        { title: 'No experience, no opportunity', text: 'Entry-level talent is often rejected because it has no commercial track record.' },
        { title: 'Learning is not enough', text: 'Courses and personal projects rarely prove collaboration, responsibility and delivery.' },
        { title: 'Ideas remain unbuilt', text: 'Many founders have useful ideas but lack a team, mentorship or an affordable way to validate them.' },
      ],
      summary: 'Foundy creates the missing first layer of trust.',
    },
    ecosystem: {
      eyebrow: 'The ecosystem',
      title: 'One place for people who want to build.',
      text: 'Different ambitions, connected by meaningful product work.',
      groups: [
        { title: 'Young talent', text: 'Join real teams, complete meaningful tasks and build a verified professional story.' },
        { title: 'Founders', text: 'Turn an idea into a real project by finding motivated people with complementary skills.' },
        { title: 'Mentors', text: 'Guide the next generation through reviews, feedback and practical decisions.' },
        { title: 'Partners', text: 'Support youth innovation, publish challenges and discover promising emerging talent.' },
      ],
      node: 'Where talent, ideas and guidance meet.',
    },
    how: {
      eyebrow: 'How it works',
      title: 'From skill to verified experience.',
      text: 'A clear path from what you know to evidence of what you can deliver.',
      steps: [
        { title: 'Create your profile', text: 'Add your skills, interests and the kind of experience you are looking for.' },
        { title: 'Find a real project', text: 'Discover startup ideas, practical challenges and teams looking for contributors.' },
        { title: 'Join the team', text: 'Apply for a clear role and agree on expectations before the work begins.' },
        { title: 'Build and get reviewed', text: 'Complete tasks, receive mentor feedback and improve through real collaboration.' },
        { title: 'Grow your Experience Passport', text: 'Turn verified contributions into a professional profile that shows what you can actually do.' },
      ],
    },
    experience: {
      eyebrow: 'Experience Passport',
      title: 'More than a profile. Proof of real contribution.',
      text: 'Foundy records meaningful project activity so that experience is based on work, feedback and results — not only self-written claims.',
      passport: 'Experience Passport',
      holder: 'Aram M.',
      role: 'Backend Developer · Armenia',
      verified: 'Activity verified',
      metrics: [
        { label: 'Projects', value: '4' }, { label: 'Completed tasks', value: '31' }, { label: 'Mentor reviews', value: '9' },
        { label: 'Team experience', value: '7 months' }, { label: 'Products launched', value: '2' },
      ],
      features: ['Verified project roles', 'Task and submission history', 'Mentor and founder feedback', 'Links to code, design or launched work', 'Evidence of teamwork and responsibility'],
      evidence: 'Latest evidence',
      evidenceText: 'API architecture · EduBridge · Reviewed by mentor',
    },
    ai: {
      eyebrow: 'Human skills in the AI era',
      title: 'Built for a world shaped by AI.',
      text: 'AI can accelerate execution, but real professionals still need judgment, responsibility, communication and the ability to deliver. Foundy helps young talent learn those skills through practice.',
      helps: 'AI can help with',
      develops: 'Real experience develops',
      helpItems: ['Drafting', 'Research', 'Repetitive tasks', 'First implementations'],
      realItems: ['Product thinking', 'Quality control', 'Architecture', 'Collaboration', 'Accountability', 'Delivery'],
    },
    safety: {
      eyebrow: 'Safety by design',
      title: 'Opportunity without exploitation.',
      text: 'Foundy is designed around transparent conditions, age-aware participation and protection for young users.',
      principles: [
        { title: 'Clear expectations', text: 'Role, workload, compensation and ownership terms should be visible before participation.' },
        { title: 'Age-aware access', text: 'Features and opportunities can differ by age and applicable legal requirements.' },
        { title: 'Parent or guardian consent', text: 'Consent can be required when participation or data processing legally demands it.' },
        { title: 'Moderation and reporting', text: 'Projects, clients and interactions must be reviewable and reportable.' },
      ],
      noteLabel: 'Important',
      note: 'Foundy is being designed to operate in accordance with the laws of Armenia. Legal and safety processes will be reviewed before paid work features are launched.',
    },
    armenia: {
      eyebrow: 'Local start, global ambition',
      title: "Starting with Armenia's next generation.",
      text: 'Armenia has ambitious young builders, experienced technology professionals and a global diaspora. Foundy aims to connect these strengths and help more ideas become real products.',
      directions: ['Youth talent', 'Local mentors and companies', 'Global Armenian diaspora'],
      statement: 'Prove the model locally. Build the platform globally.',
    },
    pilot: {
      eyebrow: 'Early validation',
      title: 'The first Foundy pilot',
      text: 'We are preparing a small early community to test how young talent, founders and mentors can build together.',
      target: 'Pilot target',
      metrics: [
        { value: '30', label: 'early participants' }, { value: '5', label: 'project teams' }, { value: '5', label: 'mentors' },
        { value: '8', label: 'weeks' }, { value: '1', label: 'final Demo Day' },
      ],
    },
    waitlist: {
      eyebrow: 'Join early',
      title: 'Help shape the first Foundy community.',
      text: 'Join the early interest list as a young specialist, founder, mentor or partner.',
      name: 'Full name', email: 'Email', age: 'Age group', role: 'Role', message: 'Short message', optional: 'Optional', choose: 'Choose an option',
      ageOptions: ['Under 16', '16–17', '18–24', '25+', 'Prefer not to say'],
      roleOptions: ['Young specialist', 'Founder with an idea', 'Mentor', 'Company or partner', 'Parent or educator', 'Other'],
      consent: 'I agree that Foundy may use this information to contact me about the early pilot.',
      submit: 'Join the early list', demo: 'For the early pilot, we currently accept valid Gmail addresses only.',
      success: 'Thank you — your interest has been saved on this device.',
      duplicate: 'This email is already on the local early interest list.',
      storageError: 'Your browser could not save the form. Please check local storage permissions and try again.',
    },
    faq: {
      eyebrow: 'FAQ', title: 'A few useful answers.',
      items: [
        { title: 'What is Foundy?', text: 'Foundy is an early-stage platform concept for connecting young talent, founders and mentors through real product work and verified experience.' },
        { title: 'Is Foundy a job board?', text: 'Not only. Foundy is designed around teams, projects, mentorship, practical tasks and a record of real contribution.' },
        { title: 'Is Foundy only for programmers?', text: 'No. Products need developers, designers, marketers, researchers, creators, product thinkers and many other skills.' },
        { title: 'Can minors participate?', text: 'The platform is being designed with age-aware access, safety controls and legal requirements in mind. Available activities may differ by age.' },
        { title: 'Is Foundy already launched?', text: 'Not yet. We are currently validating the idea and preparing an early pilot community.' },
      ],
    },
    final: { title: 'Your first real opportunity should not depend on already having one.', primary: 'Join the Foundy pilot', secondary: 'Become a mentor' },
    footer: { tagline: 'Real projects. Real contribution. Real experience.', privacy: 'Privacy', terms: 'Terms', copyright: '© 2026 Foundy. Early-stage project.', origin: 'Starting in Armenia. Built for the world.' },
  },
  hy: {
    skip: 'Անցնել հիմնական բովանդակությանը',
    menu: { open: 'Բացել նավիգացիոն ցանկը', close: 'Փակել նավիգացիոն ցանկը' },
    nav: { problem: 'Խնդիրը', how: 'Ինչպես է աշխատում', audience: 'Ում համար է', safety: 'Անվտանգություն', join: 'Միանալ' },
    headerCta: 'Միանալ Foundy-ին',
    hero: {
      badge: 'Նոր ճանապարհ դեպի իրական աշխատանք',
      title: 'կատարելագործիր և կատարելագործվիր',
      subtitle: 'Foundy-ն միավորում է երիտասարդ մասնագետներին, հիմնադիրներին և մենթորներին՝ իրական պրոդուկտներ ստեղծելու, թիմում աշխատելու և ներդրումը հաստատված փորձի վերածելու համար։',
      primary: 'Միանալ առաջին համայնքին', secondary: 'Տեսնել՝ ինչպես է աշխատում', origin: 'Սկսում ենք Հայաստանից։ Ստեղծում ենք աշխարհի համար։',
      trust: ['Իրական նախագծեր', 'Հաստատված ներդրում', 'Մենթորի աջակցություն'],
      profile: 'Արամ Մ․', developer: 'Backend ծրագրավորող', activeProjects: 'ակտիվ նախագիծ', completedTasks: 'կատարված առաջադրանք', mentorReviews: 'մենթորի կարծիք',
      verifiedSkills: 'Հաստատված հմտություններ', latest: 'Վերջին ներդրումը', contribution: 'Կառուցել է EduBridge-ի մուտքի համակարգը', passport: 'Փորձի անձնագիր', profileComplete: 'Պրոֆիլի ուժը',
    },
    problem: {
      eyebrow: 'Բացը', title: 'Տաղանդ կա։ Առաջին հնարավորությունը՝ հաճախ ոչ։',
      text: 'Երիտասարդները կարող են արագ սովորել և ուժեղ հմտություններ ձեռք բերել, բայց գործատուներին անհրաժեշտ է ապացույց, որ նրանք կարող են աշխատել իրական պահանջների, ժամկետների և թիմերի հետ։',
      cards: [
        { title: 'Չկա փորձ՝ չկա հնարավորություն', text: 'Սկսնակ մասնագետներին հաճախ մերժում են, քանի որ նրանք չունեն աշխատանքային փորձի հաստատված պատմություն։' },
        { title: 'Միայն սովորելը բավարար չէ', text: 'Դասընթացներն ու անձնական նախագծերը հազվադեպ են ապացուցում համագործակցությունը, պատասխանատվությունը և արդյունքը։' },
        { title: 'Գաղափարները մնում են չիրականացված', text: 'Շատ հիմնադիրներ ունեն օգտակար գաղափարներ, բայց չունեն թիմ, մենթորություն կամ դրանք փորձարկելու հասանելի միջոց։' },
      ], summary: 'Foundy-ն ստեղծում է վստահության պակասող առաջին շերտը։',
    },
    ecosystem: {
      eyebrow: 'Էկոհամակարգ', title: 'Մեկ վայր բոլոր նրանց համար, ովքեր ուզում են ստեղծել։', text: 'Տարբեր նպատակներ՝ միավորված իրական պրոդուկտային աշխատանքով։',
      groups: [
        { title: 'Երիտասարդ մասնագետներ', text: 'Միացեք իրական թիմերի, կատարեք կարևոր առաջադրանքներ և կառուցեք հաստատված մասնագիտական պատմություն։' },
        { title: 'Հիմնադիրներ', text: 'Գաղափարը վերածեք իրական նախագծի՝ գտնելով փոխլրացնող հմտություններով մոտիվացված մարդկանց։' },
        { title: 'Մենթորներ', text: 'Ուղղորդեք նոր սերնդին վերանայումների, արձագանքի և գործնական որոշումների միջոցով։' },
        { title: 'Գործընկերներ', text: 'Աջակցեք երիտասարդական նորարարությանը, հրապարակեք մարտահրավերներ և բացահայտեք նոր տաղանդներ։' },
      ], node: 'Այստեղ հանդիպում են տաղանդը, գաղափարներն ու ուղղորդումը։',
    },
    how: {
      eyebrow: 'Ինչպես է աշխատում', title: 'Հմտությունից դեպի հաստատված փորձ։', text: 'Հստակ ճանապարհ՝ գիտելիքից մինչև իրական արդյունքի ապացույց։',
      steps: [
        { title: 'Ստեղծեք ձեր պրոֆիլը', text: 'Նշեք հմտությունները, հետաքրքրությունները և այն փորձը, որը ցանկանում եք ստանալ։' },
        { title: 'Գտեք իրական նախագիծ', text: 'Բացահայտեք ստարտափ գաղափարներ, գործնական մարտահրավերներ և մասնակիցներ փնտրող թիմեր։' },
        { title: 'Միացեք թիմին', text: 'Դիմեք հստակ դերի համար և մինչև աշխատանքի սկիզբը համաձայնեցրեք սպասումները։' },
        { title: 'Ստեղծեք և ստացեք արձագանք', text: 'Կատարեք առաջադրանքներ, ստացեք մենթորի կարծիք և զարգացեք իրական համագործակցությամբ։' },
        { title: 'Զարգացրեք Փորձի անձնագիրը', text: 'Հաստատված ներդրումները վերածեք պրոֆիլի, որը ցույց է տալիս ձեր իրական կարողությունները։' },
      ],
    },
    experience: {
      eyebrow: 'Փորձի անձնագիր', title: 'Ավելին, քան պրոֆիլ։ Իրական ներդրման ապացույց։',
      text: 'Foundy-ն գրանցում է նախագծային կարևոր գործունեությունը, որպեսզի փորձը հիմնված լինի աշխատանքի, արձագանքի և արդյունքի վրա, ոչ միայն ինքնագրված պնդումների։',
      passport: 'Փորձի անձնագիր', holder: 'Արամ Մ․', role: 'Backend ծրագրավորող · Հայաստան', verified: 'Գործունեությունը հաստատված է',
      metrics: [
        { label: 'Նախագծեր', value: '4' }, { label: 'Կատարված առաջադրանքներ', value: '31' }, { label: 'Մենթորի կարծիքներ', value: '9' },
        { label: 'Թիմային փորձ', value: '7 ամիս' }, { label: 'Թողարկված պրոդուկտներ', value: '2' },
      ],
      features: ['Հաստատված նախագծային դերեր', 'Առաջադրանքների և հանձնման պատմություն', 'Մենթորների ու հիմնադիրների կարծիքներ', 'Հղումներ կոդին, դիզայնին կամ թողարկված աշխատանքին', 'Թիմային աշխատանքի և պատասխանատվության ապացույցներ'],
      evidence: 'Վերջին ապացույցը', evidenceText: 'API ճարտարապետություն · EduBridge · Վերանայված մենթորի կողմից',
    },
    ai: {
      eyebrow: 'Մարդկային հմտությունները AI-ի դարաշրջանում', title: 'Ստեղծված AI-ով ձևավորվող աշխարհի համար։',
      text: 'AI-ը կարող է արագացնել աշխատանքը, բայց մասնագետներին դեռ անհրաժեշտ են դատողություն, պատասխանատվություն, հաղորդակցություն և արդյունք ապահովելու ունակություն։ Foundy-ն օգնում է այդ հմտությունները զարգացնել գործնականում։',
      helps: 'AI-ը կարող է օգնել', develops: 'Իրական փորձը զարգացնում է',
      helpItems: ['Սևագրերի պատրաստում', 'Հետազոտություն', 'Կրկնվող առաջադրանքներ', 'Առաջին իրականացումներ'],
      realItems: ['Պրոդուկտային մտածողություն', 'Որակի վերահսկում', 'Ճարտարապետություն', 'Համագործակցություն', 'Պատասխանատվություն', 'Արդյունքի ապահովում'],
    },
    safety: {
      eyebrow: 'Անվտանգություն՝ հիմքից', title: 'Հնարավորություն՝ առանց շահագործման։', text: 'Foundy-ն նախագծվում է թափանցիկ պայմանների, տարիքին համապատասխան մասնակցության և երիտասարդ օգտատերերի պաշտպանության շուրջ։',
      principles: [
        { title: 'Հստակ սպասումներ', text: 'Դերը, ծանրաբեռնվածությունը, փոխհատուցումը և սեփականության պայմանները պետք է տեսանելի լինեն մասնակցությունից առաջ։' },
        { title: 'Տարիքին համապատասխան հասանելիություն', text: 'Հնարավորությունները կարող են տարբերվել ըստ տարիքի և գործող իրավական պահանջների։' },
        { title: 'Ծնողի կամ խնամակալի համաձայնություն', text: 'Համաձայնություն կարող է պահանջվել, երբ մասնակցությունը կամ տվյալների մշակումը դա իրավականորեն պահանջում է։' },
        { title: 'Մոդերացիա և հաղորդումներ', text: 'Նախագծերը, պատվիրատուներն ու փոխազդեցությունները պետք է հնարավոր լինի ստուգել և բողոքարկել։' },
      ], noteLabel: 'Կարևոր', note: 'Foundy-ն նախագծվում է Հայաստանի օրենքներին համապատասխան գործելու համար։ Իրավական և անվտանգության գործընթացները կվերանայվեն մինչև վճարովի աշխատանքի գործառույթների մեկնարկը։',
    },
    armenia: {
      eyebrow: 'Տեղական սկիզբ, գլոբալ նպատակ', title: 'Սկսում ենք Հայաստանի նոր սերնդից։',
      text: 'Հայաստանն ունի հավակնոտ երիտասարդ ստեղծողներ, փորձառու տեխնոլոգիական մասնագետներ և համաշխարհային սփյուռք։ Foundy-ն նպատակ ունի միավորել այս ուժերը և օգնել ավելի շատ գաղափարների դառնալ իրական պրոդուկտներ։',
      directions: ['Երիտասարդ տաղանդներ', 'Տեղական մենթորներ և ընկերություններ', 'Հայկական համաշխարհային սփյուռք'], statement: 'Ապացուցել մոդելը տեղում։ Կառուցել հարթակը գլոբալ։',
    },
    pilot: {
      eyebrow: 'Վաղ փորձարկում', title: 'Foundy-ի առաջին պիլոտը', text: 'Մենք պատրաստում ենք փոքր առաջին համայնք՝ փորձարկելու, թե ինչպես կարող են երիտասարդները, հիմնադիրներն ու մենթորները ստեղծել միասին։', target: 'Պիլոտի նպատակ',
      metrics: [{ value: '30', label: 'առաջին մասնակից' }, { value: '5', label: 'նախագծային թիմ' }, { value: '5', label: 'մենթոր' }, { value: '8', label: 'շաբաթ' }, { value: '1', label: 'եզրափակիչ Demo Day' }],
    },
    waitlist: {
      eyebrow: 'Միացեք առաջինը', title: 'Օգնեք ձևավորել Foundy-ի առաջին համայնքը։', text: 'Միացեք հետաքրքրվածների ցանկին որպես երիտասարդ մասնագետ, հիմնադիր, մենթոր կամ գործընկեր։',
      name: 'Անուն և ազգանուն', email: 'Էլ․ փոստ', age: 'Տարիքային խումբ', role: 'Դեր', message: 'Կարճ հաղորդագրություն', optional: 'Ոչ պարտադիր', choose: 'Ընտրեք տարբերակը',
      ageOptions: ['Մինչև 16', '16–17', '18–24', '25+', 'Նախընտրում եմ չնշել'], roleOptions: ['Երիտասարդ մասնագետ', 'Գաղափար ունեցող հիմնադիր', 'Մենթոր', 'Ընկերություն կամ գործընկեր', 'Ծնող կամ մանկավարժ', 'Այլ'],
      consent: 'Համաձայն եմ, որ Foundy-ն օգտագործի այս տվյալները՝ առաջին պիլոտի մասին ինձ հետ կապվելու համար։', submit: 'Միանալ առաջին ցանկին', demo: 'Առաջին պիլոտի համար այս պահին ընդունվում են միայն վավեր Gmail հասցեներ։',
      success: 'Շնորհակալություն․ ձեր հետաքրքրությունը պահպանվել է այս սարքում։', duplicate: 'Այս էլ․ հասցեն արդեն պահպանված է տեղական ցանկում։', storageError: 'Բրաուզերը չկարողացավ պահպանել ձևը։ Ստուգեք local storage-ի թույլտվությունը և կրկին փորձեք։',
    },
    faq: {
      eyebrow: 'Հաճախ տրվող հարցեր', title: 'Մի քանի օգտակար պատասխան։',
      items: [
        { title: 'Ի՞նչ է Foundy-ն։', text: 'Foundy-ն վաղ փուլում գտնվող հարթակի գաղափար է, որը միավորում է երիտասարդ տաղանդներին, հիմնադիրներին և մենթորներին իրական պրոդուկտային աշխատանքի ու հաստատված փորձի շուրջ։' },
        { title: 'Foundy-ն աշխատանքի հայտարարությունների կայք է՞։', text: 'Ոչ միայն։ Foundy-ն կառուցվում է թիմերի, նախագծերի, մենթորության, գործնական առաջադրանքների և իրական ներդրման պատմության շուրջ։' },
        { title: 'Foundy-ն միայն ծրագրավորողների համա՞ր է։', text: 'Ոչ։ Պրոդուկտներին պետք են ծրագրավորողներ, դիզայներներ, մարքեթոլոգներ, հետազոտողներ, ստեղծագործողներ, պրոդուկտային մասնագետներ և այլ հմտություններ։' },
        { title: 'Անչափահասները կարո՞ղ են մասնակցել։', text: 'Հարթակը նախագծվում է տարիքին համապատասխան հասանելիության, անվտանգության և իրավական պահանջների հաշվառմամբ։ Հասանելի գործունեությունը կարող է տարբերվել ըստ տարիքի։' },
        { title: 'Foundy-ն արդեն գործարկվա՞ծ է։', text: 'Դեռ ոչ։ Այժմ մենք ստուգում ենք գաղափարը և պատրաստում առաջին պիլոտային համայնքը։' },
      ],
    },
    final: { title: 'Քո առաջին իրական հնարավորությունը չպետք է կախված լինի արդեն իսկ փորձ ունենալուց։', primary: 'Միանալ Foundy-ի պիլոտին', secondary: 'Դառնալ մենթոր' },
    footer: { tagline: 'Իրական նախագծեր։ Իրական ներդրում։ Իրական փորձ։', privacy: 'Գաղտնիություն', terms: 'Պայմաններ', copyright: '© 2026 Foundy. Վաղ փուլի նախագիծ։', origin: 'Սկսում ենք Հայաստանից։ Ստեղծում ենք աշխարհի համար։' },
  },
  ru: {
    skip: 'Перейти к основному содержанию',
    menu: { open: 'Открыть меню навигации', close: 'Закрыть меню навигации' },
    nav: { problem: 'Проблема', how: 'Как это работает', audience: 'Для кого', safety: 'Безопасность', join: 'Присоединиться' },
    headerCta: 'Присоединиться к Foundy',
    hero: {
      badge: 'Новый путь к реальной работе', title: 'կատարելագործիր և կատարելագործվիր',
      subtitle: 'Foundy объединяет молодых специалистов, основателей и наставников, чтобы создавать реальные продукты, работать в командах и превращать вклад в подтверждённый опыт.',
      primary: 'Вступить в первое сообщество', secondary: 'Узнать, как это работает', origin: 'Начинаем в Армении. Создаём для мира.',
      trust: ['Реальные проекты', 'Подтверждённый вклад', 'Поддержка наставников'],
      profile: 'Арам М.', developer: 'Backend-разработчик', activeProjects: 'активных проекта', completedTasks: 'выполненных задач', mentorReviews: 'отзывов наставников',
      verifiedSkills: 'Подтверждённые навыки', latest: 'Последний вклад', contribution: 'Создал процесс авторизации для EduBridge', passport: 'Паспорт опыта', profileComplete: 'Сила профиля',
    },
    problem: {
      eyebrow: 'Разрыв', title: 'Талант есть. Первой возможности часто нет.',
      text: 'Молодые люди быстро учатся и развивают сильные навыки, но работодателям всё ещё нужны доказательства умения работать с реальными требованиями, сроками и командами.',
      cards: [
        { title: 'Нет опыта — нет возможности', text: 'Начинающим специалистам часто отказывают из-за отсутствия подтверждённого коммерческого опыта.' },
        { title: 'Одной учёбы недостаточно', text: 'Курсы и личные проекты редко подтверждают навыки сотрудничества, ответственность и умение доводить работу до результата.' },
        { title: 'Идеи остаются нереализованными', text: 'У многих основателей есть полезные идеи, но нет команды, наставничества или доступного способа их проверить.' },
      ], summary: 'Foundy создаёт недостающий первый уровень доверия.',
    },
    ecosystem: {
      eyebrow: 'Экосистема', title: 'Одно место для тех, кто хочет создавать.', text: 'Разные амбиции, объединённые содержательной работой над продуктом.',
      groups: [
        { title: 'Молодые специалисты', text: 'Присоединяйтесь к реальным командам, решайте значимые задачи и создавайте подтверждённую профессиональную историю.' },
        { title: 'Основатели', text: 'Превратите идею в реальный проект, найдя мотивированных людей с взаимодополняющими навыками.' },
        { title: 'Наставники', text: 'Помогайте новому поколению через ревью, обратную связь и практические решения.' },
        { title: 'Партнёры', text: 'Поддерживайте молодёжные инновации, публикуйте задачи и находите перспективные таланты.' },
      ], node: 'Здесь встречаются талант, идеи и поддержка.',
    },
    how: {
      eyebrow: 'Как это работает', title: 'От навыка к подтверждённому опыту.', text: 'Понятный путь от знаний к доказательствам того, что вы умеете создавать.',
      steps: [
        { title: 'Создайте профиль', text: 'Добавьте навыки, интересы и укажите, какой опыт вы хотите получить.' },
        { title: 'Найдите реальный проект', text: 'Открывайте стартап-идеи, практические задачи и команды, которым нужны участники.' },
        { title: 'Присоединитесь к команде', text: 'Подайте заявку на понятную роль и согласуйте ожидания до начала работы.' },
        { title: 'Создавайте и получайте ревью', text: 'Выполняйте задачи, получайте обратную связь наставника и развивайтесь через реальное сотрудничество.' },
        { title: 'Развивайте Паспорт опыта', text: 'Превращайте подтверждённый вклад в профессиональный профиль, который показывает ваши реальные возможности.' },
      ],
    },
    experience: {
      eyebrow: 'Паспорт опыта', title: 'Больше, чем профиль. Доказательство реального вклада.',
      text: 'Foundy фиксирует значимую проектную активность, чтобы опыт основывался на работе, обратной связи и результатах, а не только на словах.',
      passport: 'Паспорт опыта', holder: 'Арам М.', role: 'Backend-разработчик · Армения', verified: 'Активность подтверждена',
      metrics: [{ label: 'Проекты', value: '4' }, { label: 'Выполненные задачи', value: '31' }, { label: 'Отзывы наставников', value: '9' }, { label: 'Командный опыт', value: '7 месяцев' }, { label: 'Запущенные продукты', value: '2' }],
      features: ['Подтверждённые роли в проектах', 'История задач и результатов', 'Отзывы наставников и основателей', 'Ссылки на код, дизайн или запущенную работу', 'Доказательства командной работы и ответственности'],
      evidence: 'Последнее подтверждение', evidenceText: 'Архитектура API · EduBridge · Проверено наставником',
    },
    ai: {
      eyebrow: 'Человеческие навыки в эпоху AI', title: 'Создано для мира, который меняет AI.',
      text: 'AI может ускорить работу, но профессионалам по-прежнему нужны здравое суждение, ответственность, коммуникация и умение доводить задачи до результата. Foundy помогает развивать эти навыки на практике.',
      helps: 'AI может помочь', develops: 'Реальный опыт развивает', helpItems: ['Черновики', 'Исследования', 'Повторяющиеся задачи', 'Первые реализации'], realItems: ['Продуктовое мышление', 'Контроль качества', 'Архитектура', 'Сотрудничество', 'Ответственность', 'Доведение до результата'],
    },
    safety: {
      eyebrow: 'Безопасность в основе', title: 'Возможности без эксплуатации.', text: 'Foundy проектируется вокруг прозрачных условий, участия с учётом возраста и защиты молодых пользователей.',
      principles: [
        { title: 'Понятные ожидания', text: 'Роль, нагрузка, вознаграждение и права на результат должны быть видны до начала участия.' },
        { title: 'Доступ с учётом возраста', text: 'Функции и возможности могут различаться в зависимости от возраста и применимых правовых требований.' },
        { title: 'Согласие родителя или опекуна', text: 'Согласие может потребоваться, когда этого требуют правила участия или обработки данных.' },
        { title: 'Модерация и жалобы', text: 'Проекты, заказчики и взаимодействия должны поддаваться проверке, а о проблемах можно будет сообщить.' },
      ], noteLabel: 'Важно', note: 'Foundy проектируется для работы в соответствии с законодательством Армении. Юридические процессы и механизмы безопасности будут проверены до запуска функций оплачиваемой работы.',
    },
    armenia: {
      eyebrow: 'Локальный старт, глобальная цель', title: 'Начинаем с нового поколения Армении.',
      text: 'В Армении есть амбициозные молодые создатели, опытные технологические специалисты и глобальная диаспора. Foundy стремится объединить эти силы и помочь большему числу идей стать реальными продуктами.',
      directions: ['Молодые таланты', 'Местные наставники и компании', 'Глобальная армянская диаспора'], statement: 'Доказать модель локально. Построить глобальную платформу.',
    },
    pilot: {
      eyebrow: 'Ранняя проверка', title: 'Первый пилот Foundy', text: 'Мы готовим небольшое первое сообщество, чтобы проверить, как молодые специалисты, основатели и наставники могут создавать вместе.', target: 'Цель пилота',
      metrics: [{ value: '30', label: 'первых участников' }, { value: '5', label: 'проектных команд' }, { value: '5', label: 'наставников' }, { value: '8', label: 'недель' }, { value: '1', label: 'финальный Demo Day' }],
    },
    waitlist: {
      eyebrow: 'Присоединяйтесь первыми', title: 'Помогите сформировать первое сообщество Foundy.', text: 'Добавьте свой интерес как молодой специалист, основатель, наставник или партнёр.',
      name: 'Имя и фамилия', email: 'Email', age: 'Возрастная группа', role: 'Роль', message: 'Короткое сообщение', optional: 'Необязательно', choose: 'Выберите вариант',
      ageOptions: ['До 16', '16–17', '18–24', '25+', 'Предпочитаю не указывать'], roleOptions: ['Молодой специалист', 'Основатель с идеей', 'Наставник', 'Компания или партнёр', 'Родитель или преподаватель', 'Другое'],
      consent: 'Я согласен(-на), что Foundy может использовать эти данные, чтобы связаться со мной по поводу раннего пилота.', submit: 'Вступить в первый список', demo: 'Для раннего пилота сейчас принимаются только действительные Gmail-адреса.',
      success: 'Спасибо — ваш интерес сохранён на этом устройстве.', duplicate: 'Этот email уже сохранён в локальном списке.', storageError: 'Браузер не смог сохранить форму. Проверьте разрешение на локальное хранилище и попробуйте снова.',
    },
    faq: {
      eyebrow: 'Вопросы и ответы', title: 'Несколько полезных ответов.',
      items: [
        { title: 'Что такое Foundy?', text: 'Foundy — концепция платформы на ранней стадии, которая объединяет молодых специалистов, основателей и наставников через реальную продуктовую работу и подтверждённый опыт.' },
        { title: 'Foundy — это доска вакансий?', text: 'Не только. Foundy строится вокруг команд, проектов, наставничества, практических задач и истории реального вклада.' },
        { title: 'Foundy только для программистов?', text: 'Нет. Продуктам нужны разработчики, дизайнеры, маркетологи, исследователи, создатели, продуктовые специалисты и многие другие навыки.' },
        { title: 'Могут ли участвовать несовершеннолетние?', text: 'Платформа проектируется с учётом возраста, безопасности и юридических требований. Доступные активности могут различаться в зависимости от возраста.' },
        { title: 'Foundy уже запущен?', text: 'Пока нет. Сейчас мы проверяем идею и готовим первое пилотное сообщество.' },
      ],
    },
    final: { title: 'Твоя первая реальная возможность не должна зависеть от уже имеющегося опыта.', primary: 'Присоединиться к пилоту Foundy', secondary: 'Стать наставником' },
    footer: { tagline: 'Реальные проекты. Реальный вклад. Реальный опыт.', privacy: 'Конфиденциальность', terms: 'Условия', copyright: '© 2026 Foundy. Проект на ранней стадии.', origin: 'Начинаем в Армении. Создаём для мира.' },
  },
}
