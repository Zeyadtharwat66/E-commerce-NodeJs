const categoryModel=require("../models/categoryModel");
const slugify=require("slugify");
const asyncHandler=require("express-async-handler");

//@desc     Create category
//@route    POST /api/v1/categories
//@access   Private
exports.createCategory =asyncHandler(async(req,res)=>{
    const name=req.body.name;
    const category=await categoryModel.create({name,slug:slugify(name)});
    res.status(201).json({data: category});
});

//@desc     Get categories
//@route    GET /api/v1/categories
//@access   Public
exports.getCategories =asyncHandler(async(req,res)=>{
    const page=req.query.page *1 || 1; 
    const limit=req.query.limit *1 || 5;
    const skip=(page-1)*limit;
    const categories=await categoryModel.find({}).skip(skip).limit(limit);
    res.status(200).json({results:categories.length, page , data:categories});
});

//@desc     Get specific category
//@route    GET /api/v1/categories/:id
//@access   Public
exports.getCategory=asyncHandler(async(req,res)=>{
    const{id}=req.params;
    const category=await categoryModel.findById(id);
    if(!category)
        res.status(404).json({msg:`No category for the id ${id}`});
    res.status(200).json({data:category});
});

//@desc     update specific category
//@route    PUT /api/v1/categories/:id
//@access   private
exports.updateCategory=asyncHandler(async(req,res)=>{
    const{id}=req.params;
    const{name}=req.body;
    const category=await categoryModel.findOneAndUpdate({_id:id},{name:name,slug:slugify(name)},{new:true});
    if(!category)
        res.status(404).json({msg:`No category for the id ${id}`});
    res.status(200).json({data:category});
});

//@desc     delete specific category
//@route    DELETE /api/v1/categories/:id
//@access   private
exports.deleteCategory=asyncHandler(async(req,res)=>{
    const{id}=req.params;
    const category=await categoryModel.findByIdAndDelete(id);
    if(!category)
        res.status(404).json({msg:`No category for the id ${id}`});
    res.status(204).json({data:category});
});