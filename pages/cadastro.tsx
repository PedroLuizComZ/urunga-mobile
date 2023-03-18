import Head from "next/head";
import Image from "next/image";
import { SignupContainer } from "../styles/Signup";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { createUserController } from "../controllers/Auth.controller";
import { IUser } from "../interfaces/IUser";
import { useRouter } from "next/router";

export default function Signup() {
  const citys = ["Jundiai", "Varzea", "Louveira", "Outro"];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter()

  const onSubmit = async (data: any) => {   
    const user: IUser = data;
    user.type = "client";
    const result = await createUserController(user);

    if(result.status === "success"){
      router.push(`/list/`)
    }
  };

  return (
    <>
      <Head>
        <title>Urunga</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignupContainer>
        <Image
          src={"/logo.svg"}
          alt={"RatingStar"}
          height={88}
          width={88}
          className="logo-icon"
        />
        <h1>Crie sua conta</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group">
            <span>Nome</span>
            <input
              type="name"
              {...register("name", { required: "Nome é Obrigatório" })}
            />
            {errors.name && <p role="alert">{`${errors.name?.message}`}</p>}
          </div>
          <div className="input-group">
            <span>Email</span>
            <input
              type="email"
              {...register("email", { required: "Email é Obrigatório" })}
            />
            {errors.email && <p role="alert">{`${errors.email?.message}`}</p>}
          </div>
          <div className="input-group">
            <span>Senha</span>
            <input
              type="password"
              {...register("password", { required: "Senha é Obrigatório" })}
            />
            {errors.password && (
              <p role="alert">{`${errors.password?.message}`}</p>
            )}
          </div>
          <div className="input-group">
            <span>Escolha a sua Cidade</span>
            <select
              id="citys"
              {...register("city", { required: "Cidade é Obrigatório" })}
            >
              {citys.map((city) => {
                return (
                  <option key={city} value={city.toLowerCase()}>
                    {city}
                  </option>
                );
              })}
            </select>
            {errors.city && <p role="alert">{`${errors.city?.message}`}</p>}
          </div>
          <button type="submit">Cadastrar</button>
        </form>

        <p>
          Ja Possui uma conta?{" "}
          <label>
            <Link href="/"> Entre</Link>
          </label>
        </p>
      </SignupContainer>
    </>
  );
}
