function seedDB() {
  console.log("seed");
}

function clearDB() {
  console.log("clear");
}

if (process.argv[2] === "--import") {
  seedDB();
} else {
  clearDB();
}
