FROM node:14-alpine

WORKDIR /gatmauel/user-front
COPY . .

RUN apk add --no-cache tzdata 
ENV TZ Asia/Seoul

EXPOSE 3000

CMD [ "npm", "run", "start" ]



