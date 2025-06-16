//Find all books in a specific genre
db.books.find({ genre: "Fiction" });

//2️⃣ Find books published after a certain year
db.books.find({ published_year: { $gt: 2000 } });

//3️⃣ Find books by a specific author
db.books.find({ author: "George Orwell" });

//4️⃣ Update the price of a specific book
db.books.updateOne(
    { title: "1984" },
    { $set: { price: 13.99 } }
  );

  //5️⃣ Delete a book by its title
  db.books.deleteOne({ title: "Moby Dick" });

  //✅ Find books that are both in stock and published after 2010
  db.books.find({ in_stock: true, published_year: { $gt: 2010 } });

  //✅ Use projection to return only title, author, and price
  db.books.find({}, { title: 1, author: 1, price: 1, _id: 0 });

  //✅ Sort books by price (ascending)
  db.books.find().sort({ price: 1 });

//✅ Sort books by price (descending)
db.books.find().sort({ price: -1 });

//✅ Pagination: Limit & Skip (5 books per page)
//Page 1:
db.books.find().limit(5);
//Page 2:
db.books.find().skip(5).limit(5);

//1️⃣ Average price of books by genre
db.books.aggregate([
    { $group: { _id: "$genre", averagePrice: { $avg: "$price" } } }
  ]);

  //2️⃣ Author with the most books
  db.books.aggregate([
    { $group: { _id: "$author", bookCount: { $sum: 1 } } },
    { $sort: { bookCount: -1 } },
    { $limit: 1 }
  ]);

  //3️⃣ Group books by publication decade and count
  db.books.aggregate([
    {
      $group: {
        _id: { $subtract: [ { $divide: [ "$published_year", 10 ] }, { $mod: [ { $divide: [ "$published_year", 10 ] }, 1 ] } ] },
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        decade: { $concat: [ { $toString: { $multiply: [ "$_id", 10 ] } }, "s" ] },
        count: 1,
        _id: 0
      }
    }
  ]);

  //1️⃣ Create an index on the title field
  db.books.createIndex({ title: 1 });

  //2️⃣ Create a compound index on author and published_year
  db.books.createIndex({ author: 1, published_year: -1 });

  //3️⃣ Use explain() to demonstrate performance improvement
//Before index:
db.books.find({ title: "1984" }).explain("executionStats");
//After creating index:
db.books.find({ title: "1984" }).explain("executionStats");

