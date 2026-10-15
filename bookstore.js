// Step 2: 
// use bookstore 
db = db.getSiblingDB("bookstore")

// Step 3: load authors.json
// paste your drop and insertMany commands here
db.authors.drop()
doc = JSON.parse(fs.readFileSync("authors.json", "utf8"))
db.authors.insertMany(doc)

// Step 4: load books.json
// paste your drop and insertMany commands here
db.books.drop()
doc = JSON.parse(fs.readFileSync("books.json", "utf8"))
db.books.insertMany(doc)

// Step 5: list authors and books
// paste your find commands here
db.authors.find()
db.books.find()

// Step 6: insert two new books
// paste your insert commands here
db.books.insertMany([
    {
        title:'War and Peace',
        published_year:1869,
        author_ids:['author_004']
    },
    {
        title:"1984",
        published_year:1949,
        author_ids:['author_005']
    }
])

// Step 7: add missing authors
// paste your insert commands here
db.authors.insertMany([
    {
        _id:'author_004',
        name:'Lev Tolstoy',
        nationality:'Russian',
        bio: {
            short: 'Lev Tolstot was a Russian writer who wrote War and Peace, Anna Karenina, and many other great novels.',
            long: 'Lev Tolstoy was a Russian writer who wrote War and Peace, Anna Karenina, and many other great novels. He was born in 1828 and died in 1910. He is considered one of the greatest writers of all time.'
        }
    },
    {
        _id:'author_005',
        name:'George Orwell',
        nationality:'British',
        bio: {
            short: 'George Orwell was a British writer who wrote 1984 and Animal Farm.',
            long: 'George Orwell was a British writer who wrote 1984 and Animal Farm. He was born in 1903 and died in 1950. His works are known for their dystopian themes and social commentary.'
        }
    }
])

// Step 8: filter books by a list of authors
// paste your find command here
db.books.find({ author_ids: { $in: ["author_002", "author_005"] } })
