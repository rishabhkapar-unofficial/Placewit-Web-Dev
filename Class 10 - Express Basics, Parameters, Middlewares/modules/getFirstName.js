function getFirstName(name) {
    return name.split(' ')[0];
}

// exports.last = function(name) {
//     return name.split(' ')[1];
// }

// exports.get = getFirstName;
module.exports = { getFirstName };