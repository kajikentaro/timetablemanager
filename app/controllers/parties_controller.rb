class PartiesController < ApplicationController
  before_action :set_party, only: %i[ show edit update destroy ]

  # GET /parties or /parties.json
  def index
    @parties = Party.all
  end

  # GET /parties/1 or /parties/1.json
  def show
  end

  # GET /parties/new
  def new
    @party = Party.new
    if params[:name] == ""
      @party.name = "名無しのレジェンド団体"
    else
      @party.name = params[:name]
    end

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

  # GET /parties/1/edit
  def edit
  end

  # POST /parties or /parties.json
  def create
    @party = Party.new(party_params)

    respond_to do |format|
      if @party.save
        format.html { redirect_to @party, notice: "Party was successfully created." }
        format.json { render :show, status: :created, location: @party }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @party.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /parties/1 or /parties/1.json
  def update
    respond_to do |format|
      if @party.update(party_params)
        format.html { redirect_to @party, notice: "Party was successfully updated." }
        format.json { render :show, status: :ok, location: @party }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @party.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /parties/1 or /parties/1.json
  def destroy
    @party.destroy
    respond_to do |format|
      format.html { redirect_to parties_url, notice: "Party was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_party
      @party = Party.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def party_params
      params.fetch(:party, {})
    end
end
