Rails.application.routes.draw do
  resources :tmps
  get 'parties', to: 'parties#index', as:'p_index'
  post 'parties', to: 'parties#create', as:'p_create'
  get 'parties/:party_id/start', to:'parties#start', as:'p_start'

  get  'tt/:party_id', to: 'timetables#index' , as:'tt_index'
  get  'tt/:party_id/new', to: 'timetables#new', as:'tt_new'
  get  'tt/:party_id/result', to: 'timetables#result', as:'tt_result'
  get  'tt/:party_id/history', to: 'timetables#history', as:'tt_history'
  get  'tt/:party_id/show/:id', to: 'timetables#show', as:'tt_show'
  get  'tt/:party_id/edit/:id', to: 'timetables#edit', as:'tt_edit'
  get  'tt/:party_id/distribution' , to: 'timetables#distribution', as:'tt_distribution'
  get  'tt/:party_id/view_gather/:id', to: 'timetables#view_gather', as:'tt_view_gather'
  get  'tt/:party_id/view_gather/:id/:id2', to: 'timetables#view_gather2', as:'tt_view_gather2'

  post 'tt/:party_id/create', to: 'timetables#create', as:'tt_create'
  patch 'tt/:party_id/:id', to: 'timetables#update', as:'tt_update'
  delete 'tt/:party_id/:id', to: 'timetables#destroy', as:'tt_destroy'
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  #root 'application#hello'
  root 'application#index'
end
