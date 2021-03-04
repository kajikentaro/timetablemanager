Rails.application.routes.draw do
  get 'timetables/new'
  get 'timetables/home'
  get 'timetables/result'
  get 'timetables/history'
  get 'timetables/distribution' 
  get 'timetables/view_gather'
  post 'timetables/create'
  post 'timetables/update'
  resources :tmps
  resources :timetables
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  #root 'application#hello'
  root 'application#index'
end
