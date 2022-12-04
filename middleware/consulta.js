module.exports = async(req, res, next)=> {
    const rh = await db.query("SELECT * FROM empleado");
   return res.status(200).json({code: 1, message: rh});
};