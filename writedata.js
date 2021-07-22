const data = require("./MOCK_DATA.json")
for (let i = 0; i < data.length; i++) {
    if (i % 2 == 0) {
        data[i].user_role = "owner";
    } else {
        data[i].user_role = "customer";
    }
    console.log(data[i].user_role)
}
// console.log(data)
const fs = require("fs")
const jsonString = JSON.stringify(data)
fs.writeFile("./data.json", jsonString, err => {
    if (err) {
        console.log('Error writing file', err)
    } else {
        console.log('Successfully wrote file')
    }
})