import Head from "next/head";
import { ValidatorContainer } from "../styles/Validator";
import { parseJwt } from "../utils/parseJwt";
import Image from "next/image";
import { useRouter } from "next/router";
import { createCheckinController } from "../controllers/Checkin.controller";

export default function Home() {
  const router = useRouter();

  const handleClick = async () => {
    const tokenData = parseJwt(`${router.query.token}`);
    await createCheckinController({
      userId: tokenData.data._id,
      storeId: `${router.query.restaurantId}`,
      promotionId: `${router.query.promotionId}`,
      checkinAt: `${new Date()}`,
    });
  };

  return (
    <>
      <Head>
        <title>Urunga - Validador</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ValidatorContainer>
        <Image
          src={"/logo.svg"}
          alt={"RatingStar"}
          height={88}
          width={88}
          className="logo-icon"
        />
        <h1>Validar </h1>
        <p>Confirmar desconto</p>

        <button type="button" onClick={handleClick}>
          Confirmar
        </button>
      </ValidatorContainer>
    </>
  );
}
