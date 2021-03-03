Rails.application.routes.draw do
  get 'timetables/home'
  post 'timetables/create'
  resources :tmps
  resources :timetables
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  #root 'application#hello'
  root 'application#index'
end
