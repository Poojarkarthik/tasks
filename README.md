
# My Study Tasks

**My Study Tasks** is a simple full-stack to-do application designed to help you manage and track your study tasks.  
It features a **Node.js + Express backend** and a **vanilla JavaScript frontend**, allowing you to **create, edit, complete, and delete tasks** with ease.  

---

## Features

- **Create Tasks** – Add new study tasks with a specified priority (**low**, **medium**, **high**).  
- **Mark as Done** – Quickly mark tasks as completed.  
- **Edit & Delete** – Update task descriptions or remove tasks entirely.  
- **Task Suggestions** – Get helpful study suggestions based on keywords (e.g., *math*, *code*, *read*).  
- **Performance Summary** – A dashboard showing total tasks, completed tasks, and your progress rate.  
- **RESTful API** – Handles all **CRUD** operations (Create, Read, Update, Delete).  

---

## Project Structure

```
.
├── server.js               # Backend Express server
├── tasks.json              # Local JSON storage for tasks
├── public/
│   ├── index.html          # Main frontend interface
│   └── app.js              # Frontend JS (fetches & updates tasks dynamically)
├── Dockerfile              # Docker container configuration
├── ecs-task-def.json       # ECS task definition for AWS Fargate
└── .github/workflows/      # GitHub Actions CI/CD workflow
```

---

## Getting Started (Local Development)

### Prerequisites
- **Node.js** & **npm** installed

### Setup & Run
```bash
# Clone the repository
git clone <your-repository-url>
cd <your-repository-name>

# Install dependencies
npm install

# Start the server
node server.js
```

Your application will now be running at:  
**http://localhost:3000**

---

## Docker Deployment

You can containerize the app using Docker:

```bash
# Build the Docker image
docker build -t my-study-tasks .

# Run the container
docker run -p 3000:3000 my-study-tasks
```

Access the application at **http://localhost:3000**

---

## CI/CD with AWS ECS Fargate

This project supports **automatic deployment** to AWS using **GitHub Actions**.

### **AWS Setup**
1. Create an **ECR repository** to store your Docker images.
2. Configure an **ECS cluster** and an **ECS Fargate service**.
3. Create an **IAM user** with permissions for **ECR** and **ECS deployments**.

### **GitHub Secrets**  
Add these secrets in your repo:  
- `AWS_ACCESS_KEY_ID` – IAM access key  
- `AWS_SECRET_ACCESS_KEY` – IAM secret  
- `AWS_REGION` – Your AWS region  
- `ECR_REPOSITORY` – ECR repository name  
- `ECS_CLUSTER` – ECS cluster name  
- `ECS_SERVICE` – ECS service name  

### **Automatic Deployment**  
The workflow in `.github/workflows/main.yml` will:  
- Build & push the Docker image to ECR  
- Update the ECS Fargate service with the new image  

This runs **automatically** whenever you push to the `main` branch.

---

## Future Improvements
- User authentication  
- Database integration (e.g., DynamoDB, MongoDB)  
- Enhanced UI with React or Vue  

---

## License
This project is licensed under the **MIT License**.
