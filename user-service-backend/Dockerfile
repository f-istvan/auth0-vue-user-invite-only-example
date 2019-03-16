FROM node

COPY . /user-service-backend

WORKDIR /user-service-backend

RUN npm i

ENV HOST='0.0.0.0'

EXPOSE 2000

CMD ["npm", "run", "serve"]
