My Study Tasks
This is a simple full-stack to-do application designed to help you manage your study tasks. It features a Node.js backend with an Express server and a vanilla JavaScript frontend. The application allows you to add, mark as complete, edit, and delete tasks.

Features
Create Tasks: Add new study tasks with a specified priority (low, medium, high).

Mark as Done: Easily mark tasks as completed.

Edit and Delete: Update existing task descriptions or remove tasks entirely.

Task Suggestions: The app provides helpful study suggestions based on keywords found in the task description (e.g., "math," "code," "read").

Performance Summary: A dashboard shows your total tasks, completed tasks, and a performance rate to track your progress.

API Endpoints: A RESTful API handles all CRUD (Create, Read, Update, Delete) operations for the tasks.

Files

server.js: The backend Express server. It handles API requests, serves the static frontend files, and manages the task data in a local 

tasks.json file.


public/index.html: The main user interface of the application. It includes the form for adding tasks, the list to display tasks, and the performance summary dashboard.


public/app.js: The frontend JavaScript that interacts with the backend API to fetch, add, update, and delete tasks dynamically without page reloads. It also contains the logic for task suggestions.


Dockerfile: Defines the environment for running the application in a Docker container. It uses the official Node.js LTS image, sets up the working directory, installs dependencies, and specifies the command to start the application. The container exposes port 3000.




tasks.json: A JSON file used by the backend to persist task data. It starts as an empty array 

[].


ecs-task-def.json: An Amazon ECS task definition file for deploying the application to AWS Fargate. It specifies the CPU and memory, container image, and port mappings.

Getting Started
To run this application locally, you will need Node.js and npm installed.

Clone the repository:

Bash

git clone [your-repository-url]
cd [your-repository-name]
Install dependencies:

Bash

npm install
Start the server:

Bash

node server.js
The server will run on http://localhost:3000.

Docker Deployment
The application can be containerized using Docker. The Dockerfile provides the necessary instructions.

Build the Docker image:

Bash

docker build -t my-study-tasks .
Run the container:

Bash

docker run -p 3000:3000 my-study-tasks
The app will be accessible at http://localhost:3000.

CI/CD with AWS ECS Fargate
This project is set up for continuous deployment to AWS using GitHub Actions.

AWS Setup:

Set up an AWS ECR repository for your Docker images.

Configure an ECS cluster and an ECS Fargate service.

Create an IAM user with permissions to push to ECR and deploy to ECS.

GitHub Secrets:
Add the following secrets to your GitHub repository under Settings > Secrets and variables > Actions:

AWS_ACCESS_KEY_ID: Your IAM user's access key ID.

AWS_SECRET_ACCESS_KEY: Your IAM user's secret access key.

AWS_REGION: The AWS region where your resources are located.

ECR_REPOSITORY: The name of your ECR repository.

ECS_CLUSTER: The name of your ECS cluster.

ECS_SERVICE: The name of your ECS service.

Deployment:
The .github/workflows/main.yml file is configured to automatically build and push a new Docker image to ECR and update the ECS service whenever a commit is pushed to the main branch.
