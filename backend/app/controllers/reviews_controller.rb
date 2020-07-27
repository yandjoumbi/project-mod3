class ReviewsController < ApplicationController

    def index 
        reviews = Review.all 
        render json: reviews
    end

    def show
        review = Review.find_by(id: params[:id])
        render json: review
    end

    def update
        review = Review.update(likes: params[:likes])
        render json: review
    end

    def create
        review = Review.create(params)
        render json: review
    end
end
