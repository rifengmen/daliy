module.exports={
    devServer: {
        // /admin/login
        // /admin/login   http:localhost:3000/admin/login
        proxy: 'http://localhost:3000'
    }
};