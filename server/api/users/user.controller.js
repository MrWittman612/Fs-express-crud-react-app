const me = async (req, res) => res.status(200).send(req.user);
exports.me = me;
