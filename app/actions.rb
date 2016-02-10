get '/' do
  erb :index
end

get '/contacts' do 
  @contacts = Contact.all
  @contacts.to_json
end

post '/contacts' do 
  first_name = params[:first_name]
  last_name = params[:last_name]
  email = params[:email]
  results = {result: false}

  contact = Contact.new(first_name: first_name, last_name: last_name, email: email)

  if contact.save
    results[:result] = true
  end
  results.to_json
end

get '/search' do 
  @contacts = Contact.search(params[:id],
                            params[:first_name],
                            params[:last_name],
                            params[:email])
  @contacts.to_json
end

post '/delete' do
  @contact = Contact.find params[:id]
  @contact.delete
  @contact.to_json
end
