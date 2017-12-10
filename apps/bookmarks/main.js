document.getElementById("bmForm").addEventListener("submit", bmSubmit);

function bmSubmit(pd){
  var bmName = document.getElementById("bmName").value;
  var bmUrl = document.getElementById("bmUrl").value;

  if(!bmValidate(bmName, bmUrl)){
    return false;
  }

  var bookmark = {
    name: bmName,
    url: bmUrl
  }

  if(localStorage.getItem("bookmarks") === null){
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  else {
    var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }
  document.getElementById("bmForm").reset();
  bookmarksDisplay();
  pd.preventDefault();
}

function bmDelete(url){
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  for(var i = 0; i < bookmarks.length; i++){
    if(bookmarks[i].url == url){
      bookmarks.splice(i, 1);
    }
  }
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  bookmarksDisplay()
}


function bookmarksDisplay(){
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  var bmDisplay = document.getElementById("bmDisplay");
  bmDisplay.innerHTML = "";

  for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    console.log(url);
    bmDisplay.innerHTML +=  "<div class='well'>"+
                            "<h5>"+name+
                            ' <a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a> ' +
                            " <a onclick='bmDelete(\""+url+"\")' class='btn btn-danger' href='#'>Remove</a> "+
                            "</h5>"+
                            "</div>";
                          }
}

function bmValidate(bmName, bmUrl){
  if(!bmName || !bmUrl){
    alert('Please fill in the form.');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!bmUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }
  return true;
}
