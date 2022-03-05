const app = require("./app");

app.listen(app.get('PORT'), () => {
  console.log(`server listening to http://localhost:${app.get('PORT')}`)
});
