const path = require("path"); // common JS 문법,  import path from 'path' 라는 뜻과 같음

const HtmlWebpackPlugin = require("html-webpack-plugin"); // html 파일에 어떤 js파일을 적용해야 할지 연결해줌
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 번들링이 일어 날때 css 파일을 별도의 파일로 뽑아내겠다
const dotenv = require("dotenv");
const webpack = require("webpack");

dotenv.config();
//process.env 로 접근 가능하게 해준다.

const prod = process.env.NODE_ENV === "production";
//개발, 배포, 테스트 등 여러환경에서 같은 코드베이스를 사용하게 된다.
//그럴때 위와 같은 환경 변수(process.env.NODE_ENV) 를 사용해서 어떤 환경인지 구분 해준다.
// 환경변수 => 운영체제 레벨에서 관리 되는 변수

module.exports = {
  mode: prod ? "production" : "development",
  devtool: prod ? false : "eval-source-map",
  entry: "./src/index.tsx", // 진입파일
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(ts|tsx)$/, // 정규식, 모든 파일을 통틀어 js, jsx 확장자의 파일만 사용 하겠다.
            exclude: /node_modules/, // node_modules 의 부분은 제외를 하겠다.
            use: {
              loader: "babel-loader", // 이러한 설정을 사용할 loader는 babel-loader이다.
            },
          },
          {
            test: /\.css$/i,
            exclude: /node_modules/,
            use: [
              prod ? MiniCssExtractPlugin.loader : "style-loader",
              "css-loader",
            ],
          },
        ],
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, "../build"), // __dirname -> 이 파일의 위치를 의미.  output파일의 위치는 이 파일의 위치를 기준으로 작성
    filename: "static/js/[name].[contenthash:8].js", // 반환할 파일 이름
    clean: true,
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    prod
      ? new HtmlWebpackPlugin({
          template: "public/index.html",
          minify: true, // html코드의 띄워쓰기를 다 없애서 줄여준다. 배포할때 사용.
        })
      : new HtmlWebpackPlugin({
          template: "public/index.html",
        }),
    prod
      ? new MiniCssExtractPlugin({
          linkType: false,
          filename: "[name].[contenthash:8].css",
        })
      : undefined,
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(process.env),
    }),
  ].filter(Boolean),
  devServer: {
    historyApiFallback: true,
    port: 3001,
    hot: true, // 코드를 바꾸면 자동으로 갱신
    open: true, // 코드를 실행할때 자동으로 브라우저가 열림
    client: {
      overlay: true, // console창 외에 화면에도 에러가 표시 되게 함
      progress: true, // 웹팩에서 빌드에 대한 진행 과정을 표시 해줌
    },
  },
};
