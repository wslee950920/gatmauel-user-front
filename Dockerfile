FROM node:14-alpine

WORKDIR /gatmauel/user-front

COPY . .

RUN ["yarn",  "--network-timeout", "500000"]
RUN ["yarn", "build"]
RUN ["yarn", "build:server"]

CMD ["yarn", "start:server"]

EXPOSE 5000


