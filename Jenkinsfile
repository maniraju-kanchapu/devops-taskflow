pipeline {
    agent any

    environment {
        IMAGE_NAME = "pikachu126/devops-taskflow"
        IMAGE_TAG = "1.0"
        DOCKER_HOST = "npipe:////./pipe/dockerDesktopLinuxEngine"
    }

    stages {

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('Run Tests') {
            steps {
                bat 'npm test -- --runInBand'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %IMAGE_NAME%:%IMAGE_TAG% .'
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-taskflow',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    bat '''
                        docker logout
                        echo %DOCKER_PASSWORD% | docker login -u %DOCKER_USERNAME% --password-stdin

                        if errorlevel 1 exit /b 1

                        docker push %IMAGE_NAME%:%IMAGE_TAG%

                        if errorlevel 1 exit /b 1

                        docker logout
                    '''
                }
            }
        }
    }
}