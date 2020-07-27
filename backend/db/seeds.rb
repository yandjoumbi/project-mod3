# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Movie.destroy_all
Review.destroy_all

m1 = Movie.create(name: 'Avenger', average_rating: 3, image_url:'images/Avengers.jpg')
m2 = Movie.create(name: 'Power Ranger', average_rating: 2, image_url:'images/Power ranger.jpg')
m3 = Movie.create(name: 'Toys story', average_rating: 1, image_url:'images/Toy Story.jpg')
m4 = Movie.create(name: 'Titanic', average_rating: 2, image_url:'images/Titanic.jpg')
m5 = Movie.create(name: 'Harry Potter', average_rating: 1, image_url:'images/Harry potter.jpg')

r1 = Review.create(username: 'Eric', comment:'like it', rating:2, likes:1, movie_id: m1.id)
r1 = Review.create(username: 'Joe', comment:'lol', rating:1, likes:3, movie_id: m3.id)
r1 = Review.create(username: 'Frank', comment:'like it', rating:4, likes:2, movie_id: m5.id)