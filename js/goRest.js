async function loadTodoItems() {
    const response = await fetch('https://gorest.co.in/public-api/posts?page=10');
    const data = await response.json();
    for ( let head of Object.entries(data)) {
        
    }
}

loadTodoItems()
console.log(window.location);

let container = document.getElementById('container')

let link = document.createElement('a')

link.textContent = 'я ссылка'

link.href = 'https://gorest.co.in/public-api/posts/15'

container.append(link)