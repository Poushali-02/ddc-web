async function importRssFeed() {
  try {
    const response = await fetch("http://127.0.0.1:8000/import-rss/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Token b7c446a21227791913af28841506a242b7748ee8",
      },
      body: JSON.stringify({
        rss_url: "https://medium.com/feed/devdotcom",
        domain: "technology",
      }),
    });
    const res = await response.json();
    console.log(res);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function retrieveDomainList() {
  try {
    const response = await fetch("http://127.0.0.1:8000/domains/");
    const res = await response.json();
    console.log(res);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// fetch all blogs
async function fetchAllBlogs() {
  try {
    const response = await fetch("http://127.0.0.1:8000/blogs/");
    const res = await response.json();
    console.log(res);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// importRssFeed();
retrieveDomainList();
fetchAllBlogs();
