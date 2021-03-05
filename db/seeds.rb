# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Party.create(name: 'テストパーティー', dates: [
    "1 <br> 9:00  <br> 10:40".html_safe,
    "2 <br> 10:50 <br> 12:30".html_safe,
    "3 <br> 13:20 <br> 15:00".html_safe,
    "4 <br> 15:10 <br> 16:50".html_safe,
    "5 <br> 17:00 <br> 18:40".html_safe,
    "6 <br> 18:50 <br> 20:30".html_safe,
    "7 <br> 20:40 <br> 22:20".html_safe
    ])
		