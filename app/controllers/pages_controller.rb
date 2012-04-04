class PagesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, :with => :record_not_found
 
  # GET /pages
  # GET /pages.json
  def index
    @pages = Page.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @pages }
    end
  end

  # GET /pages/1
  # GET /pages/1.json
  def show
    @page = Page.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @page }
    end
  end

  # GET /pages/new
  # GET /pages/new.json
  def new
    @page = Page.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @page }
    end
  end

  # GET /pages/1/edit
  def edit
    @page = Page.find(params[:id])
  end

  # POST /pages
  # POST /pages.json
  def create
    @page = Page.new(params[:page])

    respond_to do |format|
      if @page.save
        format.html { redirect_to @page, notice: 'Page was successfully created.' }
        format.json { render json: @page, status: :created, location: @page }
      else
        format.html { render action: "new" }
        format.json { render json: @page.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /pages/1
  # PUT /pages/1.json
  def update
    @page = Page.find(params[:id])
    
    Rails.logger.info "ID: #{params[:id]}"
    Rails.logger.info "BODY: #{params[:page][:body].inspect}"

    # Convert <div> line breaks to <p>
    params[:page][:body] = params[:page][:body].gsub(/\<div\>/, '<p>')
    params[:page][:body] = params[:page][:body].gsub(/\<\/div\>/, '</p>')
    params[:page][:body] = params[:page][:body].gsub(/\<p\>\<br\>\<\/p\>/, '')
    params[:page][:body] = params[:page][:body].gsub(/\<br\>/, '')
    
    respond_to do |format|
      if @page.update_attributes(params[:page])
        Rails.logger.info "UPDATED PAGE!"
        format.html { redirect_to @page, notice: 'Page was successfully updated.' }
        format.json { render :json => @page }
      else
        format.html { render action: "edit" }
        format.json { render json: @page.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /pages/1
  # DELETE /pages/1.json
  def destroy
    @page = Page.find(params[:id])
    @page.destroy

    respond_to do |format|
      format.html { redirect_to pages_url }
      format.json { head :no_content }
    end
  end

  private
 
  def record_not_found
    @page = params[:id]
    render :template => "pages/not_found", :status => 404
  end

end
