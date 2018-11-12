FROM node:11.1.0-alpine as node-angular-cli

WORKDIR /app

EXPOSE 4200

RUN npm install -g --unsafe-perm node-sass@4.10.0
RUN npm install -g @angular/cli@7.0.5


CMD ["/bin/sh"]

#docker build --rm -f Dockerfile  -t angular-cli-docker:7.0.4 .
#docker run -i -t angular-cli-docker:7.0.4 /bin/sh

