pipeline {
    agent any

    environment {
        FIREBASE_TOKEN = credentials('firebase-token')
    }

    stages {

        stage('Install') {
            steps {
                echo '📦 Instalando dependencias...'
                dir('vue-project') {
                    bat 'npm install'
                }
            }
        }

        stage('Lint') {
            steps {
                echo '🔍 Analizando calidad del código...'
                dir('vue-project') {
                    bat 'npm run lint'
                }
            }
        }

        stage('Test') {
            steps {
                echo '🧪 Ejecutando tests...'
                dir('vue-project') {
                    bat 'npm run test:unit -- --run'
                }
            }
        }

        stage('Build') {
            steps {
                echo '🏗️ Compilando proyecto Vue...'
                dir('vue-project') {
                    bat 'npm run build'
                }
            }
        }

        stage('Deploy') {
        steps {
        echo '🚀 Desplegando en Firebase...'
        bat 'npm install -g firebase-tools'
        bat 'firebase deploy --token %FIREBASE_TOKEN% --non-interactive'
    }
}
    }

    post {
        success {
            echo '✅ Pipeline completado. App desplegada en Firebase.'
        }
        failure {
            echo '❌ Pipeline fallido. Revisa los logs.'
        }
    }
}