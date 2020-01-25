
# Information Security and Quality Assurance: Personal Library

### User story:

1. Nothing from my website will be cached in my client.
2. The headers will say that the site is powered by 'PHP 4.2.0' even though it isn't (as a security measure).
3. I can post a title to /api/books to add a book and returned will be the object with the title and a unique _id.
4. I can get /api/books to retrieve an array of all books containing title, _id, and commentcount.
5. I can get /api/books/{id} to retrieve a single object of a book containing _title, _id, & an array of comments (empty array if no comments present).
6. I can post a comment to /api/books/{id} to add a comment to a book and returned will be the books object similar to get /api/books/{id} including the new comment.
7. I can delete /api/books/{_id} to delete a book from the collection. Returned will be 'delete successful' if successful.
8. If I try to request a book that doesn't exist I will be returned 'no book exists'.
9. I can send a delete request to /api/books to delete all books in the database. Returned will be 'complete delete successful' if successful.
10. All 6 functional tests required are complete and passing.