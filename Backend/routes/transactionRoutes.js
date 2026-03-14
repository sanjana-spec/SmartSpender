const express = require("express");

const Transaction = require("../models/Transaction");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/",auth,async(req,res)=>{

  const transactions = await Transaction.find({
    userId:req.userId
  });

  res.json(transactions);

});

router.post("/",auth,async(req,res)=>{

  const transaction = new Transaction({

    userId:req.userId,
    description:req.body.description,
    amount:req.body.amount

  });

  await transaction.save();

  res.json(transaction);

});

module.exports = router;