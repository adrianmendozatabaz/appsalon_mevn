const authMiddleware = (req, res, next) => {
    console.log("desde el middle");
    
    next();
};

export default authMiddleware;
