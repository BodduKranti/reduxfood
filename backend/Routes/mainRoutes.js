const router = require('express').Router();
const { signupDb } = require("../Schema/signupSchema");

router.post("/signup", (req, res) => {
    const { email } = req.body;

    signupDb.findOne({ email: email })
        .then((result) => {
            if (result) {
                res.status(400).json({
                    Message: "This Email Id is Already Exists",
                    alert: false
                })
            }
            else {
                const signupUser = new signupDb(req.body);
                signupUser.save();
                res.status(200).json({
                    Message: "Login is Succesfully",
                    alert: true
                })
            }
        })
        .catch((error) => {
            console.log(error)
        })

})

router.post("/login", (req, res) => {
    const { email } = req.body;

    signupDb.findOng({ email: email })
        .then((reslt) => {
            if (reslt) {
                const dataSend = {
                    _id: reslt._id,
                    firstname: reslt.firstname,
                    lastname: reslt.lastname,
                    email: reslt.email,
                    password: reslt.password,
                    cnfpassword: reslt.cnfpassword,
                    imgProfile: reslt.imgProfile
                }
                res.status(200).json({
                    Message: "Login is Successfully",
                    alert: true,
                    login: dataSend
                })
            }
            else{
                res.status(400).json({
                    Message: "This Email id is does not exist",
                    alert: false
                })
            }

        })
})

module.exports = router;
