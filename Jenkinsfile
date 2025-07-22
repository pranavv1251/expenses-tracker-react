pipeline {
  agent any

  environment {
    DOCKERHUB_USER = 'pranavv1251'
    DOCKERHUB_PASS = credentials('dockerhub-secret-token') // Add in Jenkins
    PATH = "/usr/local/bin:/usr/bin:/bin:$PATH"
  }

  stages {
    stage('Clone Repository') {
      steps {
        git branch: 'main', url: 'https://github.com/pranavv1251/expenses-tracker-react.git'
      }
    }

    stage('Debug Shell') {
      steps {
        sh 'echo "Working directory: $(pwd)"'
        sh 'ls -la'
        sh 'git branch'
      }
    }

    stage('Build Docker Images') {
      steps {
        sh 'docker build -t $DOCKERHUB_USER/expense-backend ./backend'
        sh 'docker build -t $DOCKERHUB_USER/expense-frontend ./expenses'  // updated path
      }
    }
    stage('Debug Env') {
      steps {
        sh 'echo "Logging in as $DOCKERHUB_USER"'
        sh 'echo "TOKEN LENGTH: ${#DOCKERHUB_PASS}"'
      }
    }

    stage('Docker Login') {
      // steps {
      //   sh 'echo $DOCKERHUB_PASS | docker login -u $DOCKERHUB_USER --password-stdin'
      // }
      steps {
        withCredentials([string(credentialsId: 'dockerhub-secret-token', variable: 'DOCKERHUB_PASS')]) {
          sh 'echo "$DOCKERHUB_PASS" | docker login -u "$DOCKERHUB_USER" --password-stdin'
        }
      }
    }

    stage('Push to Docker Hub') {
      steps {
        sh 'docker push $DOCKERHUB_USER/expense-backend'
        sh 'docker push $DOCKERHUB_USER/expense-frontend'
      }
    }

    stage('Deploy with Compose') {
      steps {
        sh 'docker-compose down'
        sh 'docker-compose up -d'
      }
    }
  }
}
