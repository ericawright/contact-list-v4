# Homepage (Root path)
get '/' do
  erb :index
end

post '/' do
  @contact = Contact.new(
    first_name: params[:first_name],
    last_name: params[:last_name],
    email: params[:email]
    )
  @phone_number = PhoneNumber.new(
    phone_number: params[:phone_number]
    )
  @contact.phone_numbers << @phone_number
  @contact.save
  @phone_number.save
end

get '/contacts' do

  contacts = Contact.all
    if params[:lookup] !=  ''
      search = params[:lookup]
      contacts = contacts.where("first_name LIKE ? OR last_name LIKE ? OR email LIKE ?", "%#{search}%", "%#{search}%", "%#{search}%")
    end
  content_type :json
  contacts.to_json
end


