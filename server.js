const ngrok = require("@ngrok/ngrok");
require("dotenv").config();

const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const { GoogleGenAI } = require("@google/genai");
const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });


const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});



app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));




const courses = [
  {
    id: 1,
    title: "Quantum Fundamentals",
    level: "Beginner",
    icon: "⚛️",
    description:
      "Learn the core ideas behind quantum computing, including qubits, superposition, measurement, gates and entanglement.",

    chapters: [
      {
        title: "Qubits and Quantum States",
        notes:
          "A qubit is the basic unit of quantum information. Unlike a classical bit, a qubit can be described by a quantum state that is a combination of |0> and |1>. Measurement produces a classical result.",

        resources: [
          {
            title: "IBM Quantum - Basics of Quantum Information",
            url: "https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information"
          },
          {
            title: "Quantum Country - Quantum Computing for the Very Curious",
            url: "https://quantum.country/qcvc"
          }
        ],

        videos: [
          {
            title: "How Qubits Really Work - Qiskit",
            url: "https://www.youtube.com/watch?v=HSM1GfukQMI"
          }
        ]
      },

      {
        title: "Superposition",
        notes:
          "Superposition allows a quantum state to be represented as a combination of basis states. When measured, the state produces a classical outcome according to the probabilities determined by its amplitudes.",

        resources: [
          {
            title: "Quantum Country",
            url: "https://quantum.country/"
          }
        ],

        videos: [
          {
            title: "Superposition: The Quantum Principle That Changes Everything - Qiskit",
            url: "https://www.youtube.com/watch?v=TZ-sUHK8vVQ"
          }
        ]
      },

      {
        title: "Quantum Measurement",
        notes:
          "Measurement converts quantum information into a classical result. The result is probabilistic and depends on the quantum state and the measurement basis.",

        resources: [
          {
            title: "IBM Quantum - Basics of Quantum Information",
            url: "https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information"
          }
        ],

        videos: [
          {
            title: "How Qubits Really Work - Qiskit",
            url: "https://www.youtube.com/watch?v=HSM1GfukQMI"
          }
        ]
      },

      {
        title: "Quantum Gates and Circuits",
        notes:
          "Quantum gates are operations that transform quantum states. A quantum circuit is a sequence of gates and measurements used to represent a quantum computation.",

        resources: [
          {
            title: "IBM Quantum Learning",
            url: "https://quantum.cloud.ibm.com/learning"
          }
        ],

        videos: [
          {
            title: "How Qubits Really Work - Qiskit",
            url: "https://www.youtube.com/watch?v=HSM1GfukQMI"
          }
        ]
      },

      {
        title: "Entanglement",
        notes:
          "Entanglement is a quantum correlation in which the state of a combined system cannot generally be represented as independent states of its parts. Bell states are important examples.",

        resources: [
          {
            title: "IBM Quantum - Basics of Quantum Information",
            url: "https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information"
          }
        ],

        videos: [
          {
            title: "Creating a Bell State in Qiskit",
            url: "https://www.youtube.com/watch?v=zsfcPf6adBA"
          }
        ]
      }
    ]
  },

  {
    id: 2,
    title: "Quantum Programming",
    level: "Intermediate",
    icon: "💻",
    description:
      "Learn how to create quantum circuits and write quantum programs using Qiskit.",

    chapters: [
      {
        title: "Introduction to Qiskit",
        notes:
          "Qiskit is an open-source software development kit for quantum computing. It can be used to construct quantum circuits and run quantum workflows.",

        resources: [
          {
            title: "IBM Quantum Learning",
            url: "https://quantum.cloud.ibm.com/learning"
          }
        ],

        videos: [
          {
            title: "Introduction to Qiskit - Qiskit",
            url: "https://www.youtube.com/watch?v=Tk9LOL9--Y4"
          }
        ]
      },

      {
        title: "Creating Quantum Circuits",
        notes:
          "A quantum circuit represents quantum operations in a defined sequence. In Qiskit, circuits can contain quantum gates, measurements and other instructions.",

        resources: [
          {
            title: "IBM Quantum Learning",
            url: "https://quantum.cloud.ibm.com/learning"
          }
        ],

        videos: [
          {
            title: "Introduction to Qiskit",
            url: "https://www.youtube.com/watch?v=Tk9LOL9--Y4"
          }
        ]
      },

      {
        title: "Quantum Gates in Qiskit",
        notes:
          "Quantum gates implement transformations on qubits. Common examples include X, H, Z and controlled gates.",

        resources: [
          {
            title: "Quantum Country",
            url: "https://quantum.country/qcvc"
          }
        ],

        videos: [
          {
            title: "Introduction to Qiskit",
            url: "https://www.youtube.com/watch?v=Tk9LOL9--Y4"
          }
        ]
      },

      {
        title: "Measurements and Results",
        notes:
          "Measurements turn quantum states into classical results. Quantum programs commonly collect repeated measurements to estimate the probability distribution of outcomes.",

        resources: [
          {
            title: "IBM Quantum Learning",
            url: "https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information"
          }
        ],

        videos: [
          {
            title: "Introduction to Qiskit",
            url: "https://www.youtube.com/watch?v=Tk9LOL9--Y4"
          }
        ]
      },

      {
        title: "Build a Bell State",
        notes:
          "A Bell state is a two-qubit entangled state. A common circuit creates one by applying a Hadamard gate followed by a controlled-X operation.",

        resources: [
          {
            title: "IBM Quantum Learning",
            url: "https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information"
          }
        ],

        videos: [
          {
            title: "Creating a Bell State in Qiskit",
            url: "https://www.youtube.com/watch?v=zsfcPf6adBA"
          }
        ]
      }
    ]
  }
];

const learnCourses = [
  {
    id: 1,
    title: "Quantum Fundamentals",
    level: "Beginner",
    icon: "⚛️",
    description:
      "Learn qubits, superposition, measurement, entanglement and quantum circuits.",
    lessons: 6,

    chapters: [
      {
        number: 1,
        title: "Qubits and Quantum States",
        notes:
          "A qubit is the basic unit of quantum information. Unlike a classical bit, a qubit can be represented as a combination of the states |0⟩ and |1⟩.",

        resources: [
          {
            title: "IBM Quantum — Basics of Quantum Information",
            url: "https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information"
          },
          {
            title: "Quantum Country — Quantum Computing",
            url: "https://quantum.country/qcvc"
          }
        ],

        videos: [
          {
            title: "Qiskit — How Qubits Really Work",
            url: "https://www.youtube.com/watch?v=HSM1GfukQMI"
          }
        ]
      },

      {
        number: 2,
        title: "Superposition and Measurement",
        notes:
          "Superposition allows a qubit to exist in a combination of basis states. When measured, the qubit produces a classical result according to its probabilities.",

        resources: [
          {
            title: "IBM Quantum — Basics of Quantum Information",
            url: "https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information"
          }
        ],

        videos: [
          {
            title: "Qiskit — Superposition",
            url: "https://www.youtube.com/watch?v=TZ-sUHK8vVQ"
          }
        ]
      },

      {
        number: 3,
        title: "Quantum Gates",
        notes:
          "Quantum gates are operations that change the state of qubits. Common gates include X, H and Z.",

        resources: [
          {
            title: "Quantum Country — Quantum Logic Gates",
            url: "https://quantum.country/qcvc"
          }
        ],

        videos: [
          {
            title: "Qiskit — Introduction to Qiskit",
            url: "https://www.youtube.com/watch?v=Tk9LOL9--Y4"
          }
        ]
      },

      {
        number: 4,
        title: "Quantum Circuits",
        notes:
          "A quantum circuit is a sequence of quantum operations applied to one or more qubits.",

        resources: [
          {
            title: "IBM Quantum — Basics of Quantum Information",
            url: "https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information"
          }
        ],

        videos: [
          {
            title: "Qiskit — Introduction to Qiskit",
            url: "https://www.youtube.com/watch?v=Tk9LOL9--Y4"
          }
        ]
      },

      {
        number: 5,
        title: "Entanglement and Bell States",
        notes:
          "Entanglement creates correlations between quantum systems that cannot be described as independent states. Bell states are common examples of two-qubit entanglement.",

        resources: [
          {
            title: "IBM Quantum — Basics of Quantum Information",
            url: "https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information"
          }
        ],

        videos: [
          {
            title: "Qiskit — Creating a Bell State",
            url: "https://www.youtube.com/watch?v=zsfcPf6adBA"
          }
        ]
      },

      {
        number: 6,
        title: "Teleportation and Quantum Applications",
        notes:
          "Quantum teleportation transfers an unknown quantum state using shared entanglement and classical communication.",

        resources: [
          {
            title: "Quantum Country",
            url: "https://quantum.country/"
          }
        ],

        videos: [
          {
            title: "Quantum Country — Quantum Computing",
            url: "https://quantum.country/"
          }
        ]
      }
    ]
  },

  {
    id: 2,
    title: "Quantum Programming",
    level: "Beginner–Intermediate",
    icon: "💻",
    description:
      "Learn to build and simulate quantum circuits using Qiskit.",
    lessons: 6,

    chapters: [
      {
        number: 1,
        title: "Introduction to Qiskit",
        notes:
          "Qiskit is an open-source software development kit used to create, simulate and run quantum circuits.",

        resources: [
          {
            title: "IBM Quantum",
            url: "https://quantum.cloud.ibm.com/"
          }
        ],

        videos: [
          {
            title: "Qiskit — Introduction to Qiskit",
            url: "https://www.youtube.com/watch?v=Tk9LOL9--Y4"
          }
        ]
      },

      {
        number: 2,
        title: "Create Your First Quantum Circuit",
        notes:
          "Create qubits, apply quantum gates, measure the qubits and execute the circuit using a simulator.",

        resources: [
          {
            title: "IBM Quantum Learning",
            url: "https://learning.quantum.ibm.com/"
          }
        ],

        videos: [
          {
            title: "Qiskit — Introduction to Qiskit",
            url: "https://www.youtube.com/watch?v=Tk9LOL9--Y4"
          }
        ]
      },

      {
        number: 3,
        title: "Gates and Circuit Operations",
        notes:
          "Use gates such as X, H and controlled operations to transform quantum states.",

        resources: [
          {
            title: "Quantum Country",
            url: "https://quantum.country/qcvc"
          }
        ],

        videos: [
          {
            title: "Qiskit — Introduction to Qiskit",
            url: "https://www.youtube.com/watch?v=Tk9LOL9--Y4"
          }
        ]
      },

      {
        number: 4,
        title: "Measurement and Results",
        notes:
          "Measurement converts quantum information into classical results. Repeated circuit executions produce a distribution of results.",

        resources: [
          {
            title: "IBM Quantum — Basics of Quantum Information",
            url: "https://quantum.cloud.ibm.com/learning/en/courses/basics-of-quantum-information"
          }
        ],

        videos: [
          {
            title: "Qiskit — How Qubits Really Work",
            url: "https://www.youtube.com/watch?v=HSM1GfukQMI"
          }
        ]
      },

      {
        number: 5,
        title: "Bell State Programming",
        notes:
          "A Hadamard gate followed by a controlled-X gate can create a Bell state, which is a basic example of quantum entanglement.",

        resources: [
          {
            title: "IBM Quantum Learning",
            url: "https://learning.quantum.ibm.com/"
          }
        ],

        videos: [
          {
            title: "Qiskit — Creating a Bell State",
            url: "https://www.youtube.com/watch?v=zsfcPf6adBA"
          }
        ]
      },

      {
        number: 6,
        title: "Running and Understanding Results",
        notes:
          "Run quantum circuits repeatedly, inspect the results and understand probabilities and measurement counts.",

        resources: [
          {
            title: "IBM Quantum Learning",
            url: "https://learning.quantum.ibm.com/"
          }
        ],

        videos: [
          {
            title: "Qiskit — How to Sample a Bell State",
            url: "https://www.youtube.com/watch?v=9MOIBcYf9wk"
          }
        ]
      }
    ]
  }
];

const challenges = [
  { id: 1, title: "Create a Superposition", difficulty: "Beginner", xp: 50 },
  { id: 2, title: "Build a Bell State", difficulty: "Intermediate", xp: 100 },
  { id: 3, title: "Grover Search Circuit", difficulty: "Advanced", xp: 250 }
];

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", platform: "Quantum Algorithm" });
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required."
    });
  }

  try {
    const user = await User.findOne({
      email: email.trim().toLowerCase()
    });

    if (!user || user.password !== password) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const safeUser = user.toObject();

    delete safeUser.password;

    safeUser.id = user._id.toString();

    res.json({
      message: "Login successful",
      user: safeUser
    });

  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Unable to login."
    });
  }
});

app.post("/api/register", async (req, res) => {
  const { name, email, password, role } = req.body || {};

  // Check required fields
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Name, email and password are required."
    });
  }

  try {
    // Clean the email
    const cleanEmail = email.trim().toLowerCase();

    // Check whether this email already exists
    const existingUser = await User.findOne({
      email: cleanEmail
    });

    if (existingUser) {
      return res.status(409).json({
        message: "An account with this email already exists."
      });
    }

    // Create the new user in MongoDB
    const newUser = await User.create({
      name: name.trim(),
      email: cleanEmail,
      password: password,
      role: role || "student",
      department: "",
      progress: 0,
      skillScore: 0
    });

    // Remove password before sending user data to frontend
    const safeUser = newUser.toObject();
    delete safeUser.password;

    // Send success response
    res.status(201).json({
      message: "Account created successfully.",
      user: safeUser
    });

  } catch (error) {
    console.error("Registration error:", error);

    res.status(500).json({
      message: "Server error during registration."
    });
  }
});





app.get("/api/course/:id", async (req, res) => {

  try {

    const courseId = Number(req.params.id);
    const userId = req.query.userId;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        message: "Invalid user ID."
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    const course = learnCourses.find(
      c => c.id === courseId
    );

    if (!course) {
      return res.status(404).json({
        message: "Course not found."
      });
    }

    const chapters = course.chapters.map(
      (chapter, index) => {

        const lessonNumber = index + 1;

        const key =
          `${course.id}-${lessonNumber}`;

        return {
          ...chapter,
          completed:
            !!user.completedLessons?.[key]
        };
      }
    );

    res.json({
      id: course.id,
      title: course.title,
      level: course.level,
      icon: course.icon,
      description: course.description,
      lessons: course.lessons,
      progress:
        user.courseProgress?.[course.id] || 0,
      chapters
    });

  } catch (error) {

    console.error("Course detail error:", error);

    res.status(500).json({
      message: "Unable to load course."
    });
  }
});


app.get("/api/learn-courses", async (req, res) => {
  const userId = req.query.userId;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    const result = learnCourses.map(course => {

      const completedLessons = Object.keys(
        user.completedLessons || {}
      )
        .filter(key =>
          key.startsWith(`${course.id}-`)
        )
        .map(key =>
          Number(key.split("-")[1])
        );

      return {
        ...course,
        progress:
          user.courseProgress?.[course.id] || 0,

        completedLessons
      };
    });

    res.json(result);

  } catch (error) {

    console.error(
      "Learn courses error:",
      error
    );

    res.status(500).json({
      message:
        "Unable to load learning courses."
    });
  }
});


app.post("/api/lesson/complete", async (req, res) => {
  const { userId, courseId, lessonNumber } = req.body || {};

  try {
    const user = await User.findById(userId);
    const course = learnCourses.find(c => c.id === Number(courseId));
    

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    if (!course) {
      return res.status(404).json({
        message: "Course not found."
      });
    }

    if (!lessonNumber) {
      return res.status(400).json({
        message: "Lesson number is required."
      });
    }

    if (!user.courseProgress) {
      user.courseProgress = {
        1: 0,
        2: 0,
        3: 0,
        4: 0
      };
    }

    if (!user.completedLessons) {
      user.completedLessons = {};
    }

    const key = `${courseId}-${lessonNumber}`;

    if (user.completedLessons[key]) {
      return res.json({
        message: "Lesson already completed.",
        progress: user.courseProgress[courseId] || 0,
        skillScore: user.skillScore
      });
    }

    user.completedLessons[key] = true;

    const completedCount = Object.keys(user.completedLessons)
      .filter(k => k.startsWith(`${courseId}-`))
      .length;

    const progress = Math.min(
      100,
      Math.round((completedCount / course.lessons) * 100)
    );

    user.courseProgress[courseId] = progress;

    user.skillScore += 10;

    const totalProgress = Object.values(user.courseProgress)
      .reduce((sum, value) => sum + value, 0);

    
      user.progress = Math.round(
  totalProgress / learnCourses.length
);

    user.markModified("courseProgress");
    user.markModified("completedLessons");

    await user.save();

    res.json({
      message: "Lesson completed successfully.",
      courseId,
      lessonNumber,
      progress,
      skillScore: user.skillScore,
      overallProgress: user.progress,
      pointsAdded: 10
    });

  } catch (error) {
    console.error("Lesson completion error:", error);

    res.status(500).json({
      message: "Unable to complete lesson."
    });
  }
});



app.get("/api/challenges", (req, res) => {
  res.json(challenges);
});

app.post("/api/simulate", (req, res) => {
  const gates = Array.isArray(req.body?.gates) ? req.body.gates : [];

  if (!gates.length) {
    return res.status(400).json({ message: "Add at least one gate." });
  }

  const hasH = gates.includes("H");
  const hasCX = gates.includes("CX");

  let result;
  let explanation;

  if (hasH && hasCX) {
    result = [
      { state: "|00⟩", probability: 50 },
      { state: "|11⟩", probability: 50 }
    ];
    explanation = "Demo Bell-state style output: H followed by CX creates correlated measurements.";
  } else if (hasH) {
    result = [
      { state: "|0⟩", probability: 50 },
      { state: "|1⟩", probability: 50 }
    ];
    explanation = "The Hadamard gate places the qubit into an equal superposition in this demo.";
  } else {
    result = [
      { state: "|0⟩", probability: 100 },
      { state: "|1⟩", probability: 0 }
    ];
    explanation = "This demo keeps the initial computational state unless a Hadamard gate is used.";
  }

  res.json({ gates, result, explanation });
});


app.post("/api/tutor", async (req, res) => {
  const question = String(req.body?.question || "").trim();

  if (!question) {
    return res.status(400).json({
      message: "Please enter a question."
    });
  }

  const prompt = `
You are Quantum Tutor for college students.

Answer the student's question in simple and easy English.

IMPORTANT RULES:

For normal questions:
Give a short answer.
Use 3 to 5 short sentences.
Put each sentence on a new line.
Do not use Markdown.
Do not use #.
Do not use *.
Do not use bullet points.
Do not use unnecessary symbols.

For programming questions:
Give the answer exactly in this format:

Step 1:
Explain what the program does in 1 or 2 simple sentences.

Step 2:
Give the complete program.

Step 3:
Explain the important lines.

Step 4:
Show the expected output.

Each Step must be in a separate line.
Leave a blank line between every step.

For numerical questions:
Use:

Step 1: Given

Step 2: Formula

Step 3: Substitution

Step 4: Calculation

Step 5: Final Answer

Keep every step on a separate line.

For programming code:
Give clean beginner-friendly code.
Do not put explanations inside the code unless necessary.

Do not use Markdown formatting.

Student Question:
${question}
`;

  try {
    const models = [
      "gemini-3.7-flash",
      "gemini-3.6-flash"
    ];

    let response = null;
    let lastError = null;

    for (const model of models) {
      try {
        console.log("Trying Gemini model:", model);

        response = await ai.models.generateContent({
          model: model,
          contents: prompt
        });

        console.log("Gemini model used successfully:", model);
        break;

      } catch (error) {
        lastError = error;

        console.error(
          `Model ${model} failed:`,
          error?.message || error
        );

        console.log("Trying the next model...");
      }
    }

    if (!response) {
      throw lastError || new Error("Both Gemini models failed.");
    }

    let answer = response.text || "";

    // Remove Markdown formatting without damaging code operators
    answer = answer
      .replace(/```[a-zA-Z0-9_-]*\n?/g, "")
      .replace(/```/g, "")
      .replace(/^\s*#{1,6}\s*/gm, "")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .trim();

    res.json({
      question: question,
      answer: answer
    });

  } catch (error) {
    console.error("Gemini API Error:", error);
    console.error("Status:", error?.status || error?.statusCode);
    console.error("Message:", error?.message);

    res.status(500).json({
      message: "Both Gemini AI models are currently unavailable."
    });
  }
});



app.get("/api/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    const safeUser = user.toObject();

    delete safeUser.password;

    safeUser.id = user._id.toString();

    res.json({
      ...safeUser,

      projects: user.projectsBuilt || 0,

      challengesCompleted: user.challengesCompleted || 0,

      certificates: 0,

      badges: [
        "Quantum Starter",
        "Circuit Builder",
        "Challenge Master"
      ]
    });

  } catch (error) {
    console.error("Profile error:", error);

    res.status(500).json({
      message: "Unable to load profile."
    });
  }
});




app.listen(PORT, async () => {
    console.log(`Server running on http://localhost:${PORT}`);

    try {
        const url = await ngrok.forward({
            addr: PORT,
            authtoken_from_env: true
        });

        console.log(`Public URL: ${url.url()}`);
    } catch (error) {
        console.error("ngrok error:", error);
    }
});


app.post("/api/project/complete", async (req, res) => {
  const { userId, projectId } = req.body || {};

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    if (!projectId) {
      return res.status(400).json({
        message: "Project ID is required."
      });
    }

    if (!user.completedProjects) {
      user.completedProjects = {};
    }

    const key = String(projectId);

    if (user.completedProjects[key]) {
      return res.json({
        message: "Project already completed.",
        projectsBuilt: user.projectsBuilt,
        skillScore: user.skillScore
      });
    }

    user.completedProjects[key] = true;
    user.projectsBuilt += 1;
    user.skillScore += 50;

    user.markModified("completedProjects");

    await user.save();

    res.json({
      message: "Project completed successfully.",
      projectsBuilt: user.projectsBuilt,
      skillScore: user.skillScore
    });

  } catch (error) {
    console.error("Project completion error:", error);

    res.status(500).json({
      message: "Unable to complete project."
    });
  }
});

app.post("/api/challenge/complete", async (req, res) => {
  const { userId, challengeId } = req.body || {};

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found."
      });
    }

    const challenge = challenges.find(
      c => c.id === Number(challengeId)
    );

    if (!challenge) {
      return res.status(404).json({
        message: "Challenge not found."
      });
    }

    if (!user.completedChallenges) {
      user.completedChallenges = {};
    }

    const key = String(challengeId);

    if (user.completedChallenges[key]) {
      return res.json({
        message: "Challenge already completed.",
        challengesCompleted: user.challengesCompleted,
        skillScore: user.skillScore
      });
    }

    user.completedChallenges[key] = true;
    user.challengesCompleted += 1;
    user.skillScore += challenge.xp;

    user.markModified("completedChallenges");

    await user.save();

    res.json({
      message: "Challenge completed successfully.",
      challengesCompleted: user.challengesCompleted,
      skillScore: user.skillScore
    });

  } catch (error) {
    console.error("Challenge completion error:", error);

    res.status(500).json({
      message: "Unable to complete challenge."
    });
  }
});