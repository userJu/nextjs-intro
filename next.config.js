/** @type {import('next').NextConfig} */
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/old-blog/:path*",
        destination: "/new-sexy-blog/:path*",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/movies",
        destination: `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`,
      },
      {
        source: "/api/movies/:id",
        destination: `https://api.themoviedb.org/3/movie/:id?api_key=${API_KEY}`,
      },
    ];
  },
};

module.exports = nextConfig;

// ridirection stap 1. source를 찾는다
// 만약 유저가 contact로 간다면
// 우리는 유저를 form이라는 destination으로 보낼 것
// 여기서 이 redirection이 영구적인지 아닌지에 따라서
// 브라우저나 검색엔진이 이 정보를 저장하는지 여부가 결정됨
// terminal에서 서버를 재시작하라고 나온다
// > Found a change in next.config.js. Restart the server to see the changes in effect.
// 그러면 재시작하면 됨 ^.^
// 어쨌든 우리의 웹페이지 내부든 외부든 redirect할 수 있다.

// rewrites도 똑같이 array를 return한다
// 차이점
// redirect는 URL로 갈 때 유저가 URL이 바뀌는 것을 볼 수 있다.
// 하지만 rewrites는 유저를 redirect시키기는 하지만 URL은 변하지 않는다.
