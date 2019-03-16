FROM node

COPY . /front-end

WORKDIR /front-end

RUN npm i

ENV HOST='0.0.0.0'

EXPOSE 8080

CMD ["npm", "run", "dev"]
