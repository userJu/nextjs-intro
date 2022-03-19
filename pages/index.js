import { useState, useEffect } from "react";
import Link from "next/Link";
import Seo from "../components/Seo";
import { useRouter } from "next/router";

export default function Home({ results }) {
  const router = useRouter();
  // const [movies, setMovies] = useState([]);
  // useEffect(() => {
  //   (async () => {
  //     const { results } = await (await fetch(`/api/movies`)).json();
  //     setMovies(results);
  //   })();
  // }, []);

  const onClick = (id, title) => {
    router.push(`/movies/${title}/${id}`);
  };

  return (
    <div>
      <Seo title="Home" />
      {results?.map((movie) => (
        <>
          <button
            onClick={() => {
              onClick(movie.id, movie.original_title);
            }}
          >
            {movie.original_title}
          </button>
          <Link
            href={`/movies/${movie.original_title}/${movie.id}`}
            key={movie.id}
          >
            <a href="">
              <div className="movie" key={movie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                />
                <h4>{movie.original_title}</h4>
              </div>
            </a>
          </Link>
        </>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  // async는 하고 싶으면 하고 말고싶으면 말면 됨
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  // async하는 애를 가져와준다
  return {
    props: {
      results, // 이 props에 우리가 가져온 results 값이 들어감
      // 그리고 이 results는 ... props로 전달된다
    },
  };
  // return하는 이 object는 props라고 불리는 key 혹은 property를 가진다.
}
// 이 자리에 어떤 코드를 짜던간에 그 코드는 server쪽에서만 작동
// 이걸 이용해서 API key를 숨길 수도 있음.
// 이건 오직 백엔드에서만 실행됨.
// 그리고 무엇을 return하던지, 이걸 props로서 page에 주게 된다.

// 오류
// TypeError: Only absolute URLs are supported
// 이유
// /api/movies라는 주소는 서버에서 작동하지 않고 프엔에서만 작동한다.
// 따라서 http부터 추가해줘야함

// 어쨌든 결과적으로 loding전에 result가 와있다
// 소스 코드 HTML 안에 render result가 들어있다. HTML으로
// Loding이 되지 않고 바로 HTMl이 그려진다는 말
// 동시에 이건 API가 돌아오기 전 까지 화면에 아무것도 안 보일 거라는 말
// 여기서는 선택
// 1. 데이터가 유효할 때 화면이 보여지게 되는게 좋은지
// 2. 로딩 화면을 보여준 다음에 데이터를 받는게 좋은지
