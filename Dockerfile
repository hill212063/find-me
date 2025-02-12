FROM node:22-alpine
WORKDIR /code
EXPOSE 3000
COPY ./out/ .
CMD ["npm", "run", "dev"]
