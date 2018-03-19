var photoPosts = [];
var photoPost = {
    id: "0",
    description: "discription",
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: "https://pp.userapi.com/c841536/v841536931/6ff1b/JJ17ZbMiAus.jpg",
    hashTags: ["#top", "#brilliant"],
    likes: ['svetabylly', 'alfa_di']
};

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
    id: "4",
    description: "discription",
    createdAt: new Date('2018-02-23T23:00:00'),
    author: 'Иванов Иван',
    photoLink: "https://pp.userapi.com/c841536/v841536931/6ff1b/JJ17ZbMiAus.jpg",
    hashTags: ["#top", "#brilliant"],
    likes: ['svetabylly', 'alfa_di']
};
var photoPost3 = {
    id: '13',
    descriprion: 'discription',
    createdAt: new Date('2018-03-03T21:00:00'),
    author: 'Иванов Иван',
    photoLink: 'https://pp.userapi.com/c841536/v841536931/6ff1b/JJ17ZbMiAus.jpg',
    hashtags: ['#природа'],
    likes: ['svetabylly', 'alfa_di']
}

for (let i = 0; i < 12; i++) {
    let object2 = Object.assign({}, photoPost);
    object2.id = i.toString();
    photoPosts.push(object2);
}

window.module = (function () {
    return {
        
        getPhotoPosts: function (skip = 0, top = 10, filterConfig) {
            var resultOfFilter = photoPosts;
            if (typeof(skip) !== 'number' || typeof(top) !== 'number') {
                console.log("typeError in getPhotoPosts");
                return;
            }
            if (filterConfig === undefined) {
                return photoPosts.slice(skip, skip + top);
            }else{
           resultOfFilter = photoPosts;
                if (filterConfig.hasOwnProperty('author')) {
                resultOfFilter = resultOfFilter.filter((element) => element.author === filterConfig.author);
                }
                if (filterConfig.hasOwnProperty('createdAt')) {
                    resultOfFilter = resultOfFilter.filter((element) =>
                        element.createdAt.getFullYear() === filterConfig.createdAt.getFullYear() &&
                        element.createdAt.getMonth() === filterConfig.createdAt.getMonth() &&
                        element.createdAt.getDate() === filterConfig.createdAt.getDate());
                }
                if (filterConfig.hasOwnProperty('hashTags')) {
                    resultOfFilter = resultOfFilter.filter((element) => { return filterConfig.hashTags.every((tag) => {
                        return element.hashTags.includes(tag);});});
                }
                return resultOfFilter.slice(skip, skip + top);
                }
                return photoPosts;
            },

        getPhotoPost: function (id) {
            return photoPosts.find((element) => element.id === id);
        },

        validatePhotoPost: function (photoPost) {
            console.log(photoPost.description);
            if(typeof(photoPost.id)  !== 'string' || (photoPost.id) === null || (photoPosts.findIndex((element) => element.id === photoPost.id) !== -1))
                return false;
            if(typeof(photoPost.description) !== 'string' || (photoPost.description.length > 200))
                return false;
            if(!(photoPost.createdAt instanceof Date))
                return false;
            if(typeof(photoPost.author) !== 'string' || photoPost.author === null)
                return false;
            if(typeof(photoPost.photoLink) !== 'string' || photoPost.photoLink === null)
                return false;
            if(!Array.isArray(photoPost.hashTags) || photoPost.hashTags === null)
                return false;
            return true;
        },

        removePhotoPost: function (id)
        {
            var i = photoPosts.findIndex((element) => element.id === id);
            if(i === -1){
                console.log('No posts with such ID');
                return false;
            }
            photoPosts.splice(i, 1);
            return true;
        },

        addPhotoPost: function (photoPost) {
            if(this.validatePhotoPost(photoPost)){
                photoPosts.push(photoPost);
                return true;
            }
            else{
                console.log(photoPost);
                console.log('invalid photopost');
                return false;
            }
        },

        editPhotoPost: function(id, photoPost){
            var i = photoPosts.findIndex((element) => element.id === id);
            if(i === -1){
                return false;
            } 
            else{
                if(photoPost.description) photoPosts[i].description = photoPost.description;
                if(photoPost.photoLink) photoPosts[i].photoLink = photoPost.photoLink;
                if(photoPost.hashTags) photoPosts[i].hashTags = photoPost.hashTags;
                return true;
            }
        }
   
    }
})();

console.log('All photoPosts:');
console.log(module.getPhotoPosts(0, 12));
console.log("filter by author: ");
console.log(module.getPhotoPosts(0, 12, {author: 'Иванов Иван'}));
console.log("filter by author and hashtags");
console.log(module.getPhotoPosts(0, 12, {author: 'Иванов Иван', hashtags: ['#top', '#brilliant']}));
console.log("filter with wrong type of filter: '2018-02-24'");
console.log(module.getPhotoPosts(0, 12, '2018-02-24'));
console.log("getPhotoPosts(9) skip");
console.log(module.getPhotoPosts(9));
console.log("getPhotoPost(10)");
console.log(module.getPhotoPost("10"));
console.log("getPhotoPost that does not exist: getPhotoPost(13)")
console.log(module.getPhotoPost(13));
console.log("isValid: {id: '14', descriprion: 'сборная',createdAt: new Date('2018-03-01'),author: 'Иван',photoLink: 'ht.jpg', likes: ['Bobby'],hashtags: ['#победа']}");
console.log(module.validatePhotoPost({
    id: '14',
    description: "discription",
    createdAt: new Date('2018-03-01'),
    author: 'Иван',
    photoLink: 'ht.jpg',
    likes: ['Bobby'],
    hashTags: ['#tags']
}));
console.log("isValid: {id: '14', descriprion: 'сборная',createdAt: '2018-03-01',author: 'Иван',photoLink: 'ht.jpg', likes: ['Bobby'],hashtags: ['#победа']}");
console.log(module.validatePhotoPost({
    id: '14',
    description: 'сборная',
    createdAt: '2018-03-01',
    author: 'Ксения',
    photoLink: 'ht.jpg',
    likes: ['Bobby'],
    hashTags: ['#tags']
}));
console.log("isValid: ...hastags:'hi'");
console.log(module.validatePhotoPost({
    id: '14',
    description: 'сборная',
    createdAt: new Date('2018-03-01'),
    author: 'Иван',
    photoLink: 'ht.jpg',
    likes: ['Bobby'],
    hashTags: 'hi'
}));

console.log("add valid photoPost: photoPost1")
console.log(module.addPhotoPost(post1));
console.log("add invalid photoPost");
console.log(module.addPhotoPost(post2));
console.log("add not valid photoPost: photoPost3 -- not all fields");
console.log(module.addPhotoPost(photoPost3));
console.log("Posts after that:");
console.log(module.getPhotoPosts(0, 15));
console.log("edit valid: 10, {descriprion: 'hey it is changed',hashtags: ['tag1', 'tag2']}");
console.log(module.editPhotoPost('10', {descriprion: 'hey it is changed', hashtags: ['tag1', 'tag2']}));
console.log("edit not valid: editPhoto1 -- description>200");
console.log(module.editPhotoPost('3', descriprion = "wrong bla blablablavvvblablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablablabla"));
console.log("edit not valid: {photoLink: 13}");
console.log(module.editPhotoPost('5', {photoLink: 13}));
console.log("edit valid: 2, {createdAt: new Date('2018-02-23T23:00:00'),author: 'Ксения'}");
console.log(module.editPhotoPost('2', {createdAt: new Date('2018-02-23T23:00:00'), author: 'Ксения'}));
console.log("Posts after that:");
console.log(module.getPhotoPosts(0, 15));
console.log("remove id = 5");
console.log(module.removePhotoPost("5"));
console.log("remove id = 1");
console.log(module.removePhotoPost("1"));
console.log("remove id = 16");
console.log(module.removePhotoPost("16"));
console.log("Posts after that:");
console.log(module.getPhotoPosts(0, 15));