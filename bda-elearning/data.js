/* ============================================================
   EDIT THIS FILE to update your website. No other file needs
   changes. Keep the commas and quotes exactly as shown.
   ============================================================ */
const SITE = {
  subject: "Big Data Analytics",
  code: "BDA",
  class: "TE / BE (Semester)  ·  Academic Year 2026-27",
  about: "Course material for Big Data Analytics: syllabus, notes, important questions, notices and study resources in one place."
};

/* ================= GOOGLE CONNECTION =================
   Upload files to Google Drive and type in a Google Sheet; the website
   shows them automatically. Step-by-step guide: SETUP-GOOGLE.md
   Paste the full share link (or just the ID). Leave "" until ready.
   You can add more folders to any list, e.g. one folder per unit:
     { label: "Unit 2", folder: "https://drive.google.com/drive/folders/..." },
   ===================================================== */
const GOOGLE = {
  /* One Google Sheet with tabs named: Notices, ImpQuestions */
  sheet: "",

  /* Optional. Without it files still show (in a Google Drive box).
     With it, every file gets its own card with View + Download buttons. */
  apiKey: "",

  notes: [
    { label: "Lecture notes", folder: "https://drive.google.com/drive/folders/1HJyj8vrNX0wdbxQP0fNlrf7iTGO2jiW0?usp=drive_link" }
  ],
  questions: [
    { label: "Question papers & important question PDFs", folder: "" }
  ],
  documents: [
    { label: "Documents", folder: "" }
  ]
};

/* Teacher profiles. Add one { ... } block per teacher; a toggle button
   appears to switch between them. photo is optional: put a picture in
   /files and write "files/photo.jpg". Leave any field "" to hide it. */
const PROFILES = [
{
  name: "Prof. A. A. Shendekar",
  designation: "Assistant Professor",
  department: "Department of Computer Engineering",
  college: "Yashwantrao Bhonsale Institute of Technology, Sawantwadi",
  photo: "files/aashendekar.png",
  email: "aashendekar@ybit.ac.in",
  phone: "7588124480",
  experience: "6 months teaching",
  qualifications: ["B.E. (Computer Science Engineering (AIML) with Honours in Data Science)"],
  links: [
    { label: "LinkedIn", url: "" },
    { label: "Google Scholar", url: "" }
  ]
},
{
  name: "Prof. S. S. Naik",
  designation: "Assistant Professor",
  department: "Department of Computer Engineering",
  college: "Yashwantrao Bhonsale Institute of Technology, Sawantwadi",
  photo: "files/ssnaik.jpeg",
  email: "sadhanasnaik@ybit.ac.in",
  phone: "9359249148",
  experience: "6 months teaching",
  qualifications: ["B.E. (Computer Engineering)"],
  links: [
    { label: "LinkedIn", url: "" },
    { label: "Google Scholar", url: "" }
  ]
}
];

/* Notices: newest first. pinned:true keeps it at the top. */
const NOTICES = [
  { date: "2026-11-16", title: "Welcome to Big Data Analytics", body: "All notes, important questions and documents for this course will be shared on this website. Check it regularly.", pinned: true },
  { date: "2026-11-12", title: "IAT-1 portion", body: "IAT-1 covers Module 1 and Module 2. Revise the 5 Vs of Big Data and data collection and storage methods.", pinned: false }
];

/* Syllabus: one { ... } block per module. selfLearning is optional. */
const SYLLABUS = [
  { unit: 1, title: "Introduction to Big Data Analytics", hours: 5,
    topics: [
      "Introduction to data and its importance",
      "Understanding Big Data: definition, characteristics (Volume, Velocity, Variety, Veracity and Value)",
      "Evolution of data analytics: traditional data processing vs. Big Data",
      "Need for Big Data Analytics in various fields (business, healthcare, finance, social sciences, etc.)",
      "Sources of Big Data: social media, IoT, e-commerce, financial transactions and scientific research",
      "Challenges in Big Data management: storage, processing, security and ethical considerations",
      "Introduction to data analytics tools and technologies (Hadoop, Spark, Python, R, SQL, etc.)"
    ],
    selfLearning: "Real-world applications of Big Data Analytics across industries" },
  { unit: 2, title: "Data Collection, Storage, and Processing in Big Data Analytics", hours: 5,
    topics: [
      "Types of data in Big Data: structured, semi-structured and unstructured data",
      "Data collection methods: web scraping, APIs, sensors, surveys and transactional data",
      "Big Data storage technologies: relational vs. NoSQL databases (HDFS, MongoDB, Cassandra)",
      "Data processing models: batch processing vs. real-time processing",
      "Big Data processing frameworks: introduction to Hadoop, MapReduce, Apache Spark",
      "Data cleaning and preprocessing: handling missing data, data transformation and data normalization",
      "Ethical and privacy concerns in data collection: GDPR, data protection laws and ethical AI"
    ],
    selfLearning: "Case studies on ethical and unethical data collection practices" },
  { unit: 3, title: "Big Data Analytics Techniques and Applications", hours: 5,
    topics: [
      "Introduction to data analytics: descriptive, diagnostic, predictive and prescriptive analytics",
      "Basic statistical techniques for data analysis: mean, median, mode, variance, standard deviation",
      "Data visualization: importance, tools (Tableau, Power BI, Matplotlib, Seaborn)",
      "Basic machine learning concepts: supervised vs. unsupervised learning",
      "Introduction to data mining: clustering, classification and association rule mining",
      "Applications of Big Data Analytics: business intelligence, marketing, finance, healthcare, social media analysis",
      "Big Data in decision-making: how organizations use data for strategic planning"
    ],
    selfLearning: "Impact of Big Data on e-commerce and digital marketing" },
  { unit: 4, title: "Big Data Tools, Technologies, and Challenges", hours: 4,
    topics: [
      "Introduction to Big Data technologies: overview of key tools and frameworks",
      "Hadoop ecosystem: HDFS, MapReduce, YARN and Hive",
      "Introduction to Apache Spark: features, advantages over Hadoop and use cases",
      "NoSQL databases: MongoDB, Cassandra and HBase for Big Data storage",
      "Data security and privacy in Big Data: encryption, anonymization and access control",
      "Challenges in Big Data Analytics: data quality, scalability, ethical issues and bias in AI models",
      "Future trends in Big Data: cloud computing, edge analytics, AI-driven Big Data analysis"
    ],
    selfLearning: "Ethical considerations in Big Data and case studies on data breaches" },
  { unit: 5, title: "Case Studies and Real-World Applications of Big Data Analytics", hours: 4,
    topics: [
      "Real-life applications of Big Data: case studies from various domains",
      "Business & marketing: how companies use Big Data for customer insights and targeted advertising",
      "Finance & banking: fraud detection and risk assessment in financial institutions",
      "Healthcare & medicine: predictive analytics for disease detection and patient care",
      "E-commerce & retail: personalized recommendations and demand forecasting",
      "Social media & journalism: sentiment analysis and trend prediction",
      "Governance & smart cities: traffic management, disaster prediction and public policy decisions",
      "Ethical concerns in Big Data usage: bias, privacy violations and misuse of data",
      "Future of Big Data Analytics: role in AI, IoT and emerging technologies"
    ],
    selfLearning: "The role of data science in fraud detection and cybersecurity" },
  { unit: 6, title: "Emerging Trends and Career Opportunities in Big Data Analytics", hours: 3,
    topics: [
      "Role of Artificial Intelligence (AI) and Machine Learning (ML) in Big Data",
      "Internet of Things (IoT) and Big Data integration",
      "Blockchain and Big Data for secure transactions",
      "Cloud computing and edge analytics",
      "Ethical AI and responsible data usage",
      "Big Data Analytics career paths: Data Analyst, Data Scientist, Business Intelligence Analyst, Big Data Engineer, Data Consultant, etc."
    ],
    selfLearning: "How Big Data is transforming decision-making in various industries" }
];

/* Course outcomes: "Learners will be able to:" */
const OUTCOMES = [
  "Explain the fundamental concepts of Big Data Analytics, including its characteristics, importance, and real-world applications.",
  "Explain various data collection, storage, and processing techniques used in Big Data Analytics.",
  "Explain the challenges associated with managing large-scale data, including privacy, security, and ethical concerns.",
  "Analyze different analytical methods, including data visualization, statistical techniques, and predictive modeling.",
  "Analyze real-world case studies to understand the impact of Big Data Analytics in various domains such as business, healthcare, finance, and social sciences.",
  "Explain emerging trends in Big Data Analytics and identify potential career opportunities in data science, business intelligence, and related fields."
];

const TEXTBOOKS = [
  "Viktor Mayer-Schönberger and Kenneth Cukier, Big Data: A Revolution That Will Transform How We Live, Work, and Think (2013)",
  "Seema Acharya and Subhashini Chellappan, Big Data Analytics (2016)",
  "Nathan Marz and James Warren, Big Data: Principles and Best Practices of Scalable Real-time Data Systems"
];

const REFERENCES = [
  "Tom White, Hadoop: The Definitive Guide",
  "Foster Provost and Tom Fawcett, Data Science for Business: What You Need to Know about Data Mining and Data-Analytic Thinking",
  "Lillian Pierson, Data Science for Dummies"
];

/* Evaluation scheme */
const EVALUATION = {
  internal: 40,
  endSem: 60,
  continuous: [
    ["IAT-1", "15 marks"],
    ["IAT-2", "15 marks"],
    ["Average of IAT-1 & IAT-2", "15 marks"],
    ["Projects, presentation and assignments", "5 marks"],
    ["Semester End Examination (1 hour)", "30 marks"]
  ],
  paperFormat: [
    "The question paper will have three questions, each of 10 marks.",
    "All modules must be covered.",
    "All three questions need to be answered."
  ]
};

/* type: pdf | video | link | book | dataset */
const RESOURCES = [
  { type: "pdf", title: "Unit 1 lecture notes", note: "Introduction to Big Data", url: "files/unit1-notes.pdf" },
  { type: "pdf", title: "Previous year question papers", note: "Last 5 years", url: "files/question-papers.pdf" },
  { type: "video", title: "HDFS architecture explained", note: "NPTEL lecture", url: "https://nptel.ac.in" },
  { type: "link", title: "Apache Hadoop documentation", note: "Official docs", url: "https://hadoop.apache.org/docs/stable/" },
  { type: "link", title: "Apache Spark documentation", note: "Official docs", url: "https://spark.apache.org/docs/latest/" },
  { type: "link", title: "MongoDB University", note: "Free courses", url: "https://learn.mongodb.com" },
  { type: "dataset", title: "Kaggle datasets", note: "Practice data for Spark and Hive", url: "https://www.kaggle.com/datasets" },
  { type: "book", title: "Hadoop: The Definitive Guide", note: "Tom White", url: "" }
];
