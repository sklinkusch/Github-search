class GithubUser {
  constructor(name) {
    this.githubName = name;
    this.updateView();
  }
  printUserInfo(info) {
    const header = document.querySelector("h1");
    const image = document.querySelector("#user_avatar");
    const description = document.querySelector("#user_description");
    console.log(info);
    const { name, login, avatar_url } = info;
    console.log(name);
    const username = name != null ? `${login} (${name})` : `${login}`;
    header.innerHTML = username;
    image.src = avatar_url;
  }
  updateView() {
    const id = "3a6a22eb32c03ecfd02b";
    const secret = "6c1e72cc2af26bdab69798e0ce85f86fb00c3584";
    const url = `https://api.github.com/users/${
      this.githubName
    }?client_id=${id}&client_secret=${secret}`;
    const reposUrl = `https://api.github.com/users/${
      this.githubName
    }/repos?client_id=${id}&client_secret=${secret}`;
    fetch(url)
      .then(response => response.json())
      .then(userinfo => this.printUserInfo(userinfo))
      .catch(error => console.log(`Oops, an error: ${error}`));
    fetch(reposUrl)
      .then(response => response.json())
      .then(repos => console.log(repos))
      .catch(error => console.log(`Oops, an error again: ${error}`));
  }
}

const stefan = new GithubUser("sklinkusch");
