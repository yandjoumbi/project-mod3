# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Movie.destroy_all
Review.destroy_all

m1 = Movie.create(name: 'Avenger', average_rating: 3, image_url:'https://th.bing.com/th/id/OIP.4VT13rMR08wGs9NY_GLjwgHaLH?pid=Api&rs=1')
m2 = Movie.create(name: 'Power Ranger', average_rating: 2, image_url:'http://oyster.ignimgs.com/wordpress/stg.ign.com/2016/12/SabansPowerRangers-Aftershock_MainCover.jpg')
m3 = Movie.create(name: 'Toys story', average_rating: 1, image_url:'https://tvguide1.cbsistatic.com/feed/1/409/thumbs/98708409_1300x1733.jpg')
m4 = Movie.create(name: 'Titanic', average_rating: 2, image_url:'http://static.rogerebert.com/uploads/movie/movie_poster/titanic-1997/large_s2Z25JcBWS9tKAysSKuWyon5lwP.jpg')
m5 = Movie.create(name: 'Harry Potter', average_rating: 1, image_url:'https://static.rogerebert.com/uploads/movie/movie_poster/harry-potter-and-the-sorcerers-stone-2001/large_uLGaJ9FgPWf7EUgwjp9RTmHemw8.jpg')

r1 = Review.create(username: 'Eric', comment:'like it', rating:2, likes:1, movie_id: m1.id)
r1 = Review.create(username: 'Joe', comment:'lol', rating:1, likes:3, movie_id: m3.id)
r1 = Review.create(username: 'Frank', comment:'like it', rating:4, likes:2, movie_id: m5.id)