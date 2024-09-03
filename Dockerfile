# https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile
FROM public.ecr.aws/docker/library/node:18.20.3-alpine as base

FROM base as deps
WORKDIR /frontend
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn

RUN yarn install

FROM base as builder
WORKDIR /frontend
COPY . .
COPY --from=deps /frontend/.yarn ./.yarn

RUN yarn build

FROM base as runner
WORKDIR /frontend

COPY --from=builder /frontend/public ./public

COPY --from=deps /frontend/.yarn ./.yarn
COPY --from=deps /frontend/package.json ./package.json
COPY --from=deps /frontend/yarn.lock ./yarn.lock
COPY --from=deps /frontend/.yarnrc.yml ./.yarnrc.yml
COPY --from=deps /frontend/.pnp.cjs ./.pnp.cjs
COPY --from=deps /frontend/.pnp.loader.mjs ./.pnp.loader.mjs
COPY --from=builder /frontend/.next/static ./.next/static
COPY --from=builder /frontend/.next/standalone/.next ./.next

EXPOSE 3000
# ENV NODE_ENV production
ENV HOSTNAME "0.0.0.0"
CMD ["yarn", "start"]
