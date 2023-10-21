FROM ruby:3.0.6-bullseye as builder

WORKDIR /app

ENV RAILS_ENV="production"
ENV NODE_ENV="production"
RUN bundle config set --local deployment 'true'
RUN bundle config set --local without 'test development'

COPY Gemfile .
COPY Gemfile.lock .

RUN bundle install

COPY . .
ENV SECRET_KEY_BASE=hogehoge

RUN curl -fsSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | gpg --dearmor -o /usr/share/keyrings/nodesource-archive-keyring.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/nodesource-archive-keyring.gpg] https://deb.nodesource.com/node_16.x bullseye main" > /etc/apt/sources.list.d/nodesource.list \
    && apt-get update \
    && apt-get install -y nodejs
RUN npm install -g yarn

RUN bundle exec rails assets:precompile


FROM ruby:3.0.6-bullseye as main
WORKDIR /app
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
