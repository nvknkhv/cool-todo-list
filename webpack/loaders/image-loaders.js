const devMode = process.env.NODE_ENV === 'development';

module.exports = [
    {
        loader: 'file-loader',
        options: {
            name: devMode ? 'public/[name].[ext]' : 'public/[name].[hash:8].[ext]',
        },
    },
];