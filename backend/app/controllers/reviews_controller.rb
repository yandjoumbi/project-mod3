class ReviewsController < ApplicationController

    def index 
        reviews = Review.all 
        render json: reviews
    end

    def show
        review = Review.find(id: params[:id])
        render json: review
    end

    def update
        review = Review.find(params[:id])
        review.update(review_params)
        render json: review
    end

    def create
        review = Review.create(review_params)
        render json: review
    end

    private

    def review_params
        params.require(:review).permit(:username, :comment, :rating, :likes, :movie_id)
    end
end
