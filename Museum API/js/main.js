// fetch using Met Museum API
document.getElementById("search").addEventListener("click", getFetch);

function getFetch() {
  const url = `https://collectionapi.metmuseum.org/public/collection/v1/objects`;

  fetch(url)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      let estimate = document.getElementById("guess").value;
      if (data.total > estimate) {
        document.getElementById("answer").innerText = `You were under by ${
          data.total - estimate
        } artworks`;
      } else if (data.total < estimate) {
        document.getElementById("answer").innerText = `You were over by ${
          estimate - data.total
        } artworks`;
      } else {
        document.getElementById("answer").innerText = "You got it right!";
      }
    })
    .catch((err) => {
      console.log(`error ${err}`);
    });
}

document.getElementById("random").addEventListener("click", randomArt);

function randomArt() {
  let randomizer = Math.floor(Math.random() * 483513);
  const randoms = `https://collectionapi.metmuseum.org/public/collection/v1/objects/${randomizer}`;
  fetch(randoms)
    .then((res) => res.json()) // parse response as JSON
    .then((data) => {
      console.log(data);
      if (
        data.primaryImage === "" ||
        data.primaryImageSmall === "" ||
        data.message === "ObjectID not found" ||
        data.message === "Not a valid object"
      ) {
        randomArt();
      } else {
        document.getElementById("primaryImg").src = data.primaryImage;

        if (data.objectDate) {
          document.getElementById(
            "date"
          ).innerText = `Date: ${data.objectDate}`;
        } else {
          document.getElementById("date").innerText = `Date: N/A`;
        }

        if (data.title) {
          document.getElementById("title").innerText = `Title: ${data.title}`;
        } else {
          document.getElementById("title").innerText = `Title: N/A`;
        }

        if (data.medium) {
          document.getElementById(
            "medium"
          ).innerText = `Medium: ${data.medium}`;
        } else {
          document.getElementById("medium").innerText = `Medium: N/A`;
        }

        if (data.objectURL) {
          document.getElementById("link").innerText = `View in Database`;
          document.getElementById("link").href = data.objectURL;
        } else {
          document.getElementById("link").innerText = `Link: N/A`;
        }

        if (data.culture) {
          document.getElementById(
            "culture"
          ).innerText = `Culture: ${data.culture}`;
        } else {
          document.getElementById("culture").innerText = `Culture: N/A`;
        }
      }
    })

    .catch((err) => {
      console.log(`error ${err}`);
    });
}
