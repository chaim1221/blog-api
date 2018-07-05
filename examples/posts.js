const http = require('http');

var displayUsage = function () {
  console.log("To get the title and body of every post by user id (for example) 7:\n");
  console.log("$ node app.js id=7");
}

var httpRequest = function (options, reject, resolve, body) {
  let request = http.request(options, (response) => {
    let responseData = [];
    if (response.statusCode < 200 || response.statusCode >= 300)
      return reject({ code: response.statusCode, status: response.statusMessage });
    response.on('data', function (data) {
      responseData.push(data);
    }).on('end', function () {
      responseData = JSON.parse(Buffer.concat(responseData).toString());
      // console.log(responseData); // debug only
      resolve(responseData);
    }).on('error', (e) => { reject(e); });
  });
  if (body) request.write(body);
  request.end();
}

var getBlogPosts = function () {
  return new Promise(function (resolve, reject) {
    let options = {
      protocol: "http:",
      hostname: 'jsonplaceholder.typicode.com',
      method: 'GET',
      path: '/posts',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    httpRequest(options, reject, resolve, null);
  });
}

var getBlogPostsByUserId = function (id) {
  return new Promise(function (resolve, reject) {
    getBlogPosts().then(result => {
      // console.log(result); // debug only

      let limitedResult = result.filter(item => item.userId === id);      
      // console.log(limitedResult); // debug only
      
      let titlesAndPosts = limitedResult.map(result => {
        return {
          title: result.title,
          body: result.body
        }
      });
      // console.log(titlesAndPosts); // debug only

      resolve(titlesAndPosts);
    }).catch(e => reject(e));
  });
}

// MAIN
var main = function () {

  let id = 0;

  try {

    // this can become a switch to determine other
    // operations in the future; leaving it this
    // way because the defined routine has only
    // one possible function.

    id = parseInt(process.argv[2].split('=')[1], 10);

  } catch (e) {

    // in switch this would be the default case:

    displayUsage();

  }
  // console.log(id); // debug only

  getBlogPostsByUserId(id)
    .then(result => {
      // console.log(result); // debug only

      console.log("Blog posts from http://jsonplaceholder.typicode.com/posts with user id of " + id + ": ");

      for (var blogPost in result) {
        // console.log(blogPost); //debug only

        console.log("\n\n---\n\nTitle: " + result[blogPost].title);
        console.log("\nBody:\n\n" + result[blogPost].body + "\n");

      }
    }).catch(e => console.log(e));
}

main();
