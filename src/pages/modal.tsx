import { type NextPage } from "next";
import Head from "next/head";
import clsx from "clsx";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const RModal = dynamic(() => import("../components/Modal"), {
  ssr: false,
});

const Modal: NextPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
      <Head>
        <title>Dynamically imported modal</title>
        <meta
          name="description"
          content="Compare react-form-hook vs custom implementation"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-white ">
        <button
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
          onClick={() => setIsModalVisible(true)}
        >
          Open Modal
        </button>

        {isModalVisible && (
          <RModal
            title="Dynamic modal"
            isOpen={isModalVisible}
            onClose={() => setIsModalVisible(false)}
          >
            <div>modal body</div>
          </RModal>
        )}
      </main>
    </>
  );
};

export default Modal;
