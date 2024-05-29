FROM node:20-bullseye

# Define build-time variables
ARG PORT
ARG DB_PATH
ARG ALLOWED_HOSTS

# Set environment variables
ENV PORT=${PORT}
ENV DB_PATH=${DB_PATH}
ENV ALLOWED_HOSTS=${ALLOWED_HOSTS}

WORKDIR /app
EXPOSE 5055

COPY . .

RUN npm install

CMD ["npm", "start"]
