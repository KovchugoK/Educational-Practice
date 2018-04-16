window.Dom = (function () {
    let user = 'Иванов Иван';
    var feed = document.getElementsByClassName('feed')[0];
    return {

        createImg: function (photoPost) {
            let divt = document.createElement('div');
            divt.id = photoPost.id;
            divt.classList.add('IMAge');
            let editarea = document.createElement('div');
            editarea.classList.add('editarea');
            divt.appendChild(editarea);
            let usermainphoto =  document.createElement('div')
            usermainphoto.classList.add('usermainphoto');
            editarea.appendChild(usermainphoto);
            let username =  document.createElement('div')
            username.classList.add('username');
            username.innerHTML = photoPost.author;
            editarea.appendChild(username);
            editarea.appendChild(document.createElement('div'));
            let button_edit =  document.createElement('div')
            button_edit.classList.add('button-edit');
            editarea.appendChild(button_edit);
            let delete_button =  document.createElement('div')
            delete_button.classList.add('delete-button');
            editarea.appendChild(delete_button);
            
            let photoarea = document.createElement('div');
            photoarea.classList.add('photoarea');
            photoarea.style.background = 'url(' + photoPost.photoLink + ')';
            photoarea.style.backgroundSize = "cover";
            divt.appendChild(photoarea);

            let likearea = document.createElement('div');
            likearea.classList.add('likearea');
            divt.appendChild(likearea);
            let like_button = document.createElement('div');
            like_button.classList.add( 'like-button');
            likearea.appendChild(like_button);
            let num_of_likes = document.createElement('div');
            num_of_likes.classList.add('num-of-likes');
            likearea.appendChild(num_of_likes);

            let commetarea = document.createElement('div');
            commetarea.classList.add('commetarea');
            divt.appendChild(commetarea);
            let commet = document.createElement('div');
            commet.classList.add( 'commet');
            commet.innerHTML = photoPost.author + ": " + photoPost.description + " " + photoPost.hashTags;
            commetarea.appendChild(commet);

            let datearea = document.createElement('div');
            datearea.classList.add('datearea');
            datearea.innerHTML = photoPost.createdAt.getDay() + '.'
                + photoPost.createdAt.getMonth() + '.'
                + photoPost.createdAt.getFullYear();
            divt.appendChild(datearea);
            return divt;
        },

        addPost: function (photoPost) { 
            if (module.addPhotoPost(photoPost)) {
                feed.appendChild(this.createImg(photoPost));
                return true;
            }
            return false;
        }, 

        editPhotoPost: function (id, photoPost) {
            if (module.editPhotoPost(id, photoPost)) {
                feed.replaceChild(this.createPhotoPost(module.getPhotoPost(id)), document.getElementById(id));
                return true;
            }
            return false;
        },

        removePost: function (id) {
            if (module.removePhotoPost(id)) {
                feed.removeChild(document.getElementById(id));
                return true;
            }
            return false;
        },

       /* displayPhotoPosts: function (skip = 0, top = 10, filterConfig) {
           var posts = module.getPhotoPosts(skip, top, filterConfig);
           console.log(posts);
            posts.forEach(element => {
                feed.appendChild(this.createImg(element))
            })
        },*/
    }
})();

var post1 = {
    id: "13",
    description: "discription",
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: "https://pp.userapi.com/c841536/v841536931/6ff1b/JJ17ZbMiAus.jpg",
    hashTags: ["#top", "#brilliant"],
    likes: ['svetabylly', 'alfa_di']
};

var post2 = {
    id: "14",
    description: "discription",
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Alpha',
    photoLink: "https://img04.rl0.ru/e1aa03029e240e3e6b12450baad6ddf4/c615x400/news.rambler.ru/img/2018/01/18131123.875643.8703.jpeg",
    hashTags: ["#top", "#brilliant"],
    likes: ['love', 'alfa_di']
};


Dom.addPost(post1);
Dom.addPost(post2);
