const router = require('express').Router();
const { signupDb, prdDetail } = require("../Schema/signupSchema");

router.post("/signup", async (req, res) => {

    const { email } = req.body;

    signupDb.findOne({ email: email })
        .then((user) => {
            if (user) {
                return res.status(400).json({
                    Message: 'This Email Already Exists',
                    alert: false
                })
            } else {
                const signupUser = new signupDb(req.body);
                signupUser.save()
                return res.status(200).json({
                    Message: "Registration Successfully",
                    alert: true
                })
            }
        })
        .catch((err) => {
            console.log(err)
            return res.status(500).json({
                Message: "Something went Wrong"
            })
        })
    // const signupUser = new signupDb(req.body)
    // try {
    //     await signupUser.save()
    //     res.status(201).json({
    //         Message: 'Successfully Registration',
    //         data: {
    //             signupUser
    //         }
    //     })
    // } catch (err) {
    //     res.status(500).json({
    //         Message: 'Failed',
    //         message: err
    //     })
    // }


})

router.post("/login", (req, res) => {
    const { email } = req.body;
    signupDb.findOne({ email: email })
        .then((result) => {
            if (result) {
                const dataSend = {
                    _id:result._id,
                    firstname: result.firstname,
                    lastname: result.lastname,
                    email: result.email,
                    password: result.password,
                    cnfpassword: result.cnfpassword,
                    imgProfile: result.imgProfile
                }
                // console.log(dataSend);
                return res.status(200).json({
                    Message: "Login is Successfully",
                    alert: true,
                    login:dataSend
                })
            }
            else {
                return res.status(400).json({
                    Message: "This Email id is does not exist",
                    alert: false
                })
            }
        })
})

//add products
router.post("/addProduct",async (req,res)=>{
    try{
        const dataPrdocut = await prdDetail(req.body);
        const data = dataPrdocut.save();
        // console.log(data)
        res.status(200).json({
            Message:"Product add Succesfully",
            alert:true
        })
    }
    catch(error){
        console.log(error)
    }
})

//get Products

router.get("/getPrds",async (req,res)=>{
    const allProdts = await prdDetail.find({})
    try{
        res.status(200).json(allProdts)
    }catch(error){
        console.log(error)
        res.status(500).json({
            Message:"Something went wrong"
        })
    }
})

// get products by id
router.get('/product/:id',async (req,res)=>{
    
    // console.log(id)
    // try{
    //     res.status(200).json({
    //         productSingle:getData
    //     })
    // }
    // catch(error){
    //     console.log(error);
    //     res.status(500).json({
    //         Message:"Something went wrong"
    //     })
    // }

    try {
        // console.log(req.params);
        const {id} = req.params;
        const getData = await prdDetail.findById({_id:id})
        console.log(id);
        res.status(201).json(getData)

    } catch (error) {
        res.status(422).json(error);
    }
})

module.exports = router;