const authorModel = require('../models/author.model')
const Book = require('../models/Book.model')
const router = require('express').Router()

//CREATE
router.get('/books/create',(req,res)=>{
    authorModel.find()
    .then(allAuthors=>{
        console.log(allAuthors)
        res.render('books/create',{allAuthors})

    })
})

router.post('/books/create',(req,res)=>{
    console.log(req.body)
    const {title,author_id,description,rating} = req.body
    Book.create({title:title,author_id:author_id,description:description,rating:rating})
    res.redirect('/books')
})

//READ
//route params are used to display individual resources like 1 book
//for rendering individual documents I will always use route params
//req.params is ALWAYS an object
//req.params key is ALWAYS what we put after the :
//the value is what is put in the url after the /books/
router.get('/books/:bookId',(req,res)=>{
    console.log(req.params)
    Book.findById(req.params.bookId)
    .then((result)=>{
        console.log(result)
        res.render('books/book-details',result)
    })
})
//if I want to display all the documents then I will use the find() method ALWAYS
//
router.get('/books',(req,res)=>{
    Book.find()
    .populate('author_id')
    .then((result)=>{
        console.log(result)
        res.render('books/books-list',{result})
    })
})

router.get('/books/:bookId/edit',(req,res)=>{
    Book.findById(req.params.bookId)
    .then((bookToEdit)=>{
        console.log(bookToEdit)
        res.render('books/edit-book',bookToEdit)


    })


})
//req.body is ALWAYS an object
//key of req.body is always the name attribute in my hbs
//value of the req.body
router.post('/books/:bookId/edit',(req,res)=>{
    console.log(req.body)
    const {title, author,description, rating} = req.body
    Book.findByIdAndUpdate(req.params.bookId,{title:title,author:author,description:description,rating:rating})
    .then(()=>{
        console.log("Success Book updated")
        res.redirect('/books')
    })
})

router.post('/books/:bookId/delete',(req,res)=>{
    console.log(req.params.bookId)
    Book.findByIdAndDelete(req.params.bookId)
    .then(()=>{
        res.redirect('/books')
    })
})



module.exports = router