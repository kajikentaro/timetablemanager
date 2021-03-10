class TimetablesController < ApplicationController
  before_action :set_party
  layout 'timetables'

  def index
  end

  def setting
    
  end

  def result
    set_TTs
  end

  def view_gather
    set_TTs
    @class_num = params[:id]
  end

  def view_gather2
    set_TTs
    @class_num = params[:id]
    @class_num2 = params[:id2]
  end

  def distribution
    set_TTs
  end

  def history
    set_TTs
  end


  # GET /timetables/1 or /timetables/1.json
  def show
    set_TT
    @timetable = Timetable.find_by(id:params[:id])
    @changeable = false
  end


  # GET /timetables/1/edit
  def edit
    set_TT
    @changeable = true
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
    set_TT
    if @timetable.update(convHash)
      render json: true
    else
      render json: false
    end
  end

  # DELETE /timetables/1 or /timetables/1.json
  def destroy
    set_TT
    @timetable.destroy
    respond_to do |format|
      format.html { redirect_to action: 'history', notice: "Timetable was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    def set_TTs
      @timetables = Timetable.where(party: params[:party_id])
    end
    def set_TT
      @timetable = Timetable.find_by(id: params[:id])
    end
    def set_party
      @party = Party.find_by(public_uid: params[:party_id])
      @dates_str = @party.dates
      @times_str = @party.times
    end
    def convHash
      input_raw = request.body.read
      input_json= JSON.parse(input_raw, symbolize_names:true)
      puts("debug:",input_json)
      params = ActionController::Parameters.new(input_json)
      puts("debug:", params)
      params_ok =  params.permit(:name,:group,timetable: [])
      puts("debug:", params_ok)
      return params_ok
    end
end
