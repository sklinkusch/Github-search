class GithubUser {
  constructor(name, repositories) {
    this.githubName = name;
    this._repos = repositories;
    this.id = "3a6a22eb32c03ecfd02b";
    this.secret = "6c1e72cc2af26bdab69798e0ce85f86fb00c3584";
    this.updateInfo();
  }
  getDate(timestamp) {
    const dateStringArray = timestamp.substr(0, 10).split("-");
    const dateArray = dateStringArray.map(dateString => Number(dateString));
    let [year, month, day] = dateArray;
    month--;
    const date = new Date(year, month, day);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleString('en-US', options);
  }
  get name() {
    return this.githubName;
  }
  set name(newName) {
    this.githubName = newName;
  }
  printRepos(repos) {
    console.log(repos);
  }
  printUserInfo(info) {
    const header = document.querySelector("h1");
    const image = document.querySelector("#user_avatar");
    const description = document.querySelector("#user_description");
    const { name, login, avatar_url, company, location, email, public_repos, followers, following, public_gists, blog, created_at, html_url } = info;
    const insertName = name == null ? "" : name;
    const insertCompany = company == null ? "" : company;
    this.repos = public_repos;
    const insertEmail = email == null ? "no email address provided" : `<a href="mailto:${email}">${email}</a>`;
    const insertBlog = blog == null ? "no website provided" : `<a href="${blog}" target=_blank>${blog}</a>`;
    const username = `${login}`;
    header.innerHTML = username;
    image.src = avatar_url;
    const html = `
      <div class="sk-desc-row">
        <div class="sk-bold">Real name:</div> <div>${insertName}</div>
        <div class="sk-bold">Location:</div> <div>${location}</div>
        <div class="sk-bold">Organization:</div> <div>${insertCompany}</div>
        <div class="sk-bold">Email:</div> <div>${insertEmail}</div>
        <div class="sk-bold">Number of public repositories:</div> <div>${public_repos}</div>
        <div class="sk-bold">Number of gists:</div> <div>${public_gists}</div>
        <div class="sk-bold">Followers:</div> <div>${followers}</div>
        <div class="sk-bold">Following:</div> <div>${following}</div>
        <div class="sk-bold">Created at:</div> <div>${(this.getDate(created_at))}</div>
        <div class="sk-bold">Website:</div> <div>${insertBlog}</div>
        <div class="sk-bold">GitHub:</div> <div><a href="${html_url}" taget=_blank>${html_url}</a></div>
    </div>
          `;
    description.innerHTML = html;
    this.updateRepos();
  }
  get repos() {
    return this._repos;
  }
  set repos(value) {
    this._repos = value;
  }
  updateInfo() {
    const url = `https://api.github.com/users/${
      this.githubName
      }?client_id = ${this.id}& client_secret=${this.secret} `;
    fetch(url)
      .then(response => response.json())
      .then(userinfo => this.printUserInfo(userinfo))
      .catch(error => console.log(`Oops, an error: ${error}`));
  }
  updateRepos() {
    const numberRepos = this.repos;
    const reposUrl = `https://api.github.com/users/${
      this.githubName
      }/repos?per_page=${numberRepos}&client_id=${this.id}&client_secret=${this.secret}`;
    fetch(reposUrl)
      .then(response => response.json())
      .then(repos => this.printRepos(repos))
      .catch(error => console.log(`Oops, an error again: ${error}`));
  }
}

const stefan = new GithubUser("sklinkusch", null);
