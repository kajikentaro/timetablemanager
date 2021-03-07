Rails.application.routes.draw do
  resources :parties do
    get 'timetables/new'
    get 'timetables/home'
    get 'timetables/result'
    get 'timetables/history'
    get 'timetables/distribution' 
    get 'timetables/view_gather/:id', to: 'timetables#view_gather'
    get 'timetables/view_gather/:id/:id2', to: 'timetables#view_gather2'
    get 'timetables/view_gather', to: 'timetables#home'
    post 'timetables/create'
    post 'timetables/update'
    resources :timetables
  end
  post 'parties/:id/update', to:'parties#update'
  get 'parties/:id/start', to:'parties#start'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  #root 'application#hello'
  root 'application#index'
end
