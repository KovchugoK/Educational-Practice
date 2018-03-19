window.Dom = (function () {
    let user = 'Иванов Иван';
    var feed = document.getElementsByClassName('.feed');
    return {
        createImg: function (photoPost) {
            let divt = document.createElement('div');
            divt.id = photoPost.id;
            divt.className = 'IMAge';
            let editarea = document.createElement('div');
            editarea.className = 'editarea';
            divt.appendChild(editarea);
            let usermainphoto =  document.createElement('div')
            usermainphoto.className = 'usermainphoto';
            let username =  document.createElement('div')
            username.className = 'username';
            username.innerHTML = photoPost.author;
            editarea.parentNode.appendChild(username);
            editarea.parentNode.appendChild(document.createElement('div'));
            let button_edit =  document.createElement('div')
            button_edit.className = 'button-edit';
            editarea.parentNode.appendChild(button_edit);
            let delete_button =  document.createElement('div')
            delete_button.className = 'delete-button';
            editarea.parentNode.appendChild(delete_button);
            
            let photoarea = document.createElement('div');
            photoarea.className = 'photoarea';
            photoarea.style.background = 'url(' + photoPost.photoLink + ')';
            divt.appendChild(photoarea);

            let likearea = document.createElement('div');
            likearea.className = 'likearea';
            divt.appendChild(likearea);
            let like_button = document.createElement('div');
            like_button.className = 'like-button';
            likearea.parentNode.appendChild(like_button);
            let num_of_likes = document.createElement('div');
            num_of_likes.className = 'num-of-likes';
            likearea.parentNode.appendChild(num_of_likes);

            let commetarea = document.createElement('div');
            commetarea.className = 'commetarea';
            divt.appendChild(commetarea);
            let commet = document.createElement('div');
            commet.className = 'commet';
            commet.innerHTML = photoPost.author + ": " + photoPost.description + " " + photoPost.hashTags;
            commetarea.parentNode.appendChild(commet);

            let datearea = document.createElement('div');
            datearea.className = 'datearea';
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

        displayPhotoPosts: function (skip = 0, top = 10, filterConfig) {
           var posts = module.getPhotoPosts(skip, top, filterConfig);
            posts.forEach(element => {
                feed.appendChild(createImg(element))
            })
        },
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
    author: 'Иванов Иван',
    photoLink: "https://pp.userapi.com/c841536/v841536931/6ff1b/JJ17ZbMiAus.jpg",
    hashTags: ["#top", "#brilliant"],
    likes: ['svetabylly', 'alfa_di']
};

Dom.addPost(post1);
Dom.addPost(post2);
//Dom.displayPhotoPosts();