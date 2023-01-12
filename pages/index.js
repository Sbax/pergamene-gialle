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
import { colors } from "../utils/colors";

const spline = Spline_Sans_Mono({ subsets: ["latin"], preload: true });
const nanum = Nanum_Pen_Script({
  subsets: ["latin"],
  weight: "400",
  preload: true,
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
          <h1 className={nanum.className}>Pergamene Gialle</h1>
          <p>
            <strong style={brushStroke(colors.primary, 10)}>
              Pergamene Gialle
            </strong>{" "}
            è una raccolta di autori e materiali{" "}
            <strong style={brushStroke(colors.primary, 8)}>OSR</strong>{" "}
            italiani, puoi entrare a farne parte compilando il modulo su{" "}
            <a href="https://docs.google.com/forms/d/e/1FAIpQLScg2YDB4wulcQ5wO5TVM4n-gFafK1ZNLOzYNzN-Wvu4qvU88A/viewform">
              Google Form
            </a>
            .
          </p>
          <p>
            Raggiungici su Facebook{" "}
            <strong style={brushStroke(colors.primary_75, 10)}>
              <a href="https://www.facebook.com/groups/osritalia/">
                OSR Italia
              </a>
            </strong>{" "}
            o su Telegram{" "}
            <strong style={brushStroke(colors.primary_50, 10)}>
              <a href="https://t.me/osritalia">Ruling the Game</a>
            </strong>
          </p>
        </section>
        <section className={styles.people}>
          {people.map(
            ({ name, telegram, itch, blog, other, social, brush }) => {
              return (
                <article
                  key={telegram}
                  className={[spline.className, styles.article].join(" ")}
                >
                  <h1
                    className={[nanum.className, styles.name].join(" ")}
                    style={brushStroke(colors.primary, brush)}
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
                      <strong style={brushStroke(colors.itch, 8)}>itch:</strong>{" "}
                      <a href={itch}>{simplifyUrl(itch)}</a>
                    </p>
                  )}
                  {blog && (
                    <p>
                      <strong style={brushStroke(colors.primary_50, 10)}>
                        blog:
                      </strong>{" "}
                      <a href={blog}>{simplifyUrl(blog)}</a>
                    </p>
                  )}

                  {social && (
                    <p>
                      <strong style={brushStroke(colors.primary_75, 9)}>
                        social:
                      </strong>{" "}
                      {social.startsWith("http") ? (
                        <a href={social}>{simplifyUrl(social)}</a>
                      ) : (
                        social
                      )}
                    </p>
                  )}

                  {other && (
                    <p>
                      <strong style={brushStroke(colors.primary, 10)}>
                        altro:
                      </strong>{" "}
                      <a href={other}>{simplifyUrl(other)}</a>
                    </p>
                  )}
                </article>
              );
            }
          )}
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
