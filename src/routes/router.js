const express = require('express')
const router = express.Router()
const {post_data,get_data,get_selected,patch_selected,delete_selected} = require('./../controllers/recipe.controller.js')

router.get('/',async(req,res)=>{
    const resp = await get_data();
    res.send({recipes:resp})
})


router.get('/:id',async(req,res)=>{
    const resp = await get_selected(req.params.id);
    res.send({message:"Recipe details by id",recipe:[resp]})
})

router.post('/',post_data)

router.patch('/:id', patch_selected);

router.delete('/:id', delete_selected);







module.exports = router;