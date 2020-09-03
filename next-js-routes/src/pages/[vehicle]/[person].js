import { useRouter } from "next/router";
import Navigation from "../navigation";

export default function Person() {
  const router = useRouter();

  return (
    <>
      <Navigation />

      <h1>
        {router.query.person} has a {router.query.vehicle}
      </h1>
    </>
  );
}
