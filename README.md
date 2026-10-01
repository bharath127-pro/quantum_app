# Quantum Algorithm — Basic Full-Stack Prototype


## Features
- Demo login with Student / Instructor / Recruiter accounts
- Dashboard and learning paths
- Quantum Lab with demo gates and simulation API
- Quantum programming editor demo
- AI Tutor API with basic topic-aware responses
- Challenges
- Workforce profile and skill score
- Responsive UI

## Demo credentials
Student:
student@quantumdemo.com
student123

Instructor:
instructor@quantumdemo.com
teacher123

Recruiter:
recruiter@quantumdemo.com
recruiter123

## Run locally

1. Install Node.js.
2. Open a terminal in this folder.
3. Run:

npm install
npm start

4. Open:
http://localhost:3000

## Important
This is a prototype. Passwords are intentionally stored in memory for demo purposes, there is no real database/authentication, and the simulator is illustrative rather than a production quantum simulator.

For a production build, replace the demo auth with hashed passwords + JWT/session auth, add PostgreSQL/MongoDB, connect the Lab to a real quantum simulator such as Qiskit Aer, and connect the tutor to an LLM service.
