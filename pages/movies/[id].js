import { useRouter } from "next/router";
export default function Detail() {
  const router = useRouter();
  console.log(router);
  return (
    <div>
      <h4>{router.query.title || "Loading..."}</h4>
      {/* 하지만 이 router.query.title은 유저가 홈페이지에서 상세페이지로 넘어올 때만 존재
      나도 agenda에서 겪었던 문제다..^^... */}
    </div>
  );
}
