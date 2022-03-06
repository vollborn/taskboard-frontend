FROM node:16

# nginx setup
RUN apt-get update && apt-get install nginx -y

# build the app
ADD . /app
RUN cd /app && yarn && yarn build

# move files
WORKDIR /var/www/html
RUN rm -rf ./* && mv /app/dist/* . && rm -rf /app

EXPOSE 80

# start nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]
