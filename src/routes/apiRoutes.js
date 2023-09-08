// routes/apiRoutes.js
const express = require('express');
const { app } = require('../server');
const apiService = require('../services/apiService');
const { validateRequestBody } = require('../requestValidator');

const router = express.Router();

// GET endpoint
router.get('/bfhl', (req, res) => {
    const operationCode = "1";
    console.log(req)
    res.json({ operation_code: operationCode });
});

// POST endpoint
// router.post('/api', (req, res) => {
//     const data = req.body;
//     const status = 'true';
//     const userId = 'nilesh_garg_13122001';
//     const collegeEmailId = 'ng5787@srmist.edu.in';
//     const collegeRollNumber = 'RA2011050010035';
//     const numbersArray = data.numbers_array;
//     const alphabetsArray = data.alphabets_array;
//     const highestAlphabet = apiService.findHighestAlphabet(alphabetsArray);

//     res.json({
//         status,
//         user_id: userId,
//         college_email_id: collegeEmailId,
//         college_roll_number: collegeRollNumber,
//         numbers_array: numbersArray,
//         alphabets_array: alphabetsArray,
//         highest_alphabet: highestAlphabet,
//     });
// });
router.post('/bfhl', validateRequestBody,(req, res) => {
    try {
    const data = req.body.data;

    // Filter numbers and alphabets
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => typeof item === 'string' && item.length === 1 && item.match(/[a-zA-Z]/));

    // Find the highest alphabet (case-insensitive)
    const highestAlphabet = alphabets.length > 0 ? apiService.findHighestAlphabet(alphabets) : [];

    // Example user data
    const response = {
        is_success: true,
        user_id: 'nilesh_garg_13122001',
        email:'ng5787@srmist.edu.in',
        roll_number: 'RA2011050010035',
        numbers: numbers,
        alphabets: alphabets,
        highest_alphabet: [highestAlphabet],
    };

    res.json(response);
}catch (error) {
    // Handle other errors
    console.error(error);
    const responseWithError = {
        is_success: false,
        user_id: "nilesh_garg_13122001", // Include "user_id" in the response
        error_message: "An error occurred", // Include an error message
    };
    res.status(500).json(responseWithError);
}});
router.use((req, res, next) => {
    res.status(404).json({
        is_success: false,
        user_id: "nilesh_garg_13122001", // Include "user_id" in the response
        error_message: "Route not found", // Include a 404 error message
    });
});
app.use('/', router);
module.exports = router;

