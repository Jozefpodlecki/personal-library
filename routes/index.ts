import homeController from './../controllers/home'
import bookController from './../controllers/book'

export default (app: any) => {
  app.get("/api/books", bookController.getBooks);
  app.post("/api/books/:id", bookController.addComment);
  app.get("/api/books/:id", bookController.getBook);
  app.post("/api/books", bookController.createBook);
  app.delete("/api/books/:id", bookController.deleteBook);
  app.delete("/api/books", bookController.deleteBooks);
  
  app.get("/", homeController.get);
}