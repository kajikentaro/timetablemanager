FROM ruby:3.0.0-alpine as builder

WORKDIR /app

ENV RAILS_ENV="production"
ENV NODE_ENV="production"
RUN bundle config set --local deployment 'true'
RUN bundle config set --local without 'test development'

RUN apk add build-base libxml2-dev libxslt-dev git bash file imagemagick libpq libxml2 libxslt nodejs sqlite-dev tini tzdata yarn

COPY Gemfile .
COPY Gemfile.lock .

RUN bundle install

COPY . .
ENV SECRET_KEY_BASE=hogehoge
RUN bundle exec rails assets:precompile


FROM ruby:3.0.0-alpine as main
WORKDIR /app
RUN apk add tzdata
COPY --from=builder /app/vendor /app/vendor
COPY --from=builder /usr/local/bundle /usr/local/bundle
COPY --from=builder /app/public /app/public
COPY . .

ENV RAILS_ENV="production"
ENV RAILS_SERVE_STATIC_FILES="true"
ENV SECRET_KEY_BASE=hogehoge

RUN bundle exec rails db:migrate
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "3000"]
EXPOSE 3000
