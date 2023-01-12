import Head from "next/head";
import Image from "next/image";
import {
  Spline_Sans_Mono,
  Covered_By_Your_Grace,
  Nanum_Pen_Script,
} from "@next/font/google";
import styles from "../styles/Home.module.scss";
import { getPeople } from "../data/sheet";
import { brushStroke, getBrush, simplifyUrl } from "../utils";

const spline = Spline_Sans_Mono({ subsets: ["latin"] });
const coveredByYourGrace = Nanum_Pen_Script({
  subsets: ["latin"],
  weight: "400",
});

export default function Home({ people }) {
  return (
    <>
      <Head>
        <title>Pergamene Gialle</title>
        <meta
          name="description"
          content="Lista di tutti gli autori italiani di materiale OSR"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <section className={[styles.introduction, spline.className].join(" ")}>
          <h1 className={coveredByYourGrace.className}>Pergamene Gialle</h1>
          <p>
            <strong style={brushStroke("#fca311", 10)}>Pergamene Gialle</strong>{" "}
            è una raccolta di autori e materiali{" "}
            <strong style={brushStroke("#fca311", 8)}>OSR</strong> italiani,
            puoi entrare a farne parte compilando il modulo su{" "}
            <a href="https://docs.google.com/forms/d/e/1FAIpQLScg2YDB4wulcQ5wO5TVM4n-gFafK1ZNLOzYNzN-Wvu4qvU88A/viewform">
              Google Form
            </a>
            .
          </p>
          <p>
            Raggiungici su{" "}
            <strong style={brushStroke("#fca311", 10)}>Facebook</strong>{" "}
            <a href="https://www.facebook.com/groups/osritalia/">OSR Italia</a>{" "}
            o su <strong style={brushStroke("#fca311", 10)}>Telegram</strong>{" "}
            <a href="https://t.me/osritalia">Ruling the Game</a>
          </p>
        </section>
        <section className={styles.people}>
          {people.map(({ name, telegram, itch, blog, other, brush }) => {
            return (
              <article
                key={telegram}
                className={[spline.className, styles.article].join(" ")}
              >
                <h1
                  className={[coveredByYourGrace.className, styles.name].join(
                    " "
                  )}
                  style={brushStroke("#fca311", brush)}
                >
                  {name}
                </h1>
                {telegram && (
                  <h2>
                    <a href={`https://t.me/${telegram.replace("@", "")}`}>
                      {telegram}
                    </a>
                  </h2>
                )}
                {itch && (
                  <p>
                    <span>itch:</span> <a href={itch}>{simplifyUrl(itch)}</a>
                  </p>
                )}
                {blog && (
                  <p>
                    <span>blog:</span> <a href={blog}>{simplifyUrl(blog)}</a>
                  </p>
                )}
                {other && (
                  <p>
                    <a href={other}>altro</a>
                  </p>
                )}
              </article>
            );
          })}
        </section>
      </main>
    </>
  );
}

export async function getStaticProps() {
  const people = await getPeople();

  return {
    props: { people },
    revalidate: 5 * 60, // 1 update per 5 minutes
  };
}
