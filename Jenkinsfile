pipeline {
    agent any
    //maven代理（直接从官网拉取maven镜像）
    //agent {
        //docker {
            //image 'maven:3-alpine'
            //args '-v /root/.m2:/root/.m2'
        //}
    //}
    //环境定义
    environment{
        //日志映射路径
        LOG_PATH = "/opt/log/"
        //服务名称
        SVN_FOLD = "tools-diagram"
        //部署远程服务器
        SSH_PATH = "master01"
        SVN_TYPE = "test"
        //镜像版本号
        image_tag = "1.0.0"
        //docker私服ip
        ip = "192.168.3.187:82"
    }
    //定时任务
    //triggers { pollSCM('H 4/* 0 0 1-5') }
    //triggers {
        //每天凌晨2点自动构建
    //    cron('H 2 * * *')
    //}
     options {
            // 设置保留的最大历史构建数为6
        buildDiscarder(logRotator(numToKeepStr: '6'))
     }
    //全局定义工具
    tools {
        //工具名称必须在Jenkins 管理Jenkins → 全局工具配置中预配置。
        nodejs 'node-v14.19.1'
    }
    stages {
        //清空
        stage('Clean') {
            steps {
                sh 'rm -rf dist/*'
            }
        }
        //构建
        stage('Node Build') {
            steps {
               nodejs('node-v14.19.1'){}
               //配置私有npm仓库
               sh 'npm config set registry http://mvn.hczy.top:8888/repository/hczy-npm/'
               //sh 'yarn config set registry http://mvn.hczy.top:8888/repository/hczy-npm/'
               // 配置后可通过下面方式来验证是否成功
               sh 'npm config get registry'
               //nodejs探针
               //sh 'npm install --save skywalking-backend-js'
               sh 'npm install skywalking-client-js --save'
               sh 'npm install'
               sh 'npm run build'
            }
        }
        stage('Docker Build') {
                    steps {
                       echo 'Building'
                       //分分支构建
                       script{
                            if(env.BRANCH_NAME=='test'){
                                //k8s分支
                                echo "start to build '${SVN_FOLD}-${SVN_TYPE}' on test ..."
                                 sh '''
                                    #docker rmi -f $(docker images | grep "none" | awk '{print $3}')
                                    CID=$(docker ps -a | grep "${SVN_FOLD}""-${SVN_TYPE}" | awk '{print $1}')
                                    #IID=$(docker images | grep "${SVN_FOLD}""-${SVN_TYPE}" | awk '{print $3}')
                                    IID=$(docker images | grep "none" | awk '{print $3}')
                                    if [ -n "$IID" ]; then
                                       echo "存在'${SVN_FOLD}-${SVN_TYPE}'镜像,IID='$IID'"
                                       cd "$WORKSPACE"/
                                       ##构建镜像到远程仓库
                                       docker login "${ip}" -u admin -p hczy123456
                                       #docker tag "${SVN_FOLD}":"${image_tag}" "${ip}"/hczy/"${SVN_FOLD}":"${image_tag}"
                                       docker build -t "${ip}"/hczy/"${SVN_FOLD}""-${SVN_TYPE}":"${image_tag}" .
                                       docker push "${ip}"/hczy/"${SVN_FOLD}""-${SVN_TYPE}":"${image_tag}"
                                    else
                                       echo "不存在'${SVN_FOLD}-${SVN_TYPE}'镜像,开始构建镜像"
                                       cd "$WORKSPACE"/
                                       ##构建镜像到远程仓库
                                       docker login "${ip}" -u admin -p hczy123456
                                       #docker tag "${SVN_FOLD}":"${image_tag}" "${ip}"/hczy/"${SVN_FOLD}":"${image_tag}"
                                       docker build -t "${ip}"/hczy/"${SVN_FOLD}""-${SVN_TYPE}":"${image_tag}" .
                                       docker push "${ip}"/hczy/"${SVN_FOLD}""-${SVN_TYPE}":"${image_tag}"
                                    fi
                                    '''
                                echo "Build '${SVN_FOLD}-${SVN_TYPE}' success on k8s ..."
                            }
                       }
 
                    }
                }
        //测试(暂时不用)
        //stage('test') {
            //steps {
                //sh './gradlew check'
                //sh 'mvn -f ${SVN_FOLD}/pom.xml test'
                //sh 'mvn -f ${SVN_FOLD}/pom.xml test'
            //}
        //}
        //部署
        stage('Deploy') {
            steps {
                echo 'Deploying'
                //分分支部署
                script{
                    if(env.BRANCH_NAME=='test'){
                        //k8s部署测试
                        echo "k8s部署测试"
                        echo "start to k8s '${SVN_FOLD}-${SVN_TYPE}' on test ..."
                        //调用Publish Over SSH插件，上传docker-compose.yaml文件并且执行deploy脚本
                        sshPublisher(publishers: [sshPublisherDesc(configName: "$SSH_PATH", transfers: [sshTransfer(cleanRemote: false, excludes: '', execCommand: """
                             #!/bin/bash
                             #使用k8s构建
                             kubectl delete -f /opt/k8s/h145-vue/tools-diagram-test.yaml
                             kubectl apply -f /opt/k8s/h145-vue/tools-diagram-test.yaml
                             exit 0
                         """, execTimeout: 120000, flatten: false, makeEmptyDirs: false, noDefaultExcludes: false, patternSeparator: '[, ]+', remoteDirectory: '/opt', remoteDirectorySDF: false, removePrefix: '', sourceFiles: 'output/*.*')], usePromotionTimestamp: false, useWorkspaceInPromotion: false, verbose: false)])
                    }
                }
            }
        }
    }
 
    //归档
    post {
        always {
            echo 'Archive artifacts'
            archiveArtifacts artifacts: "dist/**", excludes: "dist"
        }
    }
}