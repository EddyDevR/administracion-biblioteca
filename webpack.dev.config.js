// Importar el modulo Path un administrador de rutas de archivos
const path = require('path');
// Importing Extract Plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Exportamos un Configuration Options Object   
module.exports = {
    // 1. Estableciendo el archivo indexador
    // del front-end
    entry: "./client/index.js",
    // 2. Estableciendo el archivo de salida
    output: {
        // 2.1 Ruta absoluta de salida
        path: path.resolve(__dirname, "public"),
        // 2.2 Nombre del archivo de salida
        filename: "bundle.js",
        // 2.3 Ruta base de archivos estaticos
        publicPath: "/"
    },
    // 3. Configurar el Servidor de Desarrollo
    // El servidor de desarrollo sirve los archivos
    // empaquetados para no tener que estar reempaquetando
    // en cada cambio del código.
    devServer: {
        // 3.1 Folder de estaticos
        static: path.join(__dirname, 'public'),
        // 3.2 El puerto de servidor de desarrollo
        port: 8080,
        // 3.3 Definiendo el HOST 
        host: '0.0.0.0'
    },
    // Agregando un modulo a webpack
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        'modules': false,
                                        'useBuiltIns': 'usage',
                                        'targets': '> 0.25%, not dead',
                                        'corejs': 3
                                    }
                                ]
                            ]
                        }
                    }
                ]
            },
            // Regla para cagar estilos
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    // Sección de Plugins
    plugins: [new MiniCssExtractPlugin({
        // Archivo css de salida
        filename: 'styles/app.css'
    })]
}