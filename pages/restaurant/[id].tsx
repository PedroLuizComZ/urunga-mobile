import Head from "next/head";
import {
  InformationContainer,
  ItemList,
  ModalContainer,
  QrCodeContainer,
  RestaurantContainer,
} from "../../styles/Restaurant";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { IStores } from "../../interfaces/IStores";
import { listStoreByIdController } from "../../controllers/Restaurants.controller";
import QRCode from "qrcode";
import { Modal, ModalBody } from "reactstrap";
import Cookies from "js-cookie";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);
import { parseJwt } from "../../utils/parseJwt";

export default function RestaurantDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [modal, setModal] = useState(false);
  const [hasValidSubscription, setHasValidSubscription] = useState(false);

  const token = Cookies.get("token");

  const toggle = () => setModal(!modal);

  const handleClick = () => {
    router.push(`/list`);
  };

  const [restaurant, setRestaurant] = useState<IStores | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (router.isReady) {
      loadData();
      checkSubscription();
    }
  }, [router.isReady]);

  const loadData = async () => {
    const result = await listStoreByIdController(`${id}`);
    setRestaurant(result);
    setLoading(false);
  };

  const checkSubscription = async () => {
    const sessionData = JSON.parse(`${Cookies.get("sessionData")}`);

    if (sessionData && sessionData.status === "complete") {
      setHasValidSubscription(true);
    }
  };

  const createSubscription = async () => {

    const parsedToken = parseJwt(`${token}`);

    try {
      const session = await stripe.checkout.sessions.create({
        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
        customer_email: parsedToken.data.email,
        line_items: [
          {
            price: process.env.NEXT_PUBLIC_STRIPE_SUBSCRIPTION_ID,
            quantity: 1,
          },
        ],
        mode: "subscription",
      });

      window.location.href = session.url;
    } catch (error) {
      alert("Ocorreu um erro, tente novamente mais tarde");
    }
  };

  const canvasRef = useRef<any>(null);

  const handleClickQrCode = async () => {
    const token = Cookies.get("token");

    if (!document.querySelector('input[name="radio"]:checked')) {
      return alert("Selecione uma das promoções");
    }
    toggle();

    console.log(
      `${
        window.location.origin
      }/validador?token=${token}&restaurantId=${id}&promotionId=${
        document.querySelector('input[name="radio"]:checked')!.id
      }`
    );

    setTimeout(() => {
      QRCode.toCanvas(
        canvasRef.current,
        `${
          window.location.origin
        }/validador?token=${token}&restaurantId=${id}&promotionId=${
          document.querySelector('input[name="radio"]:checked')!.id
        }` || " ",
        (error) => error && console.error(error)
      );
    }, 500);
  };

  return (
    <>
      <Head>
        <title>Urunga - Restaurante</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {!loading && (
        <RestaurantContainer>
          <Image
            src={"/icons/back.svg"}
            alt={"go back"}
            height={30}
            width={30}
            className="back-icon"
            onClick={handleClick}
          />
          <Image
            src={"/logo.svg"}
            alt={"RatingStar"}
            height={88}
            width={88}
            className="logo-icon"
          />
          <ItemList>
            <ul>
              <li>
                <div className="image-holder">
                  <Image
                    src={restaurant!.logo}
                    alt={"RatingStar"}
                    height={150}
                    width={150}
                  />
                </div>
                <div className="info-box">
                  <p>{restaurant!.name}</p>
                  <span>Beyti Restaurant, Taksim</span>
                  <div className="ratings">
                    <Image
                      src={"/icons/start.svg"}
                      alt={"RatingStar"}
                      height={10}
                      width={10}
                    />
                    <label>4.8</label>
                    <small>(233 ratings)</small>
                  </div>
                </div>
              </li>
            </ul>
          </ItemList>
          <InformationContainer>
            <p>Descrição</p>
            <span>{restaurant!.description}</span>
            {restaurant!.promotions.length !== 0 && (
              <>
                <p>Promoções</p>
                <form>
                  {restaurant!.promotions.map((item, index) => {
                    return (
                      <div key={index}>
                        <input
                          type="radio"
                          name={`radio`}
                          value={`radio-${index}`}
                          id={`${index}`}
                        />
                        <label htmlFor={`radio-${index}`}>{item}</label>
                      </div>
                    );
                  })}
                </form>
              </>
            )}
          </InformationContainer>
          <QrCodeContainer>
            {hasValidSubscription ? (
              <button onClick={handleClickQrCode}>Gerar Cupom</button>
            ) : (
              <button onClick={createSubscription}>Assinar</button>
            )}
          </QrCodeContainer>
          <Modal isOpen={modal} toggle={toggle} centered>
            <ModalBody>
              <ModalContainer>
                <canvas ref={canvasRef} />
              </ModalContainer>
            </ModalBody>
          </Modal>
        </RestaurantContainer>
      )}
    </>
  );
}
