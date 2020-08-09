const path = require('path');

module.exports = {
    // モジュールバンドルを行う起点となるファイルの指定
    // 指定できる値としては、ファイル名の文字列や、それを並べた配列やオブジェクト
    // 下記はオブジェクトとして指定した例 
    mode: 'development',
    entry: {
        'GLTS': './build/init.js'
    },  
    output: {
        // モジュールバンドルを行った結果を出力する場所やファイル名の指定
        // "__dirname"はこのファイルが存在するディレクトリを表すnode.jsで定義済みの定数
        path: path.join(__dirname, './public/lib') ,
        filename: '[name].js',  // [name]はentryで記述した名前(この例ではbundle）が入る
        library: 'GLTS',
        libraryTarget: 'umd',
		libraryExport: "default"
    },
    // モジュールとして扱いたいファイルの拡張子を指定する
    // 例えば「import Foo from './foo'」という記述に対して"foo.ts"という名前のファイルをモジュールとして探す
    // デフォルトは['.js', '.json']
    resolve: {
        extensions:['.ts','.js']
    },
    devServer: {
        // webpack-dev-serverの公開フォルダ
        contentBase: path.join(__dirname,'dist')
    },
    // モジュールに適用するルールの設定（ここではローダーの設定を行う事が多い）
    module: {
        rules: [
            {
                // 拡張子が.tsで終わるファイルに対して、TypeScriptコンパイラを適用する
                test:/\.ts$/,loader:'ts-loader'
            },
            {
                // 拡張子 .js の場合
                test: /\.js$/,
                use: [
                  {
                    // Babel を利用する
                    loader: 'babel-loader',
                    // Babel のオプションを指定する
                    options: {
                      presets: [
                        // プリセットを指定することで、ES2020 を ES5 に変換
                        '@babel/preset-env',
                      ]
                    }
                  }
                ]
              }
        ]
    }
}
