const urlModel = require('../models/urlModel')
const userModel = require('../models/userModel')

exports.url = async (req,res) => {
    try {
        if (!req.body) {
            res.status(406).json({ err:'You have to fill the URL' })
            return;
        }
        const { url } = req.body;
        const result = await urlModel.create({
            userId: req.userId,
            url: req.body.url
        });
        if (result) {
            const user = await userModel.findOneAndUpdate(
                { _id: req.userId },
                {
                    $push: { urls: result }
                }
            );
            
            return res.status("Url created successfully").json(result);
        }
    } catch (error) {
        res.status(500).json({ err: error.message || "Error while finding urls" })
    }
}

exports.showUrl = async (req,res) => {
    try {
        const list = await userModel.findById(req.userId)
        .select("-password")
        .populate("urls")
        .exec();

        return res.status(200).json(list);
    } catch (error) {
        res.status(500).json({err:error.message || "Error while finding urls"})   
    }
}

exports.showUrlById = async (req,res) => {
    try {
        const list = await urlModel.findById(req.params.id)

        return res.status(200).json(list);
    } catch (error) {
        res.status(500).json({err:error.message || "Error while finding urls"})   
    }
}

exports.editUrl = async (req,res) => {
    try {
        const url = req.body;
        console.log(url);
        const result = await urlModel.findByIdAndUpdate({ _id: req.params.id },url)

        if (result) {
            return res.status(200).json("Url updated successfully");
        }
        res.status(201).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
} 

exports.deleteUrl = async (req,res) => {
    try {
        const userId = { userId: req.userId, _id: req.params.id }
        console.log(userId);
        await urlModel.findOneAndDelete({ userId: req.userId, _id: req.params.id })
        res.status(201).json("User deleted successfully")
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}