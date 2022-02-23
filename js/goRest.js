function createPostsList() {
    
    const postsList = document.createElement('ul') 
    postsList.classList.add('list-group')

    return postsList
}

function createPageList() {

    const pageNav = document.createElement('nav');
    const pagesList = document.createElement('ul');
    pageNav.classList.add('Page', 'navigation', 'example');
    pagesList.classList.add('pagination');
    pagesList.style.display = 'flex';
    pagesList.style.listStyle = 'none';

    pageNav.append(pagesList)

    return {
        pageNav,
        pagesList
    };
}

function createPostTitle() {
    const title = document.createElement('h1');

    return title
}

function createPostBody() {
    const body = document.createElement('p')

    return body
}

function createComment() {
    const comment = document.createElement('ul');

    return comment
}

async function loadPostList(container) {
    const pageList = createPageList();
    const postList = createPostsList();

    const response = await fetch(`https://gorest.co.in/public-api/posts${window.location.search}`)
    const responseData = await response.json();

        
    for ( let i = 0; i < responseData.data.length; i++) {
        const post = document.createElement('li');
        post.classList.add('list-group-item', 'list-group-item-action')
        post.textContent = [responseData.data[i].id];
        postList.append(post);
    }
    
    container.append(pageList.pageNav);
    console.log(pageList.pagesList)

    // pageList.id = 'pageList'
        for ( let i = 0; i < responseData.meta.pagination.pages; i++ ) {

            const pageLink = document.createElement('li')
            const pageInner = document.createElement('a');
            pageLink.classList.add('page-item')
            pageInner.id = 'link';
            pageInner.textContent = [i + 1];
            // pageInner.style.margin = '1px';
            pageInner.classList.add('page-link');
            
            pageLink.append(pageInner)
            pageList.pagesList.append(pageLink);
        }

        pageList.pagesList.addEventListener('click', async (e) => {
        e.preventDefault();
        if ( e.target.tagName === 'A' ) {
            window.location = `goRest.html?page=${e.target.textContent}`
        }
    })

    const pageParams = new URLSearchParams(window.location.search); 
    pageParams.get('page'); 

    postList.addEventListener('click', (e) => {
        e.preventDefault();
        if ( e.target.tagName === 'LI' ) {
            window.location = `goRestPost.html?page=${pageParams.get('page')}&posts=${e.target.textContent}`
        }
    })
    
    container.append(postList);

    // console.log(responseData.data)
}

async function loadPost(container) {
    const pageParams = new URLSearchParams(window.location.search); 
    pageParams.get('posts'); 
    const response = await fetch(`https://gorest.co.in/public-api/posts/${pageParams.get('posts')}`)
    const responseData = await response.json();

    const postTitle = createPostTitle();
    const postBody = createPostBody();

    postTitle.innerText = responseData.data.title
    postTitle.classList.add('display-1')

    postBody.innerText = responseData.data.body

    container.append(postTitle)
    container.append(postBody)

    const commentPageParams = new URLSearchParams(window.location.search); 
    pageParams.get('posts'); 
    const commentResponse = await fetch(`https://gorest.co.in/public-api/comments?post_id=${pageParams.get('posts')}`)
    const commentResponseData = await commentResponse.json();

    for (let i = 0; i < commentResponseData.data.length; i++) {
    const comm = createComment();
            const commName = document.createElement('li');
            const commBody = document.createElement('li');

            commName.textContent = [commentResponseData.data[i].name];
            commBody.textContent = [commentResponseData.data[i].body];

            comm.append(commName);
            comm.append(commBody);

        
        console.log(commentResponseData.data[i])
    container.append(comm)
    }


}








