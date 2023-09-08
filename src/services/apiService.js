// services/apiService.js
function findHighestAlphabet(alphabets) {
    return alphabets.reduce((max, current) => {
        return current > max ? current : max;
    });
}

module.exports = {
    findHighestAlphabet,
};
