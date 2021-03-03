class TimetablesController < ApplicationController
  before_action :set_timetable, only: %i[ show edit update destroy ]
  def result
    @timetables = []
    Timetable.find_each do |tt|
      @timetables.push(tt.attributes)
    end
  end

  def home
  end
  # GET /timetables or /timetables.json
  def index
    @timetables = Timetable.all
  end

  # GET /timetables/1 or /timetables/1.json
  def show
  end

  def newpost
    format.html {redirect_to 'new' }
    #new(params['name'])
  end
  # GET /timetables/new
  def new
    @timetable = Timetable.new
    @timetable.name = params[:name]
    @dates_str = ['','月','火','水','木','金','土','日']
    @times_str = [
    "1 <br> 9:00  <br> 10:40".html_safe,
    "2 <br> 10:50 <br> 12:30".html_safe,
    "3 <br> 13:20 <br> 15:00".html_safe,
    "4 <br> 15:10 <br> 16:50".html_safe,
    "5 <br> 17:00 <br> 18:40".html_safe,
    "6 <br> 18:50 <br> 20:30".html_safe,
    "7 <br> 20:40 <br> 22:20".html_safe
    ]
  end

  # GET /timetables/1/edit
  def edit
  end

  # POST /timetables or /timetables.json
  def create
    @timetable = Timetable.new(convHash)
    respond_to do |format|
      if @timetable.save
        format.html { redirect_to @timetable, notice: "Timetable was successfully created." }
        format.json { render :show, status: :created, location: @timetable }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @timetable.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /timetables/1 or /timetables/1.json
  def update
    respond_to do |format|
      if @timetable.update(timetable_params)
        format.html { redirect_to @timetable, notice: "Timetable was successfully updated." }
        format.json { render :show, status: :ok, location: @timetable }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @timetable.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /timetables/1 or /timetables/1.json
  def destroy
    @timetable.destroy
    respond_to do |format|
      format.html { redirect_to timetables_url, notice: "Timetable was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_timetable
      @timetable = Timetable.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def timetable_params
      params.fetch(:timetable, {})
    end
    
    def convHash
      input = request.body.read
      tmp = JSON.parse(input, symbolize_names:true)
      return tmp
    end
end
