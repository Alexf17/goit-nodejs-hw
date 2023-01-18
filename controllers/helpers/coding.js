const base64 = require("base-64");
async function main() {
  const str = "some code";
  const encoded = base64.encode(str);
  console.log(encoded);
}
main();
