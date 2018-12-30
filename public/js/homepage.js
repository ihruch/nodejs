(() => {
    const apiUrl = '/api/posts';

    const feed = document.getElementById('feed');
    const createPost = document.getElementById('createPost');
    const postTextCreate = document.getElementById('postTextCreate');
    const postAttachCreate = document.getElementById('postAttachCreate');
    const postImageCreate = document.getElementById('postImageCreate');
    const postPublishCreate = document.getElementById('postPublishCreate');

    const postTextEdit = document.getElementById('postTextEdit');
    const postAttachEdit = document.getElementById('postAttachEdit');
    const postImageEdit = document.getElementById('postImageEdit');
    const postPublishEdit = document.getElementById('postPublishEdit');

    let actualPosts = [];

    init();

    function init() {
        fetch(apiUrl)
            .then(response => response.json())
            .then(response => {
                actualPosts = response;
                renderPosts(actualPosts);
                initListeners();
            })
            .catch(e => console.log(e));
    }


    function renderPosts(posts) {
        feed.innerHTML = '';
        console.table(posts);
        posts.forEach(post => {
            feed.innerHTML += `<li class="rv b agz">
          <img class="bos vb yb aff" src="${post.author.avatar}">
          <div class="rw">
          
            <div class="bpb">
              <small class="acx axc">${moment(post.publicationDate).format('YYYY-MM-DD HH:mm')}</small>
              <h6>${post.author.name}</h6>
            </div>

            <p>${post.text}
            </p>

            <div class="boy" data-grid="images">
                <img style="display: inline-block; width: 346px; height: 335px; margin-bottom: 10px; margin-right: 0px; vertical-align: bottom;" data-width="640" data-height="640" data-action="zoom" src="${post.picture}">
            </div>
            <a href="#postModalEdit" class="boa" data-toggle="modal" data-id="${post._id}">
                <button class="cg nz ok" data-id="${post._id}"  class="edit-post" >Редактировать пост</button>
            </a>
                <button type="button" data-id="${post._id}" class="close" aria-hidden="true" title="Удалить">×</button>
          </div>
        </li>`
        })
    }

    function initListeners() {
        createPost.addEventListener('click', createPostListener);
        feed.addEventListener('click', editPostListener);
        feed.addEventListener('click', removePost);
    }

    /* Function Delete post */
    function removePost(event) {
        const btnDel = event.target.classList.contains('close');
       
        if (!btnDel) return; 
            let id = event.target.getAttribute("data-id");

            fetch(`${apiUrl}/${id}`, {method: 'delete'})
                .then( res => {
                    init();
                })
                .catch(errer => console.log(error))
        
    }
    /* Function Delete post */
  

    function editPostListener(event) {
        const btnEdit = event.target.classList.contains('edit-post');
        if (btnEdit) return; 

        const id = event.target.getAttribute("data-id");

        postAttachEdit.value = '';
        fetch(`${apiUrl}/${id}`)
            .then(res => res.json())
            .then(post => {
                postTextEdit.value = post.text;
                postImageEdit.setAttribute('src', `${post.picture}`);

                console.log("post front  ", post.picture);

                postAttachEdit.addEventListener('change', (event) => {
                    if (event.target.files && event.target.files[0]) {
                        const reader = new FileReader();
                        reader.readAsDataURL(event.target.files[0]);

                        reader.onload = (event) => {
                            postImageEdit.setAttribute('src', `${event.target.result}`);
                        };
                    }
                });

                const publishHandler = () => {
                    let formData = new FormData();
                    formData.append('text', postTextEdit.value);
                    formData.append('_idPost', id);
                    formData.append('_pathPic', post.picture);

                    if (postAttachEdit.files[0]) {
                        formData.append('picture', postAttachEdit.files[0], 'postPicture');
                    } else {
                        formData.append('picture', postImageEdit.getAttribute('src'));
                    }

                    fetch(apiUrl, {
                        method: 'PATCH',
                        body: formData
                    }).then(response => {
                        console.log(response);
                        postPublishEdit.removeEventListener('click', publishHandler);
                        init();
                    });


                };

                postPublishEdit.addEventListener('click', publishHandler);
            })
    }

    function createPostListener() {
        postImageCreate.setAttribute('src', 'https://via.placeholder.com/346x335.png');

        const createHandler = () => {
            let formData = new FormData();
            formData.append('text', postTextCreate.value);


            if (postAttachCreate.files[0]) {
                formData.append('picture', postAttachCreate.files[0], 'postPicture');
            } else {
                formData.append('picture', postImageCreate.getAttribute('src'));
            }

            fetch(apiUrl, {
                method: 'POST',
                body: formData
            }).then(() => {
                postPublishCreate.removeEventListener('click', createHandler);
                postTextCreate.value = '';
                postAttachCreate.value = '';
                init();
            });
            
        };
        postPublishCreate.addEventListener('click', createHandler);

        postAttachCreate.addEventListener('change', (event) => {
            if (event.target.files && event.target.files[0]) {
                const reader = new FileReader();
                reader.readAsDataURL(event.target.files[0]);

                reader.onload = (event) => {
                    postImageCreate.setAttribute('src', `${event.target.result}`);
                };
            }
        });
    };

})();