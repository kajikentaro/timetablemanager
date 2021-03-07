class TimetablesController < ApplicationController
  before_action :set_party
  layout 'timetables'
  def result
    @timetables = Timetable.where(party:params[:party_id])
  end

  def view_gather2
    @timetables = Timetable.all
    @class_num = params[:id]
    @class_num2 = params[:id2]
  end

  def view_gather
    @timetables = Timetable.all
    @class_num = params[:id]
  end

  def distribution
    @timetables = Timetable.all
    set_TT
  end

  def history
    @timetables = Timetable.all
  end

  # GET /timetables or /timetables.json
  def index
    #@timetables = Timetable.all
  end

  # GET /timetables/1 or /timetables/1.json
  def show
    set_TT
    @timetable = Timetable.find_by(id:params[:id])
    @changeable = false
  end

  # GET /timetables/new
  def new
    @timetable = Timetable.new
    if params[:name] == ""
      @timetable.name = "名無しさん@お腹いっぱい。"
    else
      @timetable.name = params[:name]
    end
    @changeable = true
    set_TT
  end

  # GET /timetables/1/edit
  def edit
    @timetable = Timetable.find(params[:id])
    @changeable = true
    set_TT
  end

  # POST /timetables or /timetables.json
  def create
    @timetable = Timetable.new(convHash)
    @timetable.party = params[:party_id]
    if @timetable.save
      render json: true
    else
      render json: false
    end
  end

  # PATCH/PUT /timetables/1 or /timetables/1.json
  def update
    @timetable = Timetable.find(params[:id])
    if @timetable.update(convHash)
      render json: true
    else
      render json: false
    end
  end

  # DELETE /timetables/1 or /timetables/1.json
  def destroy
    @timetable = Timetable.find_by(id: params[:id])
    @timetable.destroy
    respond_to do |format|
      format.html { redirect_to action: 'history', notice: "Timetable was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    def set_TT
      @dates_str = JSON.parse(@party.dates)
      @times_str = JSON.parse(@party.times)
    end
    def set_party
      @party = Party.find_by(public_uid: params[:party_id])
    end
    def convHash
      input_raw = request.body.read
      input_json= JSON.parse(input_raw, symbolize_names:true)
      puts("debug:",input_json)
      params = ActionController::Parameters.new(input_json)
      puts("debug:", params)
      params_ok =  params.permit(:name,timetable: [])
      puts("debug:", params_ok)
      return params_ok
    end
end
