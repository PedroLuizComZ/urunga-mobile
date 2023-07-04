import router from "next/router";
import Loader from "../components/Loader";
import { ListContainer } from "../styles/List";
import Image from "next/image";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function IosPayment() {
  const [loading, setLoading] = useState(true);

  const handleClick = () => {
    Cookies.set("ios-checker", "Urunga");
    router.push(`/list`);
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 7000);
  }, []);

  return (
    <>
      <ListContainer>
        <Image
          src={"/logo.svg"}
          alt={"RatingStar"}
          height={88}
          width={88}
          className="logo-icon"
        />
        {loading ? (
          <>
            <div className="loaderContainer">
              <Loader />
            </div>
          </>
        ) : (
          <>
            <h1>Apos completar a compra clique abaixo para utilizar o app</h1>
            <button onClick={handleClick}>Prosseguir</button>
          </>
        )}
      </ListContainer>
    </>
  );
}
