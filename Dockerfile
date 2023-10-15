FROM oven/bun:latest

COPY . .

RUN cd backend && bun install

WORKDIR /home/bun/app/backend

CMD ["bun", "run", "dev"]