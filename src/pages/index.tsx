import { type NextPage } from "next";
import Head from "next/head";
import clsx from "clsx";
import Form from "../components/Form";
import FormFast from "../components/FormFast";
import { useState } from "react";
import { GithubIcon } from "../icons";
import FormFormik from "../components/FormFormik";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Form Validation Performance Comparison</title>
        <meta
          name="description"
          content="Compare react-form-hook vs custom implementation"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-[#363636] ">
        <div className="container grid grid-cols-1 place-items-center gap-12 px-4 py-4 lg:grid-cols-3 ">
          <div className="flex flex-col items-center gap-4">
            <Form />

            <a
              href="https://github.com/gasparrobi/react-form-performance-comparison/blob/main/src/components/Form.tsx"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-1 hover:underline"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="flex flex-col items-center gap-4">
            <FormFast />

            <a
              href="https://github.com/gasparrobi/react-form-performance-comparison/blob/main/src/components/FormFast.tsx"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-1 hover:underline"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          </div>

          <div className="flex flex-col items-center gap-4">
            <FormFormik />

            <a
              href="#"
              target="_blank"
              rel="noreferrer noopener"
              className="flex items-center gap-1 hover:underline"
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
