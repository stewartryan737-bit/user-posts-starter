const PostListEl = document.querySelector(".post-list");
let userId = localStorage.getItem("id");

async function main() {
  if (!userId) {
    PostListEl.textContent = "Select a user to view their posts.";
    return;
  }

  try {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?userId=${encodeURIComponent(userId)}`,
    );
    if (!response.ok) {
      throw new Error(`Failed to load posts (${response.status})`);
    }

    const posts = await response.json();
    PostListEl.innerHTML = posts
      .map(
        (post) => `<div class="post">
          <div class="post__title">${post.title}</div>
          <p class="post__body">${post.body}</p>
        </div>`,
      )
      .join("");
  } catch (error) {
    console.error("Unable to load user posts:", error);
    PostListEl.textContent = "Unable to load posts. Please try again.";
  }
}

main();

function onSearchChange(event) {
  userId = event.target.value;
  main();
}
