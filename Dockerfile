#FROM nginx:stable-alpine
FROM 192.168.3.187:82/common/nginx:stable
RUN rm -rf /etc/nginx/conf.d/default.conf
VOLUME /tmp
#将当前文件夹的dist文件复制到容器的/usr/share/nginx/html目录
ADD ./dist/ /usr/share/nginx/html/
#COPY ./dist/* /usr/share/nginx/html/
#COPY ./dist/assets /usr/share/nginx/html/assets/
#COPY ./dist/css /usr/share/nginx/html/css/
#COPY ./dist/fonts /usr/share/nginx/html/fonts/
#COPY ./dist/img /usr/share/nginx/html/img/
#COPY ./dist/loading /usr/share/nginx/html/loading/
#COPY ./dist/static /usr/share/nginx/html/static
#COPY default.conf /etc/nginx/conf.d/
COPY nginx.conf /etc/nginx/conf.d/nginx.conf
#声明运行时容器暴露的端口（容器提供的服务端口）
EXPOSE 8080
#CMD:指定容器启动时要运行的命令
CMD ["nginx", "-g", "daemon off;"]