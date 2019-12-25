//Book Class
class Book{
    constructor(title,author,price){
        this.title=title;
        this.author=author;
        this.price=price;
    };
}

//User Interface
class UI{
    static displayBooks(){
        const book1=Store.getBooks();
        book1.forEach(book => {
            UI.addBooksToList(book);            
        });
    }
    static addBooksToList(book){
        const list=document.querySelector("#book-list");
        const row=document.createElement('tr');
        row.innerHTML=`
                      <td>${book.title}</td>
                      <td>${book.author}</td>
                      <td>${book.price}</td>
                      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;
        list.appendChild(row);
    }
    static showAlert(message, className){
        const div=document.createElement('div');
        div.className=`alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container=document.querySelector('.container');
        const form=document.querySelector("#book-form");
        container.insertBefore(div,form);

        //vanish in 3 seconds
        setTimeout(function(){
            document.querySelector('.alert').remove();
        },3000);
    }
    static clearAllFeild(){
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#price').value='';
    }
    static deleteBook(el){
        if(confirm('Are you sure you want to delete this?'))
            el.parentElement.parentElement.remove();
    }
    static clearSearchFeild(){
        document.querySelector('#search-bar').value='';
    }
}

//Local Storage
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null)
            books=[];
        else{
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        const books=Store.getBooks();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
    static removeBook(title){
        const books=Store.getBooks();
        books.forEach((book,index)=>{
            if(book.title===title)
                books.splice(index,1);
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
    static searchBook(title){
        typeof title;
        const books=Store.getBooks();
        books.forEach((book,index)=>{
            // console.log("bookkyuhai"+book.title);
            if(book.title == title)
            {
                console.log(book);
                return book;
            }
                
        });
    }
}


document.addEventListener('DOMContentLoaded',UI.displayBooks);

//Event: Add a Book
document.querySelector("#book-form").addEventListener('submit',(e)=>{
    e.preventDefault();

    const title=document.querySelector("#title").value;
    const author=document.querySelector("#author").value;
    const price=document.querySelector("#price").value;

    if(title==='' && author==='' && price==='')
    {
        UI.showAlert('Please fill all the required feilds','danger');
    }
    else if(title==='')
    {
        UI.showAlert('Title feild is empty','danger');
    }
    else if(author==='')
    {
        UI.showAlert('Author feild is empty','danger');
    }
    else if(price==='')
    {
        UI.showAlert('Price feild is empty','danger');
    }
    else
    {
        const book=new Book(title,author,price);
        UI.addBooksToList(book);
        Store.addBook(book);
        UI.clearAllFeild();
        UI.showAlert('Book added successfully','success');
    }
});

document.querySelector('#book-list').addEventListener('click',(e)=>{
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.previousSibling.textContent);
    UI.showAlert('Book deleted successfully','success');
});

//to clear search feild after searching books
document.querySelector('#close-button').addEventListener('click',UI.clearSearchFeild);

document.querySelector('#cross-button').addEventListener('click',UI.clearSearchFeild);

document.querySelector('#search-button').addEventListener('click',(e)=>{
    const search=document.querySelector('#search-bar').value;
    let obj_book = Store.searchBook(search);
    console.log(obj_book);
    if(obj_book!=undefined){
        // console.log('Book found');
        document.querySelector('#modal-info').innerHTML="Book found";
    }
    else{
        // console.log('Book not found');
        document.querySelector('#modal-info').innerHTML="Book not found";
    }   
});