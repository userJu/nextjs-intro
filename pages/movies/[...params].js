import { useRouter } from "next/router";
import Seo from "../../components/Seo";
export default function Detail({ params }) {
  const router = useRouter();
  // const [title, id] = router.query.params || [];
  const [title, id] = params || [];

  // 하지만 에러가 발생한다. 발생 이유 => 이 페이지가 백엔드에서 pre-render 되기 때문
  // 그리고 server에는 router.query.params가 아직 존재하지 않는다
  // const [title, id] = router.query.params || [];
  // 이렇게 해주면 에러가 사라짐
  // 이건 우리가 client-side rendering만 해줘서 그런것
  // 검색엔진은 소스코드 내에서 우리가 원하는 텍스트를 찾을 수 없음 📌
  // 이 때 또 getServerSideProps를 사용해 줄 수 있다
  // 그러면 request에 대한 정보와 영화 제목을 얻을 수 있음 👀
  console.log(router);
  return (
    <div>
      <Seo title={title} />
      {/* 웹 제목이 title로 나오게 된다 */}
      <h4>{title}</h4>
      {/* 하지만 이 router.query.title은 유저가 홈페이지에서 상세페이지로 넘어올 때만 존재
      나도 agenda에서 겪었던 문제다..^^... */}
    </div>
  );
}

// 👀
export function getServerSideProps({ params: { params } }) {
  return {
    props: { params },
  };
}
// 만약 유저에게 절대로 로딩 단계를 보여주고 싶지 않고
// SEO에 아주 최적화되게 만들고 싶으면 getServerSideProps를 사용하면 된다
// API로 데이터를 fetch해오는 것이 아니라 조금 더 빠르게 데이터를 가져오는 방식.

// 종합
// component 내부에서 router을 실행하면 router은 프론트앤드에서만 실행됨 clientSide에서만
// 하지만 이 경우에는 getServerSideProps로 URL 정보를 가져오는 데 성공
// index.js처럼 패치는 하지 않았다.
// 기본적으로 페이지를 pre render하고싶으면
// setServersideProps를 이용해서 serverside에서 정보를 얻자
