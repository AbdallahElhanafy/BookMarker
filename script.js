let siteName = document.getElementById('siteName');
let siteUrl = document.getElementById('siteUrl');
let submitBtn = document.getElementById('submitBtn');
let urlCheck = document.getElementById(`urlCheck`);

let bookMarks = [];

let bookMark = {

    name: String,
    siteUrl: String,
}


if(localStorage.getItem('bookmarks') !== null){
    bookMarks =JSON.parse(localStorage.getItem('bookmarks'));
    display();
}

siteUrl.addEventListener('keyup' , urlChecker)

function  urlChecker () {
    let rules = ``
    if (validateUrl() !== true){
        rules = `Enter a valid url that starts with https, http, www., or website name. And ends with a domain extension  `
    }
    urlCheck.innerHTML= `${rules}`

}

submitBtn.addEventListener("click", addBookMark)



function display () {
    let trs = ``

    for(let i =0; i<bookMarks.length; i++){
        trs += `
        <tr>
        <td>${i+1}</td>
        <td>${bookMarks[i].name}</td>
        <td>${bookMarks[i].siteUrl}</td>
        <td><button onclick="openBookmark('${bookMarks[i].siteUrl}')" class="btn btn-outline-warning"><i class="fa fa-eye"></i></button></td>
        <td><button onclick="deleteBookMark(${i})" class="btn btn-outline-danger"><i class="fa fa-trash"></i></button></td>
        </tr>
        `
    }

    document.getElementById('tableBody').innerHTML=trs;
}


function addBookMark () {
    if(validateUrl() === true ){
        bookMark = {
            name: siteName.value,
            siteUrl: siteUrl.value,
        }
        bookMarks.push(bookMark)
        localStorage.setItem('bookmarks',JSON.stringify(bookMarks))
        display()
    }
  else {
      alert('Enter valid URL')
    }
}

function deleteBookMark (index) {

    bookMarks.splice(index,1)
    console.log(bookMarks)
    localStorage.setItem('bookmarks',JSON.stringify(bookMarks))
    display()

}

function openBookmark (url) {
    window.open(url, '_blank')

}

function validateUrl () {
    let regexName = /^((ftp|http|https):\/\/)?(www.)?(?!.*(ftp|http|https|www.))[a-zA-Z0-9_-]+(\.[a-zA-Z]+)+((\/)[\w#]+)*(\/\w+\?[a-zA-Z0-9_]+=\w+(&[a-zA-Z0-9_]+=\w+)*)?\/?$/gm;
    return regexName.test(siteUrl.value) === true;
}