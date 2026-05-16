pipeline {
    agent any

    environment {
        FIREBASE_TOKEN = credentials('firebase-token')
    }

    stages {

        // ─── Etapa 1: Instalación de dependencias ─────────
        stage('Install') {
            steps {
                echo '📦 Instalando dependencias...'
                dir('vue-project') {
                    sh 'npm install'
                }
            }
        }

        // ─── Etapa 2: Análisis de código ──────────────────
        stage('Lint') {
            steps {
                echo '🔍 Analizando calidad del código...'
                dir('vue-project') {
                    sh 'npm run lint'
                }
            }
        }

        // ─── Etapa 3: Ejecución de tests ──────────────────
        stage('Test') {
            steps {
                echo '🧪 Ejecutando tests...'
                dir('vue-project') {
                    sh 'npm run test:unit -- --run'
                }
            }
        }

        // ─── Etapa 4: Build del proyecto ──────────────────
        stage('Build') {
            steps {
                echo '🏗️ Compilando proyecto Vue...'
                dir('vue-project') {
                    sh 'npm run build'
                }
            }
        }

        // ─── Etapa 5: Deploy en Firebase ──────────────────
        stage('Deploy') {
            steps {
                echo '🚀 Desplegando en Firebase...'
                sh 'npm install -g firebase-tools'
                sh 'firebase deploy --token $FIREBASE_TOKEN --non-interactive'
            }
        }

    }

    // ─── Post ejecución ───────────────────────────────────
    post {
        success {
            echo '✅ Pipeline completado con éxito. App desplegada en Firebase.'
        }
        failure {
            echo '❌ Pipeline fallido. Revisa los logs.'
        }
    }
}