pipeline {
    agent any

    environment {
        IMAGE_NAME = "pikachu126/devops-taskflow"
        IMAGE_TAG = "1.0"
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
                        credentialsId: 'dockerhub-credentials',
                        usernameVariable: 'DOCKER_USERNAME',
                        passwordVariable: 'DOCKER_PASSWORD'
                    )
                ]) {
                    powershell '''
                        $env:DOCKER_PASSWORD | docker login -u $env:DOCKER_USERNAME --password-stdin

                        if ($LASTEXITCODE -ne 0) {
                            exit $LASTEXITCODE
                        }

                        docker push "$env:IMAGE_NAME`:$env:IMAGE_TAG"

                        if ($LASTEXITCODE -ne 0) {
                            exit $LASTEXITCODE
                        }

                        docker logout
                    '''
                }
            }
        }
    }
}