Rails.application.routes.draw do
  devise_for :users
  resources :users, only: %i[edit update]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  resources :job_applications
  resources :job_submissions
  get 'welcome/spring_24_junior_rails_developer'

  # Defines the root path route ("/")
  root 'welcome#index'
  get 'contact_us' => 'welcome#contact_us'

  get '/dashboard' => 'admins#index'

  get '/job_submissions/:job_application_id/apply' => 'job_submissions#apply', as: :apply_job_submission
  get '/job_submissions/:id/manage' => 'job_submissions#manage', as: :manage_job_submission
  get '/job_submission/:id/notify' => 'job_submissions#notify', as: :notify_job_submission
  patch '/job_submission/:id/notify' => 'job_submissions#send_note', as: :send_note_job_submission

  post '/contact_us' => 'welcome#contact_us_email'

end
