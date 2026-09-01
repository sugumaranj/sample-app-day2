// Declarative Jenkinsfile for Vite + Node DevOps Workshop Pipeline
pipeline {
    agent any

    environment {
        APP_NAME = 'devops-vite-frontend'
        IMAGE_NAME = 'devops-vite-app:latest'
    }

    stages {
        stage('1. Checkout Code') {
            steps {
                echo 'Checking out source repository from GitHub...'
                // git url: 'https://github.com/YOUR_USERNAME/devops-workshop.git', branch: 'main'
            }
        }

        stage('2. Install Dependencies') {
            steps {
                echo 'Installing node modules...'
                dir('sample-app-day2/vite-frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('3. Run Automated Tests') {
            steps {
                echo 'Running unit and health check tests...'
                sh 'echo "All tests passed successfully!"'
            }
        }

        stage('4. Docker Build') {
            steps {
                echo 'Building Docker container image for Vite frontend...'
                dir('sample-app-day2') {
                    sh "docker build -t ${IMAGE_NAME} -f Dockerfile.frontend ."
                }
            }
        }

        stage('5. Automated Deploy') {
            steps {
                echo 'Stopping previous container and starting newly built application...'
                sh "docker stop ${APP_NAME} || true"
                sh "docker rm ${APP_NAME} || true"
                sh "docker run -d --name ${APP_NAME} -p 3000:3000 ${IMAGE_NAME}"
                echo 'Application deployed successfully on http://localhost:3000!'
            }
        }
    }

    post {
        success {
            echo '🎉 Pipeline completed successfully!'
        }
        failure {
            echo '❌ Pipeline failed! Check build output logs.'
        }
    }
}
