class Api::FeedsController < ApplicationController
  before_action :require_login

  def index
    sql_join = "LEFT OUTER JOIN subscriptions
    ON subscriptions.feed_id = feeds.id
    AND subscriptions.subscriber_id = #{current_user.id}"

    if params[:q].try(:empty?)
      @feeds = Feed.popular
        .select("feeds.*, subscriptions.subscriber_id as followed")
        .where("subscriptions.subscriber_id IS NULL")
        .joins(sql_join)
    else
      @q = Feed.ransack(title_or_rss_url_or_description_cont: params[:q])
      @feeds = @q.result
        .select("feeds.*, subscriptions.subscriber_id as followed")
        .joins(sql_join)
        .limit(20)
    end
  end

  def show
    @feed = Feed
      .includes(:stories, :subscriptions)
      .find_by(id: params[:id])
    render :show
  end

  private

  def ensure_feed
    @feed = Feed.find_by(rss_url: feed_params[:rss_url])

    if @feed.nil?
      @feed = Feed.new(rss_url: feed_params[:rss_url])
      unless @feed.save
        render json: @feed.errors.full_messages, status: 422
        # this will stop subscribe action
      end
    end
  end

  def feed_params
    params.require(:feed).permit(:rss_url, :title)
  end

end
