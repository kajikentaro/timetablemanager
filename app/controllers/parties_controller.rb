class PartiesController < ApplicationController
  layout 'timetables'

  def start
      @party = Party.find_by(public_uid: params[:party_id])
  end
  # GET /parties or /parties.json
  def index

    @dates_str = ['','月','火','水','木','金']
    @times_str = [
    "1限\n9:00\n10:40".html_safe,
    "2限\n10:50\n12:30".html_safe,
    "3限\n13:20\n15:00".html_safe,
    "4限\n15:10\n16:50".html_safe,
    "5限\n17:00\n18:40".html_safe,
    "6限\n18:50\n20:30".html_safe,
  ]
  end

  # POST /parties or /parties.json
  def create
    @party = Party.new(convHash)
    if @party.save
      render json: {"id" =>@party.public_uid}
    else
      render json: false
    end
  end

  def update
    @party = Party.find_by(public_uid: params[:party_id])
    if @party.update(convHash)
      render json:true
    else
      render json:false
    end
  end

  private
    def convHash
      input = request.body.read
      print("!!!!!!!!!!!!",request.body.read)                                                                                         
      tmp = JSON.parse(input, symbolize_names:true)
      return tmp
    end
end
