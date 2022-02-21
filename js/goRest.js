document.addEventListener('DOMContentLoaded', async() => {
    const container = document.getElementById('container')

    async function loadPageList() {
        const response = await fetch('https://gorest.co.in/public-api/posts');
        const responseData = await response.json();

        
        const pageList = document.createElement('ul')
        pageList.style.display = 'flex';
        pageList.style.listStyle = 'none';
        container.append(pageList)

        pageList.id = 'pageList'
        // for ( let head of Object.values(responseData)) {
            for ( let i = 0; i < responseData.meta.pagination.pages; i++ ) {

                const pageLink = document.createElement('li')
                pageLink.id = 'link'
                pageLink.textContent = [i + 1]
                pageLink.style.margin = '1px';
                // pageLink.href = `file:///D:/HTML/SkillBox/goRest/goRest.html?page=${link.textContent}`
                
                pageList.append(pageLink)
                
            }
        // }
        
        // const link = document.getElementById('link')
        // console.log(link.textContent)
        pageList.addEventListener('click', async (e) => {
            e.preventDefault();
            if ( e.target.tagName === 'LI' ) {
                window.location = `goRest.html?page=${e.target.textContent}`
            }
        })
    }


    async function loadPostsList() {
        const response = await fetch(`https://gorest.co.in/public-api/posts${window.location.search}`)
        const responseData = await response.json();
        
        console.log(responseData)
        const postsList = document.createElement('ul')

        for ( let i = 0; i < responseData.data.length; i++) {
            const post = document.createElement('li');
            post.textContent = [responseData.data[i].id]
            
            postsList.append(post)
        }

        container.append(postsList)

        postsList.addEventListener('click', (e) => {
            e.preventDefault();
            if ( e.target.tagName === 'LI' ) {
                window.location = `goRestPost.html?page=${e.target.textContent}`
            }
        })
    }

    loadPageList();
    loadPostsList();


});


    
    
// let link = document.createElement('a')

// link.textContent = 'я ссылка'

// link.href = 'https://gorest.co.in/public/v2/posts?page=98'

// container.append(link)




