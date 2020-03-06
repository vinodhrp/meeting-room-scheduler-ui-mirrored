pipeline {
    agent any

    stages {
        stage('Init'){
            steps {
               sh 'npm install'
               sh 'npm install -g @angular/cli@8'
            }
        }
        stage('Build'){
            steps {
               sh 'ng build --prod'
            }
        }
        stage('Deploy') {
            input {
                message "Do you want to proceed to deploy the front-end app to cloud?"
                ok "Yes"
            }
            steps {
                 withCredentials([[$class : 'UsernamePasswordMultiBinding',
                                  credentialsId   : 'KALAI_PCF_LOGIN',
                                  usernameVariable: 'USERNAME',
                                  passwordVariable: 'PASSWORD']]) {

                    sh '/usr/local/bin/cf login -a http://api.run.pivotal.io -u $USERNAME -p $PASSWORD'
                    sh '/usr/local/bin/cf target -s testing'
                    sh '/usr/local/bin/cf push'
                 }
            }
        }
    }
}
