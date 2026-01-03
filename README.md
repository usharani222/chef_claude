<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>ChefClaude – AI Recipe Recommendation System</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      line-height: 1.6;
      margin: 40px;
      background-color: #fafafa;
      color: #333;
    }
    h1, h2, h3 {
      color: #2c3e50;
    }
    code {
      background: #eee;
      padding: 2px 6px;
      border-radius: 4px;
    }
    pre {
      background: #1e1e1e;
      color: #f1f1f1;
      padding: 15px;
      overflow-x: auto;
      border-radius: 6px;
    }
    ul {
      margin-left: 20px;
    }
    .section {
      margin-bottom: 40px;
    }
    .highlight {
      background: #eaf6ff;
      padding: 10px;
      border-left: 5px solid #3498db;
    }
  </style>
</head>

<body>

<h1>🍳 ChefClaude – AI-Based Recipe Recommendation System</h1>

<p>
ChefClaude is a full-stack web application that allows users to register, log in, 
and explore personalized recipes. It demonstrates secure authentication, 
modern backend architecture, and a deployed full-stack workflow.
</p>

<div class="section">
  <h2>🚀 Live Demo</h2>
  <ul>
    <li><b>Frontend:</b> https://chefclaude-lilac.vercel.app</li>
    <li><b>Backend API:</b> https://chef-claude-76pn.onrender.com</li>
  </ul>
</div>

<div class="section">
  <h2>🛠 Tech Stack</h2>
  <ul>
    <li><b>Frontend:</b> React.js, HTML, CSS</li>
    <li><b>Backend:</b> FastAPI (Python)</li>
    <li><b>Database:</b> PostgreSQL</li>
    <li><b>Authentication:</b> JWT (OAuth2 Password Flow)</li>
    <li><b>ORM:</b> SQLAlchemy</li>
    <li><b>Deployment:</b> Vercel (Frontend), Render (Backend)</li>
    <li><b>Containerization:</b> Docker & Docker Compose</li>
  </ul>
</div>

<div class="section">
  <h2>📂 Project Structure</h2>
  <pre>
chef_claude/
│
├── backend/
│   ├── app/
│   │   ├── auth/
│   │   ├── db/
│   │   ├── routes/
│   │   ├── schemas/
│   │   └── main.py
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.html
  </pre>
</div>

<div class="section">
  <h2>🔐 Authentication Flow</h2>
  <ol>
    <li>User registers using email, username, and password</li>
    <li>Password is securely hashed using bcrypt</li>
    <li>User logs in via OAuth2 password flow</li>
    <li>Backend generates a JWT access token</li>
    <li>Token is stored in browser localStorage</li>
    <li>Protected API routes require valid JWT</li>
  </ol>

  <div class="highlight">
    <b>Why JWT?</b><br/>
    JWT enables stateless authentication, making the backend scalable and suitable
    for modern cloud deployments.
  </div>
</div>

<div class="section">
  <h2>🌐 API Endpoints</h2>
  <ul>
    <li><code>POST /auth/register</code> – Register new user</li>
    <li><code>POST /auth/login</code> – Login & receive JWT token</li>
    <li><code>GET /users</code> – Fetch users (protected)</li>
    <li><code>GET /recipes</code> – Fetch recipes</li>
  </ul>
</div>

<div class="section">
  <h2>🐳 Docker & Local Setup</h2>
  <p>Run backend and database using Docker Compose:</p>

  <pre>
docker compose up --build
  </pre>

  <p>
This starts:
<ul>
  <li>FastAPI backend</li>
  <li>PostgreSQL database</li>
</ul>
  </p>
</div>

<div class="section">
  <h2>⚠️ Challenges Faced & Solutions</h2>
  <ul>
    <li><b>CORS Issues:</b> Resolved using FastAPI CORSMiddleware</li>
    <li><b>Database initialization:</b> Auto table creation using SQLAlchemy</li>
    <li><b>Auth mismatch:</b> Corrected request formats for login vs register</li>
    <li><b>Deployment errors:</b> Fixed environment variables and API URLs</li>
  </ul>
</div>

<div class="section">
  <h2>🎯 Key Learnings</h2>
  <ul>
    <li>End-to-end authentication implementation</li>
    <li>Backend containerization using Docker</li>
    <li>Frontend–backend integration in production</li>
    <li>Debugging real-world deployment issues</li>
  </ul>
</div>

<div class="section">
  <h2>👩‍💻 Author</h2>
  <p>
    <b>Usha Rani</b><br/>
    Aspiring Software Engineer | Full Stack Developer<br/>
    Passionate about building real-world, scalable applications
  </p>
</div>

</body>
</html>
